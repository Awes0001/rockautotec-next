import React from "react"

export function Button({ children, className }: any) {
  return (
    <button
      className={`px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 ${className}`}
    >
      {children}
    </button>
  )
}