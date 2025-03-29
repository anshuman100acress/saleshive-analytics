
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Bell,
  User,
  Lock,
  Mail,
  Shield,
  RefreshCw,
  Upload,
  Smartphone,
  Save,
} from 'lucide-react';

const Settings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleSaveSettings = (settingType: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: 'Settings updated',
        description: `Your ${settingType} settings have been updated successfully.`,
      });
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-0.5">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>

      <Tabs defaultValue="profile">
        <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
          <aside className="md:w-[200px] lg:w-[250px] flex-shrink-0">
            <TabsList className="flex flex-col h-auto p-0 bg-transparent space-y-1">
              <TabsTrigger value="profile" className="justify-start text-left px-3 py-2">
                <User size={16} className="mr-2" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="account" className="justify-start text-left px-3 py-2">
                <Lock size={16} className="mr-2" />
                Account
              </TabsTrigger>
              <TabsTrigger value="notifications" className="justify-start text-left px-3 py-2">
                <Bell size={16} className="mr-2" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="mobile" className="justify-start text-left px-3 py-2">
                <Smartphone size={16} className="mr-2" />
                Mobile App
              </TabsTrigger>
              {(user.role === 'director' || user.role === 'salesHead') && (
                <TabsTrigger value="security" className="justify-start text-left px-3 py-2">
                  <Shield size={16} className="mr-2" />
                  Security
                </TabsTrigger>
              )}
            </TabsList>
          </aside>
          <div className="flex-1">
            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Update your profile information and personal details.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 sm:items-center">
                    <div className="flex-shrink-0">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="text-lg">{user.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
                      <Button variant="outline" size="sm">
                        <Upload size={14} className="mr-2" />
                        Change Photo
                      </Button>
                      <Button variant="ghost" size="sm">
                        Remove
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="full-name">Full Name</Label>
                      <Input id="full-name" defaultValue={user.name} />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="display-name">Display Name</Label>
                      <Input id="display-name" defaultValue={user.name.split(' ')[0]} />
                    </div>
                  </div>
                  
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue={user.email} />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" defaultValue={user.phone || ''} />
                    </div>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea id="bio" placeholder="Write a short bio about yourself" />
                  </div>
                  
                  <Button onClick={() => handleSaveSettings('profile')}>
                    {isLoading ? (
                      <>
                        <RefreshCw size={16} className="mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save size={16} className="mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="account" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>
                    Update your account preferences and password.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Change Password</h3>
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input id="current-password" type="password" />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                    </div>
                    <Button onClick={() => handleSaveSettings('password')}>
                      Update Password
                    </Button>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Language & Region</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="grid gap-2">
                        <Label htmlFor="language">Language</Label>
                        <select
                          id="language"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="en-US">English (United States)</option>
                          <option value="en-GB">English (United Kingdom)</option>
                          <option value="es">Spanish</option>
                          <option value="fr">French</option>
                          <option value="de">German</option>
                        </select>
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="timezone">Timezone</Label>
                        <select
                          id="timezone"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="UTC-8">Pacific Time (UTC-8)</option>
                          <option value="UTC-5">Eastern Time (UTC-5)</option>
                          <option value="UTC+0">Greenwich Mean Time (UTC+0)</option>
                          <option value="UTC+1">Central European Time (UTC+1)</option>
                          <option value="UTC+5:30">Indian Standard Time (UTC+5:30)</option>
                        </select>
                      </div>
                    </div>
                    <Button variant="outline" onClick={() => handleSaveSettings('region')}>
                      Save Preferences
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>
                    Configure how and when you receive notifications.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Email Notifications</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="email-lead-assignments">Lead Assignments</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive an email when a new lead is assigned to you
                          </p>
                        </div>
                        <Switch id="email-lead-assignments" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="email-follow-ups">Follow-up Reminders</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive an email for scheduled follow-ups
                          </p>
                        </div>
                        <Switch id="email-follow-ups" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="email-status-updates">Status Updates</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive an email when a lead status changes
                          </p>
                        </div>
                        <Switch id="email-status-updates" />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="email-performance">Performance Reports</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive weekly performance reports via email
                          </p>
                        </div>
                        <Switch id="email-performance" defaultChecked />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Push Notifications</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="push-new-lead">New Lead Alerts</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive push notifications for new leads
                          </p>
                        </div>
                        <Switch id="push-new-lead" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="push-follow-ups">Follow-up Alerts</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive push notifications for upcoming follow-ups
                          </p>
                        </div>
                        <Switch id="push-follow-ups" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="push-messages">Team Messages</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive push notifications for team messages
                          </p>
                        </div>
                        <Switch id="push-messages" />
                      </div>
                    </div>
                  </div>
                  
                  <Button onClick={() => handleSaveSettings('notifications')}>
                    Save Notification Settings
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="mobile" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Mobile App Settings</CardTitle>
                  <CardDescription>
                    Configure your mobile app preferences and synchronization.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h3 className="text-base font-medium">Mobile App Status</h3>
                      <p className="text-sm text-muted-foreground">
                        The mobile app is available for iOS and Android
                      </p>
                    </div>
                    <Button>
                      <Smartphone size={16} className="mr-2" />
                      Download App
                    </Button>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Data Synchronization</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="sync-cellular">Sync on Cellular Data</Label>
                          <p className="text-sm text-muted-foreground">
                            Enable data synchronization when on cellular network
                          </p>
                        </div>
                        <Switch id="sync-cellular" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="background-sync">Background Sync</Label>
                          <p className="text-sm text-muted-foreground">
                            Keep data synchronized in the background
                          </p>
                        </div>
                        <Switch id="background-sync" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="offline-access">Offline Access</Label>
                          <p className="text-sm text-muted-foreground">
                            Cache data for offline access to leads and contacts
                          </p>
                        </div>
                        <Switch id="offline-access" defaultChecked />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Mobile Notifications</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="mobile-lead-notifications">Lead Notifications</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive mobile notifications for new and updated leads
                          </p>
                        </div>
                        <Switch id="mobile-lead-notifications" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="mobile-follow-up">Follow-up Reminders</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive follow-up reminders with customizable timing
                          </p>
                        </div>
                        <Switch id="mobile-follow-up" defaultChecked />
                      </div>
                    </div>
                  </div>
                  
                  <Button onClick={() => handleSaveSettings('mobile')}>
                    Save Mobile Settings
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            {(user.role === 'director' || user.role === 'salesHead') && (
              <TabsContent value="security" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>
                      Configure security settings and access controls.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="enable-2fa">Enable 2FA</Label>
                            <p className="text-sm text-muted-foreground">
                              Require two-factor authentication for login
                            </p>
                          </div>
                          <Switch id="enable-2fa" />
                        </div>
                      </div>
                      <Button variant="outline">Set Up Two-Factor Authentication</Button>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Session Management</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="session-timeout">Session Timeout</Label>
                            <p className="text-sm text-muted-foreground">
                              Automatically log out after a period of inactivity
                            </p>
                          </div>
                          <select
                            id="session-timeout"
                            className="w-32 rounded-md border border-input bg-transparent px-3 py-1 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                          >
                            <option value="15">15 minutes</option>
                            <option value="30">30 minutes</option>
                            <option value="60">1 hour</option>
                            <option value="120">2 hours</option>
                            <option value="never">Never</option>
                          </select>
                        </div>
                      </div>
                      <Button variant="destructive">Revoke All Sessions</Button>
                    </div>
                    
                    {user.role === 'director' && (
                      <>
                        <Separator />
                        
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">Data Access Controls</h3>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label htmlFor="restrict-export">Restrict Data Export</Label>
                                <p className="text-sm text-muted-foreground">
                                  Only allow directors and sales heads to export data
                                </p>
                              </div>
                              <Switch id="restrict-export" defaultChecked />
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label htmlFor="audit-trail">Activity Audit Trail</Label>
                                <p className="text-sm text-muted-foreground">
                                  Log all user actions for security auditing
                                </p>
                              </div>
                              <Switch id="audit-trail" defaultChecked />
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    
                    <Button onClick={() => handleSaveSettings('security')}>
                      Save Security Settings
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            )}
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default Settings;
