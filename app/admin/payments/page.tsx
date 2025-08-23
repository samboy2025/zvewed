"use client"

import React, { useState } from "react"
import { useQuery, useMutation } from "convex/react"
import { api } from "../../../convex/_generated/api"
import { Id } from "../../../convex/_generated/dataModel"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ExcelExportButton } from "../components/ExcelExportButton"
import { 
  DollarSign,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Check,
  X,
  CreditCard,
  Building,
  Package,
  Ticket,
  Plus,
  UserPlus
} from "lucide-react"

export default function AdminPaymentsPage() {
  // Define types for payments and users
  interface Payment {
    _id: Id<"payments">;
    userId: string;
    userName: string;
    userEmail: string;
    reference: string;
    status: string;
    type: string;
    amount: number;
    userType: string;
    rejectionReason?: string;
    paymentMethod?: string;
    createdAt: number;
    receiptUrl?: string;
    updatedAt?: number;
    approvedAt?: number;
    notes?: string;
  }

  interface User {
    _id: Id<"users">;
    firstName: string;
    lastName: string;
    email: string;
    userType: string;
    paymentAmount?: number;
    paymentStatus?: string;
    paymentReceipt?: string;
    paymentDetails?: any;
    paymentSubmittedAt?: number;
    _creationTime: number;
  }

  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showApprovalDialog, setShowApprovalDialog] = useState(false);
  const [showRejectionDialog, setShowRejectionDialog] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  
  // Search and filter states for Manual Payment Verification
  const [searchTerm, setSearchTerm] = useState("");
  const [filterUserType, setFilterUserType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  
  // Fetch real payment data from the database
  const payments = useQuery(api.payments.getAllPayments) || [];
  const paymentStats = useQuery(api.payments.getPaymentStats) || {
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    totalAmount: 0,
    pendingAmount: 0,
    approvedAmount: 0,
    rejectedAmount: 0
  };
  
  const updatePaymentStatus = useMutation(api.payments.updatePaymentStatus);

  // Get real user payment data
  const allUsers = useQuery(api.users.getAllUsers) || [];

  const updateUserPaymentStatus = useMutation(api.users.updateUserPaymentStatus);

  // Get users eligible for manual payment verification
  const usersEligibleForManualVerification = useQuery(api.admin.getUsersEligibleForManualVerification, {}) || [];
  const manuallyVerifyUserPayment = useMutation(api.admin.manuallyVerifyUserPayment);

  // Filter users for Manual Payment Verification
  const filteredUsers = usersEligibleForManualVerification?.filter(user => {
    const matchesSearch = searchTerm === "" || 
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesUserType = filterUserType === "all" || user.userType === filterUserType;
    
    const matchesStatus = filterStatus === "all" || 
      (filterStatus === "pending" && user.paymentStatus === "pending") ||
      (filterStatus === "no_payment" && user.paymentStatus !== "pending");
    
    return matchesSearch && matchesUserType && matchesStatus;
  }) || [];

  // Manual verification form state
  const [showManualVerificationDialog, setShowManualVerificationDialog] = useState(false);
  const [selectedUserForVerification, setSelectedUserForVerification] = useState<User | null>(null);
  const [manualVerificationData, setManualVerificationData] = useState({
    amount: "",
    paymentMethod: "manual_verification",
    notes: ""
  });

  // Calculate participant and vendor specific stats
  const participantPayments = allUsers.filter(user => 
    user.userType === "participant" && user.paymentStatus === "approved"
  );
  const vendorPayments = allUsers.filter(user => 
    user.userType === "vendor" && user.paymentStatus === "approved"
  );

  // Calculate pending and rejected payments
  const pendingUserPayments = allUsers.filter(user => 
    user.paymentStatus === "pending"
  );
  const rejectedUserPayments = allUsers.filter(user => 
    user.paymentStatus === "rejected"
  );

  const participantRevenue = participantPayments.reduce((sum, user) => 
    sum + (user.paymentAmount || 7000), 0
  );
  const vendorRevenue = vendorPayments.reduce((sum, user) => 
    sum + (user.paymentAmount || 12000), 0
  );

  // Handle payment approval
  const handleApprove = async () => {
    if (!selectedPayment) return

    try {
      await updatePaymentStatus({
        paymentId: selectedPayment._id,
        status: "approved",
      })
      setShowApprovalDialog(false)
      setSelectedPayment(null)
      alert("Payment approved successfully!");
    } catch (error) {
      console.error("Error approving payment:", error)
      alert("Failed to approve payment");
    }
  }

  // Handle payment rejection
  const handleReject = async () => {
    if (!selectedPayment || !rejectionReason.trim()) return

    try {
      await updatePaymentStatus({
        paymentId: selectedPayment._id,
        status: "rejected",
        rejectionReason: rejectionReason,
      })
      setShowRejectionDialog(false)
      setSelectedPayment(null)
      setRejectionReason("")
      alert("Payment rejected successfully!");
    } catch (error) {
      console.error("Error rejecting payment:", error)
      alert("Failed to reject payment");
    }
  }

  // Handle manual payment verification
  const handleManualVerification = async () => {
    if (!selectedUserForVerification || !manualVerificationData.amount) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      // Get current admin user ID from localStorage
      const userData = localStorage.getItem('currentUser');
      if (!userData) {
        alert("Admin authentication not found. Please log in again.");
        return;
      }
      
      const adminUser = JSON.parse(userData);
      if (adminUser.userType !== 'admin') {
        alert("Unauthorized: Only admins can verify payments.");
        return;
      }
      
      await manuallyVerifyUserPayment({
        userId: selectedUserForVerification._id,
        adminId: adminUser._id,
        amount: parseFloat(manualVerificationData.amount),
        paymentMethod: manualVerificationData.paymentMethod,
        notes: manualVerificationData.notes,
      });

      // Reset form
      setManualVerificationData({
        amount: "",
        paymentMethod: "manual_verification",
        notes: ""
      });
      setShowManualVerificationDialog(false);
      setSelectedUserForVerification(null);
      alert("Payment verified successfully!");
    } catch (error) {
      console.error("Error verifying payment:", error);
      alert("Failed to verify payment");
    }
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  // Format date
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Handle loading state
  if (!payments || !paymentStats || !allUsers) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Clock className="h-8 w-8 mx-auto mb-4 text-gray-400 animate-spin" />
          <p className="text-gray-500">Loading payment data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Payment Management</h2>
          <p className="text-muted-foreground">
            Review and manage all payment transactions
          </p>
        </div>
      </div>

      {/* Stats Cards - Updated to count only participant and vendor payments */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₦{(participantRevenue + vendorRevenue).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              From {(participantPayments.length + vendorPayments.length)} payments
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {(participantPayments.length + vendorPayments.length)}
            </div>
            <p className="text-xs text-muted-foreground">
              ₦{(participantRevenue + vendorRevenue).toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {pendingUserPayments.length}
            </div>
            <p className="text-xs text-muted-foreground">
              Awaiting verification
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {rejectedUserPayments.length}
            </div>
            <p className="text-xs text-muted-foreground">
              Payment issues
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Breakdown - Updated to show only participant and vendor */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Revenue by User Type
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>Participants</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold">₦{participantRevenue.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">{participantPayments.length} payments</div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span>Vendors</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold">₦{vendorRevenue.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">{vendorPayments.length} payments</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Payment Status Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Ticket className="h-4 w-4 text-blue-600" />
                  <span>Pending Verification</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{usersEligibleForManualVerification?.length || 0}</div>
                  <div className="text-sm text-gray-500">users</div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-orange-600" />
                  <span>Total Verified</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{(participantPayments.length + vendorPayments.length)}</div>
                  <div className="text-sm text-gray-500">users</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>



      {/* Manual Payment Verification Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Manual Payment Verification
          </CardTitle>
          <CardDescription>
            Manually verify payments for users without requiring receipt submission
          </CardDescription>
        </CardHeader>
        <CardContent>
          {usersEligibleForManualVerification && usersEligibleForManualVerification.length > 0 ? (
            <div>
              {/* Search and Filter Controls */}
              <div className="mb-6 space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Search Input */}
                  <div className="flex-1">
                    <Label htmlFor="search-users">Search Users</Label>
                    <Input
                      id="search-users"
                      placeholder="Search by name or email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  {/* User Type Filter */}
                  <div className="w-full sm:w-48">
                    <Label htmlFor="filter-user-type">User Type</Label>
                    <Select value={filterUserType} onValueChange={setFilterUserType}>
                      <SelectTrigger id="filter-user-type" className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="participant">Participants</SelectItem>
                        <SelectItem value="vendor">Vendors</SelectItem>
                        <SelectItem value="sponsor">Sponsors</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Status Filter */}
                  <div className="w-full sm:w-48">
                    <Label htmlFor="filter-status">Payment Status</Label>
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger id="filter-status" className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="pending">Pending Receipt</SelectItem>
                        <SelectItem value="no_payment">No Payment</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {/* Results Count */}
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-blue-600">
                    {filteredUsers.length} of {usersEligibleForManualVerification.length} users match filters
                  </Badge>
                  
                  {/* Clear Filters Button */}
                  {(searchTerm !== "" || filterUserType !== "all" || filterStatus !== "all") && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSearchTerm("");
                        setFilterUserType("all");
                        setFilterStatus("all");
                      }}
                    >
                      Clear Filters
                    </Button>
                  )}
                </div>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Required Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{user.firstName} {user.lastName}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                          {user.paymentNotes && (
                            <div className="text-xs text-blue-600 mt-1">
                              Note: {user.paymentNotes}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {user.userType}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">
                          ₦{(user.paymentAmount || (user.userType === "participant" ? 7000 : 12000)).toLocaleString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-orange-600">
                          {user.paymentStatus === "pending" ? "Pending Receipt" : "No Payment"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => {
                              setSelectedUserForVerification(user);
                              setManualVerificationData({
                                amount: (user.paymentAmount || (user.userType === "participant" ? 7000 : 12000)).toString(),
                                paymentMethod: "manual_verification",
                                notes: ""
                              });
                              setShowManualVerificationDialog(true);
                            }}
                          >
                            <Check className="h-4 w-4 mr-2" />
                            Verify Payment
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-8">
              <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-400" />
              <p className="text-gray-500">No users eligible for manual payment verification</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Approval Dialog */}
      <Dialog open={showApprovalDialog} onOpenChange={setShowApprovalDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve Payment</DialogTitle>
            <DialogDescription>
              Are you sure you want to approve this payment?
            </DialogDescription>
          </DialogHeader>
          {selectedPayment && (
            <div className="space-y-2">
              <p><strong>User:</strong> {selectedPayment.userName}</p>
              <p><strong>Amount:</strong> ₦{selectedPayment.amount.toLocaleString()}</p>
              <p><strong>Reference:</strong> {selectedPayment.reference}</p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowApprovalDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleApprove} className="bg-green-600 hover:bg-green-700">
              Approve Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Rejection Dialog */}
      <Dialog open={showRejectionDialog} onOpenChange={setShowRejectionDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Payment</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this payment.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {selectedPayment && (
              <div className="space-y-2">
                <p><strong>User:</strong> {selectedPayment.userName}</p>
                <p><strong>Amount:</strong> ₦{selectedPayment.amount.toLocaleString()}</p>
                <p><strong>Reference:</strong> {selectedPayment.reference}</p>
              </div>
            )}
            {selectedUser && (
              <div className="space-y-2">
                <p><strong>User:</strong> {selectedUser.firstName} {selectedUser.lastName}</p>
                <p><strong>Email:</strong> {selectedUser.email}</p>
                <p><strong>Type:</strong> {selectedUser.userType}</p>
              </div>
            )}
            <div>
              <Label htmlFor="reason">Rejection Reason</Label>
              <Textarea
                id="reason"
                placeholder="Enter reason for rejection..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className="mt-2"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setShowRejectionDialog(false)
              setRejectionReason("")
              setSelectedUser(null)
            }}>
              Cancel
            </Button>
            <Button 
              onClick={handleReject} 
              className="bg-red-600 hover:bg-red-700"
              disabled={!rejectionReason.trim()}
            >
              Reject Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Manual Verification Dialog */}
      <Dialog open={showManualVerificationDialog} onOpenChange={setShowManualVerificationDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Manually Verify Payment</DialogTitle>
            <DialogDescription>
              Manually verify a payment for a user who hasn't submitted a receipt.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {selectedUserForVerification && (
              <div className="space-y-2">
                <p><strong>User:</strong> {selectedUserForVerification.firstName} {selectedUserForVerification.lastName}</p>
                <p><strong>Email:</strong> {selectedUserForVerification.email}</p>
                <p><strong>Type:</strong> {selectedUserForVerification.userType}</p>
              </div>
            )}
            <div>
              <Label htmlFor="manualAmount">Amount (₦)</Label>
              <Input
                id="manualAmount"
                type="number"
                value={manualVerificationData.amount}
                onChange={(e) => setManualVerificationData({...manualVerificationData, amount: e.target.value})}
                placeholder="Enter payment amount"
              />
            </div>
            <div>
              <Label htmlFor="manualPaymentMethod">Payment Method</Label>
              <Select value={manualVerificationData.paymentMethod} onValueChange={(value) => setManualVerificationData({...manualVerificationData, paymentMethod: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manual_verification">Manual Verification</SelectItem>
                  <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="card">Card Payment</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="manualNotes">Notes (Optional)</Label>
              <Textarea
                id="manualNotes"
                placeholder="Add any notes for the verification..."
                value={manualVerificationData.notes}
                onChange={(e) => setManualVerificationData({...manualVerificationData, notes: e.target.value})}
                className="mt-2"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowManualVerificationDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleManualVerification} className="bg-blue-600 hover:bg-blue-700">
              Verify Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
