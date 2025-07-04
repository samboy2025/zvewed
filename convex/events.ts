import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Create a new event
export const createEvent = mutation({
  args: {
    title: v.string(),
    theme: v.string(),
    date: v.string(),
    location: v.string(),
    sponsors: v.array(v.string()),
    budget: v.number(),
    description: v.optional(v.string()),
    status: v.optional(v.string()), // active, upcoming, completed
  },
  handler: async (ctx, args) => {
    const eventId = await ctx.db.insert("events", {
      ...args,
      status: args.status || "upcoming",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    return eventId;
  },
});

// Get all events
export const getAllEvents = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("events").order("desc").collect();
  },
});

// Get event by ID
export const getEventById = query({
  args: { eventId: v.id("events") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.eventId);
  },
});

// Update event
export const updateEvent = mutation({
  args: {
    eventId: v.id("events"),
    title: v.optional(v.string()),
    theme: v.optional(v.string()),
    date: v.optional(v.string()),
    location: v.optional(v.string()),
    sponsors: v.optional(v.array(v.string())),
    budget: v.optional(v.number()),
    description: v.optional(v.string()),
    status: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { eventId, ...updateData } = args;
    await ctx.db.patch(eventId, {
      ...updateData,
      updatedAt: Date.now(),
    });
  },
});

// Delete event
export const deleteEvent = mutation({
  args: { eventId: v.id("events") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.eventId);
  },
});

// Get event statistics
export const getEventStats = query({
  args: {},
  handler: async (ctx) => {
    const events = await ctx.db.query("events").collect();
    
    return {
      total: events.length,
      active: events.filter(e => e.status === "active").length,
      upcoming: events.filter(e => e.status === "upcoming").length,
      completed: events.filter(e => e.status === "completed").length,
      totalBudget: events.reduce((sum, e) => sum + (e.budget || 0), 0),
    };
  },
});
