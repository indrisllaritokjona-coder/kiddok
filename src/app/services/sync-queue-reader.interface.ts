export interface SyncQueueReader {
  getSyncQueueEntries(): Promise<import('./offline.service').SyncQueueEntry[]>;
}