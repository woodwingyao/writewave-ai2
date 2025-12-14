# WriteWave AI Deployment Guide

## Overview
Your WriteWave AI app is ready to deploy! Here are the recommended deployment options.

---

## Option 1: Deploy to Netlify (Recommended - Easiest)

### Why Netlify?
- Free tier available
- Automatic HTTPS
- Easy custom domain setup
- Perfect for React/Vite apps
- Built-in CI/CD

### Steps:

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**
   ```bash
   netlify login
   ```

3. **Deploy Your App**
   ```bash
   netlify deploy --prod
   ```
   - When prompted, select "Create & configure a new site"
   - Choose your team
   - Site name: `writewaveai` (or your preferred name)
   - Build command: `npm run build`
   - Publish directory: `dist`

4. **Set Environment Variables**
   Go to Netlify Dashboard → Your Site → Site settings → Environment variables

   Add these variables:
   - `VITE_SUPABASE_URL` = (your Supabase URL)
   - `VITE_SUPABASE_ANON_KEY` = (your Supabase anon key)
   - `VITE_OPENAI_API_KEY` or `VITE_ANTHROPIC_API_KEY` = (your AI API key)

5. **Your App URL**
   After deployment, you'll get a URL like: `https://writewaveai.netlify.app`

   Use this URL in Google Play Store privacy policy field!

---

## Option 2: Deploy to Vercel

### Steps:

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel --prod
   ```

3. **Set Environment Variables**
   ```bash
   vercel env add VITE_SUPABASE_URL
   vercel env add VITE_SUPABASE_ANON_KEY
   vercel env add VITE_OPENAI_API_KEY
   ```

4. **Your App URL**
   You'll get: `https://writewave-ai.vercel.app`

---

## Option 3: Deploy to Supabase Hosting (NEW!)

Supabase now offers hosting for static sites!

### Steps:

1. **Install Supabase CLI** (if not installed)
   ```bash
   npm install -g supabase
   ```

2. **Login**
   ```bash
   supabase login
   ```

3. **Link Project**
   ```bash
   supabase link --project-ref your-project-ref
   ```

4. **Deploy**
   ```bash
   npm run build
   supabase storage cp -r dist/* storage-bucket-name/
   ```

---

## Option 4: GitHub Pages (Free)

### Steps:

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add to package.json scripts**
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Update vite.config.ts** (add base path)
   ```typescript
   export default defineConfig({
     base: '/writewave-ai/',
     // ... rest of config
   })
   ```

4. **Deploy**
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages**
   - Go to your GitHub repo
   - Settings → Pages
   - Source: Deploy from branch → gh-pages
   - Your URL: `https://yourusername.github.io/writewave-ai/`

---

## Quick Deploy (Netlify - Fastest Way)

Run these commands in order:

```bash
# 1. Build your app
npm run build

# 2. Install Netlify CLI globally (if not installed)
npm install -g netlify-cli

# 3. Login to Netlify
netlify login

# 4. Deploy to production
netlify deploy --prod
```

When prompted:
- Select: "Create & configure a new site"
- Build command: `npm run build`
- Publish directory: `dist`

**Done!** You'll get a live URL immediately.

---

## After Deployment

### 1. Get Your Privacy Policy URL
Your privacy policy will be at: `https://your-domain.com/` (navigate to privacy section)

### 2. Update Google Play Store
- Go to Play Console
- Your App → Store presence → Privacy Policy
- Paste your deployment URL + privacy route

### 3. Test Your Deployment
- Visit your live URL
- Test login/signup
- Generate some content
- Check privacy policy page

---

## Environment Variables Reference

Make sure these are set in your hosting platform:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_OPENAI_API_KEY=sk-... (or VITE_ANTHROPIC_API_KEY)
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_... (for production)
```

---

## Custom Domain (Optional)

### For Netlify:
1. Go to Domain settings
2. Add custom domain
3. Update DNS records with your registrar
4. SSL is automatic

### For Vercel:
1. Project Settings → Domains
2. Add your domain
3. Update DNS at your registrar

---

## Troubleshooting

### Issue: Environment variables not working
- Make sure variable names start with `VITE_`
- Redeploy after adding variables

### Issue: 404 on refresh
Add a `_redirects` file in public folder:
```
/*    /index.html   200
```

### Issue: API calls failing
- Check CORS settings in Supabase
- Verify API keys are correct

---

## Recommended: Start with Netlify

For the fastest deployment with zero configuration:

```bash
netlify deploy --prod
```

That's it! Your app will be live in under 2 minutes.

---

## Need Help?

If you encounter issues:
1. Check the build logs
2. Verify environment variables
3. Test locally first with `npm run preview`
4. Check hosting platform documentation
