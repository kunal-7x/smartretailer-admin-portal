
export const generateDemoCustomers = () => {
  return [
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
};

export const generateSampleNotifications = () => {
  return [
    {
      id: '1',
      customerId: '1',
      type: 'offer',
      title: 'Exclusive 25% Off Deal!',
      message: 'Thank you for being a loyal customer! Enjoy 25% off your next purchase plus free shipping.',
      referralLink: 'https://smartretailer.com/refer/1/12345',
      loyaltyScore: 95,
      sentAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      read: false
    },
    {
      id: '2',
      customerId: '2',
      type: 'manual_offer',
      title: 'Special Gaming Bundle',
      message: 'We noticed you love gaming accessories! Check out our new gaming bundle with exclusive discounts.',
      referralLink: 'https://smartretailer.com/refer/2/67890',
      sentAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      read: true
    }
  ];
};
