"use client"

import { useState } from "react"
import { useQuery } from "convex/react"
import { api } from "../../../convex/_generated/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ExcelExportButton } from "../components/ExcelExportButton"
import { 
  Download,
  Users,
  CreditCard,
  Calendar as CalendarIcon,
  Package,
  Building,
  FileSpreadsheet,
  Filter,
  CheckCircle
} from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export default function AdminExportPage() {
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: undefined,
    to: undefined
  })
  const [exportType, setExportType] = useState("all")

  // Fetch data
  const users = useQuery(api.users.getAllUsers)
  const payments = useQuery(api.payments.getAllPayments)
  const registrations = useQuery(api.registrations.getAllRegistrations)
  const vendors = useQuery(api.vendors.getAllVendors)
  const sponsors = useQuery(api.sponsors.getAllSponsors)
  const events = useQuery(api.events.getAllEvents)

  // Prepare export data based on type
  const prepareExportData = () => {
    switch (exportType) {
      case "users":
        return users?.map(user => ({
          "Name": `${user.firstName} ${user.lastName}`,
          "Email": user.email,
          "Phone": user.phone || "N/A",
          "Organization": user.organization || "N/A",
          "Position": user.position || "N/A",
          "Type": user.userType,
          "Status": user.status,
          "Registered": format(new Date(user.createdAt), "dd/MM/yyyy"),
        })) || []

      case "payments":
        return payments?.map(payment => ({
          "Date": format(new Date(payment.createdAt), "dd/MM/yyyy HH:mm"),
          "User": payment.userName,
          "Email": payment.userEmail,
          "Type": payment.type,
          "Amount": payment.amount,
          "Reference": payment.reference,
          "Status": payment.status,
          "Method": payment.paymentMethod || "N/A",
        })) || []

      case "registrations":
        return registrations?.map(reg => ({
          "Name": `${reg.firstName} ${reg.lastName}`,
          "Email": reg.email,
          "Phone": reg.phone || "N/A",
          "Organization": reg.organization || "N/A",
          "Position": reg.position || "N/A",
          "Category": reg.category,
          "Status": reg.status,
          "Payment Status": reg.paymentStatus,
          "Registered": format(new Date(reg.createdAt), "dd/MM/yyyy"),
        })) || []

      case "vendors":
        return vendors?.map(vendor => ({
          "Company": vendor.companyName,
          "Contact Person": vendor.contactPerson,
          "Email": vendor.email,
          "Phone": vendor.phone,
          "Industry": vendor.industry,
          "Booth Size": vendor.boothSize,
          "Status": vendor.status,
          "Payment Status": vendor.paymentStatus,
          "Registered": format(new Date(vendor.createdAt), "dd/MM/yyyy"),
        })) || []

      case "sponsors":
        return sponsors?.map(sponsor => ({
          "Organization": sponsor.organizationName,
          "Contact Person": sponsor.contactPerson,
          "Email": sponsor.email,
          "Phone": sponsor.phone,
          "Level": sponsor.sponsorshipLevel,
          "Amount": sponsor.sponsorshipAmount,
          "Status": sponsor.status,
          "Payment Status": sponsor.paymentStatus,
          "Registered": format(new Date(sponsor.createdAt), "dd/MM/yyyy"),
        })) || []

      case "all":
      default:
        // Combine all data
        const allData: any[] = []
        
        // Add users
        users?.forEach(user => {
          allData.push({
            "Type": "User",
            "Name": `${user.firstName} ${user.lastName}`,
            "Email": user.email,
            "Phone": user.phone || "N/A",
            "Organization": user.organization || "N/A",
            "Status": user.status,
            "Date": format(new Date(user.createdAt), "dd/MM/yyyy"),
          })
        })
        
        // Add registrations
        registrations?.forEach(reg => {
          allData.push({
            "Type": "Registration",
            "Name": `${reg.firstName} ${reg.lastName}`,
            "Email": reg.email,
            "Phone": reg.phone || "N/A",
            "Organization": reg.organization || "N/A",
            "Status": reg.status,
            "Date": format(new Date(reg.createdAt), "dd/MM/yyyy"),
          })
        })
        
        // Add vendors
        vendors?.forEach(vendor => {
          allData.push({
            "Type": "Vendor",
            "Name": vendor.contactPerson,
            "Email": vendor.email,
            "Phone": vendor.phone,
            "Organization": vendor.companyName,
            "Status": vendor.status,
            "Date": format(new Date(vendor.createdAt), "dd/MM/yyyy"),
          })
        })
        
        // Add sponsors
        sponsors?.forEach(sponsor => {
          allData.push({
            "Type": "Sponsor",
            "Name": sponsor.contactPerson,
            "Email": sponsor.email,
            "Phone": sponsor.phone,
            "Organization": sponsor.organizationName,
            "Status": sponsor.status,
            "Date": format(new Date(sponsor.createdAt), "dd/MM/yyyy"),
          })
        })
        
        return allData
    }
  }

  const exportData = prepareExportData()

  // Export stats
  const exportStats = {
    users: users?.length || 0,
    payments: payments?.length || 0,
    registrations: registrations?.length || 0,
    vendors: vendors?.length || 0,
    sponsors: sponsors?.length || 0,
    events: events?.length || 0,
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Export Data</h2>
        <p className="text-muted-foreground">
          Export your WED 4.0 data to Excel format
        </p>
      </div>

      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle>Export Options</CardTitle>
          <CardDescription>
            Choose what data you want to export
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="export-type">Data Type</Label>
              <Select value={exportType} onValueChange={setExportType}>
                <SelectTrigger id="export-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Data</SelectItem>
                  <SelectItem value="users">Users Only</SelectItem>
                  <SelectItem value="payments">Payments Only</SelectItem>
                  <SelectItem value="registrations">Registrations Only</SelectItem>
                  <SelectItem value="vendors">Vendors Only</SelectItem>
                  <SelectItem value="sponsors">Sponsors Only</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label>From Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !dateRange.from && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange.from ? format(dateRange.from, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={dateRange.from}
                      onSelect={(date) => setDateRange({ ...dateRange, from: date })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label>To Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !dateRange.to && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange.to ? format(dateRange.to, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={dateRange.to}
                      onSelect={(date) => setDateRange({ ...dateRange, to: date })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="pt-4">
              <ExcelExportButton
                data={exportData}
                filename={`wed4-${exportType}-${format(new Date(), "yyyy-MM-dd")}`}
                buttonText="Export to Excel"
                className="w-full"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Export Statistics */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{exportStats.users}</div>
            <p className="text-xs text-muted-foreground">
              Total user accounts
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Payments</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{exportStats.payments}</div>
            <p className="text-xs text-muted-foreground">
              Payment transactions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Registrations</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{exportStats.registrations}</div>
            <p className="text-xs text-muted-foreground">
              Event registrations
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vendors</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{exportStats.vendors}</div>
            <p className="text-xs text-muted-foreground">
              Vendor registrations
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sponsors</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{exportStats.sponsors}</div>
            <p className="text-xs text-muted-foreground">
              Sponsor organizations
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Events</CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{exportStats.events}</div>
            <p className="text-xs text-muted-foreground">
              Created events
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Export Links */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Export</CardTitle>
          <CardDescription>
            Export specific data with one click
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <ExcelExportButton
              data={users?.map(user => ({
                "Name": `${user.firstName} ${user.lastName}`,
                "Email": user.email,
                "Type": user.userType,
                "Status": user.status,
              })) || []}
              filename={`wed4-users-${format(new Date(), "yyyy-MM-dd")}`}
              buttonText="Export All Users"
              variant="outline"
              className="w-full"
            />

            <ExcelExportButton
              data={payments?.filter(p => p.status === "approved").map(payment => ({
                "Date": format(new Date(payment.createdAt), "dd/MM/yyyy"),
                "User": payment.userName,
                "Amount": payment.amount,
                "Type": payment.type,
              })) || []}
              filename={`wed4-approved-payments-${format(new Date(), "yyyy-MM-dd")}`}
              buttonText="Export Approved Payments"
              variant="outline"
              className="w-full"
            />

            <ExcelExportButton
              data={vendors?.filter(v => v.status === "approved").map(vendor => ({
                "Company": vendor.companyName,
                "Contact": vendor.contactPerson,
                "Email": vendor.email,
                "Phone": vendor.phone,
              })) || []}
              filename={`wed4-approved-vendors-${format(new Date(), "yyyy-MM-dd")}`}
              buttonText="Export Approved Vendors"
              variant="outline"
              className="w-full"
            />

            <ExcelExportButton
              data={sponsors?.filter(s => s.status === "approved").map(sponsor => ({
                "Organization": sponsor.organizationName,
                "Contact": sponsor.contactPerson,
                "Level": sponsor.sponsorshipLevel,
                "Amount": sponsor.sponsorshipAmount,
              })) || []}
              filename={`wed4-approved-sponsors-${format(new Date(), "yyyy-MM-dd")}`}
              buttonText="Export Approved Sponsors"
              variant="outline"
              className="w-full"
            />

            <ExcelExportButton
              data={registrations?.map(reg => ({
                "Name": `${reg.firstName} ${reg.lastName}`,
                "Email": reg.email,
                "Category": reg.category,
                "Status": reg.status,
              })) || []}
              filename={`wed4-registrations-${format(new Date(), "yyyy-MM-dd")}`}
              buttonText="Export All Registrations"
              variant="outline"
              className="w-full"
            />

            <ExcelExportButton
              data={events?.map(event => ({
                "Title": event.title,
                "Theme": event.theme,
                "Date": event.date,
                "Location": event.location,
                "Status": event.status,
              })) || []}
              filename={`wed4-events-${format(new Date(), "yyyy-MM-dd")}`}
              buttonText="Export All Events"
              variant="outline"
              className="w-full"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
