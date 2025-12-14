# Stripe Subscription Setup Guide

This guide will help you set up Stripe subscriptions for AI Copywriter Studio.

## Prerequisites

- A Stripe account (create one at https://stripe.com)
- Access to your Stripe Dashboard
- Supabase project already configured

## Step 1: Create Products in Stripe

1. Go to [Stripe Dashboard](https://dashboard.stripe.com) → **Products** → **Add Product**

2. **Create Monthly Subscription:**
   - Product Name: `AI Copywriter Pro (Monthly)`
   - Pricing Model: `Recurring`
   - Billing Period: `Monthly`
   - Price: `$9.99` (or your preferred price)
   - Click **Save product**
   - Copy the **Price ID** (looks like `price_xxxxx`)

3. **Create Yearly Subscription:**
   - Product Name: `AI Copywriter Pro (Yearly)`
   - Pricing Model: `Recurring`
   - Billing Period: `Yearly`
   - Price: `$79` (or your preferred price)
   - Click **Save product**
   - Copy the **Price ID** (looks like `price_xxxxx`)

## Step 2: Configure Environment Variables

1. **Add to your local `.env` file:**
   ```env
   VITE_STRIPE_MONTHLY_PRICE_ID=price_xxxxx
   VITE_STRIPE_YEARLY_PRICE_ID=price_xxxxx
   ```

2. **Configure Stripe Secrets in Supabase:**
   - Go to Supabase Dashboard → Settings → Edge Functions → Secrets
   - Add the following secrets:
     - `STRIPE_SECRET_KEY`: Get from Stripe Dashboard → Developers → API Keys (use test key for testing)
     - `STRIPE_WEBHOOK_SECRET`: (You'll get this in Step 3)

## Step 3: Set Up Stripe Webhook

1. Go to [Stripe Dashboard](https://dashboard.stripe.com) → **Developers** → **Webhooks**

2. Click **Add endpoint**

3. **Configure the webhook:**
   - Endpoint URL: `https://xrhobhtfnrzvdhxuyvno.supabase.co/functions/v1/stripe-webhook`
   - Description: `AI Copywriter Subscription Events`
   - Events to send:
     - ✓ `checkout.session.completed`
     - ✓ `customer.subscription.updated`
     - ✓ `customer.subscription.deleted`

4. Click **Add endpoint**

5. **Copy the webhook secret:**
   - Click on your newly created webhook
   - Find **Signing secret** (looks like `whsec_xxxxx`)
   - Add this to Supabase Edge Functions Secrets as `STRIPE_WEBHOOK_SECRET`

## Step 4: Testing

### Test Mode Setup

1. Make sure you're using Stripe **test mode** (toggle in Stripe Dashboard)
2. Use test API keys (they start with `sk_test_` and `pk_test_`)
3. Use test webhook secret (starts with `whsec_`)

### Test Payment Flow

1. Visit your app and click "Upgrade to Pro"
2. Select Monthly or Yearly plan
3. Use Stripe test card: `4242 4242 4242 4242`
   - Use any future expiry date
   - Use any 3-digit CVC
   - Use any valid ZIP code
4. Complete the checkout
5. You should be redirected to the success page

### Verify Webhook

1. Go to Stripe Dashboard → Developers → Webhooks
2. Click on your webhook endpoint
3. Check that events are being received successfully (status 200)
4. If there are errors, check Supabase Edge Functions logs

## Step 5: Go Live

When you're ready for production:

1. **Switch to Live Mode in Stripe:**
   - Toggle from Test Mode to Live Mode in Stripe Dashboard
   - Get your **live API keys** from Developers → API Keys

2. **Create live products:**
   - Create the same products in Live Mode
   - Copy the new **live Price IDs**

3. **Update environment variables:**
   - Update `VITE_STRIPE_MONTHLY_PRICE_ID` with live price ID
   - Update `VITE_STRIPE_YEARLY_PRICE_ID` with live price ID
   - Update `STRIPE_SECRET_KEY` in Supabase with live secret key

4. **Create live webhook:**
   - Create a new webhook in Live Mode
   - Use the same endpoint URL
   - Subscribe to the same events
   - Update `STRIPE_WEBHOOK_SECRET` in Supabase with new live webhook secret

## Troubleshooting

### Webhook not receiving events

- Check that the endpoint URL is correct
- Verify webhook secret is set in Supabase
- Check Supabase Edge Functions logs for errors
- Ensure webhook is active in Stripe Dashboard

### Checkout session fails

- Verify Price IDs are correct in `.env`
- Check browser console for errors
- Ensure `STRIPE_SECRET_KEY` is set in Supabase

### User not upgraded after payment

- Check Stripe Dashboard → Webhooks for failed events
- Verify webhook secret is correct
- Check that user email exists in your database
- Review Supabase Edge Functions logs

## Support

For Stripe-related issues:
- [Stripe Documentation](https://stripe.com/docs)
- [Stripe Support](https://support.stripe.com)

For Supabase-related issues:
- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Support](https://supabase.com/support)
