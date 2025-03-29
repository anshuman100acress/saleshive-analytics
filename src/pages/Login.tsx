
import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { AlertCircle } from 'lucide-react';

const Login = () => {
  const { user, login, isLoading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    }
  };

  const handleDemoLogin = async (role: string) => {
    const demoCredentials: { [key: string]: { email: string; password: string } } = {
      director: { email: 'john@example.com', password: 'password' },
      salesHead: { email: 'sarah@example.com', password: 'password' },
      teamLeader: { email: 'mike@example.com', password: 'password' },
      salesExecutive: { email: 'lisa@example.com', password: 'password' },
    };

    if (demoCredentials[role]) {
      try {
        await login(demoCredentials[role].email, demoCredentials[role].password);
        navigate('/dashboard');
      } catch (err) {
        setError('Demo login failed. Please try again.');
      }
    }
  };

  if (user) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-realestate-50">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-realestate-900">Sales Hive</h1>
          <p className="text-realestate-600 mt-2">Real Estate Sales Management</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Log in to your account</CardTitle>
            <CardDescription>
              Enter your email and password to access the sales management system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              {error && (
                <div className="flex items-center gap-2 p-3 mb-4 text-red-700 bg-red-100 rounded">
                  <AlertCircle size={16} />
                  <span className="text-sm">{error}</span>
                </div>
              )}
              
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    required
                  />
                </div>
                
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <a href="#" className="text-sm text-realestate-600 hover:text-realestate-800">
                      Forgot password?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Logging in...' : 'Log in'}
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <div className="text-sm text-center text-muted-foreground">
              Quick Demo Access
            </div>
            <div className="grid grid-cols-2 gap-2 w-full">
              <Button variant="outline" onClick={() => handleDemoLogin('director')}>
                Director
              </Button>
              <Button variant="outline" onClick={() => handleDemoLogin('salesHead')}>
                Sales Head
              </Button>
              <Button variant="outline" onClick={() => handleDemoLogin('teamLeader')}>
                Team Leader
              </Button>
              <Button variant="outline" onClick={() => handleDemoLogin('salesExecutive')}>
                Sales Executive
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
