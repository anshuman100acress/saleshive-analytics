
import { User, Lead, CallLog, Activity, UserRole, LeadStatus, CallStatus, DashboardStats, TeamPerformance } from '../types';

// Mock users data
export const users: User[] = [
  {
    id: 'user-1',
    name: 'John Director',
    email: 'john@example.com',
    role: 'director',
    avatar: 'https://ui-avatars.com/api/?name=John+Director&background=1e40af&color=fff',
    phone: '+1234567890',
    createdAt: '2023-01-01T00:00:00Z',
  },
  {
    id: 'user-2',
    name: 'Sarah Head',
    email: 'sarah@example.com',
    role: 'salesHead',
    avatar: 'https://ui-avatars.com/api/?name=Sarah+Head&background=3b82f6&color=fff',
    phone: '+1234567891',
    parentId: 'user-1',
    createdAt: '2023-01-02T00:00:00Z',
  },
  {
    id: 'user-3',
    name: 'Mike Leader',
    email: 'mike@example.com',
    role: 'teamLeader',
    avatar: 'https://ui-avatars.com/api/?name=Mike+Leader&background=60a5fa&color=fff',
    phone: '+1234567892',
    parentId: 'user-2',
    createdAt: '2023-01-03T00:00:00Z',
  },
  {
    id: 'user-4',
    name: 'Lisa Executive',
    email: 'lisa@example.com',
    role: 'salesExecutive',
    avatar: 'https://ui-avatars.com/api/?name=Lisa+Executive&background=93c5fd&color=fff',
    phone: '+1234567893',
    parentId: 'user-3',
    createdAt: '2023-01-04T00:00:00Z',
  },
  {
    id: 'user-5',
    name: 'Robert Executive',
    email: 'robert@example.com',
    role: 'salesExecutive',
    avatar: 'https://ui-avatars.com/api/?name=Robert+Executive&background=93c5fd&color=fff',
    phone: '+1234567894',
    parentId: 'user-3',
    createdAt: '2023-01-05T00:00:00Z',
  },
  {
    id: 'user-6',
    name: 'Emily Leader',
    email: 'emily@example.com',
    role: 'teamLeader',
    avatar: 'https://ui-avatars.com/api/?name=Emily+Leader&background=60a5fa&color=fff',
    phone: '+1234567895',
    parentId: 'user-2',
    createdAt: '2023-01-06T00:00:00Z',
  },
  {
    id: 'user-7',
    name: 'David Executive',
    email: 'david@example.com',
    role: 'salesExecutive',
    avatar: 'https://ui-avatars.com/api/?name=David+Executive&background=93c5fd&color=fff',
    phone: '+1234567896',
    parentId: 'user-6',
    createdAt: '2023-01-07T00:00:00Z',
  },
  {
    id: 'user-8',
    name: 'Thomas Head',
    email: 'thomas@example.com',
    role: 'salesHead',
    avatar: 'https://ui-avatars.com/api/?name=Thomas+Head&background=3b82f6&color=fff',
    phone: '+1234567897',
    parentId: 'user-1',
    createdAt: '2023-01-08T00:00:00Z',
  }
];

// Helper function to create a lead
const createLead = (
  id: string,
  name: string,
  phone: string,
  email: string,
  status: LeadStatus,
  callStatus: CallStatus,
  assignedTo: string,
  createdBy: string,
  createdAt: string
): Lead => ({
  id,
  name,
  phone,
  email,
  callStatus,
  status,
  assignedTo,
  createdBy,
  createdAt,
  updatedAt: createdAt,
  propertyInterest: 'Residential',
  budget: '300,000 - 500,000',
});

// Mock leads data
export const leads: Lead[] = [
  createLead('lead-1', 'Alex Johnson', '+1987654321', 'alex@example.com', 'new', 'disconnected', 'user-4', 'user-3', '2023-06-01T10:00:00Z'),
  createLead('lead-2', 'Maria Garcia', '+1987654322', 'maria@example.com', 'inProgress', 'connected', 'user-4', 'user-3', '2023-06-02T10:00:00Z'),
  createLead('lead-3', 'James Wilson', '+1987654323', 'james@example.com', 'visitScheduled', 'connected', 'user-5', 'user-3', '2023-06-03T10:00:00Z'),
  createLead('lead-4', 'Patricia Moore', '+1987654324', 'patricia@example.com', 'visitDone', 'connected', 'user-5', 'user-3', '2023-06-04T10:00:00Z'),
  createLead('lead-5', 'Robert Brown', '+1987654325', 'robert.b@example.com', 'converted', 'connected', 'user-4', 'user-3', '2023-06-05T10:00:00Z'),
  createLead('lead-6', 'Linda Davis', '+1987654326', 'linda@example.com', 'lost', 'switchedOff', 'user-7', 'user-6', '2023-06-06T10:00:00Z'),
  createLead('lead-7', 'Michael Miller', '+1987654327', 'michael@example.com', 'new', 'disconnected', 'user-7', 'user-6', '2023-06-07T10:00:00Z'),
  createLead('lead-8', 'Elizabeth Wilson', '+1987654328', 'elizabeth@example.com', 'inProgress', 'connected', 'user-4', 'user-3', '2023-06-08T10:00:00Z'),
  createLead('lead-9', 'William Moore', '+1987654329', 'william@example.com', 'visitScheduled', 'connected', 'user-5', 'user-3', '2023-06-09T10:00:00Z'),
  createLead('lead-10', 'Jennifer Taylor', '+1987654330', 'jennifer@example.com', 'visitDone', 'connected', 'user-7', 'user-6', '2023-06-10T10:00:00Z'),
  createLead('lead-11', 'David Anderson', '+1987654331', 'david.a@example.com', 'converted', 'connected', 'user-7', 'user-6', '2023-06-11T10:00:00Z'),
  createLead('lead-12', 'Barbara Thomas', '+1987654332', 'barbara@example.com', 'lost', 'switchedOff', 'user-4', 'user-3', '2023-06-12T10:00:00Z'),
];

// Mock call logs data
export const callLogs: CallLog[] = [
  {
    id: 'call-1',
    leadId: 'lead-1',
    userId: 'user-4',
    status: 'disconnected',
    notes: 'No answer',
    duration: 0,
    createdAt: '2023-06-01T10:30:00Z',
  },
  {
    id: 'call-2',
    leadId: 'lead-2',
    userId: 'user-4',
    status: 'connected',
    notes: 'Interested in 3BHK properties',
    duration: 300,
    createdAt: '2023-06-02T11:30:00Z',
  },
  {
    id: 'call-3',
    leadId: 'lead-3',
    userId: 'user-5',
    status: 'connected',
    notes: 'Scheduled visit for next week',
    duration: 450,
    createdAt: '2023-06-03T13:30:00Z',
  },
  {
    id: 'call-4',
    leadId: 'lead-4',
    userId: 'user-5',
    status: 'connected',
    notes: 'Follow-up after visit',
    duration: 600,
    createdAt: '2023-06-05T14:30:00Z',
  },
  {
    id: 'call-5',
    leadId: 'lead-5',
    userId: 'user-4',
    status: 'connected',
    notes: 'Confirmed purchase decision',
    duration: 900,
    createdAt: '2023-06-06T15:30:00Z',
  },
  {
    id: 'call-6',
    leadId: 'lead-6',
    userId: 'user-7',
    status: 'switchedOff',
    notes: 'Phone switched off, sent email',
    duration: 0,
    createdAt: '2023-06-07T16:30:00Z',
  },
];

// Mock activities data
export const activities: Activity[] = [
  {
    id: 'activity-1',
    userId: 'user-3',
    leadId: 'lead-1',
    action: 'assigned',
    description: 'Assigned lead to Lisa Executive',
    timestamp: '2023-06-01T10:00:00Z',
  },
  {
    id: 'activity-2',
    userId: 'user-4',
    leadId: 'lead-1',
    action: 'call',
    description: 'Attempted to call lead',
    timestamp: '2023-06-01T10:30:00Z',
  },
  {
    id: 'activity-3',
    userId: 'user-4',
    leadId: 'lead-2',
    action: 'call',
    description: 'Connected with lead, discussed requirements',
    timestamp: '2023-06-02T11:30:00Z',
  },
  {
    id: 'activity-4',
    userId: 'user-5',
    leadId: 'lead-3',
    action: 'update',
    description: 'Scheduled property visit',
    timestamp: '2023-06-03T13:30:00Z',
  },
  {
    id: 'activity-5',
    userId: 'user-5',
    leadId: 'lead-4',
    action: 'update',
    description: 'Completed property visit',
    timestamp: '2023-06-04T16:00:00Z',
  },
  {
    id: 'activity-6',
    userId: 'user-4',
    leadId: 'lead-5',
    action: 'update',
    description: 'Marked lead as converted',
    timestamp: '2023-06-06T15:30:00Z',
  },
];

// Mock dashboard stats
export const dashboardStats: DashboardStats = {
  totalLeads: 120,
  newLeads: 35,
  inProgressLeads: 42,
  visitScheduledLeads: 15,
  visitDoneLeads: 12,
  convertedLeads: 10,
  lostLeads: 6,
  todayCalls: 24,
  pendingFollowUps: 18,
};

// Mock team performance
export const teamPerformance: TeamPerformance[] = [
  {
    teamId: 'team-1',
    teamName: 'North Region Team',
    totalLeads: 50,
    convertedLeads: 15,
    conversionRate: 30,
    avgResponseTime: 2.5,
  },
  {
    teamId: 'team-2',
    teamName: 'South Region Team',
    totalLeads: 45,
    convertedLeads: 12,
    conversionRate: 26.7,
    avgResponseTime: 3.2,
  },
  {
    teamId: 'team-3',
    teamName: 'East Region Team',
    totalLeads: 38,
    convertedLeads: 10,
    conversionRate: 26.3,
    avgResponseTime: 4.0,
  },
  {
    teamId: 'team-4',
    teamName: 'West Region Team',
    totalLeads: 42,
    convertedLeads: 13,
    conversionRate: 31.0,
    avgResponseTime: 2.8,
  },
];

// Helper functions to filter data by role and user
export const getUsersByRole = (role: UserRole): User[] => {
  return users.filter(user => user.role === role);
};

export const getSubordinates = (userId: string): User[] => {
  return users.filter(user => user.parentId === userId);
};

export const getLeadsByAssignee = (userId: string): Lead[] => {
  return leads.filter(lead => lead.assignedTo === userId);
};

export const getCallLogsByUser = (userId: string): CallLog[] => {
  return callLogs.filter(log => log.userId === userId);
};

export const getActivitiesByUser = (userId: string): Activity[] => {
  return activities.filter(activity => activity.userId === userId);
};

export const getActivitiesByLead = (leadId: string): Activity[] => {
  return activities.filter(activity => activity.leadId === leadId);
};

export const getCurrentUser = (): User => {
  // For demo purposes, return the first user
  return users[0];
};

export const getTeamLeadersForSalesHead = (salesHeadId: string): User[] => {
  return users.filter(user => user.parentId === salesHeadId && user.role === 'teamLeader');
};

export const getSalesExecutivesForTeamLeader = (teamLeaderId: string): User[] => {
  return users.filter(user => user.parentId === teamLeaderId && user.role === 'salesExecutive');
};

export const getAllLeadsInHierarchy = (userId: string, userRole: UserRole): Lead[] => {
  if (userRole === 'director') {
    return leads;
  }
  
  if (userRole === 'salesHead') {
    const teamLeaders = getTeamLeadersForSalesHead(userId);
    const teamLeaderIds = teamLeaders.map(tl => tl.id);
    const executives: User[] = [];
    
    teamLeaderIds.forEach(tlId => {
      executives.push(...getSalesExecutivesForTeamLeader(tlId));
    });
    
    const executiveIds = executives.map(exec => exec.id);
    return leads.filter(lead => executiveIds.includes(lead.assignedTo));
  }
  
  if (userRole === 'teamLeader') {
    const executives = getSalesExecutivesForTeamLeader(userId);
    const executiveIds = executives.map(exec => exec.id);
    return leads.filter(lead => executiveIds.includes(lead.assignedTo));
  }
  
  return leads.filter(lead => lead.assignedTo === userId);
};
