
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Send, Mail, Bell, Loader2 } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

interface LoyalCustomer {
  id: string;
  name: string;
  email: string;
  loyaltyScore: number;
  topPurchasedProduct: string;
  recommendedOffer: string;
  totalPurchases: number;
  averageOrderValue: number;
}

interface AutoSuggestedOffersProps {
  customers: LoyalCustomer[];
}

const AutoSuggestedOffers: React.FC<AutoSuggestedOffersProps> = ({ customers }) => {
  const [sendingOffer, setSendingOffer] = useState<string | null>(null);

  const generateReferralLink = (customerId: string) => {
    return `https://smartretailer.com/refer/${customerId}/${Date.now()}`;
  };

  const sendOfferToCustomer = async (customer: LoyalCustomer) => {
    setSendingOffer(customer.id);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const referralLink = generateReferralLink(customer.id);
      
      // Save notification to customer's dashboard (simulate API call)
      const notification = {
        id: Date.now().toString(),
        customerId: customer.id,
        type: 'offer',
        title: 'Exclusive Offer Just for You!',
        message: customer.recommendedOffer,
        referralLink,
        loyaltyScore: customer.loyaltyScore,
        sentAt: new Date().toISOString(),
        read: false
      };
      
      // Store in localStorage for demo (in production, this would be sent to backend)
      const existingNotifications = JSON.parse(localStorage.getItem('customer_notifications') || '[]');
      existingNotifications.push(notification);
      localStorage.setItem('customer_notifications', JSON.stringify(existingNotifications));
      
      console.log('Offer sent to customer:', customer.name);
      console.log('Referral link generated:', referralLink);
      console.log('Email would be sent to:', customer.email);
      
      toast({
        title: "Offer Sent Successfully!",
        description: `Notification and email sent to ${customer.name}`,
      });
      
    } catch (error) {
      console.error('Error sending offer:', error);
      toast({
        title: "Failed to Send Offer",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setSendingOffer(null);
    }
  };

  const getLoyaltyBadgeColor = (score: number) => {
    if (score >= 90) return 'bg-green-100 text-green-800';
    if (score >= 80) return 'bg-blue-100 text-blue-800';
    if (score >= 70) return 'bg-yellow-100 text-yellow-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Send className="h-5 w-5" />
          Auto-Suggested Offers
        </CardTitle>
        <CardDescription>
          Send AI-generated personalized offers to your top loyal customers
        </CardDescription>
      </CardHeader>
      <CardContent>
        {customers.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No loyal customers found. Please upload customer data in the Dashboard first.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Loyalty Score</TableHead>
                  <TableHead>Recommended Offer</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.map((customer, index) => (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-blue-600">
                            #{index + 1}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{customer.name}</div>
                          <div className="text-sm text-gray-500">{customer.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getLoyaltyBadgeColor(customer.loyaltyScore)}>
                        {customer.loyaltyScore}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <div className="text-sm text-gray-900">{customer.recommendedOffer}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        Based on: {customer.topPurchasedProduct}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => sendOfferToCustomer(customer)}
                        disabled={sendingOffer === customer.id}
                        className="flex items-center gap-2"
                        size="sm"
                      >
                        {sendingOffer === customer.id ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <div className="flex items-center gap-1">
                              <Bell className="h-3 w-3" />
                              <Mail className="h-3 w-3" />
                            </div>
                            Send Offer
                          </>
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AutoSuggestedOffers;
