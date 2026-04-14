import { VehicleSearch } from "./vehicle-search"
import { Truck, Shield, Clock } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-secondary via-background to-background" />
      
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center rounded-full border border-border bg-secondary px-4 py-1.5 text-sm font-medium text-muted-foreground">
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-primary" />
            Over 1 Million Parts In Stock
          </div>
          
          {/* Heading */}
          <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
            Find the Right Auto Part
          </h1>
          
          {/* Subheading */}
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground text-pretty">
            Quality parts for every make and model. Get fast shipping, competitive prices, and expert support for all your automotive needs.
          </p>

          {/* Vehicle Search */}
          <div className="mx-auto mt-10 max-w-3xl">
            <VehicleSearch />
          </div>

          {/* Trust badges */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-primary" />
              <span>Free Shipping $75+</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <span>90-Day Returns</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <span>Same Day Shipping</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
