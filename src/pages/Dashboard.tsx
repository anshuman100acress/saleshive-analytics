
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BarChart2,
  Clock,
  Users,
  PhoneCall,
  Calendar,
  ArrowUp,
  ArrowDown,
  Check,
  AlertTriangle,
  FileText,
} from 'lucide-react';
import { dashboardStats, leads, getTeamLeadersForSalesHead, getSalesExecutivesForTeamLeader, users } from '@/lib/data';
import { UserRole, Lead } from '@/types';

const DashboardStatCard = ({
  title,
  value,
  icon,
  description,
  changeValue,
  changeDirection,
  bgColor = 'bg-white',
  textColor = 'text-gray-700',
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  changeValue?: number;
  changeDirection?: 'up' | 'down' | 'neutral';
  bgColor?: string;
  textColor?: string;
}) => (
  <Card className={`${bgColor} border-none shadow-sm hover:shadow transition-shadow`}>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      <div className={`p-2 rounded-full ${textColor} bg-opacity-10`}>{icon}</div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {description && (
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      )}
      {changeValue !== undefined && (
        <div className="flex items-center mt-2">
          <span
            className={`text-xs font-medium flex items-center ${
              changeDirection === 'up'
                ? 'text-green-600'
                : changeDirection === 'down'
                ? 'text-red-600'
                : 'text-gray-500'
            }`}
          >
            {changeDirection === 'up' ? (
              <ArrowUp size={12} className="mr-1" />
            ) : changeDirection === 'down' ? (
              <ArrowDown size={12} className="mr-1" />
            ) : null}
            {changeValue}%
          </span>
          <span className="text-xs text-muted-foreground ml-1">vs last month</span>
        </div>
      )}
    </CardContent>
  </Card>
);

const RecentLeadsTable = ({ leads }: { leads: Lead[] }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Call Status</th>
            <th>Assigned To</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {leads.slice(0, 5).map((lead) => {
            const assignedUser = users.find(user => user.id === lead.assignedTo);

            return (
              <tr key={lead.id}>
                <td className="font-medium">{lead.name}</td>
                <td>
                  <span className={`status-badge status-${lead.status.toLowerCase()}`}>
                    {lead.status.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                </td>
                <td>
                  <span className={`status-badge call-${lead.callStatus.toLowerCase()}`}>
                    {lead.callStatus.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                </td>
                <td>
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs mr-2 overflow-hidden">
                      {assignedUser?.avatar ? (
                        <img src={assignedUser.avatar} alt={assignedUser?.name} className="w-full h-full object-cover" />
                      ) : (
                        assignedUser?.name.substring(0, 2)
                      )}
                    </div>
                    <span>{assignedUser?.name}</span>
                  </div>
                </td>
                <td>
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const PendingFollowUpsTable = ({ leads }: { leads: Lead[] }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Follow-Up Date</th>
            <th>Status</th>
            <th>Assigned To</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {leads.slice(0, 5).map((lead) => {
            const assignedUser = users.find(user => user.id === lead.assignedTo);
            
            // For demo, we'll just use random dates for follow-ups
            const followUpDate = new Date();
            followUpDate.setDate(followUpDate.getDate() + Math.floor(Math.random() * 7));
            
            return (
              <tr key={lead.id}>
                <td className="font-medium">{lead.name}</td>
                <td>{followUpDate.toLocaleDateString()}</td>
                <td>
                  <span className={`status-badge status-${lead.status.toLowerCase()}`}>
                    {lead.status.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                </td>
                <td>
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs mr-2 overflow-hidden">
                      {assignedUser?.avatar ? (
                        <img src={assignedUser.avatar} alt={assignedUser?.name} className="w-full h-full object-cover" />
                      ) : (
                        assignedUser?.name.substring(0, 2)
                      )}
                    </div>
                    <span>{assignedUser?.name}</span>
                  </div>
                </td>
                <td>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="sm">
                      Call
                    </Button>
                    <Button variant="ghost" size="sm">
                      Reschedule
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const Dashboard = () => {
  const { user } = useAuth();
  
  if (!user) {
    return <div>Loading...</div>;
  }

  let teamMemberCount = 0;
  let teamLeaderCount = 0;
  let salesExecutiveCount = 0;

  if (user.role === 'director') {
    teamLeaderCount = users.filter(u => u.role === 'teamLeader').length;
    salesExecutiveCount = users.filter(u => u.role === 'salesExecutive').length;
    teamMemberCount = teamLeaderCount + salesExecutiveCount;
  } else if (user.role === 'salesHead') {
    const teamLeaders = getTeamLeadersForSalesHead(user.id);
    teamLeaderCount = teamLeaders.length;
    
    let executives: string[] = [];
    teamLeaders.forEach(tl => {
      const tlExecutives = getSalesExecutivesForTeamLeader(tl.id);
      executives = [...executives, ...tlExecutives.map(e => e.id)];
    });
    
    salesExecutiveCount = executives.length;
    teamMemberCount = teamLeaderCount + salesExecutiveCount;
  } else if (user.role === 'teamLeader') {
    const executives = getSalesExecutivesForTeamLeader(user.id);
    salesExecutiveCount = executives.length;
    teamMemberCount = salesExecutiveCount;
  }

  // Modify stats based on user role
  let stats = { ...dashboardStats };
  if (user.role !== 'director') {
    // Reduce numbers for non-directors to make them more realistic
    const factor = user.role === 'salesHead' ? 0.5 : user.role === 'teamLeader' ? 0.3 : 0.1;
    
    Object.keys(stats).forEach(key => {
      if (typeof stats[key as keyof typeof stats] === 'number') {
        stats[key as keyof typeof stats] = Math.round((stats[key as keyof typeof stats] as number) * factor);
      }
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Calendar size={16} className="mr-2" />
            June 2023
          </Button>
          <Button>
            <FileText size={16} className="mr-2" />
            Download Report
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardStatCard
          title="Total Leads"
          value={stats.totalLeads}
          icon={<FileText size={18} />}
          changeValue={7.2}
          changeDirection="up"
        />
        <DashboardStatCard
          title="Conversion Rate"
          value={`${Math.round((stats.convertedLeads / stats.totalLeads) * 100)}%`}
          icon={<BarChart2 size={18} />}
          changeValue={2.5}
          changeDirection="up"
          bgColor="bg-blue-50"
          textColor="text-blue-600"
        />
        <DashboardStatCard
          title="Team Members"
          value={teamMemberCount}
          icon={<Users size={18} />}
          description={`${teamLeaderCount} Leaders, ${salesExecutiveCount} Executives`}
        />
        <DashboardStatCard
          title="Pending Follow-ups"
          value={stats.pendingFollowUps}
          icon={<Clock size={18} />}
          changeValue={3.1}
          changeDirection="down"
          bgColor="bg-amber-50"
          textColor="text-amber-600"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardStatCard
          title="Today's Calls"
          value={stats.todayCalls}
          icon={<PhoneCall size={18} />}
        />
        <DashboardStatCard
          title="New Leads"
          value={stats.newLeads}
          icon={<FileText size={18} />}
          bgColor="bg-green-50"
          textColor="text-green-600"
        />
        <DashboardStatCard
          title="Visits Scheduled"
          value={stats.visitScheduledLeads}
          icon={<Calendar size={18} />}
        />
        <DashboardStatCard
          title="Visits Completed"
          value={stats.visitDoneLeads}
          icon={<Check size={18} />}
          bgColor="bg-purple-50"
          textColor="text-purple-600"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Leads Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-8 gap-2 flex-wrap">
              <div className="flex items-center space-x-2 whitespace-nowrap">
                <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                <span className="text-sm">New ({stats.newLeads})</span>
              </div>
              <div className="flex items-center space-x-2 whitespace-nowrap">
                <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                <span className="text-sm">In Progress ({stats.inProgressLeads})</span>
              </div>
              <div className="flex items-center space-x-2 whitespace-nowrap">
                <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                <span className="text-sm">Visit Scheduled ({stats.visitScheduledLeads})</span>
              </div>
              <div className="flex items-center space-x-2 whitespace-nowrap">
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                <span className="text-sm">Converted ({stats.convertedLeads})</span>
              </div>
              <div className="flex items-center space-x-2 whitespace-nowrap">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <span className="text-sm">Lost ({stats.lostLeads})</span>
              </div>
            </div>

            <div className="h-48 flex items-end space-x-6 px-4">
              <div className="w-1/5 flex flex-col items-center space-y-1">
                <div className="bg-blue-500 w-full" style={{ height: `${(stats.newLeads / stats.totalLeads) * 100}%` }}></div>
                <span className="text-xs text-gray-500">New</span>
              </div>
              <div className="w-1/5 flex flex-col items-center space-y-1">
                <div className="bg-amber-500 w-full" style={{ height: `${(stats.inProgressLeads / stats.totalLeads) * 100}%` }}></div>
                <span className="text-xs text-gray-500">In Progress</span>
              </div>
              <div className="w-1/5 flex flex-col items-center space-y-1">
                <div className="bg-purple-500 w-full" style={{ height: `${(stats.visitScheduledLeads / stats.totalLeads) * 100}%` }}></div>
                <span className="text-xs text-gray-500">Visit Scheduled</span>
              </div>
              <div className="w-1/5 flex flex-col items-center space-y-1">
                <div className="bg-green-500 w-full" style={{ height: `${(stats.convertedLeads / stats.totalLeads) * 100}%` }}></div>
                <span className="text-xs text-gray-500">Converted</span>
              </div>
              <div className="w-1/5 flex flex-col items-center space-y-1">
                <div className="bg-red-500 w-full" style={{ height: `${(stats.lostLeads / stats.totalLeads) * 100}%` }}></div>
                <span className="text-xs text-gray-500">Lost</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Call Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card className="bg-green-50 border-none shadow-sm">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-green-100 p-3 rounded-full text-green-600 mb-3">
                      <PhoneCall size={24} />
                    </div>
                    <div className="text-2xl font-bold text-green-600">
                      {Math.round(stats.todayCalls * 0.7)}
                    </div>
                    <div className="text-sm text-green-700">Connected</div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-red-50 border-none shadow-sm">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-red-100 p-3 rounded-full text-red-600 mb-3">
                      <AlertTriangle size={24} />
                    </div>
                    <div className="text-2xl font-bold text-red-600">
                      {Math.round(stats.todayCalls * 0.2)}
                    </div>
                    <div className="text-sm text-red-700">Disconnected</div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-50 border-none shadow-sm">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-gray-100 p-3 rounded-full text-gray-600 mb-3">
                      <PhoneCall size={24} className="opacity-50" />
                    </div>
                    <div className="text-2xl font-bold text-gray-600">
                      {Math.round(stats.todayCalls * 0.1)}
                    </div>
                    <div className="text-sm text-gray-700">Switched Off</div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="h-36 relative mt-4">
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                Call history chart will be displayed here
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <Tabs defaultValue="leads">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="leads">Recent Leads</TabsTrigger>
              <TabsTrigger value="followups">Pending Follow-ups</TabsTrigger>
            </TabsList>
            <Button variant="ghost">View All</Button>
          </div>
          <TabsContent value="leads">
            <Card>
              <CardContent className="p-0">
                <RecentLeadsTable leads={leads} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="followups">
            <Card>
              <CardContent className="p-0">
                <PendingFollowUpsTable leads={leads} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
