import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface TimeSlotProps {
  time: string
  isSelected: boolean
  onClick: () => void
}

export function TimeSlot({ time, isSelected, onClick }: TimeSlotProps) {
  return (
    <Button
      variant="outline"
      className={cn(
        "w-[120px] hover:bg-primary/10",
        isSelected && "bg-primary text-primary-foreground hover:bg-primary/90",
      )}
      onClick={onClick}
    >
      {time}
    </Button>
  )
}

