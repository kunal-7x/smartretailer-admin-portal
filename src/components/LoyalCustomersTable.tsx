
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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

interface LoyalCustomersTableProps {
  customers: LoyalCustomer[];
}

const LoyalCustomersTable: React.FC<LoyalCustomersTableProps> = ({ customers }) => {
  const getLoyaltyBadgeColor = (score: number) => {
    if (score >= 90) return 'bg-green-100 text-green-800';
    if (score >= 80) return 'bg-blue-100 text-blue-800';
    if (score >= 70) return 'bg-yellow-100 text-yellow-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top 10 Loyal Customers</CardTitle>
        <CardDescription>
          Customers ranked by loyalty score based on purchase history, frequency, and engagement
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Loyalty Score</TableHead>
                <TableHead>Top Product</TableHead>
                <TableHead>Total Purchases</TableHead>
                <TableHead>Avg Order Value</TableHead>
                <TableHead>Recommended Offer</TableHead>
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
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-600">{customer.email}</TableCell>
                  <TableCell>
                    <Badge className={getLoyaltyBadgeColor(customer.loyaltyScore)}>
                      {customer.loyaltyScore}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-900">{customer.topPurchasedProduct}</TableCell>
                  <TableCell className="text-gray-600">{customer.totalPurchases}</TableCell>
                  <TableCell className="text-gray-600">${customer.averageOrderValue.toFixed(2)}</TableCell>
                  <TableCell className="text-gray-900 max-w-xs">
                    <div className="truncate" title={customer.recommendedOffer}>
                      {customer.recommendedOffer}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoyalCustomersTable;
