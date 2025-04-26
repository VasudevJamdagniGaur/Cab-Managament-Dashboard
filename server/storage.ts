import {
  users, User, InsertUser,
  branches, Branch, InsertBranch,
  drivers, Driver, InsertDriver,
  cabs, Cab, InsertCab,
  rides, Ride, InsertRide,
  reviews, Review, InsertReview,
  carpoolSuggestions, CarpoolSuggestion, InsertCarpoolSuggestion
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getUsers(): Promise<User[]>;
  getUsersByBranch(branchId: number): Promise<User[]>;

  // Branch methods
  getBranch(id: number): Promise<Branch | undefined>;
  getBranches(): Promise<Branch[]>;
  createBranch(branch: InsertBranch): Promise<Branch>;

  // Driver methods
  getDriver(id: number): Promise<Driver | undefined>;
  getDrivers(): Promise<Driver[]>;
  createDriver(driver: InsertDriver): Promise<Driver>;
  updateDriverStatus(id: number, status: string): Promise<Driver | undefined>;

  // Cab methods
  getCab(id: number): Promise<Cab | undefined>;
  getCabs(): Promise<Cab[]>;
  createCab(cab: InsertCab): Promise<Cab>;
  updateCabStatus(id: number, status: string): Promise<Cab | undefined>;

  // Ride methods
  getRide(id: number): Promise<Ride | undefined>;
  getRides(): Promise<Ride[]>;
  getRidesByUser(userId: number): Promise<Ride[]>;
  getRidesByBranch(branchId: number): Promise<Ride[]>;
  getRidesByStatus(status: string): Promise<Ride[]>;
  getRidesByDate(date: Date): Promise<Ride[]>;
  createRide(ride: InsertRide): Promise<Ride>;
  updateRideStatus(id: number, status: string): Promise<Ride | undefined>;
  completeRide(id: number, endTime: Date, fare: number): Promise<Ride | undefined>;

  // Review methods
  getReview(id: number): Promise<Review | undefined>;
  getReviews(): Promise<Review[]>;
  getReviewsByUser(userId: number): Promise<Review[]>;
  getReviewsByRating(rating: number): Promise<Review[]>;
  getFlaggedReviews(): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;
  flagReview(id: number): Promise<Review | undefined>;

  // Carpool methods
  getCarpoolSuggestion(id: number): Promise<CarpoolSuggestion | undefined>;
  getCarpoolSuggestions(): Promise<CarpoolSuggestion[]>;
  createCarpoolSuggestion(suggestion: InsertCarpoolSuggestion): Promise<CarpoolSuggestion>;
  updateCarpoolSuggestionStatus(id: number, status: string): Promise<CarpoolSuggestion | undefined>;
  generateCarpoolSuggestions(): Promise<CarpoolSuggestion[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private branches: Map<number, Branch>;
  private drivers: Map<number, Driver>;
  private cabs: Map<number, Cab>;
  private rides: Map<number, Ride>;
  private reviews: Map<number, Review>;
  private carpoolSuggestions: Map<number, CarpoolSuggestion>;

  private userIdCounter: number;
  private branchIdCounter: number;
  private driverIdCounter: number;
  private cabIdCounter: number;
  private rideIdCounter: number;
  private reviewIdCounter: number;
  private carpoolSuggestionIdCounter: number;

  constructor() {
    this.users = new Map();
    this.branches = new Map();
    this.drivers = new Map();
    this.cabs = new Map();
    this.rides = new Map();
    this.reviews = new Map();
    this.carpoolSuggestions = new Map();

    this.userIdCounter = 1;
    this.branchIdCounter = 1;
    this.driverIdCounter = 1;
    this.cabIdCounter = 1;
    this.rideIdCounter = 1;
    this.reviewIdCounter = 1;
    this.carpoolSuggestionIdCounter = 1;

    // Initialize with some data
    this.initializeSampleData();
  }

  // User Methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async getUsersByBranch(branchId: number): Promise<User[]> {
    return Array.from(this.users.values()).filter(
      (user) => user.branch === this.branches.get(branchId)?.name
    );
  }

  // Branch Methods
  async getBranch(id: number): Promise<Branch | undefined> {
    return this.branches.get(id);
  }

  async getBranches(): Promise<Branch[]> {
    return Array.from(this.branches.values());
  }

  async createBranch(insertBranch: InsertBranch): Promise<Branch> {
    const id = this.branchIdCounter++;
    const branch: Branch = { ...insertBranch, id };
    this.branches.set(id, branch);
    return branch;
  }

  // Driver Methods
  async getDriver(id: number): Promise<Driver | undefined> {
    return this.drivers.get(id);
  }

  async getDrivers(): Promise<Driver[]> {
    return Array.from(this.drivers.values());
  }

  async createDriver(insertDriver: InsertDriver): Promise<Driver> {
    const id = this.driverIdCounter++;
    const driver: Driver = { ...insertDriver, id, rating: 0 };
    this.drivers.set(id, driver);
    return driver;
  }

  async updateDriverStatus(id: number, status: string): Promise<Driver | undefined> {
    const driver = this.drivers.get(id);
    if (driver) {
      const updatedDriver = { ...driver, status };
      this.drivers.set(id, updatedDriver);
      return updatedDriver;
    }
    return undefined;
  }

  // Cab Methods
  async getCab(id: number): Promise<Cab | undefined> {
    return this.cabs.get(id);
  }

  async getCabs(): Promise<Cab[]> {
    return Array.from(this.cabs.values());
  }

  async createCab(insertCab: InsertCab): Promise<Cab> {
    const id = this.cabIdCounter++;
    const cab: Cab = { ...insertCab, id };
    this.cabs.set(id, cab);
    return cab;
  }

  async updateCabStatus(id: number, status: string): Promise<Cab | undefined> {
    const cab = this.cabs.get(id);
    if (cab) {
      const updatedCab = { ...cab, status };
      this.cabs.set(id, updatedCab);
      return updatedCab;
    }
    return undefined;
  }

  // Ride Methods
  async getRide(id: number): Promise<Ride | undefined> {
    return this.rides.get(id);
  }

  async getRides(): Promise<Ride[]> {
    return Array.from(this.rides.values());
  }

  async getRidesByUser(userId: number): Promise<Ride[]> {
    return Array.from(this.rides.values()).filter(
      (ride) => ride.userId === userId
    );
  }

  async getRidesByBranch(branchId: number): Promise<Ride[]> {
    return Array.from(this.rides.values()).filter(
      (ride) => ride.branchId === branchId
    );
  }

  async getRidesByStatus(status: string): Promise<Ride[]> {
    return Array.from(this.rides.values()).filter(
      (ride) => ride.status === status
    );
  }

  async getRidesByDate(date: Date): Promise<Ride[]> {
    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);
    
    const nextDay = new Date(targetDate);
    nextDay.setDate(nextDay.getDate() + 1);
    
    return Array.from(this.rides.values()).filter(ride => {
      const rideDate = new Date(ride.startTime);
      return rideDate >= targetDate && rideDate < nextDay;
    });
  }

  async createRide(insertRide: InsertRide): Promise<Ride> {
    const id = this.rideIdCounter++;
    const ride: Ride = { 
      ...insertRide, 
      id, 
      status: "scheduled", 
      fare: 0, 
      endTime: null,
      distance: 0,
      isCarpool: false,
      carpoolGroupId: null
    };
    this.rides.set(id, ride);
    return ride;
  }

  async updateRideStatus(id: number, status: string): Promise<Ride | undefined> {
    const ride = this.rides.get(id);
    if (ride) {
      const updatedRide = { ...ride, status };
      this.rides.set(id, updatedRide);
      return updatedRide;
    }
    return undefined;
  }

  async completeRide(id: number, endTime: Date, fare: number): Promise<Ride | undefined> {
    const ride = this.rides.get(id);
    if (ride) {
      const updatedRide = { 
        ...ride, 
        status: "completed", 
        endTime, 
        fare 
      };
      this.rides.set(id, updatedRide);
      return updatedRide;
    }
    return undefined;
  }

  // Review Methods
  async getReview(id: number): Promise<Review | undefined> {
    return this.reviews.get(id);
  }

  async getReviews(): Promise<Review[]> {
    return Array.from(this.reviews.values());
  }

  async getReviewsByUser(userId: number): Promise<Review[]> {
    return Array.from(this.reviews.values()).filter(
      (review) => review.userId === userId
    );
  }

  async getReviewsByRating(rating: number): Promise<Review[]> {
    return Array.from(this.reviews.values()).filter(
      (review) => review.rating === rating
    );
  }

  async getFlaggedReviews(): Promise<Review[]> {
    return Array.from(this.reviews.values()).filter(
      (review) => review.isFlagged
    );
  }

  async createReview(insertReview: InsertReview): Promise<Review> {
    const id = this.reviewIdCounter++;
    const review: Review = { 
      ...insertReview, 
      id, 
      createdAt: new Date(), 
      isFlagged: false 
    };
    this.reviews.set(id, review);
    return review;
  }

  async flagReview(id: number): Promise<Review | undefined> {
    const review = this.reviews.get(id);
    if (review) {
      const updatedReview = { ...review, isFlagged: true };
      this.reviews.set(id, updatedReview);
      return updatedReview;
    }
    return undefined;
  }

  // Carpool Methods
  async getCarpoolSuggestion(id: number): Promise<CarpoolSuggestion | undefined> {
    return this.carpoolSuggestions.get(id);
  }

  async getCarpoolSuggestions(): Promise<CarpoolSuggestion[]> {
    return Array.from(this.carpoolSuggestions.values());
  }

  async createCarpoolSuggestion(insertSuggestion: InsertCarpoolSuggestion): Promise<CarpoolSuggestion> {
    const id = this.carpoolSuggestionIdCounter++;
    const suggestion: CarpoolSuggestion = { 
      ...insertSuggestion, 
      id, 
      createdAt: new Date()
    };
    this.carpoolSuggestions.set(id, suggestion);
    return suggestion;
  }

  async updateCarpoolSuggestionStatus(id: number, status: string): Promise<CarpoolSuggestion | undefined> {
    const suggestion = this.carpoolSuggestions.get(id);
    if (suggestion) {
      const updatedSuggestion = { ...suggestion, status };
      this.carpoolSuggestions.set(id, updatedSuggestion);
      return updatedSuggestion;
    }
    return undefined;
  }

  // Generate carpool suggestions based on proximity of pickup and drop locations
  async generateCarpoolSuggestions(): Promise<CarpoolSuggestion[]> {
    const pendingRides = Array.from(this.rides.values()).filter(
      (ride) => ride.status === "scheduled"
    );
    
    const newSuggestions: CarpoolSuggestion[] = [];
    
    // Simple algorithm to find rides with similar start and end locations
    for (let i = 0; i < pendingRides.length; i++) {
      for (let j = i + 1; j < pendingRides.length; j++) {
        const ride1 = pendingRides[i];
        const ride2 = pendingRides[j];
        
        // Check if rides are eligible for carpooling (same branch, close timing, etc.)
        const startTime1 = new Date(ride1.startTime).getTime();
        const startTime2 = new Date(ride2.startTime).getTime();
        const timeDiff = Math.abs(startTime1 - startTime2) / (1000 * 60); // Difference in minutes
        
        if (ride1.branchId === ride2.branchId && timeDiff <= 30) { // Same branch and within 30 min
          // Calculate similarity of start and end locations (simplified)
          // In a real system, you would use geolocation coordinates
          const isSimilarStart = this.areLocationsClose(ride1.startLocation, ride2.startLocation);
          const isSimilarEnd = this.areLocationsClose(ride1.endLocation, ride2.endLocation);
          
          if (isSimilarStart && isSimilarEnd) {
            // Create a carpool suggestion
            const savingsAmount = 350 + Math.floor(Math.random() * 200); // Random savings between 350-550
            
            const suggestion: InsertCarpoolSuggestion = {
              ride1Id: ride1.id,
              ride2Id: ride2.id,
              savingsAmount,
              status: "pending"
            };
            
            const createdSuggestion = await this.createCarpoolSuggestion(suggestion);
            newSuggestions.push(createdSuggestion);
          }
        }
      }
    }
    
    return newSuggestions;
  }

  // Helper method to check if locations are close (simplified)
  private areLocationsClose(loc1: string, loc2: string): boolean {
    const loc1Parts = loc1.toLowerCase().split(',').map(p => p.trim());
    const loc2Parts = loc2.toLowerCase().split(',').map(p => p.trim());
    
    // Check if any part of the location matches
    return loc1Parts.some(p1 => loc2Parts.some(p2 => 
      p1 === p2 || p1.includes(p2) || p2.includes(p1)
    ));
  }

  // Initialize with sample data
  private initializeSampleData() {
    // Add sample branches
    const branches: InsertBranch[] = [
      { name: "Delhi", location: "New Delhi", address: "123 Main Street, New Delhi" },
      { name: "Mumbai", location: "Mumbai", address: "456 Ocean View, Mumbai" },
      { name: "Bangalore", location: "Bangalore", address: "789 Tech Park, Bangalore" },
      { name: "Hyderabad", location: "Hyderabad", address: "101 Cyber Tower, Hyderabad" }
    ];
    
    branches.forEach(branch => this.createBranch(branch));
    
    // Add sample users
    const users: InsertUser[] = [
      { 
        username: "admin", 
        password: "admin123", 
        fullName: "Vasudev", 
        email: "vasudev@norimono.com", 
        role: "admin", 
        branch: "Delhi", 
        department: "Administration",
        profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
      },
      { 
        username: "priya", 
        password: "priya123", 
        fullName: "Priya Sharma", 
        email: "priya@corpcab.com", 
        role: "user", 
        branch: "Delhi", 
        department: "Sales",
        profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
      },
      { 
        username: "rajiv", 
        password: "rajiv123", 
        fullName: "Rajiv Kumar", 
        email: "rajiv@corpcab.com", 
        role: "user", 
        branch: "Mumbai", 
        department: "Marketing",
        profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
      },
      { 
        username: "neha", 
        password: "neha123", 
        fullName: "Neha Gupta", 
        email: "neha@corpcab.com", 
        role: "user", 
        branch: "Bangalore", 
        department: "HR",
        profileImage: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e"
      },
      { 
        username: "amit", 
        password: "amit123", 
        fullName: "Amit Singh", 
        email: "amit@corpcab.com", 
        role: "user", 
        branch: "Delhi", 
        department: "Finance",
        profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
      }
    ];
    
    users.forEach(user => this.createUser(user));
    
    // Add sample drivers
    const drivers: InsertDriver[] = [
      {
        name: "Vikram Singh",
        phone: "9876543210",
        licenseNumber: "DL1234567890",
        profileImage: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c",
        status: "on_trip"
      },
      {
        name: "Rahul Verma",
        phone: "9876543211",
        licenseNumber: "DL1234567891",
        profileImage: "https://images.unsplash.com/photo-1531384441138-2736e62e0919",
        status: "available"
      },
      {
        name: "Anil Kumar",
        phone: "9876543212",
        licenseNumber: "DL1234567892",
        profileImage: "https://images.unsplash.com/photo-1504593811423-6dd665756598",
        status: "available"
      }
    ];
    
    drivers.forEach(driver => this.createDriver(driver));
    
    // Add sample cabs
    const cabs: InsertCab[] = [
      {
        number: "DL 01 AB 1234",
        model: "Toyota Innova",
        color: "White",
        capacity: 6,
        driverId: 1,
        status: "on_trip"
      },
      {
        number: "MH 02 XY 5678",
        model: "Maruti Swift Dzire",
        color: "Silver",
        capacity: 4,
        driverId: 2,
        status: "available"
      },
      {
        number: "KA 03 CD 9012",
        model: "Honda City",
        color: "Black",
        capacity: 4,
        driverId: 3,
        status: "available"
      }
    ];
    
    cabs.forEach(cab => this.createCab(cab));
    
    // Add sample rides
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const rides: InsertRide[] = [
      {
        userId: 2,
        cabId: 1,
        startLocation: "Home, Dwarka, New Delhi",
        endLocation: "Cyber City, Gurugram",
        startTime: new Date(now.setHours(9, 30, 0, 0)),
        branchId: 1,
        distance: 25.5,
        isCarpool: false,
        carpoolGroupId: null
      },
      {
        userId: 3,
        cabId: 2,
        startLocation: "Home, Andheri, Mumbai",
        endLocation: "Office, Bandra Kurla Complex, Mumbai",
        startTime: new Date(now.setHours(10, 15, 0, 0)),
        branchId: 2,
        distance: 15.8,
        isCarpool: false,
        carpoolGroupId: null
      },
      {
        userId: 4,
        cabId: 3,
        startLocation: "Home, Whitefield, Bangalore",
        endLocation: "Office, Electronic City, Bangalore",
        startTime: new Date(now.setHours(11, 45, 0, 0)),
        branchId: 3,
        distance: 18.2,
        isCarpool: false,
        carpoolGroupId: null
      },
      {
        userId: 2,
        cabId: 1,
        startLocation: "Home, Dwarka, New Delhi",
        endLocation: "Office, Connaught Place, New Delhi",
        startTime: new Date(tomorrow.setHours(9, 0, 0, 0)),
        branchId: 1,
        distance: 22.7,
        isCarpool: false,
        carpoolGroupId: null
      },
      {
        userId: 5,
        cabId: 1,
        startLocation: "Home, Vaishali, Ghaziabad",
        endLocation: "Office, Noida Sector 62",
        startTime: new Date(tomorrow.setHours(9, 15, 0, 0)),
        branchId: 1,
        distance: 12.3,
        isCarpool: false,
        carpoolGroupId: null
      }
    ];
    
    rides.forEach(ride => this.createRide(ride));
    
    // Update status of some rides
    this.updateRideStatus(1, "on_trip");
    
    // Add sample reviews
    const reviews: InsertReview[] = [
      {
        rideId: 1,
        userId: 2,
        rating: 5,
        comment: "Great service! Driver was on time and very professional. The cab was clean and comfortable."
      },
      {
        rideId: 2,
        userId: 3,
        rating: 4,
        comment: "Driver arrived a bit late, but the ride was good. The cab was nice and I reached my destination on time."
      },
      {
        rideId: 3,
        userId: 4,
        rating: 4.5,
        comment: "Excellent experience! The driver was courteous and the cab was clean. Would highly recommend."
      }
    ];
    
    reviews.forEach(review => this.createReview(review));
    
    // Generate carpool suggestions
    this.generateCarpoolSuggestions();
  }
}

export const storage = new MemStorage();
