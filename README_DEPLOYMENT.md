# 🚀 DEPLOY YOUR CONVEX BACKEND - FIX LOGIN ISSUE

## 🚨 Your Login Issue Explained
Your app is currently trying to connect to `https://placeholder.convex.cloud` which is just a placeholder URL. This is why your login isn't working.

## ✅ The Fix: Deploy to Convex Cloud

### What You Need (5 minutes total):
1. **Convex Account** - Sign up at https://dashboard.convex.dev
2. **Deploy Key** - Get this from your Convex dashboard
3. **Environment File** - Add your Convex URL

### Step-by-Step Instructions:

#### 1. Create Convex Project (2 min)
- Go to https://dashboard.convex.dev
- Sign up/login with GitHub/Google
- Click "New Project"
- Name: `my-v0-project` (or your preferred name)
- Region: Choose closest to your users
- Click "Create Project"

#### 2. Get Your Credentials
After project creation, you'll see:
```
Deployment URL: https://your-project-name.convex.cloud
Deploy Key: cvx_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

#### 3. Set Up Environment (1 min)
Create `.env.local` file in your project root:
```env
NEXT_PUBLIC_CONVEX_URL=https://your-project-name.convex.cloud
```

#### 4. Deploy (1 min)
```bash
# Set your deploy key (replace with your actual key)
export CONVEX_DEPLOY_KEY=cvx_your_actual_key_here

# Deploy using the script
./deploy-convex.sh

# Or deploy manually
npx convex deploy
```

#### 5. Test Login (1 min)
- Restart your Next.js app
- Try logging in again
- It should work! 🎉

## 🔧 What Gets Deployed
- ✅ User authentication functions
- ✅ Database schema (users, registrations, sponsors, vendors)
- ✅ Admin functions
- ✅ Payment processing
- ✅ File upload handling

## 📁 Files Created for You
- `DEPLOY_CONVEX.md` - Complete deployment guide
- `QUICK_START_LOGIN_FIX.md` - Quick fix guide
- `deploy-convex.sh` - Automated deployment script

## 🆘 If Something Goes Wrong
1. Check `DEPLOY_CONVEX.md` for troubleshooting
2. Verify your deploy key is correct
3. Check for TypeScript errors: `npx convex function-spec`
4. Get help: https://discord.gg/convex

## 💰 Cost
- **Free Tier**: 1M function calls/month, 1GB storage
- **Paid**: $0.50 per 1M function calls after free tier

---
**Your login will work immediately after deployment!** 🚀