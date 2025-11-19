# Vercel Environment Variables Setup for Kalitechnia

## Required Environment Variables

The `kalitechnia` frontend needs these environment variables to connect to the CMS at `cms.ftiaxesite.gr`.

## Step 1: Go to Vercel Dashboard

1. Go to https://vercel.com/dashboard
2. Select the **kalitechnia** project
3. Go to **Settings** → **Environment Variables**

## Step 2: Add Environment Variables

Add these two variables:

### Variable 1: CMS API URL

- **Key:** `NEXT_PUBLIC_PAYLOAD_URL`
- **Value:** `https://cms.ftiaxesite.gr`
- **Environment:** Select **Production**, **Preview**, and **Development**
- Click **Save**

### Variable 2: Tenant Slug

- **Key:** `NEXT_PUBLIC_TENANT_SLUG`
- **Value:** `kalitechnia` (or `kallitechnia` - check what slug is used in your CMS)
- **Environment:** Select **Production**, **Preview**, and **Development**
- Click **Save**

## Step 3: Verify Tenant Exists in CMS

Before deploying, make sure:

1. The tenant with slug `kalitechnia` (or `kallitechnia`) exists in your CMS
2. Go to `https://cms.ftiaxesite.gr/admin` and check **Tenants** collection
3. Verify the slug matches what you set in `NEXT_PUBLIC_TENANT_SLUG`

## Step 4: Redeploy

After setting the variables:

1. Go to **Deployments** tab in Vercel
2. Click **Redeploy** on the latest deployment
3. Or push a new commit to trigger a new deployment

## Step 5: Verify Connection

After deployment:

1. Visit your deployed site
2. Open browser console (F12)
3. Check for any API errors
4. The site should now fetch data from `https://cms.ftiaxesite.gr/api/...`

## Troubleshooting

### "Tenant not found" error

- Check that the tenant slug in CMS matches `NEXT_PUBLIC_TENANT_SLUG`
- Verify the tenant exists: `https://cms.ftiaxesite.gr/api/tenants?where[slug][equals]=kalitechnia`

### CORS errors

- Make sure the CMS allows requests from your frontend domain
- Check `ALLOWED_ORIGINS` in CMS `.env` file on Hetzner server

### "Failed to fetch" errors

- Verify `NEXT_PUBLIC_PAYLOAD_URL` is correct: `https://cms.ftiaxesite.gr`
- Check that CMS is accessible: `https://cms.ftiaxesite.gr/api/tenants`
- Check browser console for detailed error messages

## Example .env.local for Local Development

If you want to test locally:

```env
NEXT_PUBLIC_PAYLOAD_URL=https://cms.ftiaxesite.gr
NEXT_PUBLIC_TENANT_SLUG=kalitechnia
```

Or if running CMS locally:

```env
NEXT_PUBLIC_PAYLOAD_URL=http://localhost:3000
NEXT_PUBLIC_TENANT_SLUG=kalitechnia
```


