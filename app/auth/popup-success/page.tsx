"use client"

import { useEffect, useState } from "react"

export default function PopupSuccessPage() {
  const [status, setStatus] = useState<"processing" | "success" | "manual">("processing")

  useEffect(() => {
    const notifyAndClose = () => {
      // Try to notify opener window that login was successful
      if (window.opener && !window.opener.closed) {
        try {
          const currentOrigin = window.location.origin
          const appUrl = process.env.NEXT_PUBLIC_APP_URL
          const origins = new Set<string>([currentOrigin])
          if (appUrl) {
            try {
              origins.add(new URL(appUrl).origin)
            } catch {
              // Ignore invalid NEXT_PUBLIC_APP_URL
            }
          }

          for (const targetOrigin of origins) {
            window.opener.postMessage(
              { type: "GOOGLE_AUTH_SUCCESS" },
              targetOrigin
            )
          }

          setStatus("success")

          // Attempt to close the popup
          setTimeout(() => {
            try {
              window.close()
            } catch {
              // window.close() may be blocked by browser
              setStatus("manual")
            }
          }, 500)
        } catch {
          // Cross-origin or other error
          setStatus("manual")
        }
      } else {
        // No opener available (direct access or opener closed)
        setStatus("manual")
      }
    }

    // Small delay to ensure cookies are fully processed
    const timer = setTimeout(notifyAndClose, 100)

    return () => clearTimeout(timer)
  }, [])

  // If we can't close automatically, show a message
  if (status === "manual") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center max-w-md px-4">
          <div className="mb-4 size-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto">
            <svg className="size-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold mb-2">Sign in successful!</h2>
          <p className="text-sm text-muted-foreground mb-4">
            You can now close this window and return to the main page.
          </p>
          <button
            onClick={() => window.close()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity"
          >
            Close Window
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <div className="mb-4 size-8 animate-spin rounded-full border-2 border-primary border-t-transparent mx-auto" />
        <p className="text-sm text-muted-foreground">Completing sign in...</p>
      </div>
    </div>
  )
}
