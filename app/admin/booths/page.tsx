"use client"

import { useState, useEffect } from "react"
import { useQuery, useMutation } from "convex/react"
import { api } from "../../../convex/_generated/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Store, 
  MapPin, 
  Ruler, 
  Users, 
  CheckCircle,
  XCircle,
  Clock,
  Search,
  Filter,
  Eye,
  Package,
  Plus,
  Edit,
  Trash2,
  UserPlus,
  UserMinus,
  Building,
  Calendar,
  Info
} from "lucide-react"

export default function AdminBoothsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sectionFilter, setSectionFilter] = useState("all")
  const [selectedBooth, setSelectedBooth] = useState<any>(null)
  const [selectedVendor, setSelectedVendor] = useState<any>(null)
  const [showAssignmentDialog, setShowAssignmentDialog] = useState(false)
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [assignmentData, setAssignmentData] = useState({
    boothNumber: "",
    boothSection: "",
    boothLocation: "",
    boothNotes: ""
  })
  const [createData, setCreateData] = useState({
    boothNumber: "",
    section: "",
    location: "",
    size: "",
    area: "",
    notes: ""
  })
  const [editData, setEditData] = useState({
    boothNumber: "",
    section: "",
    location: "",
    size: "",
    area: "",
    notes: ""
  })

  // Fetch data
  const booths = useQuery(api.booths.getAllBooths)
  const availableBooths = useQuery(api.booths.getAvailableBooths)
  const vendors = useQuery(api.vendors.getAllVendors)
  
  // Mutations
  const assignBoothToVendor = useMutation(api.booths.assignBoothToVendor)
  const unassignBoothFromVendor = useMutation(api.booths.unassignBoothFromVendor)
  const createBooth = useMutation(api.booths.createBooth)
  const updateBooth = useMutation(api.booths.updateBooth)
  const deleteBooth = useMutation(api.booths.deleteBooth)
  const updateVendorBoothAssignment = useMutation(api.vendors.updateVendorBoothAssignment)
  const removeVendorBoothAssignment = useMutation(api.vendors.removeVendorBoothAssignment)

  // Get current admin user
  const [currentAdmin, setCurrentAdmin] = useState<any>(null)
  useEffect(() => {
    const adminData = localStorage.getItem('currentUser')
    if (adminData) {
      setCurrentAdmin(JSON.parse(adminData))
    }
  }, [])

  // Filter booths
  const filteredBooths = booths?.filter(booth => {
    const matchesSearch = 
      booth.boothNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booth.section.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booth.location.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === "all" || booth.status === statusFilter
    const matchesSection = sectionFilter === "all" || booth.section === sectionFilter
    
    return matchesSearch && matchesStatus && matchesSection
  }) || []

  // Get available vendors (approved and paid)
  const availableVendors = vendors?.filter(vendor => 
    vendor.status === "approved" && vendor.paymentStatus === "paid" && !vendor.boothAssigned
  ) || []

  // Handle booth assignment
  const handleAssignBooth = async () => {
    if (!selectedBooth || !selectedVendor || !currentAdmin) return

    try {
      // Assign booth in booths table
      await assignBoothToVendor({
        boothId: selectedBooth._id,
        vendorId: selectedVendor._id,
        vendorName: selectedVendor.companyName,
        adminId: currentAdmin._id,
      })

      // Update vendor with booth assignment
      await updateVendorBoothAssignment({
        vendorId: selectedVendor._id,
        boothNumber: selectedBooth.boothNumber,
        boothSection: selectedBooth.section,
        boothLocation: selectedBooth.location,
        boothNotes: assignmentData.boothNotes,
        adminId: currentAdmin._id,
      })

      setShowAssignmentDialog(false)
      setSelectedBooth(null)
      setSelectedVendor(null)
      setAssignmentData({
        boothNumber: "",
        boothSection: "",
        boothLocation: "",
        boothNotes: ""
      })
      alert("Booth assigned successfully!")
    } catch (error) {
      console.error("Error assigning booth:", error)
      alert("Failed to assign booth")
    }
  }

  // Handle booth unassignment
  const handleUnassignBooth = async (booth: any) => {
    if (!currentAdmin) return

    try {
      // Unassign booth in booths table
      await unassignBoothFromVendor({
        boothId: booth._id,
        adminId: currentAdmin._id,
      })

      // Remove booth assignment from vendor
      if (booth.vendorId) {
        await removeVendorBoothAssignment({
          vendorId: booth.vendorId,
        })
      }

      alert("Booth unassigned successfully!")
    } catch (error) {
      console.error("Error unassigning booth:", error)
      alert("Failed to unassign booth")
    }
  }

  // Handle create booth
  const handleCreateBooth = async () => {
    if (!createData.boothNumber || !createData.section || !createData.location || !createData.size || !createData.area) {
      alert("Please fill in all required fields")
      return
    }

    try {
      await createBooth({
        boothNumber: createData.boothNumber,
        section: createData.section,
        location: createData.location,
        size: createData.size,
        area: createData.area,
        notes: createData.notes,
      })

      setShowCreateDialog(false)
      setCreateData({
        boothNumber: "",
        section: "",
        location: "",
        size: "",
        area: "",
        notes: ""
      })
      alert("Booth created successfully!")
    } catch (error) {
      console.error("Error creating booth:", error)
      alert("Failed to create booth")
    }
  }

  // Handle edit booth
  const handleEditBooth = async () => {
    if (!selectedBooth) return

    try {
      await updateBooth({
        boothId: selectedBooth._id,
        boothNumber: editData.boothNumber,
        section: editData.section,
        location: editData.location,
        size: editData.size,
        area: editData.area,
        notes: editData.notes,
      })

      setShowEditDialog(false)
      setSelectedBooth(null)
      setEditData({
        boothNumber: "",
        section: "",
        location: "",
        size: "",
        area: "",
        notes: ""
      })
      alert("Booth updated successfully!")
    } catch (error) {
      console.error("Error updating booth:", error)
      alert("Failed to update booth")
    }
  }

  // Handle delete booth
  const handleDeleteBooth = async (boothId: string) => {
    if (confirm("Are you sure you want to delete this booth?")) {
      try {
        await deleteBooth({ boothId: boothId as any })
        alert("Booth deleted successfully!")
      } catch (error) {
        console.error("Error deleting booth:", error)
        alert("Failed to delete booth")
      }
    }
  }

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return <Badge className="bg-green-100 text-green-800">Available</Badge>
      case "assigned":
        return <Badge className="bg-blue-100 text-blue-800">Assigned</Badge>
      case "reserved":
        return <Badge className="bg-yellow-100 text-yellow-800">Reserved</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  // Get section options
  const sectionOptions = ["Technology Zone", "Manufacturing Hall", "Services Pavilion", "Main Exhibition Hall", "Innovation Corner", "Startup Alley"]

  if (!booths || !vendors) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Clock className="h-8 w-8 mx-auto mb-4 text-gray-400 animate-spin" />
            <p className="text-gray-500">Loading booth data...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Booth Management</h1>
        <p className="text-gray-600">Manage exhibition booths and assign them to vendors</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Booths</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{booths.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{availableBooths?.length || 0}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assigned</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{booths.filter(b => b.status === "assigned").length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Vendors</CardTitle>
            <Store className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{availableVendors.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="booths" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="booths">Booths</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
        </TabsList>

        <TabsContent value="booths" className="space-y-6">
          {/* Filters and Actions */}
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filters & Actions
                </CardTitle>
                <Button onClick={() => setShowCreateDialog(true)} className="bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Booth
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search by booth number, section, or location..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full md:w-48">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="assigned">Assigned</SelectItem>
                      <SelectItem value="reserved">Reserved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-full md:w-48">
                  <Select value={sectionFilter} onValueChange={setSectionFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Section" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Sections</SelectItem>
                      {sectionOptions.map(section => (
                        <SelectItem key={section} value={section}>{section}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Booths Table */}
          <Card>
            <CardHeader>
              <CardTitle>All Booths</CardTitle>
              <CardDescription>Manage exhibition booth availability and assignments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Booth #</TableHead>
                      <TableHead>Section</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Vendor</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBooths.map((booth) => (
                      <TableRow key={booth._id}>
                        <TableCell className="font-medium">{booth.boothNumber}</TableCell>
                        <TableCell>{booth.section}</TableCell>
                        <TableCell>{booth.location}</TableCell>
                        <TableCell>{booth.size} ({booth.area})</TableCell>
                        <TableCell>{getStatusBadge(booth.status)}</TableCell>
                        <TableCell>
                          {booth.vendorName ? (
                            <div className="text-sm">
                              <div className="font-medium">{booth.vendorName}</div>
                              <div className="text-gray-500">Assigned {new Date(booth.assignedAt || 0).toLocaleDateString()}</div>
                            </div>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setSelectedBooth(booth)}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>Booth Details</DialogTitle>
                                  <DialogDescription>
                                    Complete information for Booth {booth.boothNumber}
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <label className="text-sm font-medium">Booth Number</label>
                                      <p className="text-sm">{booth.boothNumber}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">Section</label>
                                      <p className="text-sm">{booth.section}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">Location</label>
                                      <p className="text-sm">{booth.location}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">Size</label>
                                      <p className="text-sm">{booth.size} ({booth.area})</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">Status</label>
                                      <p className="text-sm">{getStatusBadge(booth.status)}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">Created</label>
                                      <p className="text-sm">{new Date(booth.createdAt).toLocaleDateString()}</p>
                                    </div>
                                  </div>
                                  
                                  {booth.vendorName && (
                                    <div className="border-t pt-4">
                                      <h4 className="font-medium mb-3">Assigned Vendor</h4>
                                      <div className="grid grid-cols-2 gap-4">
                                        <div>
                                          <label className="text-sm font-medium">Vendor Name</label>
                                          <p className="text-sm">{booth.vendorName}</p>
                                        </div>
                                        <div>
                                          <label className="text-sm font-medium">Assigned Date</label>
                                          <p className="text-sm">{new Date(booth.assignedAt || 0).toLocaleDateString()}</p>
                                        </div>
                                        <div>
                                          <label className="text-sm font-medium">Assigned By</label>
                                          <p className="text-sm">{booth.assignedBy}</p>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                  
                                  {booth.notes && (
                                    <div>
                                      <label className="text-sm font-medium">Notes</label>
                                      <p className="text-sm">{booth.notes}</p>
                                    </div>
                                  )}
                                </div>
                              </DialogContent>
                            </Dialog>
                            
                            {booth.status === "available" && (
                              <Button
                                size="sm"
                                className="bg-blue-600 hover:bg-blue-700"
                                onClick={() => {
                                  setSelectedBooth(booth)
                                  setShowAssignmentDialog(true)
                                }}
                              >
                                <UserPlus className="h-4 w-4" />
                              </Button>
                            )}
                            
                            {booth.status === "assigned" && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleUnassignBooth(booth)}
                              >
                                <UserMinus className="h-4 w-4" />
                              </Button>
                            )}
                            
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedBooth(booth)
                                setEditData({
                                  boothNumber: booth.boothNumber,
                                  section: booth.section,
                                  location: booth.location,
                                  size: booth.size,
                                  area: booth.area,
                                  notes: booth.notes || ""
                                })
                                setShowEditDialog(true)
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeleteBooth(booth._id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              {filteredBooths.length === 0 && (
                <div className="text-center py-8">
                  <Package className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-500">No booths found matching your criteria</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assignments" className="space-y-6">
          {/* Available Vendors */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Store className="h-5 w-5" />
                Available Vendors for Booth Assignment
              </CardTitle>
              <CardDescription>
                Vendors who are approved and have paid but don't have booths assigned yet
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Company</TableHead>
                      <TableHead>Contact Person</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Booth Size</TableHead>
                      <TableHead>Industry</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {availableVendors.map((vendor) => (
                      <TableRow key={vendor._id}>
                        <TableCell className="font-medium">{vendor.companyName}</TableCell>
                        <TableCell>{vendor.contactPerson}</TableCell>
                        <TableCell>{vendor.email}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">{vendor.boothSize}</Badge>
                        </TableCell>
                        <TableCell className="capitalize">{vendor.industry}</TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700"
                            onClick={() => {
                              setSelectedVendor(vendor)
                              setShowAssignmentDialog(true)
                            }}
                          >
                            <UserPlus className="h-4 w-4 mr-2" />
                            Assign Booth
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              {availableVendors.length === 0 && (
                <div className="text-center py-8">
                  <Store className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-500">No vendors available for booth assignment</p>
                  <p className="text-sm text-gray-400 mt-2">
                    All approved and paid vendors already have booths assigned
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Create Booth Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Booth</DialogTitle>
            <DialogDescription>
              Add a new exhibition booth to the system
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="boothNumber">Booth Number *</Label>
                <Input
                  id="boothNumber"
                  value={createData.boothNumber}
                  onChange={(e) => setCreateData({...createData, boothNumber: e.target.value})}
                  placeholder="e.g., B-001"
                />
              </div>
              <div>
                <Label htmlFor="section">Section *</Label>
                <Select value={createData.section} onValueChange={(value) => setCreateData({...createData, section: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select section" />
                  </SelectTrigger>
                  <SelectContent>
                    {sectionOptions.map(section => (
                      <SelectItem key={section} value={section}>{section}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={createData.location}
                onChange={(e) => setCreateData({...createData, location: e.target.value})}
                placeholder="e.g., Ground Floor, Near Entrance"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="size">Size *</Label>
                <Input
                  id="size"
                  value={createData.size}
                  onChange={(e) => setCreateData({...createData, size: e.target.value})}
                  placeholder="e.g., 3m x 3m"
                />
              </div>
              <div>
                <Label htmlFor="area">Area *</Label>
                <Input
                  id="area"
                  value={createData.area}
                  onChange={(e) => setCreateData({...createData, area: e.target.value})}
                  placeholder="e.g., 9 sqm"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={createData.notes}
                onChange={(e) => setCreateData({...createData, notes: e.target.value})}
                placeholder="Additional notes about the booth..."
                rows={3}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateBooth} className="bg-green-600 hover:bg-green-700">
              Create Booth
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Booth Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Booth</DialogTitle>
            <DialogDescription>
              Update booth information
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="editBoothNumber">Booth Number *</Label>
                <Input
                  id="editBoothNumber"
                  value={editData.boothNumber}
                  onChange={(e) => setEditData({...editData, boothNumber: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="editSection">Section *</Label>
                <Select value={editData.section} onValueChange={(value) => setEditData({...editData, section: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sectionOptions.map(section => (
                      <SelectItem key={section} value={section}>{section}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label htmlFor="editLocation">Location *</Label>
              <Input
                id="editLocation"
                value={editData.location}
                onChange={(e) => setEditData({...editData, location: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="editSize">Size *</Label>
                <Input
                  id="editSize"
                  value={editData.size}
                  onChange={(e) => setEditData({...editData, size: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="editArea">Area *</Label>
                <Input
                  id="editArea"
                  value={editData.area}
                  onChange={(e) => setEditData({...editData, area: e.target.value})}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="editNotes">Notes</Label>
              <Textarea
                id="editNotes"
                value={editData.notes}
                onChange={(e) => setEditData({...editData, notes: e.target.value})}
                rows={3}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditBooth} className="bg-blue-600 hover:bg-blue-700">
              Update Booth
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Assign Booth Dialog */}
      <Dialog open={showAssignmentDialog} onOpenChange={setShowAssignmentDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Assign Booth to Vendor</DialogTitle>
            <DialogDescription>
              {selectedBooth ? 
                `Assign Booth ${selectedBooth.boothNumber} to a vendor` :
                `Assign a booth to ${selectedVendor?.companyName}`
              }
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {selectedBooth && (
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-900 mb-2">Selected Booth</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Booth Number:</span> {selectedBooth.boothNumber}
                  </div>
                  <div>
                    <span className="font-medium">Section:</span> {selectedBooth.section}
                  </div>
                  <div>
                    <span className="font-medium">Location:</span> {selectedBooth.location}
                  </div>
                  <div>
                    <span className="font-medium">Size:</span> {selectedBooth.size} ({selectedBooth.area})
                  </div>
                </div>
              </div>
            )}
            
            {selectedVendor && (
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-medium text-green-900 mb-2">Selected Vendor</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Company:</span> {selectedVendor.companyName}
                  </div>
                  <div>
                    <span className="font-medium">Contact:</span> {selectedVendor.contactPerson}
                  </div>
                  <div>
                    <span className="font-medium">Booth Size:</span> {selectedVendor.boothSize}
                  </div>
                  <div>
                    <span className="font-medium">Industry:</span> {selectedVendor.industry}
                  </div>
                </div>
              </div>
            )}
            
            {!selectedBooth && (
              <div>
                <Label htmlFor="boothSelect">Select Booth</Label>
                <Select value={assignmentData.boothNumber} onValueChange={(value) => {
                  const booth = booths.find(b => b.boothNumber === value)
                  if (booth) {
                    setAssignmentData({
                      boothNumber: booth.boothNumber,
                      boothSection: booth.section,
                      boothLocation: booth.location,
                      boothNotes: ""
                    })
                  }
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a booth" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableBooths?.map(booth => (
                      <SelectItem key={booth._id} value={booth.boothNumber}>
                        {booth.boothNumber} - {booth.section} ({booth.size})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            
            {!selectedVendor && (
              <div>
                <Label htmlFor="vendorSelect">Select Vendor</Label>
                <Select value={assignmentData.boothNumber} onValueChange={(value) => {
                  const vendor = availableVendors.find(v => v._id === value)
                  if (vendor) {
                    setSelectedVendor(vendor)
                  }
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a vendor" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableVendors.map(vendor => (
                      <SelectItem key={vendor._id} value={vendor._id}>
                        {vendor.companyName} - {vendor.boothSize}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            
            <div>
              <Label htmlFor="boothNotes">Assignment Notes</Label>
              <Textarea
                id="boothNotes"
                value={assignmentData.boothNotes}
                onChange={(e) => setAssignmentData({...assignmentData, boothNotes: e.target.value})}
                placeholder="Any special notes about this booth assignment..."
                rows={3}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowAssignmentDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleAssignBooth} 
              className="bg-blue-600 hover:bg-blue-700"
              disabled={!selectedBooth || !selectedVendor}
            >
                             <UserPlus className="h-4 w-4 mr-2" />
               Assign Booth
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}