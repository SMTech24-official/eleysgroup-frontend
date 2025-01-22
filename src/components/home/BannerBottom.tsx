import { Button } from "@/components/ui/button";

export function BannerBottom() {
  return (
    <div className="relative flex flex-col justify-center items-center h-[300px] md:h-[400px]">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('/banner-2.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h1 className="text-xl md:text-3xl font-semibold mb-4 max-w-lg">
          Are you uncertain that Physical Therapy is the solution to your pain?
        </h1>
        <Button
          size="lg"
          className="bg-primary text-white hover:bg-primary/80 px-2 py-4"
        >
          Book Appointment
        </Button>
      </div>
    </div>
  );
}
