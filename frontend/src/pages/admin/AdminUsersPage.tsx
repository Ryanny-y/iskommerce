import React, { useState, useMemo, useEffect, useCallback } from 'react';
import type { AdminUser, UserStatus } from '@/types/admin';
import { ApprovalTabs } from '@/components/admin/ApprovalTabs';
import { UserApprovalTable } from '@/components/admin/UserApprovalTable';
import { Button } from '@/components/ui/button';
import { Search, LogOut, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import useAdminAuth from '@/contexts/AdminAuthContext';
import useAdminAuthFetch from '@/hooks/useAdminAuthFetch';
import type { ApiResponse } from '@/types/common';

const AdminUsersPage: React.FC = () => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [activeTab, setActiveTab] = useState<UserStatus>('PENDING');
  const [searchQuery, setSearchQuery] = useState('');
  const { logout } = useAdminAuth();
  const adminFetch = useAdminAuthFetch();
  const navigate = useNavigate();

  const fetchUsers = useCallback(async () => {
    try {
      const response = await adminFetch<ApiResponse<AdminUser[]>>('users');
      setUsers(response.data ?? []);
    } catch {
      toast.error('Failed to fetch users');
    }
  }, [adminFetch]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesTab = user.userStatus === activeTab;
      const matchesSearch =
        user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [users, activeTab, searchQuery]);

  const updateStatus = async (userId: string, userStatus: UserStatus, successMsg: string) => {
    try {
      await adminFetch(`users/${userId}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ userStatus }),
      });
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, userStatus } : u));
      toast.success(successMsg);
    } catch {
      toast.error('Failed to update user status');
    }
  };

  const handleApprove = (userId: string) => updateStatus(userId, 'APPROVED', 'User approved successfully');
  const handleReject  = (userId: string) => updateStatus(userId, 'REJECTED', 'User rejected');

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="h-20 bg-white/80 backdrop-blur-md border-b border-neutral-100 sticky top-0 z-50">
        <div className="container mx-auto h-full px-4 md:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-600 p-2 rounded-xl shadow-lg shadow-emerald-200">
              <ShieldCheck className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-black text-neutral-900 tracking-tight">Admin Panel</h1>
              <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">Iskommerce Management</p>
            </div>
          </div>

          <Button
            variant="ghost"
            onClick={handleLogout}
            className="rounded-2xl font-bold text-neutral-500 hover:bg-neutral-100 gap-2"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 md:px-8 py-10 space-y-10">
        <div className="space-y-2">
          <h2 className="text-4xl font-black tracking-tight text-neutral-900">User Approval Dashboard</h2>
          <p className="text-neutral-500 font-medium text-lg">
            Review and manage newly registered user accounts.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <ApprovalTabs activeTab={activeTab} onTabChange={setActiveTab}>
            <div className="relative w-full lg:max-w-xs mb-6 lg:mb-0 lg:absolute lg:right-0 lg:top-0">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-12 pr-4 rounded-2xl bg-white border-2 border-neutral-100 focus:border-emerald-500 transition-all outline-none font-medium text-sm shadow-sm"
              />
            </div>

            <UserApprovalTable
              users={filteredUsers}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          </ApprovalTabs>
        </div>
      </main>

      <footer className="h-20" />
    </div>
  );
};

export default AdminUsersPage;
