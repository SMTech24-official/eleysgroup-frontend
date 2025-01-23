import { TimeSlot } from "./time-slot"

interface DateRowProps {
  date: string
  day: string
  timeSlots: string[]
  selectedTime: string | null
  onTimeSelect: (time: string) => void
}

export function DateRow({ date, day, timeSlots, selectedTime, onTimeSelect }: DateRowProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
      <div className="min-w-[100px] text-sm">
        <div className="font-medium">{date}</div>
        <div className="text-muted-foreground">{day}</div>
      </div>
      <div className="flex flex-wrap gap-2">
        {timeSlots.map((time) => (
          <TimeSlot key={time} time={time} isSelected={time === selectedTime} onClick={() => onTimeSelect(time)} />
        ))}
      </div>
    </div>
  )
}

