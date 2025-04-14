export function formatTotalTime(total) {
  let hours = Math.floor(total);
  let minutes = Math.round((total - hours) * 60);
  if (minutes === 60) {
    hours += 1;
    minutes = 0;
  }
  const hourStr = hours > 0 ? `${hours} hour${hours !== 1 ? 's' : ''}` : '';
  const minuteStr = minutes > 0 ? `${minutes} min${minutes !== 1 ? 's' : ''}` : '';

  if (hourStr && minuteStr) return `${hourStr} ${minuteStr}`;
  return hourStr || minuteStr || '0 mins';
}

export function formatMinutesAndSeconds(seconds) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  const hoursStr = hrs > 0 ? `${hrs}h ` : '';
  const minsStr = mins > 0 || hrs > 0 ? `${mins}m ` : '';
  const secsStr = `${secs}s`;

  return `${hoursStr}${minsStr}${secsStr}`;
}