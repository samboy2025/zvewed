import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  registrations: defineTable({
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    phone: v.string(),
    organization: v.optional(v.string()),
    position: v.optional(v.string()),
    city: v.optional(v.string()),
    state: v.optional(v.string()),
    industry: v.optional(v.string()),
    experience: v.optional(v.string()),
    bio: v.optional(v.string()),
    website: v.optional(v.string()),
    agreeToTerms: v.boolean(),
    agreeToMarketing: v.boolean(),
    createdAt: v.number(),
    status: v.string(), // pending, approved, rejected
    paymentStatus: v.string(), // unpaid, pending, paid
    eventId: v.string(),
    category: v.string(),
    interests: v.array(v.string()),
    expectations: v.optional(v.string()),
    dietaryRestrictions: v.optional(v.string()),
  }),
  
  sponsors: defineTable({
    organizationName: v.string(),
    contactPerson: v.string(),
    position: v.string(),
    email: v.string(),
    phone: v.string(),
    website: v.optional(v.string()),
    address: v.string(),
    city: v.string(),
    state: v.string(),
    organizationType: v.string(),
    industry: v.string(),
    sponsorshipLevel: v.string(),
    sponsorshipAmount: v.string(),
    marketingObjectives: v.optional(v.string()),
    targetAudience: v.optional(v.string()),
    previousSponsorship: v.optional(v.string()),
    specialRequests: v.optional(v.string()),
    logoFile: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    marketingMaterials: v.optional(v.string()),
    speakerNomination: v.optional(v.string()),
    networkingPreferences: v.optional(v.string()),
    agreeToTerms: v.boolean(),
    agreeToMarketing: v.boolean(),
    createdAt: v.number(),
    status: v.string(), // pending, approved, rejected
    paymentStatus: v.string(), // unpaid, pending, paid
    paymentReceipt: v.optional(v.string()),
    paymentDetails: v.optional(v.object({
      amount: v.number(),
      paymentMethod: v.string(),
      referenceNumber: v.string(),
      paymentDate: v.string(),
      bankName: v.optional(v.string()),
    })),
    paymentSubmittedAt: v.optional(v.number()),
    eventId: v.string(),
  }),
  
  vendors: defineTable({
    companyName: v.string(),
    contactPerson: v.string(),
    email: v.string(),
    phone: v.string(),
    website: v.optional(v.string()),
    address: v.string(),
    city: v.string(),
    state: v.string(),
    businessType: v.string(),
    industry: v.string(),
    yearsInBusiness: v.string(),
    productServices: v.string(),
    targetAudience: v.optional(v.string()),
    boothSize: v.string(),
    specialRequirements: v.optional(v.string()),
    marketingMaterials: v.optional(v.string()),
    previousExperience: v.optional(v.string()),
    objectives: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    agreeToTerms: v.boolean(),
    agreeToMarketing: v.boolean(),
    createdAt: v.number(),
    status: v.string(), // pending, approved, rejected
    paymentStatus: v.string(), // unpaid, pending, paid
    paymentReceipt: v.optional(v.string()),
    paymentDetails: v.optional(v.object({
      amount: v.number(),
      paymentMethod: v.string(),
      referenceNumber: v.string(),
      paymentDate: v.string(),
      bankName: v.optional(v.string()),
    })),
    paymentSubmittedAt: v.optional(v.number()),
    eventId: v.string(),
  }),
  
  users: defineTable({
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    organization: v.optional(v.string()),
    position: v.optional(v.string()),
    city: v.optional(v.string()),
    state: v.optional(v.string()),
    industry: v.optional(v.string()),
    experience: v.optional(v.string()),
    bio: v.optional(v.string()),
    website: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    userType: v.string(), // participant, admin, speaker, vendor, sponsor
    agreeToTerms: v.boolean(),
    agreeToMarketing: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.optional(v.number()),
    status: v.string(), // active, inactive, suspended
    lastLogin: v.optional(v.number()),
    eventId: v.string(),
    password: v.optional(v.string()), // For authentication
    paymentStatus: v.optional(v.string()), // unpaid, pending, approved, rejected
    paymentAmount: v.optional(v.number()), // Required payment amount based on user type
    paymentReceipt: v.optional(v.string()), // URL to uploaded receipt
    paymentDetails: v.optional(v.object({
      amount: v.number(),
      paymentMethod: v.string(),
      referenceNumber: v.string(),
      paymentDate: v.string(),
      bankName: v.optional(v.string()),
    })),
    paymentSubmittedAt: v.optional(v.number()),
    paymentApprovedAt: v.optional(v.number()),
    paymentRejectionReason: v.optional(v.string()),
  }),
  
  payments: defineTable({
    userId: v.string(),
    userType: v.string(), // participant, vendor, sponsor
    userName: v.string(),
    userEmail: v.string(),
    amount: v.number(),
    type: v.string(), // ticket, sponsorship, vendor_booth
    reference: v.string(),
    status: v.string(), // pending, approved, rejected
    paymentMethod: v.optional(v.string()),
    receiptUrl: v.optional(v.string()),
    rejectionReason: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
    approvedAt: v.optional(v.number()),
  }),
  
  events: defineTable({
    title: v.string(),
    theme: v.string(),
    date: v.string(),
    location: v.string(),
    sponsors: v.array(v.string()),
    budget: v.number(),
    description: v.optional(v.string()),
    status: v.string(), // active, upcoming, completed
    createdAt: v.number(),
    updatedAt: v.number(),
  }),
});
