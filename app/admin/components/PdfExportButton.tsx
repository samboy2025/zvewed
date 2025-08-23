"use client"

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import jsPDF from "jspdf"
import "jspdf-autotable"

interface PdfExportButtonProps {
  data: any[]
  filename: string
  buttonText?: string
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  className?: string
  size?: "default" | "sm" | "lg" | "icon"
}

export function PdfExportButton({
  data,
  filename,
  buttonText = "Export to PDF",
  variant = "default",
  className = "",
  size = "default"
}: PdfExportButtonProps) {
  const exportToPdf = () => {
    if (!data || data.length === 0) {
      alert("No data to export")
      return
    }

    try {
      const doc = new jsPDF()
      
      // Add title
      doc.setFontSize(18)
      doc.text("WED 4.0 Data Export", 14, 22)
      doc.setFontSize(12)
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 32)
      doc.text(`Total Records: ${data.length}`, 14, 42)
      
      // Prepare table data
      const headers = Object.keys(data[0])
      const tableData = data.map(row => 
        headers.map(header => {
          const value = row[header]
          if (typeof value === 'number') {
            return value.toLocaleString()
          }
          return value || 'N/A'
        })
      )
      
      // Add table
      doc.autoTable({
        head: [headers],
        body: tableData,
        startY: 50,
        styles: {
          fontSize: 8,
          cellPadding: 2,
        },
        headStyles: {
          fillColor: [59, 130, 246], // Blue color
          textColor: 255,
          fontStyle: 'bold',
        },
        alternateRowStyles: {
          fillColor: [248, 250, 252], // Light gray
        },
        margin: { top: 50 },
        didDrawPage: function (data) {
          // Add page numbers
          doc.setFontSize(10)
          doc.text(
            `Page ${doc.getCurrentPageInfo().pageNumber}`,
            data.settings.margin.left,
            doc.internal.pageSize.height - 10
          )
        }
      })
      
      // Save the PDF
      doc.save(`${filename}.pdf`)
    } catch (error) {
      console.error("Error generating PDF:", error)
      alert("Failed to generate PDF. Please try again.")
    }
  }

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={exportToPdf}
    >
      <Download className="h-4 w-4 mr-2" />
      {buttonText}
    </Button>
  )
}