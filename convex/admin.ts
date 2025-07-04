import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Get dashboard statistics
export const getDashboardStats = query({
  args: {},
  handler: async (ctx) => {
    // Get user statistics
    const users = await ctx.db.query("users").collect();
    const userStats = {
      total: users.length,
      active: users.filter(u => u.status === "active").length,
      participants: users.filter(u => u.userType === "participant").length,
      vendors: users.filter(u => u.userType === "vendor").length,
      sponsors: users.filter(u => u.userType === "sponsor").length,
      admins: users.filter(u => u.userType === "admin").length,
    };

    // Get payment statistics
    const payments = await ctx.db.query("payments").collect();
    const paymentStats = {
      total: payments.length,
      totalAmount: payments.reduce((sum, p) => sum + p.amount, 0),
      approved: payments.filter(p => p.status === "approved").length,
      pending: payments.filter(p => p.status === "pending").length,
      approvedAmount: payments
        .filter(p => p.status === "approved")
        .reduce((sum, p) => sum + p.amount, 0),
    };

    // Get registration statistics
    const registrations = await ctx.db.query("registrations").collect();
    const vendors = await ctx.db.query("vendors").collect();
    const sponsors = await ctx.db.query("sponsors").collect();

    // Get event statistics
    const events = await ctx.db.query("events").collect();
    const eventStats = {
      total: events.length,
      active: events.filter(e => e.status === "active").length,
      upcoming: events.filter(e => e.status === "upcoming").length,
    };

    // Get recent activity
    const recentUsers = users
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, 5)
      .map(u => ({
        id: u._id,
        name: `${u.firstName} ${u.lastName}`,
        email: u.email,
        type: u.userType,
        date: u.createdAt,
        action: "Registered",
      }));

    const recentPayments = payments
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, 5)
      .map(p => ({
        id: p._id,
        name: p.userName,
        email: p.userEmail,
        amount: p.amount,
        status: p.status,
        date: p.createdAt,
        action: "Payment",
      }));

    // Combine and sort recent activity
    const recentActivity = [...recentUsers, ...recentPayments]
      .sort((a, b) => b.date - a.date)
      .slice(0, 10);

    // Monthly signup data for chart
    const monthlySignups = getMonthlySignups(users);

    return {
      users: userStats,
      payments: paymentStats,
      registrations: {
        total: registrations.length + vendors.length + sponsors.length,
        participants: registrations.length,
        vendors: vendors.length,
        sponsors: sponsors.length,
      },
      events: eventStats,
      recentActivity,
      monthlySignups,
    };
  },
});

// Helper function to calculate monthly signups
function getMonthlySignups(users: any[]) {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  
  const currentYear = new Date().getFullYear();
  const monthlyData = months.map(month => ({
    name: month,
    users: 0,
    vendors: 0,
    sponsors: 0,
  }));

  users.forEach(user => {
    const date = new Date(user.createdAt);
    if (date.getFullYear() === currentYear) {
      const monthIndex = date.getMonth();
      if (user.userType === "participant") {
        monthlyData[monthIndex].users++;
      } else if (user.userType === "vendor") {
        monthlyData[monthIndex].vendors++;
      } else if (user.userType === "sponsor") {
        monthlyData[monthIndex].sponsors++;
      }
    }
  });

  return monthlyData;
}

// Get all users with detailed information
export const getAllUsersWithDetails = query({
  args: {
    searchTerm: v.optional(v.string()),
    roleFilter: v.optional(v.string()),
    statusFilter: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let users = await ctx.db.query("users").collect();
    
    // Apply filters
    if (args.searchTerm) {
      const search = args.searchTerm.toLowerCase();
      users = users.filter(user => 
        user.firstName.toLowerCase().includes(search) ||
        user.lastName.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search) ||
        (user.organization && user.organization.toLowerCase().includes(search))
      );
    }
    
    if (args.roleFilter && args.roleFilter !== "all") {
      users = users.filter(user => user.userType === args.roleFilter);
    }
    
    if (args.statusFilter && args.statusFilter !== "all") {
      users = users.filter(user => user.status === args.statusFilter);
    }
    
    // Sort by creation date (newest first)
    users.sort((a, b) => b.createdAt - a.createdAt);
    
    return users;
  },
});

// Bulk update user status
export const bulkUpdateUserStatus = mutation({
  args: {
    userIds: v.array(v.id("users")),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    for (const userId of args.userIds) {
      await ctx.db.patch(userId, { 
        status: args.status,
        updatedAt: Date.now() 
      });
    }
    return { success: true, count: args.userIds.length };
  },
});

// Get payment analytics
export const getPaymentAnalytics = query({
  args: {
    startDate: v.optional(v.number()),
    endDate: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let payments = await ctx.db.query("payments").collect();
    
    // Filter by date range if provided
    if (args.startDate) {
      payments = payments.filter(p => p.createdAt >= args.startDate!);
    }
    if (args.endDate) {
      payments = payments.filter(p => p.createdAt <= args.endDate!);
    }
    
    // Calculate analytics
    const byType = {
      ticket: payments.filter(p => p.type === "ticket"),
      sponsorship: payments.filter(p => p.type === "sponsorship"),
      vendor_booth: payments.filter(p => p.type === "vendor_booth"),
    };
    
    const byStatus = {
      approved: payments.filter(p => p.status === "approved"),
      pending: payments.filter(p => p.status === "pending"),
      rejected: payments.filter(p => p.status === "rejected"),
    };
    
    // Daily revenue for the last 30 days
    const dailyRevenue = calculateDailyRevenue(payments);
    
    return {
      summary: {
        totalPayments: payments.length,
        totalRevenue: payments.reduce((sum, p) => sum + p.amount, 0),
        approvedRevenue: byStatus.approved.reduce((sum, p) => sum + p.amount, 0),
        pendingRevenue: byStatus.pending.reduce((sum, p) => sum + p.amount, 0),
      },
      byType: {
        ticket: {
          count: byType.ticket.length,
          amount: byType.ticket.reduce((sum, p) => sum + p.amount, 0),
        },
        sponsorship: {
          count: byType.sponsorship.length,
          amount: byType.sponsorship.reduce((sum, p) => sum + p.amount, 0),
        },
        vendor_booth: {
          count: byType.vendor_booth.length,
          amount: byType.vendor_booth.reduce((sum, p) => sum + p.amount, 0),
        },
      },
      byStatus: {
        approved: {
          count: byStatus.approved.length,
          amount: byStatus.approved.reduce((sum, p) => sum + p.amount, 0),
        },
        pending: {
          count: byStatus.pending.length,
          amount: byStatus.pending.reduce((sum, p) => sum + p.amount, 0),
        },
        rejected: {
          count: byStatus.rejected.length,
          amount: byStatus.rejected.reduce((sum, p) => sum + p.amount, 0),
        },
      },
      dailyRevenue,
    };
  },
});

// Helper function to calculate daily revenue
function calculateDailyRevenue(payments: any[]) {
  const last30Days = new Date();
  last30Days.setDate(last30Days.getDate() - 30);
  
  const dailyData: { [key: string]: number } = {};
  
  payments
    .filter(p => p.status === "approved" && p.createdAt >= last30Days.getTime())
    .forEach(payment => {
      const date = new Date(payment.createdAt).toISOString().split('T')[0];
      dailyData[date] = (dailyData[date] || 0) + payment.amount;
    });
  
  // Fill in missing days with 0
  const result = [];
  for (let i = 0; i < 30; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    result.unshift({
      date: dateStr,
      amount: dailyData[dateStr] || 0,
    });
  }
  
  return result;
}

// Get event participants
export const getEventParticipants = query({
  args: {
    eventId: v.optional(v.id("events")),
  },
  handler: async (ctx, args) => {
    const registrations = await ctx.db.query("registrations").collect();
    const vendors = await ctx.db.query("vendors").collect();
    const sponsors = await ctx.db.query("sponsors").collect();
    
    return {
      participants: registrations.map(r => ({
        ...r,
        type: "participant",
        name: `${r.firstName} ${r.lastName}`,
      })),
      vendors: vendors.map(v => ({
        ...v,
        type: "vendor",
        name: v.contactPerson,
      })),
      sponsors: sponsors.map(s => ({
        ...s,
        type: "sponsor",
        name: s.contactPerson,
      })),
      total: registrations.length + vendors.length + sponsors.length,
    };
  },
});

// System settings and configuration
export const getSystemSettings = query({
  args: {},
  handler: async (ctx) => {
    // This could be expanded to include actual system settings from a settings table
    return {
      eventName: "World Entrepreneurship Day 4.0",
      eventDate: "October 4, 2025",
      eventLocation: "Zaria, Kaduna State",
      registrationOpen: true,
      paymentEnabled: true,
      maintenanceMode: false,
    };
  },
});

// Audit log for admin actions
export const logAdminAction = mutation({
  args: {
    adminId: v.id("users"),
    action: v.string(),
    targetType: v.string(),
    targetId: v.optional(v.string()),
    details: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // In a real application, you would create an audit_logs table
    // For now, we'll just return success
    console.log("Admin action logged:", args);
    return { success: true };
  },
});

// Update admin profile
export const updateAdminProfile = mutation({
  args: {
    userId: v.id("users"),
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    organization: v.optional(v.string()),
    position: v.optional(v.string()),
    city: v.optional(v.string()),
    state: v.optional(v.string()),
    bio: v.optional(v.string()),
    website: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { userId, ...updateData } = args;
    
    // Verify the user exists and is an admin
    const user = await ctx.db.get(userId);
    if (!user) {
      throw new Error("User not found");
    }
    
    if (user.userType !== "admin") {
      throw new Error("Unauthorized: User is not an admin");
    }
    
    // Update the user profile
    await ctx.db.patch(userId, {
      ...updateData,
      updatedAt: Date.now(),
    });
    
    // Return the updated user
    const updatedUser = await ctx.db.get(userId);
    return updatedUser;
  },
});

// Get admin profile by ID
export const getAdminProfile = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);
    
    if (!user) {
      return null;
    }
    
    if (user.userType !== "admin") {
      throw new Error("Unauthorized: User is not an admin");
    }
    
    return user;
  },
});
