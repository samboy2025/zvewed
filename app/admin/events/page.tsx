"use client"

import { useState } from "react"
import { useQuery, useMutation } from "convex/react"
import { api } from "../../../convex/_generated/api"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExcelExportButton } from "../components/ExcelExportButton"
import { 
  Calendar,
  MapPin,
  DollarSign,
  Users,
  Plus,
  Edit,
  Trash2,
  Eye,
  Clock,
  CheckCircle,
  AlertCircle,
  Building,
  Target,
  BarChart,
  FileText
} from "lucide-react"

export default function AdminEventsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const [eventForm, setEventForm] = useState({
    title: "",
    theme: "",
    date: "",
    location: "",
    sponsors: [] as string[],
    budget: 0,
    description: "",
    status: "upcoming",
  })
  
  // Convex queries and mutations
  const events = useQuery(api.events.getAllEvents)
  const eventStats = useQuery(api.events.getEventStats)
  const createEvent = useMutation(api.events.createEvent)
  const updateEvent = useMutation(api.events.updateEvent)
  const deleteEvent = useMutation(api.events.deleteEvent)

  // Filter events
  const filteredEvents = events?.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.theme.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || event.status === statusFilter

    return matchesSearch && matchesStatus
  }) || []

  // Handle create event
  const handleCreate = async () => {
    try {
      await createEvent({
        ...eventForm,
        sponsors: eventForm.sponsors.filter(s => s.trim() !== ""),
      })
      setShowCreateDialog(false)
      resetForm()
    } catch (error) {
      console.error("Error creating event:", error)
    }
  }

  // Handle update event
  const handleUpdate = async () => {
    if (!selectedEvent) return
    
    try {
      await updateEvent({
        eventId: selectedEvent._id,
        ...eventForm,
        sponsors: eventForm.sponsors.filter(s => s.trim() !== ""),
      })
      setShowEditDialog(false)
      setSelectedEvent(null)
      resetForm()
    } catch (error) {
      console.error("Error updating event:", error)
    }
  }

  // Handle delete event
  const handleDelete = async (eventId: string) => {
    if (confirm("Are you sure you want to delete this event?")) {
      try {
        await deleteEvent({ eventId })
      } catch (error) {
        console.error("Error deleting event:", error)
      }
    }
  }

  // Reset form
  const resetForm = () => {
    setEventForm({
      title: "",
      theme: "",
      date: "",
      location: "",
      sponsors: [],
      budget: 0,
      description: "",
      status: "upcoming",
    })
  }

  // Open edit dialog
  const openEditDialog = (event: any) => {
    setSelectedEvent(event)
    setEventForm({
      title: event.title,
      theme: event.theme,
      date: event.date,
      location: event.location,
      sponsors: event.sponsors || [],
      budget: event.budget,
      description: event.description || "",
      status: event.status,
    })
    setShowEditDialog(true)
  }

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case "upcoming":
        return <Badge className="bg-blue-100 text-blue-800">Upcoming</Badge>
      case "completed":
        return <Badge className="bg-gray-100 text-gray-800">Completed</Badge>
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
    })
  }

  // Prepare export data
  const exportData = filteredEvents.map((event) => ({
    Title: event.title,
    Theme: event.theme,
    Date: event.date,
    Location: event.location,
    Status: event.status,
    Budget: event.budget,
    Sponsors: event.sponsors.join(", "),
    Created: formatDate(event.createdAt),
  }))

  if (!events || !eventStats) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Clock className="h-8 w-8 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-500">Loading events...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Event Management</h2>
          <p className="text-muted-foreground">
            Create and manage WED 4.0 events
          </p>
        </div>
        <div className="flex gap-2">
          <ExcelExportButton
            data={exportData}
            filename="events"
            buttonText="Export Events"
          />
          <Button onClick={() => setShowCreateDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Event
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{eventStats.total}</div>
            <p className="text-xs text-muted-foreground">
              All time events
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {eventStats.active}
            </div>
            <p className="text-xs text-muted-foreground">
              Currently running
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {eventStats.upcoming}
            </div>
            <p className="text-xs text-muted-foreground">
              Future events
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₦{eventStats.totalBudget.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Combined budget
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Events Table */}
      <Card>
        <CardHeader>
          <CardTitle>Events ({filteredEvents.length})</CardTitle>
          <CardDescription>
            Manage all WED events
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Filters */}
            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Table */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Event</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEvents.map((event) => (
                  <TableRow key={event._id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{event.title}</div>
                        <div className="text-sm text-gray-500">{event.theme}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        {event.date}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        {event.location}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">
                        ₦{event.budget.toLocaleString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(event.status)}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedEvent(event)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>{selectedEvent?.title}</DialogTitle>
                              <DialogDescription>
                                Event Details
                              </DialogDescription>
                            </DialogHeader>
                            {selectedEvent && (
                              <Tabs defaultValue="overview" className="mt-4">
                                <TabsList>
                                  <TabsTrigger value="overview">Overview</TabsTrigger>
                                  <TabsTrigger value="sponsors">Sponsors</TabsTrigger>
                                  <TabsTrigger value="stats">Statistics</TabsTrigger>
                                </TabsList>
                                <TabsContent value="overview" className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label>Theme</Label>
                                      <p className="text-sm">{selectedEvent.theme}</p>
                                    </div>
                                    <div>
                                      <Label>Status</Label>
                                      <div className="mt-1">
                                        {getStatusBadge(selectedEvent.status)}
                                      </div>
                                    </div>
                                    <div>
                                      <Label>Date</Label>
                                      <p className="text-sm">{selectedEvent.date}</p>
                                    </div>
                                    <div>
                                      <Label>Location</Label>
                                      <p className="text-sm">{selectedEvent.location}</p>
                                    </div>
                                    <div>
                                      <Label>Budget</Label>
                                      <p className="text-sm font-medium">
                                        ₦{selectedEvent.budget.toLocaleString()}
                                      </p>
                                    </div>
                                    <div>
                                      <Label>Created</Label>
                                      <p className="text-sm">
                                        {formatDate(selectedEvent.createdAt)}
                                      </p>
                                    </div>
                                  </div>
                                  {selectedEvent.description && (
                                    <div>
                                      <Label>Description</Label>
                                      <p className="text-sm mt-1">
                                        {selectedEvent.description}
                                      </p>
                                    </div>
                                  )}
                                </TabsContent>
                                <TabsContent value="sponsors" className="space-y-4">
                                  <div>
                                    <h4 className="font-medium mb-3">
                                      Event Sponsors ({selectedEvent.sponsors.length})
                                    </h4>
                                    {selectedEvent.sponsors.length > 0 ? (
                                      <div className="space-y-2">
                                        {selectedEvent.sponsors.map((sponsor: string, index: number) => (
                                          <div
                                            key={index}
                                            className="flex items-center gap-2 p-2 border rounded"
                                          >
                                            <Building className="h-4 w-4 text-gray-400" />
                                            <span className="text-sm">{sponsor}</span>
                                          </div>
                                        ))}
                                      </div>
                                    ) : (
                                      <p className="text-sm text-gray-500">
                                        No sponsors added yet
                                      </p>
                                    )}
                                  </div>
                                </TabsContent>
                                <TabsContent value="stats" className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <Card>
                                      <CardHeader>
                                        <CardTitle className="text-sm">
                                          Registrations
                                        </CardTitle>
                                      </CardHeader>
                                      <CardContent>
                                        <p className="text-2xl font-bold">0</p>
                                        <p className="text-xs text-gray-500">
                                          Total participants
                                        </p>
                                      </CardContent>
                                    </Card>
                                    <Card>
                                      <CardHeader>
                                        <CardTitle className="text-sm">
                                          Revenue
                                        </CardTitle>
                                      </CardHeader>
                                      <CardContent>
                                        <p className="text-2xl font-bold">₦0</p>
                                        <p className="text-xs text-gray-500">
                                          Total collected
                                        </p>
                                      </CardContent>
                                    </Card>
                                  </div>
                                </TabsContent>
                              </Tabs>
                            )}
                          </DialogContent>
                        </Dialog>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEditDialog(event)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600"
                          onClick={() => handleDelete(event._id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {filteredEvents.length === 0 && (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-500">No events found</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Create Event Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Event</DialogTitle>
            <DialogDescription>
              Add a new WED event to the system
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Event Title</Label>
                <Input
                  id="title"
                  value={eventForm.title}
                  onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="theme">Theme</Label>
                <Input
                  id="theme"
                  value={eventForm.theme}
                  onChange={(e) => setEventForm({ ...eventForm, theme: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={eventForm.date}
                  onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={eventForm.location}
                  onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="budget">Budget (₦)</Label>
                <Input
                  id="budget"
                  type="number"
                  value={eventForm.budget}
                  onChange={(e) => setEventForm({ ...eventForm, budget: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  value={eventForm.status}
                  onValueChange={(value) => setEventForm({ ...eventForm, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={eventForm.description}
                onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                rows={3}
              />
            </div>
            <div>
              <Label>Sponsors (one per line)</Label>
              <Textarea
                value={eventForm.sponsors.join("\n")}
                onChange={(e) => setEventForm({ 
                  ...eventForm, 
                  sponsors: e.target.value.split("\n").filter(s => s.trim() !== "") 
                })}
                rows={3}
                placeholder="Enter sponsor names, one per line"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreate}>Create Event</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Event Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Event</DialogTitle>
            <DialogDescription>
              Update event information
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-title">Event Title</Label>
                <Input
                  id="edit-title"
                  value={eventForm.title}
                  onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-theme">Theme</Label>
                <Input
                  id="edit-theme"
                  value={eventForm.theme}
                  onChange={(e) => setEventForm({ ...eventForm, theme: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-date">Date</Label>
                <Input
                  id="edit-date"
                  type="date"
                  value={eventForm.date}
                  onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-location">Location</Label>
                <Input
                  id="edit-location"
                  value={eventForm.location}
                  onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-budget">Budget (₦)</Label>
                <Input
                  id="edit-budget"
                  type="number"
                  value={eventForm.budget}
                  onChange={(e) => setEventForm({ ...eventForm, budget: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div>
                <Label htmlFor="edit-status">Status</Label>
                <Select
                  value={eventForm.status}
                  onValueChange={(value) => setEventForm({ ...eventForm, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={eventForm.description}
                onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                rows={3}
              />
            </div>
            <div>
              <Label>Sponsors (one per line)</Label>
              <Textarea
                value={eventForm.sponsors.join("\n")}
                onChange={(e) => setEventForm({ 
                  ...eventForm, 
                  sponsors: e.target.value.split("\n").filter(s => s.trim() !== "") 
                })}
                rows={3}
                placeholder="Enter sponsor names, one per line"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setShowEditDialog(false)
              resetForm()
            }}>
              Cancel
            </Button>
            <Button onClick={handleUpdate}>Update Event</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
