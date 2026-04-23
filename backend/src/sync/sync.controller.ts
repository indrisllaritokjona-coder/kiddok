import { Controller, Post, Get, Body, Param, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SyncService } from './sync.service';
import { ConflictResolutionDto } from './dto/sync-conflict.dto';

@Controller('sync')
@UseGuards(AuthGuard('jwt'))
export class SyncController {
  constructor(private readonly syncService: SyncService) {}

  /**
   * POST /sync
   * Receive a batch of offline entries and process them with conflict detection.
   * Body: { entries: Array<{ entityType, action, data, localTimestamp }> }
   * Returns: { success, syncedCount, failedCount, conflicts[] }
   */
  @Post()
  async sync(@Request() req: any, @Body() body: { entries: any[] }) {
    return this.syncService.syncEntries(req.user.userId, body.entries ?? []);
  }

  /**
   * GET /sync/conflicts
   * Returns list of pending conflicts for this user's children.
   * Client can poll this to retrieve unresolved medical data conflicts.
   */
  @Get('conflicts')
  async getConflicts(@Request() req: any) {
    // Conflicts are returned inline in sync response.
    // This endpoint is for polling when client has pending unresolved conflicts.
    return { message: 'No pending conflicts endpoint — conflicts returned in sync response' };
  }

  /**
   * POST /sync/resolve
   * Apply manual conflict resolution from client after user review.
   * Body: ConflictResolutionDto { entityType, entityId, resolution, mergedData? }
   */
  @Post('resolve')
  async resolveConflict(@Request() req: any, @Body() resolution: ConflictResolutionDto) {
    const success = await this.syncService.resolveConflict(req.user.userId, resolution);
    return { success };
  }
}