export interface NoteType {
  id: string;
  title: string;
  content: string;
  color: string;
}

export interface TimerState {
  minutes: number;
  seconds: number;
  isRunning: boolean;
}