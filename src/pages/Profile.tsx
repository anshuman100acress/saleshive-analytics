
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import {
  BarChart2,
  Phone,
  Mail,
  Calendar,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle2,
  AlignLeft,
} from 'lucide-react';
import { UserRole } from '@/types';
import { Separator } from '@/components/ui/separator';

const roleColors: Record<UserRole, string> = {
  director: 'bg-purple-100 text-purple-800',
  salesHead: 'bg-blue-100 text-blue-800',
  teamLeader: 'bg-teal-100 text-teal-800',
  salesExecutive: 'bg-green-100 text-green-800',
};

const roleName: Record<UserRole, string> = {
  director: 'Director',
  salesHead: 'Sales Head',
  teamLeader: 'Team Leader',
  salesExecutive: 'Sales Executive',
};

// Generate random performance metrics for demo
const generatePerformanceMetrics = (role: UserRole) => {
  // Different metrics based on role
  if (role === 'director') {
    return {
      teamPerformance: {
        current: 82,
        previous: 75,
        change: 9.3,
      },
      overallConversion: {
        current: 26,
        previous: 22,
        change: 18.2,
      },
      revenue: {
        current: '$1.24M',
        previous: '$980K',
        change: 26.5,
      },
    };
  } else if (role === 'salesHead') {
    return {
      teamSize: 12,
      avgResponseTime: 2.4,
      leadConversion: {
        current: 24,
        previous: 21,
        change: 14.3,
      },
      activeLeads: 56,
    };
  } else if (role === 'teamLeader') {
    return {
      teamSize: 5,
      topPerformer: 'Lisa Executive',
      leadConversion: {
        current: 22,
        previous: 19,
        change: 15.8,
      },
      activeLeads: 32,
    };
  } else {
    return {
      leadsAssigned: 18,
      followUps: 7,
      callsMade: 22,
      conversion: {
        current: 20,
        previous: 16,
        change: 25.0,
      },
    };
  }
};

// Sample activities for the timeline
const recentActivities = [
  {
    id: 1,
    action: 'Assigned new lead',
    target: 'Michael Davis',
    timestamp: 'Today at 10:35 AM',
  },
  {
    id: 2,
    action: 'Updated lead status',
    target: 'Jennifer Wilson',
    details: 'Changed from "In Progress" to "Visit Scheduled"',
    timestamp: 'Yesterday at 3:45 PM',
  },
  {
    id: 3,
    action: 'Completed follow-up call',
    target: 'Robert Johnson',
    details: 'Scheduled for property showing on Saturday',
    timestamp: 'Yesterday at 11:20 AM',
  },
  {
    id: 4,
    action: 'Converted lead',
    target: 'Sarah Thompson',
    details: 'Finalized 3BHK property purchase',
    timestamp: '2 days ago',
  },
  {
    id: 5,
    action: 'Added notes',
    target: 'David Miller',
    details: 'Interested in properties within budget range of $300-400K',
    timestamp: '3 days ago',
  },
];

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return <div>Loading...</div>;
  }

  const metrics = generatePerformanceMetrics(user.role as UserRole);

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-0.5">
        <h2 className="text-3xl font-bold tracking-tight">My Profile</h2>
        <p className="text-muted-foreground">
          View and manage your profile and performance metrics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <Avatar className="h-24 w-24 border-2 border-primary/10">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="text-lg">{user.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <Badge variant="outline" className={`text-xs ${roleColors[user.role as UserRole]}`}>
                  {roleName[user.role as UserRole]}
                </Badge>
              </div>
              
              <div className="w-full pt-4 space-y-3">
                <div className="flex items-center text-sm">
                  <Mail size={16} className="mr-2 text-gray-500" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Phone size={16} className="mr-2 text-gray-500" />
                  <span>{user.phone || 'Not specified'}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Calendar size={16} className="mr-2 text-gray-500" />
                  <span>Member since {new Date(user.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            
            <Separator className="my-6" />
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Performance Overview</h3>
              
              {'teamPerformance' in metrics && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Team Performance</span>
                    <div className="flex items-center text-sm">
                      <span className="font-medium">{metrics.teamPerformance.current}%</span>
                      <span className="text-green-600 text-xs flex items-center ml-1">
                        <TrendingUp size={12} className="mr-0.5" />
                        {metrics.teamPerformance.change}%
                      </span>
                    </div>
                  </div>
                  <Progress value={metrics.teamPerformance.current} className="h-2" />
                </div>
              )}
              
              {'leadConversion' in metrics && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Lead Conversion</span>
                    <div className="flex items-center text-sm">
                      <span className="font-medium">{metrics.leadConversion.current}%</span>
                      <span className="text-green-600 text-xs flex items-center ml-1">
                        <TrendingUp size={12} className="mr-0.5" />
                        {metrics.leadConversion.change}%
                      </span>
                    </div>
                  </div>
                  <Progress value={metrics.leadConversion.current} className="h-2" />
                </div>
              )}
              
              {'conversion' in metrics && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Conversion Rate</span>
                    <div className="flex items-center text-sm">
                      <span className="font-medium">{metrics.conversion.current}%</span>
                      <span className="text-green-600 text-xs flex items-center ml-1">
                        <TrendingUp size={12} className="mr-0.5" />
                        {metrics.conversion.change}%
                      </span>
                    </div>
                  </div>
                  <Progress value={metrics.conversion.current} className="h-2" />
                </div>
              )}
              
              {'overallConversion' in metrics && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Overall Conversion</span>
                    <div className="flex items-center text-sm">
                      <span className="font-medium">{metrics.overallConversion.current}%</span>
                      <span className="text-green-600 text-xs flex items-center ml-1">
                        <TrendingUp size={12} className="mr-0.5" />
                        {metrics.overallConversion.change}%
                      </span>
                    </div>
                  </div>
                  <Progress value={metrics.overallConversion.current} className="h-2" />
                </div>
              )}
            </div>
            
            <Separator className="my-6" />
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Key Metrics</h3>
              
              <div className="grid grid-cols-2 gap-4">
                {'teamSize' in metrics && (
                  <div className="bg-primary/5 rounded-lg p-3">
                    <div className="text-xs text-muted-foreground">Team Size</div>
                    <div className="text-xl font-semibold mt-1">{metrics.teamSize}</div>
                  </div>
                )}
                
                {'avgResponseTime' in metrics && (
                  <div className="bg-primary/5 rounded-lg p-3">
                    <div className="text-xs text-muted-foreground">Avg Response</div>
                    <div className="text-xl font-semibold mt-1">{metrics.avgResponseTime} hrs</div>
                  </div>
                )}
                
                {'activeLeads' in metrics && (
                  <div className="bg-primary/5 rounded-lg p-3">
                    <div className="text-xs text-muted-foreground">Active Leads</div>
                    <div className="text-xl font-semibold mt-1">{metrics.activeLeads}</div>
                  </div>
                )}
                
                {'topPerformer' in metrics && (
                  <div className="bg-primary/5 rounded-lg p-3">
                    <div className="text-xs text-muted-foreground">Top Performer</div>
                    <div className="text-md font-semibold mt-1 truncate">{metrics.topPerformer}</div>
                  </div>
                )}
                
                {'revenue' in metrics && (
                  <div className="bg-primary/5 rounded-lg p-3">
                    <div className="text-xs text-muted-foreground">Revenue</div>
                    <div className="text-xl font-semibold mt-1">{metrics.revenue.current}</div>
                  </div>
                )}
                
                {'leadsAssigned' in metrics && (
                  <div className="bg-primary/5 rounded-lg p-3">
                    <div className="text-xs text-muted-foreground">Leads Assigned</div>
                    <div className="text-xl font-semibold mt-1">{metrics.leadsAssigned}</div>
                  </div>
                )}
                
                {'followUps' in metrics && (
                  <div className="bg-primary/5 rounded-lg p-3">
                    <div className="text-xs text-muted-foreground">Pending Follow-ups</div>
                    <div className="text-xl font-semibold mt-1">{metrics.followUps}</div>
                  </div>
                )}
                
                {'callsMade' in metrics && (
                  <div className="bg-primary/5 rounded-lg p-3">
                    <div className="text-xs text-muted-foreground">Calls Made (Today)</div>
                    <div className="text-xl font-semibold mt-1">{metrics.callsMade}</div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Activity Dashboard</CardTitle>
            <CardDescription>
              Your recent activities and performance metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="activities">
              <TabsList className="mb-6">
                <TabsTrigger value="activities">Recent Activities</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
              </TabsList>
              
              <TabsContent value="activities" className="space-y-4">
                <div className="space-y-6">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex">
                      <div className="mr-4 flex flex-col items-center">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                          {activity.action.includes('Assigned') ? (
                            <Users size={14} className="text-primary" />
                          ) : activity.action.includes('Updated') ? (
                            <RefreshCw size={14} className="text-amber-500" />
                          ) : activity.action.includes('Completed') ? (
                            <CheckCircle2 size={14} className="text-green-500" />
                          ) : activity.action.includes('Converted') ? (
                            <TrendingUp size={14} className="text-green-500" />
                          ) : (
                            <AlignLeft size={14} className="text-blue-500" />
                          )}
                        </div>
                        <div className="h-full w-px bg-border" />
                      </div>
                      <div className="space-y-1 pb-6">
                        <div className="text-sm font-medium">{activity.action}: <span className="font-semibold">{activity.target}</span></div>
                        {activity.details && (
                          <div className="text-sm text-muted-foreground">{activity.details}</div>
                        )}
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock size={12} className="mr-1" />
                          {activity.timestamp}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="performance">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: 'Week 1', calls: 32, leads: 8, conversions: 2 },
                        { name: 'Week 2', calls: 28, leads: 10, conversions: 3 },
                        { name: 'Week 3', calls: 35, leads: 12, conversions: 4 },
                        { name: 'Week 4', calls: 40, leads: 15, conversions: 5 },
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="calls" name="Calls Made" fill="#3b82f6" />
                      <Bar dataKey="leads" name="Leads Worked" fill="#f59e0b" />
                      <Bar dataKey="conversions" name="Conversions" fill="#10b981" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex flex-col items-center">
                        <BarChart2 size={20} className="text-primary mb-2" />
                        <div className="text-xs text-muted-foreground">Monthly Conversion</div>
                        <div className="text-xl font-semibold mt-1">24.5%</div>
                        <div className="text-xs text-green-600 flex items-center">
                          <TrendingUp size={12} className="mr-1" />
                          +3.2%
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex flex-col items-center">
                        <Clock size={20} className="text-amber-500 mb-2" />
                        <div className="text-xs text-muted-foreground">Response Time</div>
                        <div className="text-xl font-semibold mt-1">1.8 hrs</div>
                        <div className="text-xs text-green-600 flex items-center">
                          <TrendingDown size={12} className="mr-1" />
                          -0.4 hrs
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex flex-col items-center">
                        <CheckCircle2 size={20} className="text-green-500 mb-2" />
                        <div className="text-xs text-muted-foreground">Task Completion</div>
                        <div className="text-xl font-semibold mt-1">92%</div>
                        <div className="text-xs text-green-600 flex items-center">
                          <TrendingUp size={12} className="mr-1" />
                          +5%
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="notes">
                <div className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Follow-up Strategy</div>
                      <div className="text-xs text-muted-foreground">Updated 3 days ago</div>
                    </div>
                    <div className="mt-2 text-sm">
                      For high-value leads, follow up within 1 hour of initial contact. Schedule a second follow-up within 48 hours if no response. For standard leads, follow up within 24 hours.
                    </div>
                  </div>
                  
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Property Showcase Tips</div>
                      <div className="text-xs text-muted-foreground">Updated 1 week ago</div>
                    </div>
                    <div className="mt-2 text-sm">
                      Focus on highlighting natural lighting, storage space, and neighborhood amenities. For luxury properties, emphasize unique features and custom finishes. Always discuss potential ROI for investment properties.
                    </div>
                  </div>
                  
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Common Objection Responses</div>
                      <div className="text-xs text-muted-foreground">Updated 2 weeks ago</div>
                    </div>
                    <div className="mt-2 text-sm">
                      Price too high: Focus on value, not just cost. Location concerns: Highlight future development plans and improving areas. Timing issues: Discuss flexible closing options and market timing advantages.
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Import the recharts components for the TabsContent with performance
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export default Profile;
