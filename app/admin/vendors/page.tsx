"use client"

import { useState } from "react"
import { useQuery, useMutation } from "convex/react"
import { api } from "../../../convex/_generated/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { 
  Store, 
  Mail, 
  Phone, 
  MapPin, 
  DollarSign, 
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  Search,
  Filter,
  Eye,
  Package,
  Zap
} from "lucide-react"

export default function AdminVendorsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedVendor, setSelectedVendor] = useState<any>(null)
  
  const vendors = useQuery(api.vendors.getAllVendors)
  const vendorStats = useQuery(api.vendors.getVendorStats)
  const updateVendorStatus = useMutation(api.vendors.updateVendorStatus)
  const deleteVendor = useMutation(api.vendors.deleteVendor)

  const handleStatusUpdate = async (vendorId: string, newStatus: string) => {
    try {
      await updateVendorStatus({
        vendorId: vendorId as any,
        status: newStatus,
      })
    } catch (error) {
      console.error("Error updating vendor status:", error)
    }
  }

  const handleDeleteVendor = async (vendorId: string) => {
    if (confirm("Are you sure you want to delete this vendor registration?")) {
      try {
        await deleteVendor({ vendorId: vendorId as any })
      } catch (error) {
        console.error("Error deleting vendor:", error)
      }
    }
  }

  const filteredVendors = vendors?.filter(vendor => {
    const matchesSearch = 
      vendor.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.email.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === "all" || vendor.status === statusFilter
    
    return matchesSearch && matchesStatus
  }) || []

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

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-100 text-green-800">Paid</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case "unpaid":
        return <Badge className="bg-red-100 text-red-800">Unpaid</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getBoothSizeBadge = (size: string) => {
    switch (size) {
      case "small":
        return <Badge variant="outline">Small (3m x 2m)</Badge>
      case "medium":
        return <Badge variant="outline">Medium (3m x 3m)</Badge>
      case "large":
        return <Badge variant="outline">Large (3m x 4m)</Badge>
      case "custom":
        return <Badge variant="outline">Custom Size</Badge>
      default:
        return <Badge variant="secondary">{size}</Badge>
    }
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  if (!vendors || !vendorStats) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Clock className="h-8 w-8 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-500">Loading vendors...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Vendor Management</h1>
        <p className="text-gray-600">Manage WED 4.0 vendor exhibition registrations</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Vendors</CardTitle>
            <Store className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{vendorStats.total}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{vendorStats.approved}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{vendorStats.pending}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paid</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{vendorStats.paid}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by company, contact person, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="w-full md:w-48">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vendors Table */}
      <Card>
        <CardHeader>
          <CardTitle>Vendor Registrations ({filteredVendors.length})</CardTitle>
          <CardDescription>
            Manage all vendor exhibition applications and their status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Business Type</TableHead>
                  <TableHead>Booth Size</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVendors.map((vendor) => (
                  <TableRow key={vendor._id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{vendor.companyName}</div>
                        <div className="text-sm text-gray-500">{vendor.industry}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{vendor.contactPerson}</div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {vendor.email}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {vendor.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="capitalize">{vendor.businessType}</div>
                      <div className="text-sm text-gray-500">{vendor.yearsInBusiness} years</div>
                    </TableCell>
                    <TableCell>
                      {getBoothSizeBadge(vendor.boothSize)}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        {getStatusBadge(vendor.status)}
                        <Select
                          value={vendor.status}
                          onValueChange={(value) => handleStatusUpdate(vendor._id, value)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="approved">Approved</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        {getPaymentStatusBadge(vendor.paymentStatus)}
                        <Select
                          value={vendor.paymentStatus}
                          onValueChange={(value) => updateVendorStatus({
                            vendorId: vendor._id,
                            status: vendor.status,
                            paymentStatus: value
                          })}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="unpaid">Unpaid</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="paid">Paid</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-gray-500">
                        {formatDate(vendor.createdAt)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedVendor(vendor)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Vendor Details</DialogTitle>
                              <DialogDescription>
                                Complete information for {vendor.companyName}
                              </DialogDescription>
                            </DialogHeader>
                            {selectedVendor && (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm font-medium">Company Name</label>
                                    <p className="text-sm">{selectedVendor.companyName}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Contact Person</label>
                                    <p className="text-sm">{selectedVendor.contactPerson}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Email</label>
                                    <p className="text-sm">{selectedVendor.email}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Phone</label>
                                    <p className="text-sm">{selectedVendor.phone}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Website</label>
                                    <p className="text-sm">{selectedVendor.website || "N/A"}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Years in Business</label>
                                    <p className="text-sm">{selectedVendor.yearsInBusiness}</p>
                                  </div>
                                </div>
                                
                                <div>
                                  <label className="text-sm font-medium">Address</label>
                                  <p className="text-sm">
                                    {selectedVendor.address}, {selectedVendor.city}, {selectedVendor.state}
                                  </p>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm font-medium">Business Type</label>
                                    <p className="text-sm capitalize">{selectedVendor.businessType}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Industry</label>
                                    <p className="text-sm capitalize">{selectedVendor.industry}</p>
                                  </div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm font-medium">Booth Size</label>
                                    <p className="text-sm capitalize">{selectedVendor.boothSize}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Products/Services</label>
                                    <p className="text-sm">{selectedVendor.productServices}</p>
                                  </div>
                                </div>
                                
                                {selectedVendor.targetAudience && (
                                  <div>
                                    <label className="text-sm font-medium">Target Audience</label>
                                    <p className="text-sm">{selectedVendor.targetAudience}</p>
                                  </div>
                                )}
                                
                                {selectedVendor.objectives && (
                                  <div>
                                    <label className="text-sm font-medium">Exhibition Objectives</label>
                                    <p className="text-sm">{selectedVendor.objectives}</p>
                                  </div>
                                )}
                                
                                {selectedVendor.previousExperience && (
                                  <div>
                                    <label className="text-sm font-medium">Previous Experience</label>
                                    <p className="text-sm">{selectedVendor.previousExperience}</p>
                                  </div>
                                )}
                                
                                {selectedVendor.specialRequirements && (
                                  <div>
                                    <label className="text-sm font-medium">Special Requirements</label>
                                    <p className="text-sm">{selectedVendor.specialRequirements}</p>
                                  </div>
                                )}
                                
                                {selectedVendor.paymentReceipt && (
                                  <div className="border-t pt-4">
                                    <label className="text-sm font-medium">Payment Receipt</label>
                                    <div className="mt-2">
                                      <img 
                                        src={selectedVendor.paymentReceipt} 
                                        alt="Payment receipt" 
                                        className="w-full max-w-md rounded border"
                                      />
                                      {selectedVendor.paymentDetails && (
                                        <div className="mt-2 space-y-1 text-sm">
                                          <p><strong>Amount:</strong> ₦{selectedVendor.paymentDetails.amount?.toLocaleString()}</p>
                                          <p><strong>Reference:</strong> {selectedVendor.paymentDetails.referenceNumber}</p>
                                          <p><strong>Date:</strong> {selectedVendor.paymentDetails.paymentDate}</p>
                                          {selectedVendor.paymentDetails.bankName && (
                                            <p><strong>Bank:</strong> {selectedVendor.paymentDetails.bankName}</p>
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteVendor(vendor._id)}
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {filteredVendors.length === 0 && (
            <div className="text-center py-8">
              <Store className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-500">No vendors found matching your criteria</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 