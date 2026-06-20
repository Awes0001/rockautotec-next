"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, Search } from "lucide-react"

const years = Array.from({ length: 30 }, (_, i) => (2025 - i).toString())

const makes = [
  "Acura", "Audi", "BMW", "Buick", "Cadillac", "Chevrolet", "Chrysler", "Dodge",
  "Ford", "GMC", "Honda", "Hyundai", "Infiniti", "Jeep", "Kia", "Lexus",
  "Lincoln", "Mazda", "Mercedes-Benz", "Nissan", "Ram", "Subaru", "Tesla",
  "Toyota", "Volkswagen", "Volvo"
]

const modelsByMake: Record<string, string[]> = {
  Ford: ["F-150", "Mustang", "Explorer", "Escape", "Bronco", "Edge", "Ranger", "Expedition"],
  Toyota: ["Camry", "Corolla", "RAV4", "Highlander", "Tacoma", "Tundra", "4Runner", "Prius"],
  Honda: ["Civic", "Accord", "CR-V", "Pilot", "HR-V", "Odyssey", "Ridgeline", "Passport"],
  Chevrolet: ["Silverado", "Equinox", "Tahoe", "Camaro", "Malibu", "Traverse", "Colorado", "Suburban"],
  Nissan: ["Altima", "Rogue", "Sentra", "Maxima", "Murano", "Pathfinder", "Frontier", "Titan"],
  BMW: ["3 Series", "5 Series", "X3", "X5", "7 Series", "X1", "X7", "M3"],
  "Mercedes-Benz": ["C-Class", "E-Class", "GLC", "GLE", "S-Class", "A-Class", "GLA", "GLS"],
  Jeep: ["Wrangler", "Grand Cherokee", "Cherokee", "Compass", "Renegade", "Gladiator"],
  Dodge: ["Charger", "Challenger", "Durango", "Hornet", "Journey"],
  Ram: ["1500", "2500", "3500", "ProMaster"],
}

export function VehicleSearch() {
  const [year, setYear] = useState("")
  const [make, setMake] = useState("")
  const [model, setModel] = useState("")
  const [yearOpen, setYearOpen] = useState(false)
  const [makeOpen, setMakeOpen] = useState(false)
  const [modelOpen, setModelOpen] = useState(false)

  const availableModels = make && modelsByMake[make] ? modelsByMake[make] : []

  const handleMakeChange = (newMake: string) => {
    setMake(newMake)
    setModel("")
    setMakeOpen(false)
  }

  return (
    <div className="rounded-lg border border-border bg-card p-6 shadow-lg">
      <h3 className="mb-4 text-lg font-semibold text-foreground">Shop for Your Vehicle</h3>
      <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {/* Year Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setYearOpen(!yearOpen)
              setMakeOpen(false)
              setModelOpen(false)
            }}
            className="flex w-full items-center justify-between rounded-md border border-border bg-input px-4 py-3 text-sm text-foreground hover:border-muted-foreground transition-colors"
          >
            <span className={year ? "text-foreground" : "text-muted-foreground"}>
              {year || "Select Year"}
            </span>
            <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${yearOpen ? "rotate-180" : ""}`} />
          </button>
          {yearOpen && (
            <div className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md border border-border bg-popover shadow-lg">
              {years.map((y) => (
                <button
                  key={y}
                  onClick={() => {
                    setYear(y)
                    setYearOpen(false)
                  }}
                  className="block w-full px-4 py-2 text-left text-sm text-popover-foreground hover:bg-secondary transition-colors"
                >
                  {y}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Make Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setMakeOpen(!makeOpen)
              setYearOpen(false)
              setModelOpen(false)
            }}
            className="flex w-full items-center justify-between rounded-md border border-border bg-input px-4 py-3 text-sm text-foreground hover:border-muted-foreground transition-colors"
          >
            <span className={make ? "text-foreground" : "text-muted-foreground"}>
              {make || "Select Make"}
            </span>
            <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${makeOpen ? "rotate-180" : ""}`} />
          </button>
          {makeOpen && (
            <div className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md border border-border bg-popover shadow-lg">
              {makes.map((m) => (
                <button
                  key={m}
                  onClick={() => handleMakeChange(m)}
                  className="block w-full px-4 py-2 text-left text-sm text-popover-foreground hover:bg-secondary transition-colors"
                >
                  {m}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Model Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              if (make) {
                setModelOpen(!modelOpen)
                setYearOpen(false)
                setMakeOpen(false)
              }
            }}
            disabled={!make}
            className="flex w-full items-center justify-between rounded-md border border-border bg-input px-4 py-3 text-sm text-foreground hover:border-muted-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className={model ? "text-foreground" : "text-muted-foreground"}>
              {model || "Select Model"}
            </span>
            <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${modelOpen ? "rotate-180" : ""}`} />
          </button>
          {modelOpen && availableModels.length > 0 && (
            <div className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md border border-border bg-popover shadow-lg">
              {availableModels.map((m) => (
                <button
                  key={m}
                  onClick={() => {
                    setModel(m)
                    setModelOpen(false)
                  }}
                  className="block w-full px-4 py-2 text-left text-sm text-popover-foreground hover:bg-secondary transition-colors"
                >
                  {m}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Search Button */}
        <Button 
          className="w-full py-3 font-semibold"
          disabled={!year || !make || !model}
        >
          <Search className="mr-2 h-4 w-4" />
          Find Parts
        </Button>
      </div>
    </div>
  )
}

