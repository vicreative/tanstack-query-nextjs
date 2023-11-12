export default function minutesToHoursAndMinutes(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min${minutes !== 1 ? 's' : ''}`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  const hoursText = hours > 1 ? 'hrs' : 'hr';
  const minutesText = remainingMinutes > 1 ? 'mins' : 'min';

  return `${hours} ${hoursText} ${remainingMinutes} ${minutesText}`;
}
