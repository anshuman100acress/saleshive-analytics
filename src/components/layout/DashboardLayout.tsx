
import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  BarChart2,
  Users,
  User,
  FileText,
  Home,
  LogOut,
  Menu,
  X,
  Bell,
  Settings,
  ChevronDown,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserRole } from '@/types';
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

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  const menuItems = [
    { path: '/dashboard', icon: <Home size={20} />, label: 'Dashboard', roles: ['director', 'salesHead', 'teamLeader', 'salesExecutive'] },
    { path: '/leads', icon: <FileText size={20} />, label: 'Leads', roles: ['director', 'salesHead', 'teamLeader', 'salesExecutive'] },
    { path: '/team', icon: <Users size={20} />, label: 'Team', roles: ['director', 'salesHead', 'teamLeader'] },
    { path: '/reports', icon: <BarChart2 size={20} />, label: 'Reports', roles: ['director', 'salesHead', 'teamLeader', 'salesExecutive'] },
    { path: '/users', icon: <User size={20} />, label: 'Users', roles: ['director', 'salesHead'] },
    { path: '/settings', icon: <Settings size={20} />, label: 'Settings', roles: ['director', 'salesHead', 'teamLeader', 'salesExecutive'] },
  ];

  const filteredMenuItems = menuItems.filter(item => 
    item.roles.includes(user.role as UserRole)
  );

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="rounded-full bg-white shadow-md"
        >
          {isSidebarOpen ? <X size={18} /> : <Menu size={18} />}
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={`bg-sidebar text-sidebar-foreground w-64 flex-shrink-0 overflow-y-auto transition-all duration-300 shadow-xl ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed lg:relative z-40 h-full`}
      >
        <div className="p-6">
          <h1 className="text-xl font-bold text-sidebar-foreground">Sales Hive</h1>
          <div className="mt-2 text-sm text-sidebar-foreground/70">Real Estate Sales CRM</div>
        </div>

        <div className="px-4 pb-6">
          <div className="bg-sidebar-accent rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10 border-2 border-sidebar-accent-foreground/20">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{user.name}</div>
                <Badge variant="outline" className={`text-xs mt-1 ${roleColors[user.role as UserRole]}`}>
                  {roleName[user.role as UserRole]}
                </Badge>
              </div>
            </div>
          </div>

          <nav className="space-y-1">
            {filteredMenuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </Link>
            ))}
            
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-3 py-2.5 rounded-md text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
            >
              <LogOut size={20} className="mr-3" />
              Logout
            </button>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-30">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center">
              <h2 className="text-xl font-semibold text-gray-800">
                {filteredMenuItems.find((item) => item.path === location.pathname)?.label || 'Dashboard'}
              </h2>
            </div>

            <div className="flex items-center space-x-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Bell size={18} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-72">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="max-h-80 overflow-y-auto">
                    <div className="p-3 text-sm hover:bg-muted">
                      <div className="font-medium">New lead assigned</div>
                      <div className="text-muted-foreground text-xs mt-1">Alex Johnson has been assigned to you</div>
                      <div className="text-muted-foreground text-xs mt-1">10 minutes ago</div>
                    </div>
                    <div className="p-3 text-sm hover:bg-muted">
                      <div className="font-medium">Follow-up reminder</div>
                      <div className="text-muted-foreground text-xs mt-1">Scheduled follow-up with Maria Garcia</div>
                      <div className="text-muted-foreground text-xs mt-1">1 hour ago</div>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium max-w-[100px] truncate hidden sm:block">{user.name}</span>
                    <ChevronDown size={16} className="ml-1 opacity-70" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    <User size={16} className="mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/settings')}>
                    <Settings size={16} className="mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <Outlet />
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
