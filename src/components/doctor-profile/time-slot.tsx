/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface TimeSlotProps {
  time: any;
  isSelected: boolean;
  onClick: () => void;
}

export function TimeSlot({ time, isSelected, onClick }: TimeSlotProps) {
  const getTime = (time: string) => {
    const newTime = new Date(time);
    return newTime.toLocaleTimeString();
  };
  // console.log(time);
  return (
    <Button
      variant="outline"
      className={cn("] hover:bg-primary/10", isSelected && "bg-primary text-primary-foreground hover:bg-primary/90")}
      onClick={onClick}
      disabled={time?.isBooked}
    >
      {getTime(time?.startDateTime)} - {getTime(time?.endDateTime)}
      {/* {time} */}
    </Button>
  );
}
