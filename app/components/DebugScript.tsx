"use client"

import { useEffect } from 'react'

export function DebugScript() {
  useEffect(() => {
    // Global error handler
    const handleError = (event: ErrorEvent) => {
      console.log('Global error caught:', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error
      })
    }

    // Unhandled promise rejection handler
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.log('Unhandled promise rejection:', {
        reason: event.reason,
        promise: event.promise
      })
    }

    // Message channel error handler
    const handleMessageError = (event: MessageEvent) => {
      if (event.data && event.data.error) {
        console.log('Message channel error:', event.data.error)
      }
    }

    // Add event listeners
    window.addEventListener('error', handleError)
    window.addEventListener('unhandledrejection', handleUnhandledRejection)
    window.addEventListener('message', handleMessageError)

    // Check for common issues
    console.log('Debug script loaded')
    console.log('Window object available:', typeof window !== 'undefined')
    console.log('Document object available:', typeof document !== 'undefined')
    
    // Check for common global variables
    if (typeof window !== 'undefined') {
      console.log('Global variables check:')
      console.log('- pendingUserPayments:', typeof (window as any).pendingUserPayments)
      console.log('- currentUser:', typeof (window as any).currentUser)
    }

    // Cleanup
    return () => {
      window.removeEventListener('error', handleError)
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
      window.removeEventListener('message', handleMessageError)
    }
  }, [])

  return null
}