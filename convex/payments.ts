import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Create a payment record
export const createPayment = mutation({
  args: {
    userId: v.string(),
    userType: v.string(), // participant, vendor, sponsor
    userName: v.string(),
    userEmail: v.string(),
    amount: v.number(),
    type: v.string(), // ticket, sponsorship, vendor_booth
    reference: v.string(),
    status: v.optional(v.string()), // pending, approved, rejected
    paymentMethod: v.optional(v.string()),
    receiptUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const paymentId = await ctx.db.insert("payments", {
      ...args,
      status: args.status || "pending",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    return paymentId;
  },
});

// Get all payments
export const getAllPayments = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("payments").order("desc").collect();
  },
});

// Get payments by status
export const getPaymentsByStatus = query({
  args: { status: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("payments")
      .filter((q) => q.eq(q.field("status"), args.status))
      .order("desc")
      .collect();
  },
});

// Update payment status
export const updatePaymentStatus = mutation({
  args: {
    paymentId: v.id("payments"),
    status: v.string(),
    rejectionReason: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const updateData: any = {
      status: args.status,
      updatedAt: Date.now(),
    };
    
    if (args.rejectionReason) {
      updateData.rejectionReason = args.rejectionReason;
    }
    
    if (args.status === "approved") {
      updateData.approvedAt = Date.now();
    }
    
    await ctx.db.patch(args.paymentId, updateData);
  },
});

// Get payment statistics
export const getPaymentStats = query({
  args: {},
  handler: async (ctx) => {
    const payments = await ctx.db.query("payments").collect();
    
    const stats = {
      total: payments.length,
      totalAmount: payments.reduce((sum, p) => sum + p.amount, 0),
      pending: payments.filter(p => p.status === "pending").length,
      approved: payments.filter(p => p.status === "approved").length,
      rejected: payments.filter(p => p.status === "rejected").length,
      pendingAmount: payments
        .filter(p => p.status === "pending")
        .reduce((sum, p) => sum + p.amount, 0),
      approvedAmount: payments
        .filter(p => p.status === "approved")
        .reduce((sum, p) => sum + p.amount, 0),
      rejectedAmount: payments
        .filter(p => p.status === "rejected")
        .reduce((sum, p) => sum + p.amount, 0),
      byType: {
        ticket: {
          count: payments.filter(p => p.type === "ticket").length,
          amount: payments.filter(p => p.type === "ticket").reduce((sum, p) => sum + p.amount, 0)
        },
        sponsorship: {
          count: payments.filter(p => p.type === "sponsorship").length,
          amount: payments.filter(p => p.type === "sponsorship").reduce((sum, p) => sum + p.amount, 0)
        },
        vendor_booth: {
          count: payments.filter(p => p.type === "vendor_booth").length,
          amount: payments.filter(p => p.type === "vendor_booth").reduce((sum, p) => sum + p.amount, 0)
        }
      },
      byUserType: {
        participant: {
          count: payments.filter(p => p.userType === "participant").length,
          amount: payments.filter(p => p.userType === "participant").reduce((sum, p) => sum + p.amount, 0)
        },
        vendor: {
          count: payments.filter(p => p.userType === "vendor").length,
          amount: payments.filter(p => p.userType === "vendor").reduce((sum, p) => sum + p.amount, 0)
        },
        sponsor: {
          count: payments.filter(p => p.userType === "sponsor").length,
          amount: payments.filter(p => p.userType === "sponsor").reduce((sum, p) => sum + p.amount, 0)
        }
      }
    };
    
    return stats;
  },
});

// Delete payment record
export const deletePayment = mutation({
  args: { paymentId: v.id("payments") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.paymentId);
  },
});

// Get payments missing receipts
export const getPaymentsMissingReceipts = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("payments")
      .filter((q) => 
        q.and(
          q.eq(q.field("status"), "approved"),
          q.eq(q.field("receiptUrl"), undefined)
        )
      )
      .order("desc")
      .collect();
  },
});
