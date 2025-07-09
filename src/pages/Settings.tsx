import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { 
  Save, 
  Mail, 
  Bell, 
  Shield, 
  Database, 
  Palette, 
  Globe,
  Key,
  Users,
  Settings as SettingsIcon
} from 'lucide-react';

interface Settings {
  company: {
    name: string;
    email: string;
    phone: string;
    address: string;
    website: string;
  };
  notifications: {
    emailAlerts: boolean;
    pushNotifications: boolean;
    weeklyReports: boolean;
    customerUpdates: boolean;
  };
  offers: {
    defaultDiscount: number;
    maxOffersPerCustomer: number;
    offerExpiration: number;
    autoSuggestOffers: boolean;
  };
  security: {
    sessionTimeout: number;
    requireTwoFactor: boolean;
    passwordExpiration: number;
    ipWhitelist: string[];
  };
  integrations: {
    emailProvider: string;
    analyticsProvider: string;
    paymentGateway: string;
    crmSystem: string;
  };
}

export default function Settings() {
  const { toast } = useToast();
  const [settings, setSettings] = useState<Settings>({
    company: {
      name: 'SmartRetailer Inc.',
      email: 'admin@smartretailer.com',
      phone: '+1 (555) 123-4567',
      address: '123 Business St, Commerce City, CA 90210',
      website: 'https://smartretailer.com'
    },
    notifications: {
      emailAlerts: true,
      pushNotifications: true,
      weeklyReports: true,
      customerUpdates: false
    },
    offers: {
      defaultDiscount: 15,
      maxOffersPerCustomer: 5,
      offerExpiration: 7,
      autoSuggestOffers: true
    },
    security: {
      sessionTimeout: 30,
      requireTwoFactor: false,
      passwordExpiration: 90,
      ipWhitelist: []
    },
    integrations: {
      emailProvider: 'sendgrid',
      analyticsProvider: 'google',
      paymentGateway: 'stripe',
      crmSystem: 'salesforce'
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [newIpAddress, setNewIpAddress] = useState('');

  useEffect(() => {
    // Load settings from API
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      // In real app, this would fetch from API
      console.log('Loading settings from backend...');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load settings",
        variant: "destructive"
      });
    }
  };

  const saveSettings = async () => {
    setIsLoading(true);
    try {
      // In real app, this would save to API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Settings Saved",
        description: "Your settings have been updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateSettings = (section: keyof Settings, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const addIpAddress = () => {
    if (newIpAddress && !settings.security.ipWhitelist.includes(newIpAddress)) {
      setSettings(prev => ({
        ...prev,
        security: {
          ...prev.security,
          ipWhitelist: [...prev.security.ipWhitelist, newIpAddress]
        }
      }));
      setNewIpAddress('');
    }
  };

  const removeIpAddress = (ip: string) => {
    setSettings(prev => ({
      ...prev,
      security: {
        ...prev.security,
        ipWhitelist: prev.security.ipWhitelist.filter(addr => addr !== ip)
      }
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Manage your application settings and preferences</p>
        </div>
        <Button onClick={saveSettings} disabled={isLoading}>
          <Save className="h-4 w-4 mr-2" />
          {isLoading ? 'Saving...' : 'Save Settings'}
        </Button>
      </div>

      <Tabs defaultValue="company" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="company" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Company
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="offers" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Offers
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="integrations" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            Integrations
          </TabsTrigger>
        </TabsList>

        <TabsContent value="company" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
              <CardDescription>Update your company details and contact information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input
                    id="company-name"
                    value={settings.company.name}
                    onChange={(e) => updateSettings('company', 'name', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-email">Email</Label>
                  <Input
                    id="company-email"
                    type="email"
                    value={settings.company.email}
                    onChange={(e) => updateSettings('company', 'email', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-phone">Phone</Label>
                  <Input
                    id="company-phone"
                    value={settings.company.phone}
                    onChange={(e) => updateSettings('company', 'phone', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-website">Website</Label>
                  <Input
                    id="company-website"
                    value={settings.company.website}
                    onChange={(e) => updateSettings('company', 'website', e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="company-address">Address</Label>
                <Textarea
                  id="company-address"
                  value={settings.company.address}
                  onChange={(e) => updateSettings('company', 'address', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Configure how you want to receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Alerts</Label>
                  <div className="text-sm text-muted-foreground">Receive email notifications for important events</div>
                </div>
                <Switch
                  checked={settings.notifications.emailAlerts}
                  onCheckedChange={(checked) => updateSettings('notifications', 'emailAlerts', checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Push Notifications</Label>
                  <div className="text-sm text-muted-foreground">Get browser push notifications</div>
                </div>
                <Switch
                  checked={settings.notifications.pushNotifications}
                  onCheckedChange={(checked) => updateSettings('notifications', 'pushNotifications', checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Weekly Reports</Label>
                  <div className="text-sm text-muted-foreground">Receive weekly performance reports</div>
                </div>
                <Switch
                  checked={settings.notifications.weeklyReports}
                  onCheckedChange={(checked) => updateSettings('notifications', 'weeklyReports', checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Customer Updates</Label>
                  <div className="text-sm text-muted-foreground">Get notified when customers take actions</div>
                </div>
                <Switch
                  checked={settings.notifications.customerUpdates}
                  onCheckedChange={(checked) => updateSettings('notifications', 'customerUpdates', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="offers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Offer Settings</CardTitle>
              <CardDescription>Configure default offer parameters and limits</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="default-discount">Default Discount (%)</Label>
                  <Input
                    id="default-discount"
                    type="number"
                    value={settings.offers.defaultDiscount}
                    onChange={(e) => updateSettings('offers', 'defaultDiscount', Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-offers">Max Offers Per Customer</Label>
                  <Input
                    id="max-offers"
                    type="number"
                    value={settings.offers.maxOffersPerCustomer}
                    onChange={(e) => updateSettings('offers', 'maxOffersPerCustomer', Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="offer-expiration">Offer Expiration (days)</Label>
                  <Input
                    id="offer-expiration"
                    type="number"
                    value={settings.offers.offerExpiration}
                    onChange={(e) => updateSettings('offers', 'offerExpiration', Number(e.target.value))}
                  />
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto-suggest Offers</Label>
                  <div className="text-sm text-muted-foreground">Automatically suggest offers based on customer behavior</div>
                </div>
                <Switch
                  checked={settings.offers.autoSuggestOffers}
                  onCheckedChange={(checked) => updateSettings('offers', 'autoSuggestOffers', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage security policies and access controls</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                  <Input
                    id="session-timeout"
                    type="number"
                    value={settings.security.sessionTimeout}
                    onChange={(e) => updateSettings('security', 'sessionTimeout', Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-expiration">Password Expiration (days)</Label>
                  <Input
                    id="password-expiration"
                    type="number"
                    value={settings.security.passwordExpiration}
                    onChange={(e) => updateSettings('security', 'passwordExpiration', Number(e.target.value))}
                  />
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Two-Factor Authentication</Label>
                  <div className="text-sm text-muted-foreground">Require 2FA for admin access</div>
                </div>
                <Switch
                  checked={settings.security.requireTwoFactor}
                  onCheckedChange={(checked) => updateSettings('security', 'requireTwoFactor', checked)}
                />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>IP Whitelist</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter IP address"
                    value={newIpAddress}
                    onChange={(e) => setNewIpAddress(e.target.value)}
                  />
                  <Button onClick={addIpAddress}>Add</Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {settings.security.ipWhitelist.map((ip) => (
                    <Badge key={ip} variant="secondary" className="cursor-pointer" onClick={() => removeIpAddress(ip)}>
                      {ip} ×
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Third-party Integrations</CardTitle>
              <CardDescription>Configure external service connections</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email-provider">Email Provider</Label>
                  <Select value={settings.integrations.emailProvider} onValueChange={(value) => updateSettings('integrations', 'emailProvider', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sendgrid">SendGrid</SelectItem>
                      <SelectItem value="mailgun">Mailgun</SelectItem>
                      <SelectItem value="ses">Amazon SES</SelectItem>
                      <SelectItem value="mailchimp">Mailchimp</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="analytics-provider">Analytics Provider</Label>
                  <Select value={settings.integrations.analyticsProvider} onValueChange={(value) => updateSettings('integrations', 'analyticsProvider', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="google">Google Analytics</SelectItem>
                      <SelectItem value="mixpanel">Mixpanel</SelectItem>
                      <SelectItem value="segment">Segment</SelectItem>
                      <SelectItem value="amplitude">Amplitude</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="payment-gateway">Payment Gateway</Label>
                  <Select value={settings.integrations.paymentGateway} onValueChange={(value) => updateSettings('integrations', 'paymentGateway', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="stripe">Stripe</SelectItem>
                      <SelectItem value="paypal">PayPal</SelectItem>
                      <SelectItem value="square">Square</SelectItem>
                      <SelectItem value="braintree">Braintree</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="crm-system">CRM System</Label>
                  <Select value={settings.integrations.crmSystem} onValueChange={(value) => updateSettings('integrations', 'crmSystem', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="salesforce">Salesforce</SelectItem>
                      <SelectItem value="hubspot">HubSpot</SelectItem>
                      <SelectItem value="pipedrive">Pipedrive</SelectItem>
                      <SelectItem value="zoho">Zoho CRM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}