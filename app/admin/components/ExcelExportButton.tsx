import { Button } from "@/components/ui/button"
import { FileDown } from "lucide-react"
import * as XLSX from 'xlsx'

interface ExcelExportButtonProps {
  data: any[]
  filename: string
  sheetName?: string
  buttonText?: string
  className?: string
}

export function ExcelExportButton({ 
  data, 
  filename, 
  sheetName = "Sheet1", 
  buttonText = "Export to Excel",
  className 
}: ExcelExportButtonProps) {
  
  const handleExport = () => {
    // Create a new workbook
    const ws = XLSX.utils.json_to_sheet(data)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, sheetName)
    
    // Generate Excel file and download
    XLSX.writeFile(wb, `${filename}-${new Date().toISOString().split('T')[0]}.xlsx`)
  }

  return (
    <Button 
      onClick={handleExport} 
      variant="outline" 
      className={className}
      disabled={!data || data.length === 0}
    >
      <FileDown className="h-4 w-4 mr-2" />
      {buttonText}
    </Button>
  )
}
