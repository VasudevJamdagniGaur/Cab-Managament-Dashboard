import { pgTable, text, serial, integer, timestamp, decimal, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  role: text("role").notNull().default("user"),
  branch: text("branch"),
  department: text("department"),
  profileImage: text("profile_image"),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
});

// Branch schema
export const branches = pgTable("branches", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  location: text("location").notNull(),
  address: text("address").notNull(),
});

export const insertBranchSchema = createInsertSchema(branches).omit({
  id: true,
});

// Driver schema
export const drivers = pgTable("drivers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  licenseNumber: text("license_number").notNull(),
  rating: decimal("rating", { precision: 3, scale: 2 }).default("0"),
  profileImage: text("profile_image"),
  status: text("status").default("available"),
});

export const insertDriverSchema = createInsertSchema(drivers).omit({
  id: true,
  rating: true,
});

// Cab schema
export const cabs = pgTable("cabs", {
  id: serial("id").primaryKey(),
  number: text("number").notNull().unique(),
  model: text("model").notNull(),
  color: text("color").notNull(),
  capacity: integer("capacity").notNull(),
  driverId: integer("driver_id").references(() => drivers.id),
  status: text("status").default("available"),
});

export const insertCabSchema = createInsertSchema(cabs).omit({
  id: true,
});

// Ride schema
export const rides = pgTable("rides", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  cabId: integer("cab_id").references(() => cabs.id),
  startLocation: text("start_location").notNull(),
  endLocation: text("end_location").notNull(),
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time"),
  status: text("status").notNull().default("scheduled"),
  fare: decimal("fare", { precision: 10, scale: 2 }),
  branchId: integer("branch_id").references(() => branches.id),
  distance: decimal("distance", { precision: 10, scale: 2 }),
  isCarpool: boolean("is_carpool").default(false),
  carpoolGroupId: integer("carpool_group_id"),
});

export const insertRideSchema = createInsertSchema(rides).omit({
  id: true,
  endTime: true,
  fare: true,
  status: true,
});

// Reviews schema
export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  rideId: integer("ride_id").references(() => rides.id),
  userId: integer("user_id").references(() => users.id),
  rating: integer("rating").notNull(),
  comment: text("comment"),
  createdAt: timestamp("created_at").defaultNow(),
  isFlagged: boolean("is_flagged").default(false),
});

export const insertReviewSchema = createInsertSchema(reviews).omit({
  id: true,
  createdAt: true,
  isFlagged: true,
});

// Carpooling suggestions schema
export const carpoolSuggestions = pgTable("carpool_suggestions", {
  id: serial("id").primaryKey(),
  ride1Id: integer("ride1_id").references(() => rides.id),
  ride2Id: integer("ride2_id").references(() => rides.id),
  savingsAmount: decimal("savings_amount", { precision: 10, scale: 2 }),
  status: text("status").default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertCarpoolSuggestionSchema = createInsertSchema(carpoolSuggestions).omit({
  id: true,
  createdAt: true,
});

// Define types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Branch = typeof branches.$inferSelect;
export type InsertBranch = z.infer<typeof insertBranchSchema>;

export type Driver = typeof drivers.$inferSelect;
export type InsertDriver = z.infer<typeof insertDriverSchema>;

export type Cab = typeof cabs.$inferSelect;
export type InsertCab = z.infer<typeof insertCabSchema>;

export type Ride = typeof rides.$inferSelect;
export type InsertRide = z.infer<typeof insertRideSchema>;

export type Review = typeof reviews.$inferSelect;
export type InsertReview = z.infer<typeof insertReviewSchema>;

export type CarpoolSuggestion = typeof carpoolSuggestions.$inferSelect;
export type InsertCarpoolSuggestion = z.infer<typeof insertCarpoolSuggestionSchema>;
