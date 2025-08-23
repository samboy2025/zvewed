"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ReactNode } from "react";

// Handle missing Convex URL gracefully for development
const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL || "https://placeholder.convex.cloud";

// Create client with error handling
const convex = new ConvexReactClient(convexUrl);

// Add error handling for development
if (typeof window !== 'undefined') {
  // @ts-ignore - Adding error handler to convex client
  convex.onError = (error: any) => {
    console.warn('Convex error (this is normal during development):', error);
  };
}

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}