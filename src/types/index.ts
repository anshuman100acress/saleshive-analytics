
export type UserRole = 'director' | 'salesHead' | 'teamLeader' | 'salesExecutive';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  parentId?: string; // ID of the supervisor
  createdAt: string;
}

export type CallStatus = 'disconnected' | 'switchedOff' | 'connected';

export type LeadStatus = 'new' | 'inProgress' | 'visitScheduled' | 'visitDone' | 'converted' | 'lost';

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  propertyInterest?: string;
  budget?: string;
  callStatus: CallStatus;
  status: LeadStatus;
  notes?: string;
  assignedTo: string; // User ID
  createdBy: string; // User ID
  createdAt: string;
  updatedAt: string;
  followUpDate?: string;
  lastContactDate?: string;
}

export interface CallLog {
  id: string;
  leadId: string;
  userId: string;
  status: CallStatus;
  notes?: string;
  duration?: number;
  createdAt: string;
}

export interface Activity {
  id: string;
  userId: string;
  leadId?: string;
  action: string;
  description: string;
  timestamp: string;
}

export interface DashboardStats {
  totalLeads: number;
  newLeads: number;
  inProgressLeads: number;
  visitScheduledLeads: number;
  visitDoneLeads: number;
  convertedLeads: number;
  lostLeads: number;
  todayCalls: number;
  pendingFollowUps: number;
}

export interface TeamPerformance {
  teamId: string;
  teamName: string;
  totalLeads: number;
  convertedLeads: number;
  conversionRate: number;
  avgResponseTime: number;
}
