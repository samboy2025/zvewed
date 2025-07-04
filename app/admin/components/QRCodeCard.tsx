import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import QRCode from "react-qr-code"
import { Download, QrCode } from "lucide-react"

interface QRCodeCardProps {
  userId: string
  userName: string
  userType: string
  eventId?: string
}

export function QRCodeCard({ userId, userName, userType, eventId }: QRCodeCardProps) {
  const qrValue = eventId || `WED4-${userId.slice(-8).toUpperCase()}`
  
  const handleDownload = () => {
    // Convert QR code to canvas and download
    const svg = document.getElementById(`qr-${userId}`) as any
    const svgData = new XMLSerializer().serializeToString(svg)
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    const img = new Image()
    
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx?.drawImage(img, 0, 0)
      const pngFile = canvas.toDataURL("image/png")
      const downloadLink = document.createElement("a")
      downloadLink.download = `QR-${userName.replace(/\s+/g, '-')}-${qrValue}.png`
      downloadLink.href = pngFile
      downloadLink.click()
    }
    
    img.src = "data:image/svg+xml;base64," + btoa(svgData)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <QrCode className="h-5 w-5" />
          QR Code
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-white p-4 rounded border">
          <div id={`qr-${userId}`}>
            <QRCode
              value={qrValue}
              size={200}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              viewBox={`0 0 256 256`}
            />
          </div>
        </div>
        <div className="space-y-2 text-sm">
          <p><strong>Name:</strong> {userName}</p>
          <p><strong>Type:</strong> {userType}</p>
          <p><strong>ID:</strong> {qrValue}</p>
        </div>
        <Button onClick={handleDownload} size="sm" className="w-full">
          <Download className="h-4 w-4 mr-2" />
          Download QR Code
        </Button>
      </CardContent>
    </Card>
  )
}
