
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Send, Mail, Bell, Loader2, Link2 } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

const ManualOfferPanel = () => {
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const [offerTitle, setOfferTitle] = useState('');
  const [referralLink, setReferralLink] = useState('');
  const [sending, setSending] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock customer data for selection
  const allCustomers = [
    { id: '1', name: 'Sarah Johnson', email: 'sarah.johnson@email.com' },
    { id: '2', name: 'Michael Chen', email: 'michael.chen@email.com' },
    { id: '3', name: 'Emily Rodriguez', email: 'emily.rodriguez@email.com' },
    { id: '4', name: 'David Wilson', email: 'david.wilson@email.com' },
    { id: '5', name: 'Jessica Thompson', email: 'jessica.thompson@email.com' },
    { id: '6', name: 'Robert Kim', email: 'robert.kim@email.com' },
    { id: '7', name: 'Lisa Anderson', email: 'lisa.anderson@email.com' },
    { id: '8', name: 'James Martinez', email: 'james.martinez@email.com' },
    { id: '9', name: 'Amanda Davis', email: 'amanda.davis@email.com' },
    { id: '10', name: 'Christopher Lee', email: 'christopher.lee@email.com' },
    { id: '11', name: 'Jennifer Wilson', email: 'jennifer.wilson@email.com' },
    { id: '12', name: 'Ryan Garcia', email: 'ryan.garcia@email.com' },
    { id: '13', name: 'Michelle Brown', email: 'michelle.brown@email.com' },
    { id: '14', name: 'Kevin Taylor', email: 'kevin.taylor@email.com' },
    { id: '15', name: 'Ashley Davis', email: 'ashley.davis@email.com' }
  ];

  const filteredCustomers = allCustomers.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const generateReferralLink = () => {
    if (!selectedCustomer) {
      toast({
        title: "No Customer Selected",
        description: "Please select a customer first.",
        variant: "destructive",
      });
      return;
    }
    
    const link = `https://smartretailer.com/refer/${selectedCustomer}/${Date.now()}`;
    setReferralLink(link);
    
    toast({
      title: "Referral Link Generated",
      description: "Unique referral link has been created.",
    });
  };

  const sendManualOffer = async () => {
    if (!selectedCustomer || !offerTitle || !customMessage) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setSending(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const customer = allCustomers.find(c => c.id === selectedCustomer);
      const finalReferralLink = referralLink || `https://smartretailer.com/refer/${selectedCustomer}/${Date.now()}`;
      
      // Save notification to customer's dashboard
      const notification = {
        id: Date.now().toString(),
        customerId: selectedCustomer,
        type: 'manual_offer',
        title: offerTitle,
        message: customMessage,
        referralLink: finalReferralLink,
        sentAt: new Date().toISOString(),
        read: false
      };
      
      // Store in localStorage for demo
      const existingNotifications = JSON.parse(localStorage.getItem('customer_notifications') || '[]');
      existingNotifications.push(notification);
      localStorage.setItem('customer_notifications', JSON.stringify(existingNotifications));
      
      console.log('Manual offer sent to:', customer?.name);
      console.log('Offer details:', { offerTitle, customMessage, finalReferralLink });
      console.log('Email would be sent to:', customer?.email);
      
      toast({
        title: "Offer Sent Successfully!",
        description: `Manual offer sent to ${customer?.name}`,
      });
      
      // Reset form
      setSelectedCustomer('');
      setCustomMessage('');
      setOfferTitle('');
      setReferralLink('');
      setSearchQuery('');
      
    } catch (error) {
      console.error('Error sending manual offer:', error);
      toast({
        title: "Failed to Send Offer",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Send className="h-5 w-5" />
          Manual Offer Panel
        </CardTitle>
        <CardDescription>
          Create and send custom offers to any customer with personalized messages
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Customer Selection */}
        <div className="space-y-2">
          <Label htmlFor="customer-search">Select Customer</Label>
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                id="customer-search"
                placeholder="Search customers by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedCustomer} onValueChange={setSelectedCustomer}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a customer..." />
              </SelectTrigger>
              <SelectContent>
                {filteredCustomers.map((customer) => (
                  <SelectItem key={customer.id} value={customer.id}>
                    <div className="flex flex-col items-start">
                      <span className="font-medium">{customer.name}</span>
                      <span className="text-sm text-gray-500">{customer.email}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Offer Title */}
        <div className="space-y-2">
          <Label htmlFor="offer-title">Offer Title *</Label>
          <Input
            id="offer-title"
            placeholder="e.g., Exclusive 30% Off Deal"
            value={offerTitle}
            onChange={(e) => setOfferTitle(e.target.value)}
          />
        </div>

        {/* Custom Message */}
        <div className="space-y-2">
          <Label htmlFor="custom-message">Custom Message *</Label>
          <Textarea
            id="custom-message"
            placeholder="Write your personalized offer message here..."
            rows={5}
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
          />
        </div>

        {/* Referral Link */}
        <div className="space-y-2">
          <Label htmlFor="referral-link">Referral Link</Label>
          <div className="flex gap-2">
            <Input
              id="referral-link"
              placeholder="Generate or paste custom referral link"
              value={referralLink}
              onChange={(e) => setReferralLink(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={generateReferralLink} 
              variant="outline"
              className="flex items-center gap-2"
            >
              <Link2 className="h-4 w-4" />
              Generate
            </Button>
          </div>
          <p className="text-sm text-gray-500">
            Leave empty to auto-generate a unique referral link
          </p>
        </div>

        {/* Send Button */}
        <div className="pt-4">
          <Button
            onClick={sendManualOffer}
            disabled={sending || !selectedCustomer || !offerTitle || !customMessage}
            className="w-full flex items-center gap-2"
          >
            {sending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending Offer...
              </>
            ) : (
              <>
                <div className="flex items-center gap-1">
                  <Bell className="h-4 w-4" />
                  <Mail className="h-4 w-4" />
                </div>
                Send Custom Offer
              </>
            )}
          </Button>
        </div>

        {/* Preview Section */}
        {selectedCustomer && offerTitle && customMessage && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Preview</h4>
            <div className="space-y-2 text-sm">
              <p><strong>To:</strong> {allCustomers.find(c => c.id === selectedCustomer)?.name}</p>
              <p><strong>Email:</strong> {allCustomers.find(c => c.id === selectedCustomer)?.email}</p>
              <p><strong>Title:</strong> {offerTitle}</p>
              <p><strong>Message:</strong> {customMessage}</p>
              {referralLink && <p><strong>Referral Link:</strong> {referralLink}</p>}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ManualOfferPanel;
