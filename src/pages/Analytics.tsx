import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  ShoppingCart, 
  DollarSign,
  Eye,
  MousePointer,
  Gift,
  Target
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Mock data - in real app this would come from API
const salesData = [
  { month: 'Jan', sales: 12000, customers: 120, offers: 45 },
  { month: 'Feb', sales: 19000, customers: 180, offers: 67 },
  { month: 'Mar', sales: 15000, customers: 150, offers: 52 },
  { month: 'Apr', sales: 22000, customers: 220, offers: 78 },
  { month: 'May', sales: 28000, customers: 280, offers: 95 },
  { month: 'Jun', sales: 35000, customers: 350, offers: 120 },
];

const customerSegments = [
  { name: 'Loyal', value: 35, color: '#3b82f6' },
  { name: 'Regular', value: 45, color: '#10b981' },
  { name: 'New', value: 20, color: '#f59e0b' },
];

const offerPerformance = [
  { type: 'Email', sent: 1200, opened: 840, clicked: 420, converted: 84 },
  { type: 'In-App', sent: 800, opened: 720, clicked: 360, converted: 108 },
  { type: 'Push', sent: 600, opened: 420, clicked: 180, converted: 36 },
];

export default function Analytics() {
  const [metrics, setMetrics] = useState({
    totalRevenue: 0,
    totalCustomers: 0,
    totalOffers: 0,
    conversionRate: 0,
    avgOrderValue: 0,
    customerRetention: 0,
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setMetrics({
        totalRevenue: 131000,
        totalCustomers: 1300,
        totalOffers: 457,
        conversionRate: 24.8,
        avgOrderValue: 187.50,
        customerRetention: 78.5,
      });
      setIsLoading(false);
    }, 1000);
  }, []);

  const MetricCard = ({ title, value, change, icon: Icon, format = '' }: any) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {isLoading ? '...' : `${format}${value.toLocaleString()}`}
        </div>
        {change && (
          <div className={`text-xs flex items-center gap-1 ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {change > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {Math.abs(change)}% from last month
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
        <p className="text-muted-foreground">Comprehensive insights into your business performance</p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <MetricCard
          title="Total Revenue"
          value={metrics.totalRevenue}
          change={12.5}
          icon={DollarSign}
          format="$"
        />
        <MetricCard
          title="Total Customers"
          value={metrics.totalCustomers}
          change={8.2}
          icon={Users}
        />
        <MetricCard
          title="Offers Sent"
          value={metrics.totalOffers}
          change={15.3}
          icon={Gift}
        />
        <MetricCard
          title="Conversion Rate"
          value={metrics.conversionRate}
          change={2.1}
          icon={Target}
          format=""
        />
        <MetricCard
          title="Avg Order Value"
          value={metrics.avgOrderValue}
          change={-1.2}
          icon={ShoppingCart}
          format="$"
        />
        <MetricCard
          title="Customer Retention"
          value={metrics.customerRetention}
          change={5.7}
          icon={TrendingUp}
          format=""
        />
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="offers">Offers</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
                <CardDescription>Monthly revenue over the last 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']} />
                    <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Customer Segments</CardTitle>
                <CardDescription>Distribution of customer loyalty levels</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={customerSegments}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {customerSegments.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-4 mt-4">
                  {customerSegments.map((segment) => (
                    <div key={segment.name} className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: segment.color }}
                      />
                      <span className="text-sm">{segment.name}: {segment.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="customers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Growth</CardTitle>
              <CardDescription>New customers acquired each month</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="customers" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="offers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Offer Performance</CardTitle>
              <CardDescription>Performance metrics across different offer channels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {offerPerformance.map((offer) => (
                  <div key={offer.type} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">{offer.type} Offers</h4>
                      <Badge variant="outline">
                        {((offer.converted / offer.sent) * 100).toFixed(1)}% conversion
                      </Badge>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Sent</p>
                        <p className="font-medium">{offer.sent.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Opened</p>
                        <p className="font-medium">{offer.opened.toLocaleString()}</p>
                        <Progress value={(offer.opened / offer.sent) * 100} className="mt-1" />
                      </div>
                      <div>
                        <p className="text-muted-foreground">Clicked</p>
                        <p className="font-medium">{offer.clicked.toLocaleString()}</p>
                        <Progress value={(offer.clicked / offer.opened) * 100} className="mt-1" />
                      </div>
                      <div>
                        <p className="text-muted-foreground">Converted</p>
                        <p className="font-medium">{offer.converted.toLocaleString()}</p>
                        <Progress value={(offer.converted / offer.clicked) * 100} className="mt-1" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Offers Sent</CardTitle>
                <CardDescription>Number of offers sent to customers</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="offers" fill="#f59e0b" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Real-time Metrics</CardTitle>
                <CardDescription>Live performance indicators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-muted-foreground" />
                    <span>Active Users</span>
                  </div>
                  <span className="font-medium">1,234</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MousePointer className="h-4 w-4 text-muted-foreground" />
                    <span>Referral Clicks</span>
                  </div>
                  <span className="font-medium">856</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                    <span>Purchases Today</span>
                  </div>
                  <span className="font-medium">42</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span>Revenue Today</span>
                  </div>
                  <span className="font-medium">$7,890</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}