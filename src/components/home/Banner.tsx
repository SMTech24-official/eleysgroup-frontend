import { Button } from "@/components/ui/button";

export function Banner() {
  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('/banner-1.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="flex flex-col items-center justify-center min-h-screen text-center text-white pt-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Recover Stronger, Live Better
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mb-8 text-gray-200">
            Comprehensive physiotherapy services, Tailored to your unique
            well-being. Expert care to help you recover, Move better, and feel
            your best.
          </p>
          <Button
            size="lg"
            className="bg-primary text-foreground hover:bg-primary px-4 py-2"
          >
            Book Appointment
          </Button>
        </div>
      </div>
    </div>
  );
}
