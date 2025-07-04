"use client"

import { useState } from "react"
import { useQuery, useMutation } from "convex/react"
import { api } from "../../../convex/_generated/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RoleBadge } from "../components/RoleBadge"
import { QRCodeCard } from "../components/QRCodeCard"
import { ExcelExportButton } from "../components/ExcelExportButton"
import { 
  Users, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  Search,
  Filter,
  Eye,
  User,
  Shield,
  Mic,
  Building,
  UserPlus,
  QrCode,
  Trash2
} from "lucide-react"

export default function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [userTypeFilter, setUserTypeFilter] = useState("all")
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  
  const users = useQuery(api.users.getAllUsers)
  const userStats = useQuery(api.users.getUserStats)
  const createUser = useMutation(api.users.createUser)
  const updateUserRole = useMutation(api.users.updateUserRole)
  const updateUserStatus = useMutation(api.users.updateUserStatus)
  const deleteUser = useMutation(api.users.deleteUser)

  // New user form state
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    userType: "participant",
  })

  const handleStatusUpdate = async (userId: string, newStatus: string) => {
    try {
      await updateUserStatus({
        userId: userId as any,
        status: newStatus,
      })
    } catch (error) {
      console.error("Error updating user status:", error)
    }
  }

  const handleDeleteUser = async (userId: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser({ userId: userId as any })
      } catch (error) {
        console.error("Error deleting user:", error)
      }
    }
  }

  // Handle create user
  const handleCreateUser = async () => {
    try {
      await createUser({
        ...newUser,
        agreeToTerms: true,
        agreeToMarketing: false,
      })
      setShowCreateDialog(false)
      setNewUser({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        userType: "participant",
      })
    } catch (error) {
      console.error("Error creating user:", error)
    }
  }

  // Handle role update
  const handleRoleUpdate = async (userId: string, newRole: string) => {
    try {
      await updateUserRole({ userId: userId as any, userType: newRole })
    } catch (error) {
      console.error("Error updating role:", error)
    }
  }

  const filteredUsers = users?.filter(user => {
    const matchesSearch = 
      `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.organization && user.organization.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    const matchesUserType = userTypeFilter === "all" || user.userType === userTypeFilter
    
    return matchesSearch && matchesStatus && matchesUserType
  }) || []

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>
      case "suspended":
        return <Badge className="bg-red-100 text-red-800">Suspended</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getUserTypeBadge = (userType: string) => {
    switch (userType) {
      case "admin":
        return <Badge className="bg-purple-100 text-purple-800">Admin</Badge>
      case "speaker":
        return <Badge className="bg-blue-100 text-blue-800">Speaker</Badge>
      case "participant":
        return <Badge className="bg-green-100 text-green-800">Participant</Badge>
      case "vendor":
        return <Badge className="bg-orange-100 text-orange-800">Vendor</Badge>
      case "sponsor":
        return <Badge className="bg-yellow-100 text-yellow-800">Sponsor</Badge>
      default:
        return <Badge variant="secondary">{userType}</Badge>
    }
  }

  const getUserTypeIcon = (userType: string) => {
    switch (userType) {
      case "admin":
        return <Shield className="h-4 w-4 text-purple-600" />
      case "speaker":
        return <Mic className="h-4 w-4 text-blue-600" />
      case "participant":
        return <User className="h-4 w-4 text-green-600" />
      case "vendor":
        return <Building className="h-4 w-4 text-orange-600" />
      case "sponsor":
        return <Building className="h-4 w-4 text-yellow-600" />
      default:
        return <User className="h-4 w-4" />
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

  if (!users || !userStats) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Clock className="h-8 w-8 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-500">Loading users...</p>
          </div>
        </div>
      </div>
    )
  }

  // Prepare data for Excel export
  const exportData = filteredUsers.map((user) => ({
    Name: `${user.firstName} ${user.lastName}`,
    Email: user.email,
    Phone: user.phone || "N/A",
    Organization: user.organization || "N/A",
    Role: user.userType,
    Status: user.status,
    City: user.city || "N/A",
    State: user.state || "N/A",
    Registered: new Date(user.createdAt).toLocaleDateString(),
  }))

  return (
    <div className="container mx-auto px-4 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">User Management</h1>
          <p className="text-gray-600">Manage WED 4.0 user accounts and profiles</p>
        </div>
        <div className="flex gap-2">
          <ExcelExportButton 
            data={exportData} 
            filename="users" 
            buttonText="Export Users" 
          />
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button className="bg-red-600 hover:bg-red-700">
                <UserPlus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New User</DialogTitle>
                <DialogDescription>
                  Add a new user to the system
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={newUser.firstName}
                      onChange={(e) =>
                        setNewUser({ ...newUser, firstName: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={newUser.lastName}
                      onChange={(e) =>
                        setNewUser({ ...newUser, lastName: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newUser.email}
                    onChange={(e) =>
                      setNewUser({ ...newUser, email: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={newUser.password}
                    onChange={(e) =>
                      setNewUser({ ...newUser, password: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={newUser.phone}
                    onChange={(e) =>
                      setNewUser({ ...newUser, phone: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="userType">User Type</Label>
                  <Select
                    value={newUser.userType}
                    onValueChange={(value) =>
                      setNewUser({ ...newUser, userType: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="participant">Participant</SelectItem>
                      <SelectItem value="vendor">Vendor</SelectItem>
                      <SelectItem value="sponsor">Sponsor</SelectItem>
                      <SelectItem value="speaker">Speaker</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setShowCreateDialog(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleCreateUser}>Create User</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.total}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{userStats.active}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Participants</CardTitle>
            <User className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{userStats.participants}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vendors</CardTitle>
            <Building className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{userStats.vendors || 0}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sponsors</CardTitle>
            <Building className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{userStats.sponsors || 0}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Speakers</CardTitle>
            <Mic className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{userStats.speakers}</div>
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
                  placeholder="Search by name, email, or organization..."
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
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full md:w-48">
              <Select value={userTypeFilter} onValueChange={setUserTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="participant">Participants</SelectItem>
                  <SelectItem value="vendor">Vendors</SelectItem>
                  <SelectItem value="sponsor">Sponsors</SelectItem>
                  <SelectItem value="speaker">Speakers</SelectItem>
                  <SelectItem value="admin">Admins</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>User Accounts ({filteredUsers.length})</CardTitle>
          <CardDescription>
            Manage all user accounts and their profiles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Organization</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                          {getUserTypeIcon(user.userType)}
                        </div>
                        <div>
                          <div className="font-medium">{user.firstName} {user.lastName}</div>
                          <div className="text-sm text-gray-500">{user.position || "N/A"}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {user.email}
                        </div>
                        {user.phone && (
                          <div className="text-sm text-gray-500 flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {user.phone}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{user.organization || "N/A"}</div>
                        {user.city && user.state && (
                          <div className="text-sm text-gray-500 flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {user.city}, {user.state}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getUserTypeIcon(user.userType)}
                        {getUserTypeBadge(user.userType)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        {getStatusBadge(user.status)}
                        <Select
                          value={user.status}
                          onValueChange={(value) => handleStatusUpdate(user._id, value)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                            <SelectItem value="suspended">Suspended</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-gray-500">
                        {formatDate(user.createdAt)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedUser(user)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>User Profile</DialogTitle>
                              <DialogDescription>
                                Complete profile information for {user.firstName} {user.lastName}
                              </DialogDescription>
                            </DialogHeader>
                            {selectedUser && (
                              <Tabs defaultValue="info">
                                <TabsList>
                                  <TabsTrigger value="info">Information</TabsTrigger>
                                  <TabsTrigger value="qr">QR Code</TabsTrigger>
                                  <TabsTrigger value="role">Role Management</TabsTrigger>
                                </TabsList>
                                <TabsContent value="info" className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <label className="text-sm font-medium">First Name</label>
                                      <p className="text-sm">{selectedUser.firstName}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">Last Name</label>
                                      <p className="text-sm">{selectedUser.lastName}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">Email</label>
                                      <p className="text-sm">{selectedUser.email}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">Phone</label>
                                      <p className="text-sm">{selectedUser.phone || "N/A"}</p>
                                    </div>
                                  </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm font-medium">Organization</label>
                                    <p className="text-sm">{selectedUser.organization || "N/A"}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Position</label>
                                    <p className="text-sm">{selectedUser.position || "N/A"}</p>
                                  </div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm font-medium">City</label>
                                    <p className="text-sm">{selectedUser.city || "N/A"}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">State</label>
                                    <p className="text-sm">{selectedUser.state || "N/A"}</p>
                                  </div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm font-medium">Industry</label>
                                    <p className="text-sm">{selectedUser.industry || "N/A"}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Experience</label>
                                    <p className="text-sm">{selectedUser.experience || "N/A"}</p>
                                  </div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm font-medium">User Type</label>
                                    <div className="flex items-center gap-2">
                                      {getUserTypeIcon(selectedUser.userType)}
                                      {getUserTypeBadge(selectedUser.userType)}
                                    </div>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Status</label>
                                    <div>{getStatusBadge(selectedUser.status)}</div>
                                  </div>
                                </div>
                                
                                {selectedUser.website && (
                                  <div>
                                    <label className="text-sm font-medium">Website</label>
                                    <p className="text-sm">{selectedUser.website}</p>
                                  </div>
                                )}
                                
                                {selectedUser.bio && (
                                  <div>
                                    <label className="text-sm font-medium">Bio</label>
                                    <p className="text-sm">{selectedUser.bio}</p>
                                  </div>
                                )}
                                
                                  <div>
                                    <label className="text-sm font-medium">Joined</label>
                                    <p className="text-sm">{formatDate(selectedUser.createdAt)}</p>
                                  </div>
                                </TabsContent>
                                <TabsContent value="qr">
                                  <QRCodeCard
                                    userId={selectedUser._id}
                                    userName={`${selectedUser.firstName} ${selectedUser.lastName}`}
                                    userType={selectedUser.userType}
                                  />
                                </TabsContent>
                                <TabsContent value="role" className="space-y-4">
                                  <div>
                                    <Label>Change User Role</Label>
                                    <Select
                                      value={selectedUser.userType}
                                      onValueChange={(value) => {
                                        handleRoleUpdate(selectedUser._id, value)
                                        setSelectedUser({...selectedUser, userType: value})
                                      }}
                                    >
                                      <SelectTrigger className="w-full">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="participant">Participant</SelectItem>
                                        <SelectItem value="vendor">Vendor</SelectItem>
                                        <SelectItem value="sponsor">Sponsor</SelectItem>
                                        <SelectItem value="speaker">Speaker</SelectItem>
                                        <SelectItem value="admin">Admin</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-600">User role determines access levels and permissions within the system.</p>
                                  </div>
                                </TabsContent>
                              </Tabs>
                            )}
                          </DialogContent>
                        </Dialog>
                        
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteUser(user._id)}
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
          
          {filteredUsers.length === 0 && (
            <div className="text-center py-8">
              <Users className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-500">No users found matching your criteria</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 