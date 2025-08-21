#!/bin/bash

echo "🔧 Setting up Convex for existing deployment"
echo "============================================"

# Check if CONVEX_DEPLOY_KEY is set
if [ -z "$CONVEX_DEPLOY_KEY" ]; then
    echo "❌ CONVEX_DEPLOY_KEY environment variable is not set"
    echo ""
    echo "You need to get your deploy key from the Convex dashboard:"
    echo "1. Go to https://dashboard.convex.dev"
    echo "2. Find your project (the one with your Vercel URL)"
    echo "3. Copy the deploy key (starts with 'cvx_...')"
    echo "4. Set it as an environment variable:"
    echo ""
    echo "export CONVEX_DEPLOY_KEY=cvx_your_actual_key_here"
    echo ""
    echo "Then run this script again."
    exit 1
fi

echo "✅ Deploy key found"
echo ""

# Check if .env.local exists and has the Convex URL
if [ -f ".env.local" ]; then
    echo "📁 .env.local file found"
    if grep -q "NEXT_PUBLIC_CONVEX_URL" .env.local; then
        echo "✅ NEXT_PUBLIC_CONVEX_URL is set in .env.local"
        CONVEX_URL=$(grep "NEXT_PUBLIC_CONVEX_URL" .env.local | cut -d '=' -f2)
        echo "   URL: $CONVEX_URL"
    else
        echo "⚠️  NEXT_PUBLIC_CONVEX_URL not found in .env.local"
        echo "   Please add it to your .env.local file"
    fi
else
    echo "⚠️  .env.local file not found"
    echo "   Since you have it set in Vercel, you can create it locally for development:"
    echo "   echo 'NEXT_PUBLIC_CONVEX_URL=your_convex_url_here' > .env.local"
fi

echo ""
echo "🚀 Deploying your Convex functions to your existing deployment..."
echo ""

# Deploy the functions
npx convex deploy

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Deployment successful!"
    echo ""
    echo "🔍 To verify your deployment:"
    echo "   npx convex dashboard"
    echo "   npx convex function-spec"
    echo "   npx convex logs"
    echo ""
    echo "🌐 Your Convex backend is now live at your existing URL!"
    echo "🎉 Your login should work now!"
else
    echo ""
    echo "❌ Deployment failed. Please check the error messages above."
    echo ""
    echo "🔧 Common issues:"
    echo "   1. Verify your deploy key is correct"
    echo "   2. Make sure your Convex project is active"
    echo "   3. Check that your project URL matches your Vercel environment variable"
    exit 1
fi