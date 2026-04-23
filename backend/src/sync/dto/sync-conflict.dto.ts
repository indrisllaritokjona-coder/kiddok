export class SyncConflictDto {
  entityType!: 'temperature' | 'growth' | 'vaccine' | 'diary';
  entityId!: string;
  localTimestamp!: number;
  serverTimestamp!: number;
  localData!: any;
  serverData!: any;
  conflictType!: 'last_write_wins' | 'medical_data_manual_review';
}

export class SyncResultDto {
  success!: boolean;
  syncedCount!: number;
  failedCount!: number;
  conflicts!: SyncConflictDto[];
}

export class ConflictResolutionDto {
  entityType!: 'temperature' | 'growth' | 'vaccine' | 'diary';
  entityId!: string;
  resolution!: 'local_wins' | 'server_wins' | 'merge';
  mergedData?: any;
}