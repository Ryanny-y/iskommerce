import React from 'react';
import type { AdminUser, UserStatus } from '@/types/admin';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, XCircle, Clock, User } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface UserApprovalCardProps {
  user: AdminUser;
  onApprove: (userId: string) => void;
  onReject: (userId: string) => void;
}

export const UserApprovalCard: React.FC<UserApprovalCardProps> = ({ user, onApprove, onReject }) => {
  const getStatusBadge = (status: UserStatus) => {
    switch (status) {
      case 'PENDING':
        return <Badge variant="secondary" className="bg-neutral-100 text-neutral-600 font-bold gap-1"><Clock className="h-3 w-3" /> PENDING</Badge>;
      case 'APPROVED':
        return <Badge variant="secondary" className="bg-emerald-100 text-emerald-600 font-bold gap-1"><CheckCircle2 className="h-3 w-3" /> APPROVED</Badge>;
      case 'REJECTED':
        return <Badge variant="secondary" className="bg-rose-100 text-rose-600 font-bold gap-1"><XCircle className="h-3 w-3" /> REJECTED</Badge>;
    }
  };

  return (
    <Card className="overflow-hidden border-none shadow-xl shadow-neutral-200/50 rounded-[32px] bg-white transition-all hover:shadow-2xl hover:shadow-neutral-200/60">
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600">
              <User className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-black text-neutral-900 tracking-tight">{user.fullName}</h3>
              <p className="text-sm font-medium text-neutral-500">{user.email}</p>
            </div>
          </div>
          {getStatusBadge(user.status)}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Roles</p>
            <div className="flex flex-wrap gap-1">
              {user.roles.map(role => (
                <Badge key={role} variant="outline" className="text-[10px] font-black uppercase tracking-widest rounded-lg border-neutral-100 text-neutral-500">
                  {role}
                </Badge>
              ))}
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Registered</p>
            <p className="text-sm font-bold text-neutral-900">{user.createdAt}</p>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          {user.status === 'PENDING' ? (
            <>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className="flex-1 rounded-2xl bg-emerald-600 hover:bg-emerald-700 font-bold gap-2 shadow-lg shadow-emerald-200">
                    <CheckCircle2 className="h-4 w-4" />
                    Approve
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="rounded-[32px] border-none p-8">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-2xl font-black tracking-tight text-neutral-900">Approve User?</AlertDialogTitle>
                    <AlertDialogDescription className="text-neutral-500 font-medium">
                      Are you sure you want to approve <strong>{user.fullName}</strong>? They will gain access to the marketplace.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="mt-6 gap-3">
                    <AlertDialogCancel className="rounded-2xl font-bold text-neutral-500 border-none bg-neutral-100 hover:bg-neutral-200">Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={() => onApprove(user.id)}
                      className="rounded-2xl bg-emerald-600 hover:bg-emerald-700 font-bold shadow-lg shadow-emerald-200"
                    >
                      Yes, Approve
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" className="flex-1 rounded-2xl font-bold text-rose-600 hover:bg-rose-50 gap-2">
                    <XCircle className="h-4 w-4" />
                    Reject
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="rounded-[32px] border-none p-8">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-2xl font-black tracking-tight text-neutral-900">Reject User?</AlertDialogTitle>
                    <AlertDialogDescription className="text-neutral-500 font-medium">
                      Are you sure you want to reject <strong>{user.fullName}</strong>? They will not be able to access the marketplace.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="mt-6 gap-3">
                    <AlertDialogCancel className="rounded-2xl font-bold text-neutral-500 border-none bg-neutral-100 hover:bg-neutral-200">Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={() => onReject(user.id)}
                      className="rounded-2xl bg-rose-600 hover:bg-rose-700 font-bold shadow-lg shadow-rose-200"
                    >
                      Yes, Reject
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          ) : user.status === 'APPROVED' ? (
            <div className="flex-1 flex items-center justify-center gap-2 py-2 rounded-2xl bg-emerald-50 text-emerald-600 font-bold text-sm">
              <CheckCircle2 className="h-4 w-4" />
              Approved
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center gap-2 py-2 rounded-2xl bg-rose-50 text-rose-600 font-bold text-sm">
              <XCircle className="h-4 w-4" />
              Rejected
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
