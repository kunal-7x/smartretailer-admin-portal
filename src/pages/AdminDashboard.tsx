
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, Users, TrendingUp, DollarSign } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import LoyalCustomersTable from '../components/LoyalCustomersTable';

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

const AdminDashboard = () => {
  const [loyalCustomers, setLoyalCustomers] = useState<LoyalCustomer[]>([]);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const processCSVData = (csvText: string): LoyalCustomer[] => {
    console.log('Processing CSV data...');
    
    // Simulate backend processing for demo
    const mockCustomers: LoyalCustomer[] = [
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

    return mockCustomers;
  };

  const handleFileUpload = async (file: File) => {
    if (!file.name.endsWith('.csv')) {
      toast({
        title: "Invalid File Type",
        description: "Please upload a CSV file.",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    
    try {
      const text = await file.text();
      console.log('File uploaded:', file.name);
      
      // Simulate API processing time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const customers = processCSVData(text);
      setLoyalCustomers(customers);
      
      toast({
        title: "CSV Processed Successfully",
        description: `Identified ${customers.length} loyal customers`,
      });
    } catch (error) {
      console.error('Error processing CSV:', error);
      toast({
        title: "Processing Error",
        description: "Failed to process the CSV file. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">Upload customer data to identify loyal customers and send targeted offers</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loyalCustomers.length || 0}</div>
            <p className="text-xs text-muted-foreground">Loyal customers identified</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Loyalty Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loyalCustomers.length > 0 
                ? Math.round(loyalCustomers.reduce((sum, c) => sum + c.loyaltyScore, 0) / loyalCustomers.length)
                : 0
              }
            </div>
            <p className="text-xs text-muted-foreground">Out of 100</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${loyalCustomers.length > 0 
                ? (loyalCustomers.reduce((sum, c) => sum + c.averageOrderValue, 0) / loyalCustomers.length).toFixed(2)
                : '0.00'
              }
            </div>
            <p className="text-xs text-muted-foreground">Average per order</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Purchases</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loyalCustomers.reduce((sum, c) => sum + c.totalPurchases, 0)}
            </div>
            <p className="text-xs text-muted-foreground">All loyal customers</p>
          </CardContent>
        </Card>
      </div>

      {/* CSV Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle>Upload Customer Data</CardTitle>
          <CardDescription>
            Upload a CSV file containing customer purchase data to identify loyal customers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept=".csv"
              onChange={handleFileInput}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={uploading}
            />
            
            <div className="space-y-4">
              <Upload className={`mx-auto h-12 w-12 ${dragActive ? 'text-blue-500' : 'text-gray-400'}`} />
              <div>
                <p className="text-lg font-medium text-gray-900">
                  {uploading ? 'Processing...' : 'Drop your CSV file here, or click to browse'}
                </p>
                <p className="text-gray-500">CSV files only</p>
              </div>
              {uploading && (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  <span className="text-sm text-gray-600">Analyzing customer data...</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Loyal Customers Table */}
      {loyalCustomers.length > 0 && (
        <LoyalCustomersTable customers={loyalCustomers} />
      )}
    </div>
  );
};

export default AdminDashboard;
