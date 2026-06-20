import Link from "next/link"
import { Settings, Disc, Gauge, Thermometer, Zap, Fuel, ArrowRight } from "lucide-react"

const categories = [
  {
    name: "Engine Parts",
    description: "Pistons, gaskets, timing belts, and more",
    icon: Settings,
    href: "#",
    featured: true,
  },
  {
    name: "Brake System",
    description: "Pads, rotors, calipers, and brake fluid",
    icon: Disc,
    href: "#",
    featured: false,
  },
  {
    name: "Suspension",
    description: "Shocks, struts, control arms, and springs",
    icon: Gauge,
    href: "#",
    featured: false,
  },
  {
    name: "Cooling System",
    description: "Radiators, water pumps, and thermostats",
    icon: Thermometer,
    href: "#",
    featured: false,
  },
  {
    name: "Electrical",
    description: "Batteries, alternators, and starters",
    icon: Zap,
    href: "#",
    featured: false,
  },
  {
    name: "Fuel System",
    description: "Fuel pumps, injectors, and filters",
    icon: Fuel,
    href: "#",
    featured: false,
  },
]

export function CategoriesGrid() {
  return (
    <section className="bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Popular Categories
            </h2>
            <p className="mt-2 text-muted-foreground">
              Shop by category to find exactly what you need
            </p>
          </div>
          <Link 
            href="#" 
            className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline sm:flex"
          >
            View All Categories
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Categories grid */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="group relative overflow-hidden rounded-lg border border-border bg-card p-6 transition-all hover:border-primary hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <category.icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {category.description}
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile link */}
        <div className="mt-8 text-center sm:hidden">
          <Link 
            href="#" 
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            View All Categories
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
