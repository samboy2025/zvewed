import { mutation } from "./_generated/server";
import { v } from "convex/values";

// Seed admin user
export const seedAdminUser = mutation({
  args: {},
  handler: async (ctx) => {
    // Check if admin already exists
    const existingAdmin = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), "admin@wed4.com"))
      .first();
    
    if (existingAdmin) {
      return { message: "Admin user already exists", userId: existingAdmin._id };
    }

    // Create admin user
    const adminId = await ctx.db.insert("users", {
      firstName: "Admin",
      lastName: "WED4",
      email: "admin@wed4.com",
      password: "Admin@2025", // In production, this should be hashed
      phone: "+2348012345678",
      organization: "World Entrepreneurship Day",
      position: "System Administrator",
      city: "Zaria",
      state: "Kaduna",
      userType: "admin",
      status: "active",
      agreeToTerms: true,
      agreeToMarketing: false,
      createdAt: Date.now(),
      eventId: "wed-admin",
      imageUrl: undefined,
    });

    // Create additional admin users
    const admin2Id = await ctx.db.insert("users", {
      firstName: "Sarah",
      lastName: "Johnson",
      email: "sarah.admin@wed4.com",
      password: "Sarah@2025",
      phone: "+2348023456789",
      organization: "World Entrepreneurship Day",
      position: "Event Coordinator",
      city: "Abuja",
      state: "FCT",
      userType: "admin",
      status: "active",
      agreeToTerms: true,
      agreeToMarketing: false,
      createdAt: Date.now(),
      eventId: "wed-admin",
    });

    // Create sample event
    const eventId = await ctx.db.insert("events", {
      title: "World Entrepreneurship Day 4.0",
      theme: "Rebuild, Reinvent, Rise",
      date: "October 4, 2025",
      location: "Zaria, Kaduna State",
      sponsors: ["Tech Corp", "Innovation Hub", "Business Leaders Forum"],
      budget: 15000000,
      description: "Join 400+ entrepreneurs for a transformative experience focused on economic resilience and sustainable growth.",
      status: "upcoming",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    // Create sample users for testing
    const users = [
      {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        password: "password123",
        phone: "+2348034567890",
        organization: "Tech Startup Inc",
        position: "CEO",
        city: "Lagos",
        state: "Lagos",
        userType: "participant",
        status: "active",
      },
      {
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.smith@example.com",
        password: "password123",
        phone: "+2348045678901",
        organization: "Innovation Labs",
        position: "CTO",
        city: "Abuja",
        state: "FCT",
        userType: "participant",
        status: "active",
      },
      {
        firstName: "Mike",
        lastName: "Johnson",
        email: "mike@techvendor.com",
        password: "password123",
        phone: "+2348056789012",
        organization: "Tech Vendor Solutions",
        position: "Sales Manager",
        city: "Port Harcourt",
        state: "Rivers",
        userType: "vendor",
        status: "active",
      },
      {
        firstName: "Emily",
        lastName: "Brown",
        email: "emily@sponsor.com",
        password: "password123",
        phone: "+2348067890123",
        organization: "Corporate Sponsors Ltd",
        position: "Marketing Director",
        city: "Kano",
        state: "Kano",
        userType: "sponsor",
        status: "active",
      },
    ];

    // Insert sample users
    for (const user of users) {
      await ctx.db.insert("users", {
        ...user,
        agreeToTerms: true,
        agreeToMarketing: true,
        createdAt: Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000), // Random date within last 30 days
        eventId: "wed-4.0",
      });
    }

    // Create sample payments
    const payments = [
      {
        userId: adminId,
        userType: "participant",
        userName: "John Doe",
        userEmail: "john.doe@example.com",
        amount: 25000,
        type: "ticket",
        reference: "PAY-2025-001",
        status: "approved",
        paymentMethod: "Bank Transfer",
        createdAt: Date.now() - 5 * 24 * 60 * 60 * 1000,
        updatedAt: Date.now() - 5 * 24 * 60 * 60 * 1000,
        approvedAt: Date.now() - 4 * 24 * 60 * 60 * 1000,
      },
      {
        userId: admin2Id,
        userType: "vendor",
        userName: "Tech Vendor Solutions",
        userEmail: "mike@techvendor.com",
        amount: 150000,
        type: "vendor_booth",
        reference: "PAY-2025-002",
        status: "pending",
        paymentMethod: "Online Payment",
        createdAt: Date.now() - 2 * 24 * 60 * 60 * 1000,
        updatedAt: Date.now() - 2 * 24 * 60 * 60 * 1000,
      },
      {
        userId: adminId,
        userType: "sponsor",
        userName: "Corporate Sponsors Ltd",
        userEmail: "emily@sponsor.com",
        amount: 500000,
        type: "sponsorship",
        reference: "PAY-2025-003",
        status: "approved",
        paymentMethod: "Bank Transfer",
        createdAt: Date.now() - 10 * 24 * 60 * 60 * 1000,
        updatedAt: Date.now() - 10 * 24 * 60 * 60 * 1000,
        approvedAt: Date.now() - 9 * 24 * 60 * 60 * 1000,
      },
    ];

    // Insert sample payments
    for (const payment of payments) {
      await ctx.db.insert("payments", payment);
    }

    return {
      message: "Admin data seeded successfully",
      adminUsers: [
        {
          email: "admin@wed4.com",
          password: "Admin@2025",
          role: "Super Admin"
        },
        {
          email: "sarah.admin@wed4.com",
          password: "Sarah@2025",
          role: "Event Coordinator"
        }
      ],
      testUsers: [
        {
          email: "john.doe@example.com",
          password: "password123",
          role: "Participant"
        },
        {
          email: "mike@techvendor.com",
          password: "password123",
          role: "Vendor"
        },
        {
          email: "emily@sponsor.com",
          password: "password123",
          role: "Sponsor"
        }
      ]
    };
  },
});

// Clear all data (use with caution!)
export const clearAllData = mutation({
  args: {},
  handler: async (ctx) => {
    // Get all users
    const users = await ctx.db.query("users").collect();
    for (const user of users) {
      await ctx.db.delete(user._id);
    }

    // Get all payments
    const payments = await ctx.db.query("payments").collect();
    for (const payment of payments) {
      await ctx.db.delete(payment._id);
    }

    // Get all events
    const events = await ctx.db.query("events").collect();
    for (const event of events) {
      await ctx.db.delete(event._id);
    }

    return { message: "All data cleared" };
  },
});
