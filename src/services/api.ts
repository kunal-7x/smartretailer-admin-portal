
// API Service for SmartRetailer Admin
// In production, this would connect to real backend endpoints

export interface Customer {
  id: string;
  name: string;
  email: string;
  loyaltyScore?: number;
  topPurchasedProduct?: string;
  recommendedOffer?: string;
  totalPurchases?: number;
  averageOrderValue?: number;
}

export interface Notification {
  id: string;
  customerId: string;
  type: 'offer' | 'manual_offer';
  title: string;
  message: string;
  referralLink?: string;
  loyaltyScore?: number;
  sentAt: string;
  read: boolean;
}

export interface ReferralClick {
  id: string;
  referralLink: string;
  customerId: string;
  clickedAt: string;
  converted: boolean;
}

class ApiService {
  private baseUrl = 'https://api.smartretailer.com'; // Mock URL

  // Simulate API delay
  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Upload and process CSV file
  async uploadCSV(file: File): Promise<Customer[]> {
    await this.delay(2000);
    console.log('CSV uploaded to backend:', file.name);
    
    // Mock CSV processing result
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
      // ... more customers would be returned from actual backend processing
    ];
  }

  // Send notification to customer
  async sendNotification(notification: Omit<Notification, 'id' | 'sentAt'>): Promise<boolean> {
    await this.delay(1000);
    
    const fullNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      sentAt: new Date().toISOString()
    };
    
    // Store notification and send email
    const existingNotifications = JSON.parse(localStorage.getItem('customer_notifications') || '[]');
    existingNotifications.push(fullNotification);
    localStorage.setItem('customer_notifications', JSON.stringify(existingNotifications));
    
    // Send email with referral link
    if (notification.referralLink) {
      await this.sendEmail(
        notification.customerId + '@email.com',
        'Special Offer Just for You!',
        `${notification.message}\n\nUse your referral link: ${notification.referralLink}`,
        notification.referralLink
      );
    }
    
    console.log('Notification and email sent via API:', fullNotification);
    return true;
  }

  // Send email with offer
  async sendEmail(to: string, subject: string, body: string, referralLink?: string): Promise<boolean> {
    await this.delay(500);
    
    console.log('Email sent via API:', {
      to,
      subject,
      body,
      referralLink,
      sentAt: new Date().toISOString()
    });
    
    return true;
  }

  // Generate unique referral link
  generateReferralLink(customerId: string): string {
    const timestamp = Date.now();
    const unique = Math.random().toString(36).substring(2, 15);
    return `https://smartretailer.com/refer/${customerId}/${timestamp}/${unique}`;
  }

  // Track referral link click
  async trackReferralClick(referralLink: string, customerId: string): Promise<boolean> {
    await this.delay(300);
    
    const click: ReferralClick = {
      id: Date.now().toString(),
      referralLink,
      customerId,
      clickedAt: new Date().toISOString(),
      converted: false // Would be updated when purchase is made
    };
    
    // Store click tracking
    const existingClicks = JSON.parse(localStorage.getItem('referral_clicks') || '[]');
    existingClicks.push(click);
    localStorage.setItem('referral_clicks', JSON.stringify(existingClicks));
    
    console.log('Referral click tracked:', click);
    return true;
  }

  // Get all customers (for manual offer selection)
  async getAllCustomers(): Promise<Customer[]> {
    await this.delay(500);
    
    // Mock customer database
    return [
      { id: '1', name: 'Sarah Johnson', email: 'sarah.johnson@email.com' },
      { id: '2', name: 'Michael Chen', email: 'michael.chen@email.com' },
      { id: '3', name: 'Emily Rodriguez', email: 'emily.rodriguez@email.com' },
      // ... more customers
    ];
  }

  // Get customer notifications (for customer dashboard)
  getCustomerNotifications(customerId: string): Notification[] {
    const allNotifications = JSON.parse(localStorage.getItem('customer_notifications') || '[]');
    return allNotifications.filter((n: Notification) => n.customerId === customerId);
  }

  // Mark notification as read
  async markNotificationAsRead(notificationId: string): Promise<boolean> {
    const notifications = JSON.parse(localStorage.getItem('customer_notifications') || '[]');
    const updated = notifications.map((n: Notification) => 
      n.id === notificationId ? { ...n, read: true } : n
    );
    localStorage.setItem('customer_notifications', JSON.stringify(updated));
    return true;
  }
}

export const apiService = new ApiService();
