// Time-related utility functions
export const formatTime = (minutes: number, seconds: number): string => {
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

export const validateTimeInput = (value: string): boolean => {
  const minutes = parseInt(value, 10);
  return !isNaN(minutes) && minutes > 0 && minutes <= 1440;
};

export const DEFAULT_TIMER_MINUTES = 25;