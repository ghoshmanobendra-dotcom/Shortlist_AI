import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { QRCodeSVG } from "qrcode.react";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";

interface UPIPaymentModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess: () => void;
}

export function UPIPaymentModal({ open, onOpenChange, onSuccess }: UPIPaymentModalProps) {
    const [copied, setCopied] = useState(false);
    const upiId = "shortlistai@upi"; // Placeholder UPI ID
    const amount = "499"; // Placeholder amount

    const handleCopy = () => {
        navigator.clipboard.writeText(upiId);
        setCopied(true);
        toast.success("UPI ID copied to clipboard");
        setTimeout(() => setCopied(false), 2000);
    };

    const handlePaymentComplete = () => {
        // In a real app, you'd verify the transaction here
        toast.success("Payment verified successfully!");
        onSuccess();
        onOpenChange(false);
    };

    const upiLink = `upi://pay?pa=${upiId}&pn=ShortlistAI&am=${amount}&cu=INR`;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Upgrade to Premium</DialogTitle>
                    <DialogDescription>
                        Scan the QR code to pay ₹{amount} and unlock unlimited screenings.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col items-center justify-center p-6 space-y-6">
                    <div className="p-4 bg-white rounded-xl shadow-sm border">
                        <QRCodeSVG value={upiLink} size={200} level="H" />
                    </div>

                    <div className="flex items-center space-x-2 w-full max-w-[240px]">
                        <div className="flex-1 bg-secondary/50 p-2 rounded text-center font-mono text-sm border truncate">
                            {upiId}
                        </div>
                        <Button size="icon" variant="outline" onClick={handleCopy}>
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                    </div>
                </div>

                <DialogFooter className="sm:justify-between gap-2">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handlePaymentComplete} className="bg-primary text-primary-foreground">
                        I have made the payment
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
