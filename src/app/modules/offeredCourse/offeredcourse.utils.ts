import { TSchedule } from './offeredCourse.interface';

export const hasTimeConflict = (
  assignedSchedules: TSchedule[],
  newSchedule: TSchedule,
) => {
  for (const schedule of assignedSchedules) {
    const existingStartTime = new Date(`1970-02-02T${schedule.startTime}`);
    const existingEndTime = new Date(`1970-02-02T${schedule.endTime}`);
    const newStartTime = new Date(`1970-02-02T${newSchedule.startTime}`);
    const newEndTime = new Date(`1970-02-02T${newSchedule.endTime}`);

    if (newStartTime < existingEndTime && newEndTime > existingStartTime) {
     
      return true;
    }
  }

  return false;
};
