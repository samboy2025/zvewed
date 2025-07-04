"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { QRCodeSVG } from 'qrcode.react'
import { Download, Copy, QrCode } from "lucide-react"
import { useState } from "react"

interface QRCodeCardProps {
  eventId: string
  userName: string
  userType: string
  eventName?: string
}

export function QRCodeCard({ eventId, userName, userType, eventName = "WED 4.0" }: QRCodeCardProps) {
  const [copied, setCopied] = useState(false)

  const copyEventId = async () => {
    await navigator.clipboard.writeText(eventId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadQR = () => {
    const svg = document.getElementById('qr-code-svg')
    if (svg) {
      // Clone the SVG to avoid modifying the original
      const svgClone = svg.cloneNode(true) as SVGElement
      
      // Create a canvas with higher resolution for better quality
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const scale = 4 // Higher resolution multiplier
      
      // Set canvas size with scale
      canvas.width = 200 * scale
      canvas.height = 200 * scale
      
      if (ctx) {
        // Set white background
        ctx.fillStyle = '#FFFFFF'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        
        // Create an image from SVG
        const svgData = new XMLSerializer().serializeToString(svgClone)
        const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
        const svgUrl = URL.createObjectURL(svgBlob)
        
        const img = new Image()
        img.onload = () => {
          // Draw the QR code
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
          
          // Add Event ID text overlay at the bottom
          ctx.fillStyle = '#DC2626' // Red color
          ctx.fillRect(10 * scale, (200 - 25) * scale, (200 - 20) * scale, 20 * scale)
          
          ctx.fillStyle = '#FFFFFF'
          ctx.font = `bold ${12 * scale}px Arial`
          ctx.textAlign = 'center'
          ctx.fillText(eventId, canvas.width / 2, (200 - 10) * scale)
          
          // Convert to PNG and download
          canvas.toBlob((blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob)
              const downloadLink = document.createElement('a')
              downloadLink.download = `${eventId}-QR-Code.png`
              downloadLink.href = url
              downloadLink.click()
              
              // Clean up
              URL.revokeObjectURL(url)
            }
          }, 'image/png', 1.0)
          
          URL.revokeObjectURL(svgUrl)
        }
        
        img.onerror = () => {
          console.error('Failed to load SVG image')
          URL.revokeObjectURL(svgUrl)
        }
        
        img.src = svgUrl
      }
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="text-center pb-4">
        <CardTitle className="flex items-center justify-center gap-2 text-lg">
          <QrCode className="h-5 w-5 text-red-600" />
          Event Access Code
        </CardTitle>
        <p className="text-sm text-gray-600">
          Show this QR code at the event entrance
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* QR Code */}
        <div className="flex justify-center">
          <div className="relative bg-white p-4 sm:p-6 rounded-2xl shadow-lg border-2 border-red-100">
            <QRCodeSVG
              id="qr-code-svg"
              value={JSON.stringify({
                eventId,
                userName,
                userType,
                eventName,
                timestamp: Date.now()
              })}
              size={200} // Larger size for full-width display
              level="M"
              includeMargin={false}
              bgColor="#FFFFFF"
              fgColor="#000000"
              imageSettings={{
                src: "/logo.png",
                height: 40,
                width: 40,
                excavate: true,
              }}
            />
            
            {/* Event ID Overlay */}
            <div className="absolute bottom-3 left-3 right-3">
              <div className="bg-red-600 text-white text-sm font-bold py-2 px-3 rounded text-center">
                {eventId}
              </div>
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="text-center space-y-2">
          <h3 className="font-semibold text-gray-900">{userName}</h3>
          <div className="flex justify-center gap-2">
            <Badge variant="outline" className="capitalize">
              {userType}
            </Badge>
            <Badge className="bg-red-600">
              {eventName}
            </Badge>
          </div>
        </div>

        {/* Event ID Display */}
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-600 mb-2">Your Event ID</p>
          <div className="flex items-center justify-center gap-2 mb-3">
            <code className="bg-white px-3 py-2 rounded border text-lg font-mono font-bold text-red-600">
              {eventId}
            </code>
          </div>
          <p className="text-xs text-gray-500">
            Keep this ID safe - you'll need it for event check-in
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={copyEventId}
            className="w-full min-h-[44px] text-sm"
          >
            <Copy className="h-4 w-4 mr-2" />
            {copied ? 'Copied!' : 'Copy ID'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={downloadQR}
            className="w-full min-h-[44px] text-sm"
          >
            <Download className="h-4 w-4 mr-2" />
            Download QR
          </Button>
        </div>

        {/* Instructions */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <h4 className="font-medium text-red-800 text-sm mb-2">
            How to use your QR code:
          </h4>
          <ul className="text-xs text-red-700 space-y-1">
            <li>• Present this QR code at event registration</li>
            <li>• Save the image to your phone for offline access</li>
            <li>• Your Event ID can also be used for manual check-in</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
