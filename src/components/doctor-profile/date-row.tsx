/* eslint-disable @typescript-eslint/no-explicit-any */
import { TimeSlot } from "./time-slot";

interface DateRowProps {
  date: string;
  day: string;

  selectedTime: string | null;
  onTimeSelect: (time: string) => void;
  slots: any;
}

export function DateRow({ date, day, selectedTime, onTimeSelect, slots }: DateRowProps) {
  // console.log(slots);
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
      <div className="min-w-[100px] text-sm">
        <div className="font-medium">{date}</div>
        <div className="text-muted-foreground">{day}</div>
      </div>
      <div className="flex flex-wrap gap-2 overflow-x-auto">
        {slots.map((time: any) => {
          // console.log(time);
          return (
            <TimeSlot key={time} time={time} isSelected={time === selectedTime} onClick={() => onTimeSelect(time)} />
          );
        })}
      </div>
    </div>
  );
}
