export function FeaturedBrands() {
  const brands = [
    "ACDelco", "Bosch", "Denso", "Moog", "Monroe", "NGK", "Raybestos", "Dorman"
  ]

  return (
    <section className="border-y border-border bg-secondary/50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-medium text-muted-foreground mb-8">
          Trusted by leading automotive brands
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 lg:gap-16">
          {brands.map((brand) => (
            <div
              key={brand}
              className="text-lg font-bold text-muted-foreground/50 hover:text-muted-foreground transition-colors cursor-pointer"
            >
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
