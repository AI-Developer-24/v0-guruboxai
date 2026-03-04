"use client"

import { useEffect } from "react"

export default function PopupSuccessPage() {
  useEffect(() => {
    // Notify opener window that login was successful
    if (window.opener) {
      window.opener.postMessage({ type: "GOOGLE_AUTH_SUCCESS" }, window.location.origin)
    }

    // Close this popup window
    window.close()
  }, [])

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <div className="mb-4 size-8 animate-spin rounded-full border-2 border-primary border-t-transparent mx-auto" />
        <p className="text-sm text-muted-foreground">Completing sign in...</p>
      </div>
    </div>
  )
}
