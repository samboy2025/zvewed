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
  Ticket
} from "lucide-react"

export default function AdminPaymentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  // Define types for payments and users
  interface Payment {
    _id: Id<"payments">;
    userName: string;
    userEmail: string;
    reference: string;
    status: string;
    type: string;
    amount: number;
    rejectionReason?: string;
    userType?: string;
    paymentStatus?: string;
    paymentMethod?: string;
    createdAt: number;
    receiptUrl?: string;
    _creationTime?: number;
  }

  interface UserPayment {
    _id: Id<"users">;
    email: string;
    name: string;
    userType: string;
    paymentAmount?: number;
    paymentStatus?: string;
    _creationTime: number;
  }

  interface User {
    _id: string;
    paymentStatus: string;
    paymentRejectionReason?: string;
  }

  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [showApprovalDialog, setShowApprovalDialog] = useState(false);
  const [showRejectionDialog, setShowRejectionDialog] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  
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

  // Get real user payment data
  const pendingUserPayments = useQuery(api.users.getUsersByPaymentStatus, { status: "pending" }) || [];
  const approvedUserPayments = useQuery(api.users.getUsersByPaymentStatus, { status: "approved" }) || [];
  const rejectedUserPayments = useQuery(api.users.getUsersByPaymentStatus, { status: "rejected" }) || [];
  const updateUserPaymentStatus = useMutation(api.users.updateUserPaymentStatus);

  // Mock update function for when Convex is not available
  interface PaymentUpdateParams {
    userId: Id<"users">;
    status: string;
    rejectionReason?: string;
  }

  const handleUserPaymentUpdate = async ({ userId, status, rejectionReason }: { userId: Id<"users">; status: string; rejectionReason?: string }) => {
    try {
      if (updateUserPaymentStatus) {
        await updateUserPaymentStatus({ userId, status, rejectionReason });
      }
      return { success: true };
    } catch (error) {
      console.error("Error updating payment status:", error);
      return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
    }
  }

  // Filter real payments from database
  const filteredPayments = payments?.filter((payment) => {
    // Ensure we have a valid payment record
    if (!payment || !payment.userName || !payment.userEmail || !payment.reference) {
      return false;
    }

    const matchesSearch =
      payment.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.reference.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || payment.status === statusFilter
    const matchesType = typeFilter === "all" || payment.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  }) || []

  // Handle payment approval
  const handleApprove = async () => {
    if (!selectedPayment) return

    try {
      // Check if this is a user payment (has userType field) or regular payment
      if (selectedPayment.userType && selectedPayment.paymentStatus !== undefined) {
        // This is a user payment
        const userPayment = selectedPayment as unknown as { _id: Id<"users"> };
        await handleUserPaymentUpdate({
          userId: userPayment._id,
          status: "approved",
        })
      } else {
        // This is a regular payment
        await updatePaymentStatus({
          paymentId: selectedPayment._id,
          status: "approved",
        })
      }
      setShowApprovalDialog(false)
      setSelectedPayment(null)
    } catch (error) {
      console.error("Error approving payment:", error)
    }
  }

  // Handle payment rejection
  const handleReject = async () => {
    if (!selectedPayment || !rejectionReason.trim()) return

    try {
      // Check if this is a user payment (has userType field) or regular payment
      if (selectedPayment.userType && selectedPayment.paymentStatus !== undefined) {
        // This is a user payment
        const userPayment = selectedPayment as unknown as { _id: Id<"users"> };
        await handleUserPaymentUpdate({
          userId: userPayment._id,
          status: "rejected",
          rejectionReason: rejectionReason,
        })
      } else {
        // This is a regular payment
        await updatePaymentStatus({
          paymentId: selectedPayment._id,
          status: "rejected",
          rejectionReason: rejectionReason,
        })
      }
      setShowRejectionDialog(false)
      setSelectedPayment(null)
      setRejectionReason("")
    } catch (error) {
      console.error("Error rejecting payment:", error)
    }
  }

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
  const exportData = filteredPayments.map((payment: Payment & { createdAt: number; approvedAt?: number; paymentMethod?: string }) => ({
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
  if (!payments || !paymentStats || !pendingUserPayments || !approvedUserPayments || !rejectedUserPayments) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Clock className="h-8 w-8 mx-auto mb-4 text-gray-400 animate-spin" />
          <p className="text-gray-500">Loading payment data...</p>
        </div>
      </div>
    )
  }

  // Handle empty state
  if (payments.length === 0 && pendingUserPayments.length === 0 && approvedUserPayments.length === 0 && rejectedUserPayments.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <DollarSign className="h-8 w-8 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-500">No payment records found</p>
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
        <ExcelExportButton
          data={exportData}
          filename="payments"
          buttonText="Export Payments"
        />
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
              Awaiting approval
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
                              {
                                const userPayment = user as unknown as UserPayment;
                                const userPaymentView = {
                                  _id: userPayment._id as unknown as Id<"payments">, // Type cast for view only
                                  userName: userPayment.name,
                                  userEmail: userPayment.email,
                                  reference: userPayment._id.toString(),
                                  type: userPayment.userType || 'user',
                                  amount: userPayment.paymentAmount || 0,
                                  status: userPayment.paymentStatus || 'pending',
                                  createdAt: userPayment._creationTime,
                                  userType: 'user',
                                  paymentStatus: userPayment.paymentStatus || 'pending',
                                } satisfies Payment;
                                setSelectedPayment(userPaymentView);
                              }
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
          {selectedPayment && (
            <div className="space-y-4">
              <div className="space-y-2">
                <p><strong>User:</strong> {selectedPayment.userName}</p>
                <p><strong>Amount:</strong> ₦{selectedPayment.amount.toLocaleString()}</p>
                <p><strong>Reference:</strong> {selectedPayment.reference}</p>
              </div>
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
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setShowRejectionDialog(false)
              setRejectionReason("")
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
    </div>
  )
}
