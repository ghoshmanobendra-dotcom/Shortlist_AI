
import { toast } from "sonner";

export interface PaymentReceipt {
    email: string;
    amount: number;
    plan: string;
    date: string;
    transactionId: string;
}

/**
 * Simulates sending a payment receipt email.
 * In a production environment, this would call a Supabase Edge Function
 * or an API endpoint (e.g. Resend, SendGrid).
 */
export const sendPaymentReceipt = async (receipt: PaymentReceipt): Promise<boolean> => {
    console.log("Attempting to send receipt email to:", receipt.email);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // In a real app, you would do something like:
    /*
    const { error } = await supabase.functions.invoke('send-payment-receipt', {
      body: receipt
    });
    if (error) throw error;
    */

    console.log("EMAIL SENT SUCCESSFULLY", {
        to: receipt.email,
        subject: `Payment Receipt: ${receipt.plan} Subscription`,
        body: `
      <h1>Payment Confirmation</h1>
      <p>Thank you for subscribing to ShortlistAI ${receipt.plan}!</p>
      <p>Amount Paid: ₹${receipt.amount}</p>
      <p>Transaction ID: ${receipt.transactionId}</p>
      <p>Date: ${receipt.date}</p>
    `
    });

    toast.success("Payment receipt sent to " + receipt.email);
    return true;
};
