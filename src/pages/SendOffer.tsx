
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AutoSuggestedOffers from '../components/AutoSuggestedOffers';
import ManualOfferPanel from '../components/ManualOfferPanel';

const SendOffer = () => {
  const [loyalCustomers, setLoyalCustomers] = useState([]);

  useEffect(() => {
    // Load loyal customers from localStorage or API
    const loadLoyalCustomers = () => {
      // For demo purposes, we'll use the same mock data
      const mockCustomers = [
        {
          id: '1',
          name: 'Sarah Johnson',
          email: 'sarah.johnson@email.com',
          loyaltyScore: 95,
          topPurchasedProduct: 'Premium Skincare Set',
          recommendedOffer: '25% off next purchase + Free shipping',
          totalPurchases: 45,
          averageOrderValue: 180.50
        },
        {
          id: '2',
          name: 'Michael Chen',
          email: 'michael.chen@email.com',
          loyaltyScore: 92,
          topPurchasedProduct: 'Smart Watch Pro',
          recommendedOffer: 'Buy 2 Get 1 Free on accessories',
          totalPurchases: 38,
          averageOrderValue: 220.75
        },
        {
          id: '3',
          name: 'Emily Rodriguez',
          email: 'emily.rodriguez@email.com',
          loyaltyScore: 89,
          topPurchasedProduct: 'Organic Coffee Beans',
          recommendedOffer: 'Free premium membership upgrade',
          totalPurchases: 52,
          averageOrderValue: 85.30
        },
        {
          id: '4',
          name: 'David Wilson',
          email: 'david.wilson@email.com',
          loyaltyScore: 87,
          topPurchasedProduct: 'Fitness Equipment',
          recommendedOffer: '30% off fitness accessories',
          totalPurchases: 29,
          averageOrderValue: 340.25
        },
        {
          id: '5',
          name: 'Jessica Thompson',
          email: 'jessica.thompson@email.com',
          loyaltyScore: 85,
          topPurchasedProduct: 'Designer Handbag',
          recommendedOffer: 'Exclusive early access to new collection',
          totalPurchases: 33,
          averageOrderValue: 275.80
        },
        {
          id: '6',
          name: 'Robert Kim',
          email: 'robert.kim@email.com',
          loyaltyScore: 83,
          topPurchasedProduct: 'Gaming Headset',
          recommendedOffer: '20% off gaming accessories',
          totalPurchases: 41,
          averageOrderValue: 145.60
        },
        {
          id: '7',
          name: 'Lisa Anderson',
          email: 'lisa.anderson@email.com',
          loyaltyScore: 81,
          topPurchasedProduct: 'Home Decor Items',
          recommendedOffer: 'Free interior consultation',
          totalPurchases: 36,
          averageOrderValue: 120.45
        },
        {
          id: '8',
          name: 'James Martinez',
          email: 'james.martinez@email.com',
          loyaltyScore: 79,
          topPurchasedProduct: 'Gourmet Food Kit',
          recommendedOffer: 'Monthly subscription discount',
          totalPurchases: 28,
          averageOrderValue: 95.75
        },
        {
          id: '9',
          name: 'Amanda Davis',
          email: 'amanda.davis@email.com',
          loyaltyScore: 77,
          topPurchasedProduct: 'Yoga Equipment',
          recommendedOffer: 'Free yoga class bundle',
          totalPurchases: 31,
          averageOrderValue: 75.90
        },
        {
          id: '10',
          name: 'Christopher Lee',
          email: 'christopher.lee@email.com',
          loyaltyScore: 75,
          topPurchasedProduct: 'Tech Gadgets',
          recommendedOffer: 'Extended warranty package',
          totalPurchases: 24,
          averageOrderValue: 195.30
        }
      ];
      
      setLoyalCustomers(mockCustomers);
    };

    loadLoyalCustomers();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Send Offer</h1>
        <p className="mt-2 text-gray-600">Send personalized offers to customers via notifications and email</p>
      </div>

      <Tabs defaultValue="auto-suggested" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="auto-suggested">Auto-Suggested Offers</TabsTrigger>
          <TabsTrigger value="manual">Manual Offer Panel</TabsTrigger>
        </TabsList>
        
        <TabsContent value="auto-suggested" className="space-y-6">
          <AutoSuggestedOffers customers={loyalCustomers} />
        </TabsContent>
        
        <TabsContent value="manual" className="space-y-6">
          <ManualOfferPanel />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SendOffer;
