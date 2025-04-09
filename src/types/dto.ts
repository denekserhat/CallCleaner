// Auth DTOs
export interface LoginRequestDTO {
  email?: string | null;
  password?: string | null;
}

export interface RegisterRequestDTO {
  email?: string | null;
  password?: string | null;
  fullName?: string | null; // OpenAPI'de fullName olarak geçiyor
}

export interface UpdateProfileRequestDTO {
  name?: string | null;
  newPassword?: string | null;
}

export interface ForgotPasswordDTO {
  email?: string | null;
}

export interface ResetPasswordDTO {
  email: string;
  code: string;
  newPassword: string;
}

// Settings DTOs
export interface UpdateBlockingModeRequestDTO {
  mode?: string | null; // "all", "known", "custom"
}

export interface UpdateWorkingHoursRequestDTO {
  mode?: string | null; // "24/7", "custom"
  startTime?: string | null;
  endTime?: string | null;
}

export interface UpdateNotificationsRequestDTO {
  enabled: boolean;
}

export interface AddToWhitelistRequestDTO {
  number?: string | null;
  name?: string | null;
}

export interface WorkingHoursDTO {
  mode?: string | null;
  startTime?: string | null;
  endTime?: string | null;
}

// BlockedCalls DTOs
// GET /api/blocked-calls response tipi (kısmi, API'den dönen tam yapıya göre güncellenmeli)
export interface BlockedCallDTO {
  id: string;
  phoneNumber: string;
  timestamp: string; // ISO 8601 formatında
  callType?: string | null;
}

// NumberCheck DTOs
export interface CheckNumberRequestDTO {
  phoneNumber?: string | null;
}

export interface IncomingCallRequestDTO {
  phoneNumber?: string | null;
  timestamp: string; // ISO 8601 formatında
}

// Reports DTOs
export interface SubmitReportRequestDTO {
  phoneNumber?: string | null;
  spamType?: string | null; // "telemarketing", "scam", "annoying", "other"
  description?: string | null;
  timestamp?: string | null; // ISO 8601 formatında
}

// App DTOs
export interface VerifyPermissionsRequestDTO {
  grantedPermissions?: string[] | null;
}

// Sync DTOs
export interface BlockedNumberSyncDTO {
  phoneNumber?: string | null;
  timestamp: string; // ISO 8601 formatında
}

export interface SyncBlockedNumbersRequestDTO {
  numbers?: BlockedNumberSyncDTO[] | null;
}

export interface SyncSettingsRequestDTO {
  blockingMode?: string | null;
  workingHours?: WorkingHoursDTO;
  notificationsEnabled: boolean;
  timestamp: string; // ISO 8601 formatında
} 