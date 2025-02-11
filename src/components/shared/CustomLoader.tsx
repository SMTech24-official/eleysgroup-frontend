import { Loader2 } from "lucide-react";

interface CustomLoaderProps {
  size?: number;
  color?: string;
}

export function CustomLoader({ size = 24, color = "text-blue-600" }: CustomLoaderProps) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Loader2 className={`animate-spin ${color}`} size={size} />
    </div>
  );
}
