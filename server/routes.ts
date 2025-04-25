import express, { type Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertRideSchema, insertReviewSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  const router = express.Router();

  // Dashboard Overview API
  router.get("/dashboard/summary", async (req: Request, res: Response) => {
    try {
      const branch = req.query.branch as string;
      
      // Get total rides today
      const today = new Date();
      const todayRides = await storage.getRidesByDate(today);
      
      // Filter by branch if specified
      const filteredRides = branch && branch !== "all" 
        ? todayRides.filter(ride => {
            const branchObject = storage.getBranch(ride.branchId);
            return branchObject.then(b => b?.name === branch);
          })
        : todayRides;
      
      // Get count of rides by status
      const ongoingRides = (await filteredRides).filter(ride => ride.status === "on_trip");
      
      // Calculate average rating
      const reviews = await storage.getReviews();
      const avgRating = reviews.length > 0 
        ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
        : 0;
      
      // Calculate monthly cost (simplified)
      const allRides = await storage.getRides();
      const monthlyRides = allRides.filter(ride => {
        const rideDate = new Date(ride.startTime);
        return rideDate.getMonth() === today.getMonth() && 
               rideDate.getFullYear() === today.getFullYear();
      });
      
      const monthlyCost = monthlyRides.reduce((sum, ride) => sum + (Number(ride.fare) || 0), 0);
      
      res.json({
        totalRidesToday: (await filteredRides).length,
        liveTrips: ongoingRides.length,
        monthlyCost,
        avgRating
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch dashboard summary" });
    }
  });

  // Rides API
  router.get("/rides", async (req: Request, res: Response) => {
    try {
      const status = req.query.status as string;
      const branch = req.query.branch as string;
      const date = req.query.date ? new Date(req.query.date as string) : null;
      
      let rides = await storage.getRides();
      
      // Apply filters
      if (status) {
        rides = rides.filter(ride => ride.status === status);
      }
      
      if (branch) {
        const branches = await storage.getBranches();
        const branchId = branches.find(b => b.name === branch)?.id;
        if (branchId) {
          rides = rides.filter(ride => ride.branchId === branchId);
        }
      }
      
      if (date) {
        rides = await storage.getRidesByDate(date);
      }
      
      // Enrich ride data with user and cab information
      const enrichedRides = await Promise.all(rides.map(async ride => {
        const user = await storage.getUser(ride.userId);
        const cab = await storage.getCab(ride.cabId);
        const branch = await storage.getBranch(ride.branchId);
        
        return {
          ...ride,
          user: user ? { 
            id: user.id, 
            fullName: user.fullName, 
            department: user.department,
            profileImage: user.profileImage
          } : null,
          cab: cab ? { 
            id: cab.id, 
            number: cab.number, 
            model: cab.model,
            color: cab.color
          } : null,
          branch: branch ? branch.name : null
        };
      }));
      
      res.json(enrichedRides);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch rides" });
    }
  });

  router.get("/rides/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const ride = await storage.getRide(id);
      
      if (!ride) {
        return res.status(404).json({ message: "Ride not found" });
      }
      
      const user = await storage.getUser(ride.userId);
      const cab = await storage.getCab(ride.cabId);
      const branch = await storage.getBranch(ride.branchId);
      
      res.json({
        ...ride,
        user: user ? { 
          id: user.id, 
          fullName: user.fullName, 
          department: user.department,
          profileImage: user.profileImage
        } : null,
        cab: cab ? { 
          id: cab.id, 
          number: cab.number, 
          model: cab.model,
          color: cab.color
        } : null,
        branch: branch ? branch.name : null
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch ride" });
    }
  });

  router.post("/rides", async (req: Request, res: Response) => {
    try {
      const rideData = insertRideSchema.parse(req.body);
      const ride = await storage.createRide(rideData);
      res.status(201).json(ride);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid ride data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create ride" });
    }
  });

  router.patch("/rides/:id/status", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;
      
      if (!status) {
        return res.status(400).json({ message: "Status is required" });
      }
      
      const ride = await storage.updateRideStatus(id, status);
      
      if (!ride) {
        return res.status(404).json({ message: "Ride not found" });
      }
      
      res.json(ride);
    } catch (error) {
      res.status(500).json({ message: "Failed to update ride status" });
    }
  });

  router.patch("/rides/:id/complete", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const { endTime, fare } = req.body;
      
      if (!endTime || fare === undefined) {
        return res.status(400).json({ message: "End time and fare are required" });
      }
      
      const ride = await storage.completeRide(id, new Date(endTime), fare);
      
      if (!ride) {
        return res.status(404).json({ message: "Ride not found" });
      }
      
      res.json(ride);
    } catch (error) {
      res.status(500).json({ message: "Failed to complete ride" });
    }
  });

  // Users API
  router.get("/users", async (req: Request, res: Response) => {
    try {
      const branch = req.query.branch as string;
      
      let users = await storage.getUsers();
      
      if (branch && branch !== "all") {
        users = users.filter(user => user.branch === branch);
      }
      
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });

  // Reviews API
  router.get("/reviews", async (req: Request, res: Response) => {
    try {
      const rating = req.query.rating ? parseInt(req.query.rating as string) : null;
      const flagged = req.query.flagged === "true";
      
      let reviews = await storage.getReviews();
      
      if (rating) {
        reviews = await storage.getReviewsByRating(rating);
      }
      
      if (flagged) {
        reviews = await storage.getFlaggedReviews();
      }
      
      // Enrich reviews with user information
      const enrichedReviews = await Promise.all(reviews.map(async review => {
        const user = await storage.getUser(review.userId);
        return {
          ...review,
          user: user ? { 
            id: user.id, 
            fullName: user.fullName, 
            profileImage: user.profileImage 
          } : null
        };
      }));
      
      res.json(enrichedReviews);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch reviews" });
    }
  });

  router.post("/reviews", async (req: Request, res: Response) => {
    try {
      const reviewData = insertReviewSchema.parse(req.body);
      const review = await storage.createReview(reviewData);
      res.status(201).json(review);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid review data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create review" });
    }
  });

  router.patch("/reviews/:id/flag", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const review = await storage.flagReview(id);
      
      if (!review) {
        return res.status(404).json({ message: "Review not found" });
      }
      
      res.json(review);
    } catch (error) {
      res.status(500).json({ message: "Failed to flag review" });
    }
  });

  // Branches API
  router.get("/branches", async (req: Request, res: Response) => {
    try {
      const branches = await storage.getBranches();
      res.json(branches);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch branches" });
    }
  });

  // Carpool Suggestions API
  router.get("/carpool-suggestions", async (req: Request, res: Response) => {
    try {
      const suggestions = await storage.getCarpoolSuggestions();
      
      // Enrich suggestions with ride and user information
      const enrichedSuggestions = await Promise.all(suggestions.map(async suggestion => {
        const ride1 = await storage.getRide(suggestion.ride1Id);
        const ride2 = await storage.getRide(suggestion.ride2Id);
        
        const user1 = ride1 ? await storage.getUser(ride1.userId) : null;
        const user2 = ride2 ? await storage.getUser(ride2.userId) : null;
        
        return {
          ...suggestion,
          ride1: ride1 ? {
            id: ride1.id,
            startLocation: ride1.startLocation,
            endLocation: ride1.endLocation,
            startTime: ride1.startTime
          } : null,
          ride2: ride2 ? {
            id: ride2.id,
            startLocation: ride2.startLocation,
            endLocation: ride2.endLocation,
            startTime: ride2.startTime
          } : null,
          user1: user1 ? { 
            id: user1.id, 
            fullName: user1.fullName, 
            profileImage: user1.profileImage 
          } : null,
          user2: user2 ? { 
            id: user2.id, 
            fullName: user2.fullName, 
            profileImage: user2.profileImage 
          } : null
        };
      }));
      
      res.json(enrichedSuggestions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch carpool suggestions" });
    }
  });

  router.patch("/carpool-suggestions/:id/status", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;
      
      if (!status) {
        return res.status(400).json({ message: "Status is required" });
      }
      
      const suggestion = await storage.updateCarpoolSuggestionStatus(id, status);
      
      if (!suggestion) {
        return res.status(404).json({ message: "Carpool suggestion not found" });
      }
      
      res.json(suggestion);
    } catch (error) {
      res.status(500).json({ message: "Failed to update carpool suggestion status" });
    }
  });

  router.post("/generate-carpool-suggestions", async (req: Request, res: Response) => {
    try {
      const suggestions = await storage.generateCarpoolSuggestions();
      res.json(suggestions);
    } catch (error) {
      res.status(500).json({ message: "Failed to generate carpool suggestions" });
    }
  });

  // Employee Statistics API
  router.get("/employee-stats", async (req: Request, res: Response) => {
    try {
      const branch = req.query.branch as string;
      const today = new Date();
      
      let users = await storage.getUsers();
      
      if (branch && branch !== "all") {
        users = users.filter(user => user.branch === branch);
      }
      
      // Get rides for each employee
      const userStats = await Promise.all(users.map(async user => {
        const allRides = await storage.getRidesByUser(user.id);
        
        // Calculate today's rides
        const todayRides = allRides.filter(ride => {
          const rideDate = new Date(ride.startTime);
          return rideDate.toDateString() === today.toDateString();
        });
        
        // Calculate monthly rides
        const monthlyRides = allRides.filter(ride => {
          const rideDate = new Date(ride.startTime);
          return rideDate.getMonth() === today.getMonth() && 
                 rideDate.getFullYear() === today.getFullYear();
        });
        
        return {
          id: user.id,
          fullName: user.fullName,
          branch: user.branch,
          department: user.department,
          profileImage: user.profileImage,
          totalRides: allRides.length,
          ridesToday: todayRides.length,
          ridesThisMonth: monthlyRides.length
        };
      }));
      
      res.json(userStats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch employee statistics" });
    }
  });

  // Cost and Billing API
  router.get("/cost-report", async (req: Request, res: Response) => {
    try {
      const period = req.query.period as string || "monthly";
      const branch = req.query.branch as string;
      
      let rides = await storage.getRides();
      
      // Filter by branch if specified
      if (branch && branch !== "all") {
        const branches = await storage.getBranches();
        const branchId = branches.find(b => b.name === branch)?.id;
        if (branchId) {
          rides = rides.filter(ride => ride.branchId === branchId);
        }
      }
      
      // Filter by period
      const today = new Date();
      const periodRides = rides.filter(ride => {
        const rideDate = new Date(ride.startTime);
        
        if (period === "daily") {
          return rideDate.toDateString() === today.toDateString();
        } else if (period === "weekly") {
          const weekStart = new Date(today);
          weekStart.setDate(today.getDate() - today.getDay());
          weekStart.setHours(0, 0, 0, 0);
          
          const weekEnd = new Date(weekStart);
          weekEnd.setDate(weekStart.getDate() + 7);
          
          return rideDate >= weekStart && rideDate < weekEnd;
        } else { // monthly
          return rideDate.getMonth() === today.getMonth() && 
                 rideDate.getFullYear() === today.getFullYear();
        }
      });
      
      // Calculate cost by department
      const departments = [...new Set(
        (await storage.getUsers()).map(user => user.department)
      )];
      
      const departmentCosts = await Promise.all(departments.map(async department => {
        const departmentUsers = (await storage.getUsers()).filter(user => user.department === department);
        const departmentUserIds = departmentUsers.map(user => user.id);
        
        const departmentRides = periodRides.filter(ride => departmentUserIds.includes(ride.userId));
        const totalCost = departmentRides.reduce((sum, ride) => sum + (Number(ride.fare) || 0), 0);
        
        return {
          department,
          rideCount: departmentRides.length,
          totalCost
        };
      }));
      
      // Generate monthly data for chart
      const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      
      const lastSixMonths = [];
      for (let i = 5; i >= 0; i--) {
        const date = new Date();
        date.setMonth(date.getMonth() - i);
        lastSixMonths.push({
          month: monthNames[date.getMonth()],
          year: date.getFullYear()
        });
      }
      
      const chartData = await Promise.all(lastSixMonths.map(async monthData => {
        const monthRides = rides.filter(ride => {
          const rideDate = new Date(ride.startTime);
          return monthNames[rideDate.getMonth()] === monthData.month && 
                 rideDate.getFullYear() === monthData.year;
        });
        
        const monthlyCost = monthRides.reduce((sum, ride) => sum + (Number(ride.fare) || 0), 0);
        
        return {
          month: monthData.month,
          year: monthData.year,
          cost: monthlyCost
        };
      }));
      
      res.json({
        totalCost: periodRides.reduce((sum, ride) => sum + (Number(ride.fare) || 0), 0),
        averageCostPerRide: periodRides.length > 0 
          ? periodRides.reduce((sum, ride) => sum + (Number(ride.fare) || 0), 0) / periodRides.length 
          : 0,
        departmentCosts,
        chartData
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch cost report" });
    }
  });

  // Mount the router
  app.use("/api", router);

  const httpServer = createServer(app);
  return httpServer;
}
