#!/bin/bash

echo "🔍 DIAGNOSING LOGIN ISSUES"
echo "============================"
echo ""

# Set the deployment
export CONVEX_DEPLOYMENT=dev:courteous-koala-82

echo "📍 Using deployment: $CONVEX_DEPLOYMENT"
echo ""

# Check if we can access the deployment
echo "🔍 Step 1: Checking deployment access..."
if npx convex function-spec > /dev/null 2>&1; then
    echo "✅ Deployment accessible"
else
    echo "❌ Cannot access deployment - authentication needed"
    echo "   Run: npx convex dev"
    echo ""
    exit 1
fi

echo ""
echo "🔍 Step 2: Checking deployed functions..."
FUNCTIONS=$(npx convex function-spec 2>/dev/null | grep -E "^(query|mutation|action)" | wc -l)
echo "   Found $FUNCTIONS deployed functions"

# Check specific auth functions
echo ""
echo "🔍 Step 3: Checking authentication functions..."
echo "   Looking for: loginUser, adminLogin, unifiedLogin, signup"

AUTH_FUNCTIONS=$(npx convex function-spec 2>/dev/null | grep -E "(loginUser|adminLogin|unifiedLogin|signup)")
if [ -n "$AUTH_FUNCTIONS" ]; then
    echo "✅ Auth functions found:"
    echo "$AUTH_FUNCTIONS"
else
    echo "❌ No auth functions found!"
fi

echo ""
echo "🔍 Step 4: Checking database schema..."
echo "   Looking for: users table"

SCHEMA_CHECK=$(npx convex function-spec 2>/dev/null | grep -E "users")
if [ -n "$SCHEMA_CHECK" ]; then
    echo "✅ Users table found in schema"
else
    echo "❌ Users table not found in schema!"
fi

echo ""
echo "🔍 Step 5: Checking for existing users..."
echo "   Attempting to query users table..."

# Try to run a simple query to check if users exist
USER_COUNT=$(npx convex run "ctx => ctx.db.query('users').collect().then(users => users.length)" 2>/dev/null)
if [ -n "$USER_COUNT" ] && [ "$USER_COUNT" != "null" ]; then
    echo "✅ Found $USER_COUNT users in database"
else
    echo "❌ No users found or error querying database"
    echo "   This could mean:"
    echo "   1. Database is empty (need to seed)"
    echo "   2. Schema mismatch"
    echo "   3. Permission issues"
fi

echo ""
echo "🔍 Step 6: Testing seed function..."
echo "   Checking if seedAdminUser function exists..."

SEED_CHECK=$(npx convex function-spec 2>/dev/null | grep -E "seedAdminUser")
if [ -n "$SEED_CHECK" ]; then
    echo "✅ Seed function found"
    echo "   Attempting to seed database..."
    
    SEED_RESULT=$(npx convex run api.seedAdmin.seedAdminUser 2>/dev/null)
    if [ -n "$SEED_RESULT" ]; then
        echo "✅ Database seeded successfully"
        echo "   Result: $SEED_RESULT"
    else
        echo "❌ Failed to seed database"
    fi
else
    echo "❌ Seed function not found"
fi

echo ""
echo "🔍 Step 7: Environment check..."
echo "   Checking NEXT_PUBLIC_CONVEX_URL..."

if [ -n "$NEXT_PUBLIC_CONVEX_URL" ]; then
    echo "✅ NEXT_PUBLIC_CONVEX_URL is set: $NEXT_PUBLIC_CONVEX_URL"
else
    echo "❌ NEXT_PUBLIC_CONVEX_URL is not set"
    echo "   This is required for your frontend to connect to Convex"
fi

echo ""
echo "🔍 Step 8: Frontend connection test..."
echo "   Your frontend should be connecting to:"
echo "   https://courteous-koala-82.convex.cloud"

echo ""
echo "🔍 Step 9: Common issues and solutions..."
echo ""
echo "🚨 IF LOGIN STILL DOESN'T WORK:"
echo "   1. Check browser console for errors"
echo "   2. Verify NEXT_PUBLIC_CONVEX_URL in Vercel matches your deployment"
echo "   3. Make sure your app is using the correct Convex URL"
echo "   4. Check if there are CORS issues"
echo "   5. Verify the functions are actually being called"

echo ""
echo "🔧 NEXT STEPS:"
echo "   1. Check your browser console for errors"
echo "   2. Verify the Convex URL in your Vercel environment variables"
echo "   3. Test with the debug page: open test-login.html in your browser"
echo "   4. Check if the functions are being called in the Network tab"

echo ""
echo "📱 TEST CREDENTIALS (after seeding):"
echo "   Admin: admin@wed4.com / Admin@2025"
echo "   User: john.doe@example.com / password123"
echo "   Vendor: mike@techvendor.com / password123"
echo "   Sponsor: emily@sponsor.com / password123"

echo ""
echo "🎯 DIAGNOSIS COMPLETE!"
echo "   Check the results above and follow the next steps."