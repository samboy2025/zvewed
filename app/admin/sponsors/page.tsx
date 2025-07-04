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
  Building, 
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
  Crown,
  Award,
  Medal,
  Handshake
} from "lucide-react"

export default function AdminSponsorsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedSponsor, setSelectedSponsor] = useState<any>(null)
  
  const sponsors = useQuery(api.sponsors.getAllSponsors)
  const sponsorStats = useQuery(api.sponsors.getSponsorStats)
  const updateSponsorStatus = useMutation(api.sponsors.updateSponsorStatus)
  const deleteSponsor = useMutation(api.sponsors.deleteSponsor)

  const handleStatusUpdate = async (sponsorId: string, newStatus: string) => {
    try {
      await updateSponsorStatus({
        sponsorId: sponsorId as any,
        status: newStatus,
      })
    } catch (error) {
      console.error("Error updating sponsor status:", error)
    }
  }

  const handleDeleteSponsor = async (sponsorId: string) => {
    if (confirm("Are you sure you want to delete this sponsor registration?")) {
      try {
        await deleteSponsor({ sponsorId: sponsorId as any })
      } catch (error) {
        console.error("Error deleting sponsor:", error)
      }
    }
  }

  const filteredSponsors = sponsors?.filter(sponsor => {
    const matchesSearch = 
      sponsor.organizationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sponsor.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sponsor.email.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === "all" || sponsor.status === statusFilter
    
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

  const getSponsorshipLevelIcon = (level: string) => {
    switch (level) {
      case "platinum":
        return <Crown className="h-4 w-4 text-purple-600" />
      case "gold":
        return <Award className="h-4 w-4 text-yellow-600" />
      case "silver":
        return <Medal className="h-4 w-4 text-gray-600" />
      case "in-kind":
        return <Handshake className="h-4 w-4 text-blue-600" />
      default:
        return <Building className="h-4 w-4" />
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

  if (!sponsors || !sponsorStats) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Clock className="h-8 w-8 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-500">Loading sponsors...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Sponsor Management</h1>
        <p className="text-gray-600">Manage WED 4.0 sponsor registrations and applications</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sponsors</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sponsorStats.total}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{sponsorStats.approved}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{sponsorStats.pending}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paid</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{sponsorStats.paid}</div>
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
                  placeholder="Search by organization, contact person, or email..."
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

      {/* Sponsors Table */}
      <Card>
        <CardHeader>
          <CardTitle>Sponsor Registrations ({filteredSponsors.length})</CardTitle>
          <CardDescription>
            Manage all sponsor applications and their status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Organization</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSponsors.map((sponsor) => (
                  <TableRow key={sponsor._id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{sponsor.organizationName}</div>
                        <div className="text-sm text-gray-500">{sponsor.industry}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{sponsor.contactPerson}</div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {sponsor.email}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {sponsor.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getSponsorshipLevelIcon(sponsor.sponsorshipLevel)}
                        <span className="capitalize">{sponsor.sponsorshipLevel}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{sponsor.sponsorshipAmount}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        {getStatusBadge(sponsor.status)}
                        <Select
                          value={sponsor.status}
                          onValueChange={(value) => handleStatusUpdate(sponsor._id, value)}
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
                        {getPaymentStatusBadge(sponsor.paymentStatus)}
                        <Select
                          value={sponsor.paymentStatus}
                          onValueChange={(value) => updateSponsorStatus({
                            sponsorId: sponsor._id,
                            status: sponsor.status,
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
                        {formatDate(sponsor.createdAt)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedSponsor(sponsor)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Sponsor Details</DialogTitle>
                              <DialogDescription>
                                Complete information for {sponsor.organizationName}
                              </DialogDescription>
                            </DialogHeader>
                            {selectedSponsor && (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm font-medium">Organization</label>
                                    <p className="text-sm">{selectedSponsor.organizationName}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Contact Person</label>
                                    <p className="text-sm">{selectedSponsor.contactPerson}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Position</label>
                                    <p className="text-sm">{selectedSponsor.position}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Email</label>
                                    <p className="text-sm">{selectedSponsor.email}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Phone</label>
                                    <p className="text-sm">{selectedSponsor.phone}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Website</label>
                                    <p className="text-sm">{selectedSponsor.website || "N/A"}</p>
                                  </div>
                                </div>
                                
                                <div>
                                  <label className="text-sm font-medium">Address</label>
                                  <p className="text-sm">
                                    {selectedSponsor.address}, {selectedSponsor.city}, {selectedSponsor.state}
                                  </p>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm font-medium">Organization Type</label>
                                    <p className="text-sm capitalize">{selectedSponsor.organizationType}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Industry</label>
                                    <p className="text-sm capitalize">{selectedSponsor.industry}</p>
                                  </div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm font-medium">Sponsorship Level</label>
                                    <p className="text-sm capitalize">{selectedSponsor.sponsorshipLevel}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Amount</label>
                                    <p className="text-sm font-medium">{selectedSponsor.sponsorshipAmount}</p>
                                  </div>
                                </div>
                                
                                {selectedSponsor.marketingObjectives && (
                                  <div>
                                    <label className="text-sm font-medium">Marketing Objectives</label>
                                    <p className="text-sm">{selectedSponsor.marketingObjectives}</p>
                                  </div>
                                )}
                                
                                {selectedSponsor.targetAudience && (
                                  <div>
                                    <label className="text-sm font-medium">Target Audience</label>
                                    <p className="text-sm">{selectedSponsor.targetAudience}</p>
                                  </div>
                                )}
                                
                                {selectedSponsor.specialRequests && (
                                  <div>
                                    <label className="text-sm font-medium">Special Requests</label>
                                    <p className="text-sm">{selectedSponsor.specialRequests}</p>
                                  </div>
                                )}
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteSponsor(sponsor._id)}
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
          
          {filteredSponsors.length === 0 && (
            <div className="text-center py-8">
              <Building className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-500">No sponsors found matching your criteria</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 