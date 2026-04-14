import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Percent } from "lucide-react"

export function PromoBanner() {
  return (
    <section className="bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Main promo */}
          <div className="relative overflow-hidden rounded-lg border border-border bg-card p-8 lg:p-12">
            <div className="absolute right-0 top-0 h-40 w-40 -translate-y-1/4 translate-x-1/4 rounded-full bg-primary/10" />
            <div className="absolute bottom-0 left-0 h-32 w-32 translate-x-[-50%] translate-y-1/4 rounded-full bg-primary/10" />
            
            <div className="relative">
              <div className="mb-4 inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                <Percent className="mr-1.5 h-3.5 w-3.5" />
                Limited Time Offer
              </div>
              <h3 className="text-2xl font-bold text-foreground sm:text-3xl">
                Save 20% on Brake Parts
              </h3>
              <p className="mt-3 text-muted-foreground">
                Get premium brake pads, rotors, and calipers at unbeatable prices. Offer ends soon.
              </p>
              <Button className="mt-6" asChild>
                <Link href="#">
                  Shop Brake Deals
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Secondary promos */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
            <div className="flex items-center gap-6 rounded-lg border border-border bg-card p-6">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Same Day Pickup</h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  Order online, pick up at a store near you in hours.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 rounded-lg border border-border bg-card p-6">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Lifetime Warranty</h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  Selected parts come with a lifetime replacement guarantee.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
