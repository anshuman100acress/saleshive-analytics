
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BarChart,
  PieChart,
  LineChart,
  Line,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Pie,
} from 'recharts';
import {
  Download,
  Calendar,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  ChevronDown,
} from 'lucide-react';
import { teamPerformance } from '@/lib/data';

// Sample data for charts
const leadStatusData = [
  { name: 'New', value: 35, color: '#3b82f6' },
  { name: 'In Progress', value: 42, color: '#f59e0b' },
  { name: 'Visit Scheduled', value: 15, color: '#8b5cf6' },
  { name: 'Visit Done', value: 12, color: '#6366f1' },
  { name: 'Converted', value: 10, color: '#10b981' },
  { name: 'Lost', value: 6, color: '#ef4444' },
];

const callStatusData = [
  { name: 'Connected', value: 68, color: '#10b981' },
  { name: 'Disconnected', value: 22, color: '#ef4444' },
  { name: 'Switched Off', value: 10, color: '#9ca3af' },
];

const weeklyLeadData = [
  { name: 'Mon', new: 5, inProgress: 7, converted: 1 },
  { name: 'Tue', new: 7, inProgress: 8, converted: 2 },
  { name: 'Wed', new: 9, inProgress: 10, converted: 3 },
  { name: 'Thu', new: 6, inProgress: 9, converted: 1 },
  { name: 'Fri', new: 8, inProgress: 12, converted: 2 },
  { name: 'Sat', new: 4, inProgress: 6, converted: 1 },
  { name: 'Sun', new: 3, inProgress: 5, converted: 0 },
];

const monthlyConversionData = [
  { name: 'Jan', value: 12 },
  { name: 'Feb', value: 15 },
  { name: 'Mar', value: 18 },
  { name: 'Apr', value: 16 },
  { name: 'May', value: 22 },
  { name: 'Jun', value: 24 },
];

const responseTimeData = [
  { name: 'Week 1', value: 3.2 },
  { name: 'Week 2', value: 2.8 },
  { name: 'Week 3', value: 2.5 },
  { name: 'Week 4', value: 2.2 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#FF6B6B'];

const Reports = () => {
  const { user } = useAuth();
  const [timeFilter, setTimeFilter] = useState('month');

  if (!user) {
    return <div>Loading...</div>;
  }

  // Simple random metric generator for demonstration
  const getRandomMetric = (min: number, max: number, isPercentage = false) => {
    const value = Math.floor(Math.random() * (max - min + 1)) + min;
    return isPercentage ? `${value}%` : value;
  };

  // Sample metrics based on user role
  const metrics = {
    totalLeads: user.role === 'director' ? 120 : user.role === 'salesHead' ? 75 : user.role === 'teamLeader' ? 45 : 15,
    conversion: getRandomMetric(15, 35, true),
    avgResponseTime: getRandomMetric(2, 5) + ' hours',
    callsPerDay: getRandomMetric(10, 30),
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Reports & Analytics</h2>
        <div className="flex items-center space-x-2">
          <Select defaultValue={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="w-[180px]">
              <div className="flex items-center">
                <Calendar size={16} className="mr-2" />
                <SelectValue placeholder="Time Period" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Last Week</SelectItem>
              <SelectItem value="month">Last Month</SelectItem>
              <SelectItem value="quarter">Last Quarter</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <RefreshCw size={16} className="mr-2" />
            Refresh
          </Button>
          <Button>
            <Download size={16} className="mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col space-y-2">
              <span className="text-sm text-muted-foreground">Total Leads</span>
              <span className="text-3xl font-bold">{metrics.totalLeads}</span>
              <div className="flex items-center text-sm text-green-600">
                <TrendingUp size={16} className="mr-1" />
                <span>+{getRandomMetric(5, 15)}% from last {timeFilter}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col space-y-2">
              <span className="text-sm text-muted-foreground">Conversion Rate</span>
              <span className="text-3xl font-bold">{metrics.conversion}</span>
              <div className="flex items-center text-sm text-green-600">
                <TrendingUp size={16} className="mr-1" />
                <span>+{getRandomMetric(1, 8)}% from last {timeFilter}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col space-y-2">
              <span className="text-sm text-muted-foreground">Avg. Response Time</span>
              <span className="text-3xl font-bold">{metrics.avgResponseTime}</span>
              <div className="flex items-center text-sm text-red-600">
                <TrendingDown size={16} className="mr-1" />
                <span>-{getRandomMetric(5, 20)}% from last {timeFilter}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col space-y-2">
              <span className="text-sm text-muted-foreground">Calls Per Day</span>
              <span className="text-3xl font-bold">{metrics.callsPerDay}</span>
              <div className="flex items-center text-sm text-green-600">
                <TrendingUp size={16} className="mr-1" />
                <span>+{getRandomMetric(3, 12)}% from last {timeFilter}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Reports Tabs */}
      <Tabs defaultValue="overview">
        <TabsList className="w-full justify-start mb-4 overflow-x-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="leads">Lead Analysis</TabsTrigger>
          <TabsTrigger value="performance">Team Performance</TabsTrigger>
          <TabsTrigger value="conversion">Conversion Metrics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Lead Status Distribution</CardTitle>
                <CardDescription>
                  Breakdown of leads by their current status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={leadStatusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {leadStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Weekly Lead Activity</CardTitle>
                <CardDescription>
                  New, in-progress, and converted leads by day
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weeklyLeadData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="new" name="New Leads" fill="#3b82f6" />
                      <Bar dataKey="inProgress" name="In Progress" fill="#f59e0b" />
                      <Bar dataKey="converted" name="Converted" fill="#10b981" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Call Status Breakdown</CardTitle>
                <CardDescription>
                  Distribution of call outcomes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={callStatusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {callStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Monthly Conversion Trend</CardTitle>
                <CardDescription>
                  Lead conversions over the past 6 months
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyConversionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="value"
                        name="Conversions"
                        stroke="#10b981"
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="leads">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Lead Sources</CardTitle>
                <CardDescription>
                  Where leads are coming from
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Website', value: 45, color: '#3b82f6' },
                          { name: 'Referrals', value: 25, color: '#10b981' },
                          { name: 'Property Portal', value: 15, color: '#f59e0b' },
                          { name: 'Social Media', value: 10, color: '#8b5cf6' },
                          { name: 'Other', value: 5, color: '#9ca3af' },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {leadStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Property Interest</CardTitle>
                <CardDescription>
                  Types of properties leads are interested in
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: '1 BHK', value: 35 },
                        { name: '2 BHK', value: 45 },
                        { name: '3 BHK', value: 30 },
                        { name: '4+ BHK', value: 15 },
                        { name: 'Commercial', value: 25 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" name="Leads" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Lead-to-Visit Conversion</CardTitle>
                <CardDescription>
                  How many leads convert to property visits
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Visit Scheduled', value: 27, color: '#8b5cf6' },
                          { name: 'No Visit', value: 73, color: '#9ca3af' },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        <Cell fill="#8b5cf6" />
                        <Cell fill="#9ca3af" />
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Lead Response Time</CardTitle>
                <CardDescription>
                  Average time to first contact with leads
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={responseTimeData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="value"
                        name="Hours"
                        stroke="#ef4444"
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="performance">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Team Performance Comparison</CardTitle>
                <CardDescription>
                  Conversion rates by team
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={teamPerformance}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="teamName" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="conversionRate" name="Conversion Rate (%)" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Average Response Time by Team</CardTitle>
                <CardDescription>
                  How quickly teams respond to leads (in hours)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={teamPerformance}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="teamName" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="avgResponseTime" name="Avg. Response Time (hrs)" fill="#ef4444" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Team Activity</CardTitle>
                <CardDescription>
                  Calls made by each team per day
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: 'North Team', value: Math.floor(Math.random() * 20) + 15 },
                        { name: 'South Team', value: Math.floor(Math.random() * 20) + 15 },
                        { name: 'East Team', value: Math.floor(Math.random() * 20) + 15 },
                        { name: 'West Team', value: Math.floor(Math.random() * 20) + 15 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" name="Avg. Daily Calls" fill="#8b5cf6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Top Performers</CardTitle>
                <CardDescription>
                  Sales executives with highest conversion rates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      layout="vertical"
                      data={[
                        { name: 'Lisa Executive', rate: 38 },
                        { name: 'David Executive', rate: 32 },
                        { name: 'Robert Executive', rate: 28 },
                        { name: 'Emma Wilson', rate: 25 },
                        { name: 'John Smith', rate: 22 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={100} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="rate" name="Conversion Rate (%)" fill="#10b981" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="conversion">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Conversion Funnel</CardTitle>
                <CardDescription>
                  Lead progression through the sales funnel
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: 'New Leads', value: 100 },
                        { name: 'Contacted', value: 75 },
                        { name: 'Meeting Set', value: 42 },
                        { name: 'Visit Done', value: 28 },
                        { name: 'Proposal', value: 20 },
                        { name: 'Converted', value: 12 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" name="Leads" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Conversion Rate by Property Type</CardTitle>
                <CardDescription>
                  Which property types convert better
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: '1 BHK', value: 18 },
                        { name: '2 BHK', value: 25 },
                        { name: '3 BHK', value: 22 },
                        { name: '4+ BHK', value: 15 },
                        { name: 'Commercial', value: 30 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" name="Conversion Rate (%)" fill="#10b981" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Lead Source Effectiveness</CardTitle>
                <CardDescription>
                  Conversion rates by lead source
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: 'Website', value: 12 },
                        { name: 'Referrals', value: 28 },
                        { name: 'Property Portal', value: 18 },
                        { name: 'Social Media', value: 15 },
                        { name: 'Other', value: 10 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" name="Conversion Rate (%)" fill="#8b5cf6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Follow-up Impact</CardTitle>
                <CardDescription>
                  Conversion rates by number of follow-ups
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        { name: '1', value: 5 },
                        { name: '2', value: 12 },
                        { name: '3', value: 20 },
                        { name: '4', value: 25 },
                        { name: '5+', value: 32 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" label={{ value: 'Number of Follow-ups', position: 'insideBottom', offset: -5 }} />
                      <YAxis label={{ value: 'Conversion Rate (%)', angle: -90, position: 'insideLeft' }} />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="value"
                        name="Conversion Rate"
                        stroke="#3b82f6"
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;
