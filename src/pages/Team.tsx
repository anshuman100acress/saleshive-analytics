
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
  Users,
  UserPlus,
  MoreHorizontal,
  BarChart2,
  Phone,
  Mail,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { User, UserRole } from '@/types';
import { users, getTeamLeadersForSalesHead, getSalesExecutivesForTeamLeader } from '@/lib/data';
import { Badge } from '@/components/ui/badge';

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

const UserDialog = ({
  isOpen,
  onClose,
  user,
  parentOptions,
  roleOptions,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  user?: User;
  parentOptions: User[];
  roleOptions: UserRole[];
  onSave: (user: Partial<User>) => void;
}) => {
  const [formData, setFormData] = useState<Partial<User>>(
    user || {
      name: '',
      email: '',
      phone: '',
      role: roleOptions[0],
      parentId: parentOptions.length > 0 ? parentOptions[0].id : undefined,
    }
  );

  const handleChange = (field: keyof User, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{user ? 'Edit Team Member' : 'Add Team Member'}</DialogTitle>
          <DialogDescription>
            {user ? 'Update the team member details' : 'Enter the new team member details'}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Enter name"
            />
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
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.phone || ''}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="Enter phone number"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="role">Role</Label>
              <Select
                value={formData.role}
                onValueChange={(value) => handleChange('role', value as UserRole)}
              >
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {roleOptions.map((role) => (
                    <SelectItem key={role} value={role}>
                      {roleName[role]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="parentId">Reports To</Label>
              <Select
                value={formData.parentId}
                onValueChange={(value) => handleChange('parentId', value)}
                disabled={parentOptions.length === 0}
              >
                <SelectTrigger id="parentId">
                  <SelectValue placeholder="Select supervisor" />
                </SelectTrigger>
                <SelectContent>
                  {parentOptions.map((parent) => (
                    <SelectItem key={parent.id} value={parent.id}>
                      {parent.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
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

const TeamMemberCard = ({ member, onEdit }: { member: User; onEdit: (user: User) => void }) => {
  const randomStats = {
    leadsAssigned: Math.floor(Math.random() * 30) + 5,
    leadsConverted: Math.floor(Math.random() * 10) + 1,
    conversionRate: Math.floor(Math.random() * 40) + 10,
    responseTime: (Math.random() * 3 + 1).toFixed(1),
  };

  const isPositive = Math.random() > 0.5;

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12 border-2 border-muted">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium text-lg">{member.name}</h3>
                <Badge variant="outline" className={`text-xs mt-1 ${roleColors[member.role as UserRole]}`}>
                  {roleName[member.role as UserRole]}
                </Badge>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit(member)}>
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem>
                  View Performance
                </DropdownMenuItem>
                <DropdownMenuItem>
                  View Assigned Leads
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Send Message
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div className="grid gap-3 mb-4">
            <div className="flex items-center text-sm">
              <Phone size={14} className="mr-2 text-gray-500" />
              <span>{member.phone || 'No phone number'}</span>
            </div>
            <div className="flex items-center text-sm">
              <Mail size={14} className="mr-2 text-gray-500" />
              <span>{member.email}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-muted-foreground">Leads Assigned</div>
              <div className="text-xl font-semibold mt-1">{randomStats.leadsAssigned}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Leads Converted</div>
              <div className="text-xl font-semibold mt-1">{randomStats.leadsConverted}</div>
            </div>
          </div>
        </div>
        
        <div className="border-t px-6 py-4">
          <div className="flex justify-between items-center mb-2">
            <div className="text-sm font-medium">Conversion Rate</div>
            <div className="flex items-center">
              <span className="font-semibold">{randomStats.conversionRate}%</span>
              <span className={`ml-1 text-xs ${isPositive ? 'text-green-600' : 'text-red-600'} flex items-center`}>
                {isPositive ? (
                  <TrendingUp size={12} className="ml-1" />
                ) : (
                  <TrendingDown size={12} className="ml-1" />
                )}
                {Math.floor(Math.random() * 10) + 1}%
              </span>
            </div>
          </div>
          <Progress value={randomStats.conversionRate} className="h-2" />
          
          <div className="flex justify-between items-center mt-4 mb-2">
            <div className="text-sm font-medium">Response Time</div>
            <div className="text-sm font-semibold">{randomStats.responseTime} hrs</div>
          </div>
          <Progress value={parseFloat(randomStats.responseTime) * 20} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
};

const Team = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [showUserDialog, setShowUserDialog] = useState(false);
  const [editingUser, setEditingUser] = useState<User | undefined>(undefined);

  if (!user) {
    return <div>Loading...</div>;
  }

  let teamMembers: User[] = [];
  let possibleRoles: UserRole[] = [];
  let parentOptions: User[] = [];

  if (user.role === 'director') {
    teamMembers = users.filter(u => u.id !== user.id);
    possibleRoles = ['salesHead', 'teamLeader', 'salesExecutive'];
    parentOptions = [user, ...users.filter(u => u.role === 'salesHead' || u.role === 'teamLeader')];
  } else if (user.role === 'salesHead') {
    const teamLeaders = getTeamLeadersForSalesHead(user.id);
    const executives: User[] = [];
    
    teamLeaders.forEach(tl => {
      executives.push(...getSalesExecutivesForTeamLeader(tl.id));
    });
    
    teamMembers = [...teamLeaders, ...executives];
    possibleRoles = ['teamLeader', 'salesExecutive'];
    parentOptions = [user, ...teamLeaders];
  } else if (user.role === 'teamLeader') {
    teamMembers = getSalesExecutivesForTeamLeader(user.id);
    possibleRoles = ['salesExecutive'];
    parentOptions = [user];
  }

  const filteredTeamMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (member.phone?.includes(searchTerm) || false);
    
    const matchesRole = roleFilter === 'all' || member.role === roleFilter;
    
    return matchesSearch && matchesRole;
  });

  const teamLeaders = filteredTeamMembers.filter(member => member.role === 'teamLeader');
  const salesExecutives = filteredTeamMembers.filter(member => member.role === 'salesExecutive');

  const handleAddUser = () => {
    setEditingUser(undefined);
    setShowUserDialog(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setShowUserDialog(true);
  };

  const handleSaveUser = (userData: Partial<User>) => {
    console.log('Saving user:', userData);
    // In a real app, this would save to the backend
  };

  const renderTeamMemberGrid = (members: User[]) => {
    if (members.length === 0) {
      return (
        <div className="text-center py-10 text-gray-500">
          No team members found
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((member) => (
          <TeamMemberCard
            key={member.id}
            member={member}
            onEdit={handleEditUser}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Team Management</h2>
        {(user.role === 'director' || user.role === 'salesHead' || user.role === 'teamLeader') && (
          <Button onClick={handleAddUser}>
            <UserPlus size={16} className="mr-2" />
            Add Team Member
          </Button>
        )}
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search team members by name, email, or phone"
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-48">
              <Select
                value={roleFilter}
                onValueChange={setRoleFilter}
              >
                <SelectTrigger>
                  <div className="flex items-center">
                    <Users size={16} className="mr-2" />
                    <SelectValue placeholder="Role" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  {user.role === 'director' && <SelectItem value="salesHead">Sales Heads</SelectItem>}
                  {(user.role === 'director' || user.role === 'salesHead') && (
                    <SelectItem value="teamLeader">Team Leaders</SelectItem>
                  )}
                  <SelectItem value="salesExecutive">Sales Executives</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-6 flex items-center space-x-4 overflow-x-auto pb-2">
            <div className="flex items-center space-x-2 bg-white px-3 py-1.5 rounded-full border">
              <span className="w-2 h-2 rounded-full bg-realestate-500"></span>
              <span className="text-sm font-medium">
                All: {filteredTeamMembers.length}
              </span>
            </div>
            
            {user.role === 'director' && (
              <div className="flex items-center space-x-2 bg-white px-3 py-1.5 rounded-full border">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                <span className="text-sm font-medium">
                  Sales Heads: {filteredTeamMembers.filter(m => m.role === 'salesHead').length}
                </span>
              </div>
            )}
            
            {(user.role === 'director' || user.role === 'salesHead') && (
              <div className="flex items-center space-x-2 bg-white px-3 py-1.5 rounded-full border">
                <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                <span className="text-sm font-medium">
                  Team Leaders: {teamLeaders.length}
                </span>
              </div>
            )}
            
            <div className="flex items-center space-x-2 bg-white px-3 py-1.5 rounded-full border">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <span className="text-sm font-medium">
                Sales Executives: {salesExecutives.length}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all">
        <TabsList className="w-full justify-start mb-4 overflow-x-auto">
          <TabsTrigger value="all">All Team Members</TabsTrigger>
          {user.role === 'director' && <TabsTrigger value="salesHeads">Sales Heads</TabsTrigger>}
          {(user.role === 'director' || user.role === 'salesHead') && (
            <TabsTrigger value="teamLeaders">Team Leaders</TabsTrigger>
          )}
          <TabsTrigger value="salesExecutives">Sales Executives</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          {renderTeamMemberGrid(filteredTeamMembers)}
        </TabsContent>
        
        {user.role === 'director' && (
          <TabsContent value="salesHeads">
            {renderTeamMemberGrid(filteredTeamMembers.filter(m => m.role === 'salesHead'))}
          </TabsContent>
        )}
        
        {(user.role === 'director' || user.role === 'salesHead') && (
          <TabsContent value="teamLeaders">
            {renderTeamMemberGrid(teamLeaders)}
          </TabsContent>
        )}
        
        <TabsContent value="salesExecutives">
          {renderTeamMemberGrid(salesExecutives)}
        </TabsContent>
      </Tabs>

      {showUserDialog && (
        <UserDialog
          isOpen={showUserDialog}
          onClose={() => setShowUserDialog(false)}
          user={editingUser}
          parentOptions={parentOptions}
          roleOptions={possibleRoles}
          onSave={handleSaveUser}
        />
      )}
    </div>
  );
};

export default Team;
