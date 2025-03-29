
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Search,
  Phone,
  Calendar,
  Users,
  MoreHorizontal,
  PlusCircle,
  Filter,
  Download,
  Upload,
  CheckCircle2,
  AlertCircle,
  Clock,
  ChevronDown,
} from 'lucide-react';
import { CallStatus, Lead, LeadStatus, User } from '@/types';
import { leads, users, getAllLeadsInHierarchy } from '@/lib/data';

const LeadStatusBadge = ({ status }: { status: LeadStatus }) => {
  const statusMap: Record<LeadStatus, { label: string, className: string }> = {
    new: { label: 'New', className: 'status-badge status-new' },
    inProgress: { label: 'In Progress', className: 'status-badge status-inprogress' },
    visitScheduled: { label: 'Visit Scheduled', className: 'status-badge status-visit-scheduled' },
    visitDone: { label: 'Visit Done', className: 'status-badge status-visit-done' },
    converted: { label: 'Converted', className: 'status-badge status-converted' },
    lost: { label: 'Lost', className: 'status-badge status-lost' },
  };

  const statusData = statusMap[status];

  return (
    <span className={statusData.className}>
      {statusData.label}
    </span>
  );
};

const CallStatusBadge = ({ status }: { status: CallStatus }) => {
  const statusMap: Record<CallStatus, { label: string, className: string }> = {
    connected: { label: 'Connected', className: 'status-badge call-connected' },
    disconnected: { label: 'Disconnected', className: 'status-badge call-disconnected' },
    switchedOff: { label: 'Switched Off', className: 'status-badge call-switchedoff' },
  };

  const statusData = statusMap[status];

  return (
    <span className={statusData.className}>
      {statusData.label}
    </span>
  );
};

const LeadDialog = ({
  isOpen,
  onClose,
  lead,
  teamMembers,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  lead?: Lead;
  teamMembers: User[];
  onSave: (lead: Partial<Lead>) => void;
}) => {
  const [formData, setFormData] = useState<Partial<Lead>>(
    lead || {
      name: '',
      phone: '',
      email: '',
      status: 'new',
      callStatus: 'disconnected',
      propertyInterest: '',
      budget: '',
      notes: '',
      assignedTo: teamMembers.length > 0 ? teamMembers[0].id : '',
    }
  );

  const handleChange = (field: keyof Lead, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{lead ? 'Edit Lead' : 'Add New Lead'}</DialogTitle>
          <DialogDescription>
            {lead ? 'Update the lead details below' : 'Enter the lead details below'}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Enter name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="Enter phone number"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="Enter email"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="assignedTo">Assigned To</Label>
              <Select
                value={formData.assignedTo}
                onValueChange={(value) => handleChange('assignedTo', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select team member" />
                </SelectTrigger>
                <SelectContent>
                  {teamMembers.map((member) => (
                    <SelectItem key={member.id} value={member.id}>
                      {member.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="status">Lead Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleChange('status', value as LeadStatus)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="inProgress">In Progress</SelectItem>
                  <SelectItem value="visitScheduled">Visit Scheduled</SelectItem>
                  <SelectItem value="visitDone">Visit Done</SelectItem>
                  <SelectItem value="converted">Converted</SelectItem>
                  <SelectItem value="lost">Lost</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="callStatus">Call Status</Label>
              <Select
                value={formData.callStatus}
                onValueChange={(value) => handleChange('callStatus', value as CallStatus)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select call status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="connected">Connected</SelectItem>
                  <SelectItem value="disconnected">Disconnected</SelectItem>
                  <SelectItem value="switchedOff">Switched Off</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="propertyInterest">Property Interest</Label>
              <Input
                id="propertyInterest"
                value={formData.propertyInterest || ''}
                onChange={(e) => handleChange('propertyInterest', e.target.value)}
                placeholder="E.g., Residential, Commercial"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="budget">Budget</Label>
              <Input
                id="budget"
                value={formData.budget || ''}
                onChange={(e) => handleChange('budget', e.target.value)}
                placeholder="E.g., 200,000 - 300,000"
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="notes">Notes</Label>
            <textarea
              id="notes"
              className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={formData.notes || ''}
              onChange={(e) => handleChange('notes', e.target.value)}
              placeholder="Add any additional notes here"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const UploadDialog = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Upload Leads</DialogTitle>
          <DialogDescription>
            Upload an Excel file with lead information
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <Upload className="h-10 w-10 text-gray-400 mx-auto mb-4" />
            <div className="text-sm text-gray-600 mb-4">
              Drag and drop your Excel file here, or click to browse
            </div>
            <Input
              type="file"
              className="hidden"
              id="lead-file-upload"
              accept=".xlsx,.xls,.csv"
            />
            <Button asChild>
              <label htmlFor="lead-file-upload">Browse Files</label>
            </Button>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            <p>Required columns: Name, Phone, Email, Property Interest, Budget</p>
            <a href="#" className="text-primary hover:underline mt-1 inline-block">
              Download template
            </a>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onClose}>Upload</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const Leads = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [assigneeFilter, setAssigneeFilter] = useState<string>('all');
  const [showLeadDialog, setShowLeadDialog] = useState(false);
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | undefined>(undefined);

  if (!user) {
    return <div>Loading...</div>;
  }

  const userLeads = getAllLeadsInHierarchy(user.id, user.role);

  const teamMembers = users.filter(u => {
    if (user.role === 'director') return u.role === 'salesExecutive';
    if (user.role === 'salesHead') {
      return u.parentId === user.id || users.some(tu => tu.parentId === user.id && u.parentId === tu.id);
    }
    if (user.role === 'teamLeader') return u.parentId === user.id;
    return u.id === user.id;
  });

  const filteredLeads = userLeads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm) ||
      (lead.email?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    
    const matchesAssignee = assigneeFilter === 'all' || lead.assignedTo === assigneeFilter;
    
    return matchesSearch && matchesStatus && matchesAssignee;
  });

  const newLeads = filteredLeads.filter(lead => lead.status === 'new');
  const inProgressLeads = filteredLeads.filter(lead => lead.status === 'inProgress');
  const visitScheduledLeads = filteredLeads.filter(lead => lead.status === 'visitScheduled');
  const visitDoneLeads = filteredLeads.filter(lead => lead.status === 'visitDone');
  const convertedLeads = filteredLeads.filter(lead => lead.status === 'converted');
  const lostLeads = filteredLeads.filter(lead => lead.status === 'lost');

  const handleAddLead = () => {
    setEditingLead(undefined);
    setShowLeadDialog(true);
  };

  const handleEditLead = (lead: Lead) => {
    setEditingLead(lead);
    setShowLeadDialog(true);
  };

  const handleSaveLead = (leadData: Partial<Lead>) => {
    console.log('Saving lead:', leadData);
    // In a real app, this would save to the backend
  };

  const handleUploadLeads = () => {
    setShowUploadDialog(true);
  };

  const renderLeadTable = (leadsToRender: Lead[]) => {
    return (
      <div className="overflow-x-auto">
        <table className="w-full data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact</th>
              <th>Call Status</th>
              <th>Assigned To</th>
              <th>Property Interest</th>
              <th>Budget</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {leadsToRender.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-8 text-gray-500">
                  No leads found
                </td>
              </tr>
            ) : (
              leadsToRender.map((lead) => {
                const assignedUser = users.find(user => user.id === lead.assignedTo);

                return (
                  <tr key={lead.id}>
                    <td className="font-medium">{lead.name}</td>
                    <td>
                      <div>
                        <div className="flex items-center">
                          <Phone size={14} className="mr-1 text-gray-500" />
                          {lead.phone}
                        </div>
                        {lead.email && (
                          <div className="text-xs text-gray-500 mt-1">{lead.email}</div>
                        )}
                      </div>
                    </td>
                    <td>
                      <CallStatusBadge status={lead.callStatus} />
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
                    <td>{lead.propertyInterest || 'Not specified'}</td>
                    <td>{lead.budget || 'Not specified'}</td>
                    <td>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEditLead(lead)}>
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            Log Call
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            Schedule Visit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            Mark as Converted
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            Mark as Lost
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Leads Management</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={handleUploadLeads}>
            <Upload size={16} className="mr-2" />
            Upload
          </Button>
          <Button onClick={handleAddLead}>
            <PlusCircle size={16} className="mr-2" />
            Add Lead
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search leads by name, phone, or email"
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-48">
                <Select
                  value={statusFilter}
                  onValueChange={setStatusFilter}
                >
                  <SelectTrigger>
                    <div className="flex items-center">
                      <Filter size={16} className="mr-2" />
                      <SelectValue placeholder="Status" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="inProgress">In Progress</SelectItem>
                    <SelectItem value="visitScheduled">Visit Scheduled</SelectItem>
                    <SelectItem value="visitDone">Visit Done</SelectItem>
                    <SelectItem value="converted">Converted</SelectItem>
                    <SelectItem value="lost">Lost</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="w-48">
                <Select
                  value={assigneeFilter}
                  onValueChange={setAssigneeFilter}
                >
                  <SelectTrigger>
                    <div className="flex items-center">
                      <Users size={16} className="mr-2" />
                      <SelectValue placeholder="Assignee" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Assignees</SelectItem>
                    {teamMembers.map(member => (
                      <SelectItem key={member.id} value={member.id}>
                        {member.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Button variant="outline" size="icon">
                <Download size={18} />
              </Button>
            </div>
          </div>
          
          <div className="mt-6 flex items-center space-x-4 overflow-x-auto pb-2">
            <div className="flex items-center space-x-2 bg-white px-3 py-1.5 rounded-full border">
              <span className="w-2 h-2 rounded-full bg-realestate-500"></span>
              <span className="text-sm font-medium">
                All: {filteredLeads.length}
              </span>
            </div>
            <div className="flex items-center space-x-2 bg-white px-3 py-1.5 rounded-full border">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              <span className="text-sm font-medium">
                New: {newLeads.length}
              </span>
            </div>
            <div className="flex items-center space-x-2 bg-white px-3 py-1.5 rounded-full border">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              <span className="text-sm font-medium">
                In Progress: {inProgressLeads.length}
              </span>
            </div>
            <div className="flex items-center space-x-2 bg-white px-3 py-1.5 rounded-full border">
              <span className="w-2 h-2 rounded-full bg-purple-500"></span>
              <span className="text-sm font-medium">
                Visit Scheduled: {visitScheduledLeads.length}
              </span>
            </div>
            <div className="flex items-center space-x-2 bg-white px-3 py-1.5 rounded-full border">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <span className="text-sm font-medium">
                Converted: {convertedLeads.length}
              </span>
            </div>
            <div className="flex items-center space-x-2 bg-white px-3 py-1.5 rounded-full border">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              <span className="text-sm font-medium">
                Lost: {lostLeads.length}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all">
        <TabsList className="w-full justify-start mb-4 overflow-x-auto">
          <TabsTrigger value="all">All Leads</TabsTrigger>
          <TabsTrigger value="new">New</TabsTrigger>
          <TabsTrigger value="inProgress">In Progress</TabsTrigger>
          <TabsTrigger value="visitScheduled">Visit Scheduled</TabsTrigger>
          <TabsTrigger value="visitDone">Visit Done</TabsTrigger>
          <TabsTrigger value="converted">Converted</TabsTrigger>
          <TabsTrigger value="lost">Lost</TabsTrigger>
        </TabsList>
        
        <Card>
          <CardContent className="p-0">
            <TabsContent value="all">
              {renderLeadTable(filteredLeads)}
            </TabsContent>
            <TabsContent value="new">
              {renderLeadTable(newLeads)}
            </TabsContent>
            <TabsContent value="inProgress">
              {renderLeadTable(inProgressLeads)}
            </TabsContent>
            <TabsContent value="visitScheduled">
              {renderLeadTable(visitScheduledLeads)}
            </TabsContent>
            <TabsContent value="visitDone">
              {renderLeadTable(visitDoneLeads)}
            </TabsContent>
            <TabsContent value="converted">
              {renderLeadTable(convertedLeads)}
            </TabsContent>
            <TabsContent value="lost">
              {renderLeadTable(lostLeads)}
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>

      {showLeadDialog && (
        <LeadDialog
          isOpen={showLeadDialog}
          onClose={() => setShowLeadDialog(false)}
          lead={editingLead}
          teamMembers={teamMembers}
          onSave={handleSaveLead}
        />
      )}

      {showUploadDialog && (
        <UploadDialog
          isOpen={showUploadDialog}
          onClose={() => setShowUploadDialog(false)}
        />
      )}
    </div>
  );
};

export default Leads;
