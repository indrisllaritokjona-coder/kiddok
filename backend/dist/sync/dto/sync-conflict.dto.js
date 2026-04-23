"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConflictResolutionDto = exports.SyncResultDto = exports.SyncConflictDto = void 0;
class SyncConflictDto {
    entityType;
    entityId;
    localTimestamp;
    serverTimestamp;
    localData;
    serverData;
    conflictType;
}
exports.SyncConflictDto = SyncConflictDto;
class SyncResultDto {
    success;
    syncedCount;
    failedCount;
    conflicts;
}
exports.SyncResultDto = SyncResultDto;
class ConflictResolutionDto {
    entityType;
    entityId;
    resolution;
    mergedData;
}
exports.ConflictResolutionDto = ConflictResolutionDto;
//# sourceMappingURL=sync-conflict.dto.js.map