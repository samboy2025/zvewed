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
  Search,
  Filter,
  Eye,
  Check,
  X,
  FileText,
  Download,
  CreditCard,
  Building,
  Package,
  Ticket,
  Plus,
  UserPlus
} from "lucide-react"

export default function AdminPaymentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [dateRange, setDateRange] = useState("all") // all, today, week, month
  
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
  const [showCreatePaymentDialog, setShowCreatePaymentDialog] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  
  // Create payment form state
  const [newPayment, setNewPayment] = useState({
    userName: "",
    userEmail: "",
    amount: "",
    type: "ticket",
    userType: "participant",
    reference: "",
    paymentMethod: "bank_transfer"
  });
  
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
  const deletePayment = useMutation(api.payments.deletePayment);
  const createPayment = useMutation(api.payments.createPayment);

  // Get payments missing receipts
  const paymentsMissingReceipts = useQuery(api.payments.getPaymentsMissingReceipts) || [];

  // Get real user payment data
  const allUsers = useQuery(api.users.getAllUsers) || [];
  const pendingUserPayments = useQuery(api.users.getUsersByPaymentStatus, { status: "pending" }) || [];
  const approvedUserPayments = useQuery(api.users.getUsersByPaymentStatus, { status: "approved" }) || [];
  const rejectedUserPayments = useQuery(api.users.getUsersByPaymentStatus, { status: "rejected" }) || [];
  const usersWithoutPayments = useQuery(api.users.getUsersWithoutPayments) || [];
  const updateUserPaymentStatus = useMutation(api.users.updateUserPaymentStatus);
  const initializeUserPayment = useMutation(api.users.initializeUserPayment);

  // Get users eligible for manual payment verification
  const usersEligibleForManualVerification = useQuery(api.admin.getUsersEligibleForManualVerification, {}) || [];
  const manuallyVerifyUserPayment = useMutation(api.admin.manuallyVerifyUserPayment);

  // Debug logging for convex functions
  console.log("Convex API functions loaded:", {
    payments: !!api.payments,
    users: !!api.users,
    admin: !!api.admin,
    getPaymentsMissingReceipts: !!api.payments?.getPaymentsMissingReceipts,
    getUsersByPaymentStatus: !!api.users?.getUsersByPaymentStatus,
    getUsersWithoutPayments: !!api.users?.getUsersWithoutPayments,
    getUsersEligibleForManualVerification: !!api.admin?.getUsersEligibleForManualVerification,
  });

  // Manual verification form state
  const [showManualVerificationDialog, setShowManualVerificationDialog] = useState(false);
  const [selectedUserForVerification, setSelectedUserForVerification] = useState<User | null>(null);
  const [manualVerificationData, setManualVerificationData] = useState({
    amount: "",
    paymentMethod: "manual_verification",
    notes: ""
  });

  // Generate unique reference number
  const generateReference = () => {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 5);
    return `WED-${timestamp}-${random}`.toUpperCase();
  };

  // Handle creating new payment
  const handleCreatePayment = async () => {
    if (!newPayment.userName || !newPayment.userEmail || !newPayment.amount || !newPayment.reference) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      await createPayment({
        userId: `admin-created-${Date.now()}`,
        userName: newPayment.userName,
        userEmail: newPayment.userEmail,
        amount: parseFloat(newPayment.amount),
        type: newPayment.type,
        userType: newPayment.userType,
        reference: newPayment.reference,
        status: "pending",
        paymentMethod: newPayment.paymentMethod,
      });

      // Reset form
      setNewPayment({
        userName: "",
        userEmail: "",
        amount: "",
        type: "ticket",
        userType: "participant",
        reference: "",
        paymentMethod: "bank_transfer"
      });
      setShowCreatePaymentDialog(false);
      alert("Payment created successfully!");
    } catch (error) {
      console.error("Error creating payment:", error);
      alert("Failed to create payment");
    }
  };

  // Filter real payments from database
  const filteredPayments = payments?.filter((payment) => {
    if (!payment || !payment.userName || !payment.userEmail || !payment.reference) {
      return false;
    }

    const matchesSearch =
      payment.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.reference.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || payment.status === statusFilter
    const matchesType = typeFilter === "all" || payment.type === typeFilter

    // Date filtering
    let matchesDate = true;
    if (dateRange !== "all") {
      const paymentDate = new Date(payment.createdAt);
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      const monthAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());

      switch (dateRange) {
        case "today":
          matchesDate = paymentDate >= today;
          break;
        case "week":
          matchesDate = paymentDate >= weekAgo;
          break;
        case "month":
          matchesDate = paymentDate >= monthAgo;
          break;
      }
    }

    return matchesSearch && matchesStatus && matchesType && matchesDate
  }) || []

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

  // Get type icon
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "ticket":
        return <Ticket className="h-4 w-4 text-blue-600" />
      case "sponsorship":
        return <Building className="h-4 w-4 text-purple-600" />
      case "vendor_booth":
        return <Package className="h-4 w-4 text-orange-600" />
      default:
        return <CreditCard className="h-4 w-4 text-gray-600" />
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

  // Prepare export data
  const exportData = filteredPayments.map((payment: Payment) => ({
    Date: formatDate(payment.createdAt),
    Name: payment.userName,
    Email: payment.userEmail,
    Type: payment.type,
    Amount: payment.amount,
    Reference: payment.reference,
    Status: payment.status,
    Method: payment.paymentMethod || "N/A",
    ApprovedAt: payment.approvedAt ? formatDate(payment.approvedAt) : "N/A",
  }))

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
        <div className="flex gap-2">
          <Button
            onClick={() => setShowCreatePaymentDialog(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Payment
          </Button>
          <ExcelExportButton
            data={exportData}
            filename="payments"
            buttonText="Export Payments"
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₦{paymentStats.totalAmount.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              From {paymentStats.total} payments
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
              {paymentStats.approved}
            </div>
            <p className="text-xs text-muted-foreground">
              ₦{paymentStats.approvedAmount.toLocaleString()}
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
              {paymentStats.pending}
            </div>
            <p className="text-xs text-muted-foreground">
              ₦{paymentStats.pendingAmount.toLocaleString()}
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
              {paymentStats.rejected}
            </div>
            <p className="text-xs text-muted-foreground">
              Payment issues
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Breakdown */}
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
                  <div className="font-semibold">₦{paymentStats.byUserType?.participant?.amount?.toLocaleString() || 0}</div>
                  <div className="text-sm text-gray-500">{paymentStats.byUserType?.participant?.count || 0} payments</div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span>Vendors</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold">₦{paymentStats.byUserType?.vendor?.amount?.toLocaleString() || 0}</div>
                  <div className="text-sm text-gray-500">{paymentStats.byUserType?.vendor?.count || 0} payments</div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span>Sponsors</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold">₦{paymentStats.byUserType?.sponsor?.amount?.toLocaleString() || 0}</div>
                  <div className="text-sm text-gray-500">{paymentStats.byUserType?.sponsor?.count || 0} payments</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Revenue by Payment Type
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Ticket className="h-4 w-4 text-blue-600" />
                  <span>Event Tickets</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold">₦{paymentStats.byType?.ticket?.amount?.toLocaleString() || 0}</div>
                  <div className="text-sm text-gray-500">{paymentStats.byType?.ticket?.count || 0} payments</div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-orange-600" />
                  <span>Vendor Booths</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold">₦{paymentStats.byType?.vendor_booth?.amount?.toLocaleString() || 0}</div>
                  <div className="text-sm text-gray-500">{paymentStats.byType?.vendor_booth?.count || 0} payments</div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-purple-600" />
                  <span>Sponsorships</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold">₦{paymentStats.byType?.sponsorship?.amount?.toLocaleString() || 0}</div>
                  <div className="text-sm text-gray-500">{paymentStats.byType?.sponsorship?.count || 0} payments</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by name, email, or reference..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="ticket">Tickets</SelectItem>
                <SelectItem value="sponsorship">Sponsorships</SelectItem>
                <SelectItem value="vendor_booth">Vendor Booths</SelectItem>
              </SelectContent>
            </Select>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Payments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Transactions ({filteredPayments.length})</CardTitle>
          <CardDescription>
            All payment records with approval controls
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Reference</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow key={payment._id}>
                  <TableCell>
                    <div className="text-sm">
                      {formatDate(payment.createdAt)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{payment.userName}</div>
                      <div className="text-sm text-gray-500">{payment.userEmail}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getTypeIcon(payment.type)}
                      <span className="capitalize">{payment.type.replace('_', ' ')}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">
                      ₦{payment.amount.toLocaleString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-mono text-sm">
                      {payment.reference}
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(payment.status)}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedPayment(payment)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Payment Details</DialogTitle>
                            <DialogDescription>
                              Transaction #{payment.reference}
                            </DialogDescription>
                          </DialogHeader>
                          {selectedPayment && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label>User</Label>
                                  <p className="text-sm">{selectedPayment.userName}</p>
                                  <p className="text-xs text-gray-500">{selectedPayment.userEmail}</p>
                                </div>
                                <div>
                                  <Label>Amount</Label>
                                  <p className="text-lg font-bold">
                                    ₦{selectedPayment.amount.toLocaleString()}
                                  </p>
                                </div>
                                <div>
                                  <Label>Type</Label>
                                  <p className="text-sm capitalize">
                                    {selectedPayment.type.replace('_', ' ')}
                                  </p>
                                </div>
                                <div>
                                  <Label>Status</Label>
                                  <div>{getStatusBadge(selectedPayment.status)}</div>
                                </div>
                                <div>
                                  <Label>Payment Method</Label>
                                  <p className="text-sm">
                                    {selectedPayment.paymentMethod || "Bank Transfer"}
                                  </p>
                                </div>
                                <div>
                                  <Label>Date</Label>
                                  <p className="text-sm">
                                    {formatDate(selectedPayment.createdAt)}
                                  </p>
                                </div>
                              </div>
                              
                              {selectedPayment.receiptUrl && (
                                <div>
                                  <Label>Payment Receipt</Label>
                                  <img 
                                    src={selectedPayment.receiptUrl} 
                                    alt="Payment receipt" 
                                    className="mt-2 max-w-full rounded border"
                                  />
                                </div>
                              )}
                              
                              {selectedPayment.rejectionReason && (
                                <div>
                                  <Label>Rejection Reason</Label>
                                  <p className="text-sm text-red-600">
                                    {selectedPayment.rejectionReason}
                                  </p>
                                </div>
                              )}
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>

                      {payment.status === "pending" && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-green-600"
                            onClick={() => {
                              setSelectedPayment(payment)
                              setShowApprovalDialog(true)
                            }}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600"
                            onClick={() => {
                              setSelectedPayment(payment)
                              setShowRejectionDialog(true)
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                      {payment.status === "pending" && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-blue-600"
                          title="Mark as payment received (for offline payments)"
                          onClick={async () => {
                            try {
                              await updatePaymentStatus({
                                paymentId: payment._id,
                                status: "approved",
                              })
                              alert("Payment marked as received successfully!");
                            } catch (error) {
                              console.error("Error updating payment:", error)
                              alert("Failed to update payment")
                            }
                          }}
                        >
                          <DollarSign className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredPayments.length === 0 && (
            <div className="text-center py-8">
              <CreditCard className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-500">No payments found matching your criteria</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* User Payment Management Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            User Payment Verification
          </CardTitle>
          <CardDescription>
            Review and approve participant and vendor payment submissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* User Payment Stats */}
          <div className="grid gap-4 md:grid-cols-3 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending User Payments</CardTitle>
                <Clock className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">
                  {(pendingUserPayments?.length || 0)}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Approved User Payments</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {(approvedUserPayments?.length || 0)}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Rejected User Payments</CardTitle>
                <XCircle className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {(rejectedUserPayments?.length || 0)}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* User Payments Table */}
          {pendingUserPayments && pendingUserPayments.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Pending User Payments</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Receipt</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingUserPayments.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{user.firstName} {user.lastName}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {user.userType}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        ₦{(user.paymentAmount || (user.userType === "participant" ? 7000 : 12000)).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        {user.paymentSubmittedAt ? formatDate(user.paymentSubmittedAt) : "Not submitted"}
                      </TableCell>
                      <TableCell>
                        {user.paymentReceipt && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => window.open(user.paymentReceipt, '_blank')}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={async () => {
                              try {
                                await updateUserPaymentStatus({
                                  userId: user._id,
                                  status: "approved"
                                })
                                alert("Payment approved successfully!")
                              } catch (error) {
                                console.error("Error approving payment:", error)
                                alert("Failed to approve payment")
                              }
                            }}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => {
                              setSelectedUser(user);
                              setShowRejectionDialog(true)
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {(!pendingUserPayments || pendingUserPayments.length === 0) && (
            <div className="text-center py-8">
              <CheckCircle className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-500">No pending user payments to review</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Users Without Payments Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Users Without Payment Submissions
          </CardTitle>
          <CardDescription>
            Users who haven't submitted payment receipts yet
          </CardDescription>
        </CardHeader>
        <CardContent>
          {usersWithoutPayments && usersWithoutPayments.length > 0 ? (
            <div>
              <div className="mb-4 flex items-center justify-between">
                <Badge variant="outline" className="text-orange-600">
                  {usersWithoutPayments.length} users need to submit payments
                </Badge>
                <Button
                  variant="outline"
                  onClick={async () => {
                    try {
                      let successCount = 0;
                      for (const user of usersWithoutPayments) {
                        try {
                          await initializeUserPayment({ userId: user._id });
                          successCount++;
                        } catch (error) {
                          console.error(`Failed to initialize payment for ${user.email}:`, error);
                        }
                      }
                      alert(`Successfully initialized payment amounts for ${successCount} out of ${usersWithoutPayments.length} users`);
                    } catch (error) {
                      console.error("Error in bulk initialization:", error);
                      alert("Failed to initialize payment amounts");
                    }
                  }}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Initialize All Payment Amounts
                </Button>
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
                  {usersWithoutPayments.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{user.firstName} {user.lastName}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
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
                          Payment Required
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setNewPayment({
                                userName: `${user.firstName} ${user.lastName}`,
                                userEmail: user.email,
                                amount: (user.paymentAmount || (user.userType === "participant" ? 7000 : 12000)).toString(),
                                type: user.userType === "participant" ? "ticket" : "vendor_booth",
                                userType: user.userType,
                                reference: generateReference(),
                                paymentMethod: "bank_transfer"
                              });
                              setShowCreatePaymentDialog(true);
                            }}
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Create Payment
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={async () => {
                              try {
                                await initializeUserPayment({ userId: user._id });
                                alert("Payment amount initialized successfully!");
                              } catch (error) {
                                console.error("Error initializing payment amount:", error);
                                alert("Failed to initialize payment amount");
                              }
                            }}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Initialize Amount
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
              <p className="text-gray-500">All users have submitted payments or are exempt</p>
            </div>
          )}
        </CardContent>
      </Card>

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
              <div className="mb-4 flex items-center justify-between">
                <Badge variant="outline" className="text-blue-600">
                  {usersEligibleForManualVerification.length} users eligible for manual verification
                </Badge>
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
                  {usersEligibleForManualVerification.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{user.firstName} {user.lastName}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
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

      {/* Payments Missing Receipts Section */}
      {paymentsMissingReceipts && paymentsMissingReceipts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Payments Missing Receipts
            </CardTitle>
            <CardDescription>
              Approved payments that don't have receipt files uploaded
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Badge variant="outline" className="text-orange-600">
                {paymentsMissingReceipts.length} payments missing receipts
              </Badge>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Reference</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paymentsMissingReceipts.map((payment) => (
                  <TableRow key={payment._id}>
                    <TableCell>
                      <div className="text-sm">
                        {formatDate(payment.createdAt)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{payment.userName}</div>
                        <div className="text-sm text-gray-500">{payment.userEmail}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getTypeIcon(payment.type)}
                        <span className="capitalize">{payment.type.replace('_', ' ')}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">
                        ₦{payment.amount.toLocaleString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-mono text-sm">
                        {payment.reference}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedPayment(payment);
                            setShowApprovalDialog(false);
                            setShowRejectionDialog(false);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-blue-600"
                          onClick={() => {
                            // This could open a dialog to upload receipt
                            alert("Receipt upload functionality can be added here");
                          }}
                        >
                          <FileText className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Create Payment Dialog */}
      <Dialog open={showCreatePaymentDialog} onOpenChange={setShowCreatePaymentDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Payment Record</DialogTitle>
            <DialogDescription>
              Manually create a payment record for a user
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="userName">User Name</Label>
              <Input
                id="userName"
                value={newPayment.userName}
                onChange={(e) => setNewPayment({...newPayment, userName: e.target.value})}
                placeholder="Enter user's full name"
              />
            </div>
            <div>
              <Label htmlFor="userEmail">User Email</Label>
              <Input
                id="userEmail"
                type="email"
                value={newPayment.userEmail}
                onChange={(e) => setNewPayment({...newPayment, userEmail: e.target.value})}
                placeholder="Enter user's email"
              />
            </div>
            <div>
              <Label htmlFor="amount">Amount (₦)</Label>
              <Input
                id="amount"
                type="number"
                value={newPayment.amount}
                onChange={(e) => setNewPayment({...newPayment, amount: e.target.value})}
                placeholder="Enter payment amount"
              />
            </div>
            <div>
              <Label htmlFor="type">Payment Type</Label>
              <Select value={newPayment.type} onValueChange={(value) => setNewPayment({...newPayment, type: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ticket">Event Ticket</SelectItem>
                  <SelectItem value="sponsorship">Sponsorship</SelectItem>
                  <SelectItem value="vendor_booth">Vendor Booth</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="userType">User Type</Label>
              <Select value={newPayment.userType} onValueChange={(value) => setNewPayment({...newPayment, userType: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="participant">Participant</SelectItem>
                  <SelectItem value="vendor">Vendor</SelectItem>
                  <SelectItem value="sponsor">Sponsor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="reference">Reference Number</Label>
              <div className="flex gap-2">
                <Input
                  id="reference"
                  value={newPayment.reference}
                  onChange={(e) => setNewPayment({...newPayment, reference: e.target.value})}
                  placeholder="Payment reference"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setNewPayment({...newPayment, reference: generateReference()})}
                >
                  Generate
                </Button>
              </div>
            </div>
            <div>
              <Label htmlFor="paymentMethod">Payment Method</Label>
              <Select value={newPayment.paymentMethod} onValueChange={(value) => setNewPayment({...newPayment, paymentMethod: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="card">Card Payment</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreatePaymentDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreatePayment} className="bg-blue-600 hover:bg-blue-700">
              Create Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
