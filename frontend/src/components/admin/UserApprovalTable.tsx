import React from "react";
import type { AdminUser } from "@/types/admin";
import { UserApprovalCard } from "./UserApprovalCard";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  XCircle,
  Clock,
  User,
  MoreHorizontal,
} from "lucide-react";
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

interface UserApprovalTableProps {
  users: AdminUser[];
  onApprove: (userId: string) => void;
  onReject: (userId: string) => void;
}

export const UserApprovalTable: React.FC<UserApprovalTableProps> = ({
  users,
  onApprove,
  onReject,
}) => {
  if (users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-6 bg-white rounded-[40px] border-2 border-dashed border-neutral-100">
        <div className="bg-neutral-50 p-8 rounded-full">
          <User className="h-16 w-16 text-neutral-300" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-black tracking-tight text-neutral-900">
            No users found
          </h3>
          <p className="text-neutral-500 font-medium max-w-xs mx-auto">
            All users in this category have been processed or none match your
            search.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Desktop Table */}
      <div className="hidden lg:block bg-white rounded-[40px] shadow-xl shadow-neutral-200/50 border border-neutral-100 overflow-hidden">
        <Table>
          <TableHeader className="bg-neutral-50/50">
            <TableRow className="hover:bg-transparent border-neutral-100">
              <TableHead className="w-75 h-16 px-8 text-[10px] font-black uppercase tracking-widest text-neutral-400">
                User
              </TableHead>
              <TableHead className="h-16 px-8 text-[10px] font-black uppercase tracking-widest text-neutral-400">
                Roles
              </TableHead>
              <TableHead className="h-16 px-8 text-[10px] font-black uppercase tracking-widest text-neutral-400">
                Registered
              </TableHead>
              <TableHead className="h-16 px-8 text-[10px] font-black uppercase tracking-widest text-neutral-400">
                Status
              </TableHead>
              <TableHead className="h-16 px-8 text-right text-[10px] font-black uppercase tracking-widest text-neutral-400">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                className="hover:bg-neutral-50/50 transition-colors border-neutral-100"
              >
                <TableCell className="p-8">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 font-black">
                      {user.fullName.charAt(0)}
                    </div>
                    <div className="space-y-0.5">
                      <p className="font-black text-neutral-900 tracking-tight">
                        {user.fullName}
                      </p>
                      <p className="text-xs font-medium text-neutral-500">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-8">
                  <div className="flex flex-wrap gap-1">
                    {user.roles.map((role) => (
                      <Badge
                        key={role}
                        variant="outline"
                        className="text-[10px] font-black uppercase tracking-widest rounded-lg border-neutral-100 text-neutral-500"
                      >
                        {role}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="px-8 font-bold text-neutral-900 text-sm">
                  {user.createdAt}
                </TableCell>
                <TableCell className="px-8">
                  {user.userStatus === "PENDING" && (
                    <Badge
                      variant="secondary"
                      className="bg-neutral-100 text-neutral-600 font-bold gap-1"
                    >
                      <Clock className="h-3 w-3" /> PENDING
                    </Badge>
                  )}
                  {user.userStatus === "APPROVED" && (
                    <Badge
                      variant="secondary"
                      className="bg-emerald-100 text-emerald-600 font-bold gap-1"
                    >
                      <CheckCircle2 className="h-3 w-3" /> APPROVED
                    </Badge>
                  )}
                  {user.userStatus === "REJECTED" && (
                    <Badge
                      variant="secondary"
                      className="bg-rose-100 text-rose-600 font-bold gap-1"
                    >
                      <XCircle className="h-3 w-3" /> REJECTED
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="p-8 text-right">
                  {user.userStatus === "PENDING" ? (
                    <div className="flex items-center justify-end gap-2">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            size="sm"
                            className="rounded-xl bg-emerald-600 hover:bg-emerald-700 font-bold gap-2"
                          >
                            <CheckCircle2 className="h-4 w-4" />
                            Approve
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="rounded-[32px] border-none p-8">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="text-2xl font-black tracking-tight text-neutral-900">
                              Approve User?
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-neutral-500 font-medium">
                              Are you sure you want to approve{" "}
                              <strong>{user.fullName}</strong>? They will gain
                              access to the marketplace.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter className="mt-6 gap-3">
                            <AlertDialogCancel className="rounded-2xl font-bold text-neutral-500 border-none bg-neutral-100 hover:bg-neutral-200">
                              Cancel
                            </AlertDialogCancel>
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
                          <Button
                            size="sm"
                            variant="ghost"
                            className="rounded-xl font-bold text-rose-600 hover:bg-rose-50 gap-2"
                          >
                            <XCircle className="h-4 w-4" />
                            Reject
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="rounded-[32px] border-none p-8">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="text-2xl font-black tracking-tight text-neutral-900">
                              Reject User?
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-neutral-500 font-medium">
                              Are you sure you want to reject{" "}
                              <strong>{user.fullName}</strong>? They will not be
                              able to access the marketplace.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter className="mt-6 gap-3">
                            <AlertDialogCancel className="rounded-2xl font-bold text-neutral-500 border-none bg-neutral-100 hover:bg-neutral-200">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => onReject(user.id)}
                              className="rounded-2xl bg-rose-600 hover:bg-rose-700 font-bold shadow-lg shadow-rose-200"
                            >
                              Yes, Reject
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  ) : user.userStatus === "APPROVED" ? (
                    <div className="flex items-center justify-end gap-2">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="rounded-xl font-bold text-rose-600 hover:bg-rose-50 gap-2"
                          >
                            <XCircle className="h-4 w-4" />
                            Reject
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="rounded-[32px] border-none p-8">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="text-2xl font-black tracking-tight text-neutral-900">
                              Reject User?
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-neutral-500 font-medium">
                              Are you sure you want to reject{" "}
                              <strong>{user.fullName}</strong>? They will not be
                              able to access the marketplace.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter className="mt-6 gap-3">
                            <AlertDialogCancel className="rounded-2xl font-bold text-neutral-500 border-none bg-neutral-100 hover:bg-neutral-200">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => onReject(user.id)}
                              className="rounded-2xl bg-rose-600 hover:bg-rose-700 font-bold shadow-lg shadow-rose-200"
                            >
                              Yes, Reject
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  ) : (
                    <div className="flex items-center justify-end gap-2">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            size="sm"
                            className="rounded-xl bg-emerald-600 hover:bg-emerald-700 font-bold gap-2"
                          >
                            <CheckCircle2 className="h-4 w-4" />
                            Approve
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="rounded-[32px] border-none p-8">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="text-2xl font-black tracking-tight text-neutral-900">
                              Approve User?
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-neutral-500 font-medium">
                              Are you sure you want to approve{" "}
                              <strong>{user.fullName}</strong>? They will gain
                              access to the marketplace.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter className="mt-6 gap-3">
                            <AlertDialogCancel className="rounded-2xl font-bold text-neutral-500 border-none bg-neutral-100 hover:bg-neutral-200">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => onApprove(user.id)}
                              className="rounded-2xl bg-emerald-600 hover:bg-emerald-700 font-bold shadow-lg shadow-emerald-200"
                            >
                              Yes, Approve
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden grid grid-cols-1 gap-6">
        {users.map((user) => (
          <UserApprovalCard
            key={user.id}
            user={user}
            onApprove={onApprove}
            onReject={onReject}
          />
        ))}
      </div>
    </>
  );
};
