import express from 'express';
import { PrismaClient } from '@prisma/client';
import Stripe from 'stripe';

const router = express.Router();
const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Stripe webhook
router.post('/stripe', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
    
    let event;
    
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        console.error('Webhook signature verification failed:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    
    try {
        switch (event.type) {
            case 'checkout.session.completed':
                const session = event.data.object;
                await handleSuccessfulPayment(session);
                break;
                
            case 'payment_intent.succeeded':
                const paymentIntent = event.data.object;
                await handlePaymentIntentSucceeded(paymentIntent);
                break;
                
            case 'customer.subscription.created':
            case 'customer.subscription.updated':
                const subscription = event.data.object;
                await handleSubscriptionChange(subscription);
                break;
                
            case 'customer.subscription.deleted':
                const canceledSubscription = event.data.object;
                await handleSubscriptionCanceled(canceledSubscription);
                break;
                
            default:
                console.log(`Unhandled event type: ${event.type}`);
        }
        
        res.json({ received: true });
        
    } catch (error) {
        console.error('Webhook processing error:', error);
        res.status(500).json({ error: 'Webhook processing failed' });
    }
});

// Manual payment webhook (for custom payment methods)
router.post('/manual-payment', async (req, res) => {
    try {
        const { userId, planId, transactionId, amount, paymentMethod } = req.body;
        const adminSecret = req.headers['x-admin-secret'];
        
        // Verify admin secret
        if (adminSecret !== process.env.ADMIN_WEBHOOK_SECRET) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        
        // Create payment record
        const payment = await prisma.payment.create({
            data: {
                userId: userId,
                planId: planId,
                transactionId: transactionId,
                amount: parseFloat(amount),
                paymentMethod: paymentMethod,
                status: 'pending'
            }
        });
        
        res.json({ 
            success: true, 
            message: 'Payment recorded, awaiting admin approval',
            paymentId: payment.id
        });
        
    } catch (error) {
        console.error('Manual payment webhook error:', error);
        res.status(500).json({ error: 'Failed to process payment' });
    }
});

async function handleSuccessfulPayment(session) {
    try {
        const userId = session.metadata.userId;
        const planId = session.metadata.planId;
        
        // Get plan details
        const plan = await prisma.plan.findUnique({
            where: { id: planId }
        });
        
        if (!plan) {
            throw new Error('Plan not found');
        }
        
        // Create payment record
        await prisma.payment.create({
            data: {
                userId: userId,
                planId: planId,
                stripeSessionId: session.id,
                transactionId: session.payment_intent,
                amount: session.amount_total / 100,
                paymentMethod: 'stripe',
                status: 'completed'
            }
        });
        
        // Grant premium
        const premiumTo = new Date();
        premiumTo.setDate(premiumTo.getDate() + plan.durationDays);
        
        await prisma.user.update({
            where: { userId: userId },
            data: {
                premiumPlus: true,
                premiumFrom: new Date(),
                premiumTo: premiumTo
            }
        });
        
        console.log(`Premium granted to user ${userId} for ${plan.durationDays} days`);
        
    } catch (error) {
        console.error('Handle successful payment error:', error);
    }
}

async function handlePaymentIntentSucceeded(paymentIntent) {
    try {
        // Additional payment processing if needed
        console.log('Payment intent succeeded:', paymentIntent.id);
    } catch (error) {
        console.error('Handle payment intent error:', error);
    }
}

async function handleSubscriptionChange(subscription) {
    try {
        const customerId = subscription.customer;
        const userId = subscription.metadata.userId;
        
        if (!userId) {
            console.log('No userId found in subscription metadata');
            return;
        }
        
        // Update user subscription status
        await prisma.user.update({
            where: { userId: userId },
            data: {
                premiumPlus: subscription.status === 'active',
                stripeCustomerId: customerId,
                stripeSubscriptionId: subscription.id
            }
        });
        
        console.log(`Subscription updated for user ${userId}: ${subscription.status}`);
        
    } catch (error) {
        console.error('Handle subscription change error:', error);
    }
}

async function handleSubscriptionCanceled(subscription) {
    try {
        const userId = subscription.metadata.userId;
        
        if (!userId) {
            console.log('No userId found in canceled subscription metadata');
            return;
        }
        
        // Set premium expiry to end of current period
        await prisma.user.update({
            where: { userId: userId },
            data: {
                premiumTo: new Date(subscription.current_period_end * 1000)
            }
        });
        
        console.log(`Subscription canceled for user ${userId}, will expire at period end`);
        
    } catch (error) {
        console.error('Handle subscription canceled error:', error);
    }
}

export default router;
