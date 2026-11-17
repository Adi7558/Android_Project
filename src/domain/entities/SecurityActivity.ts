export type SecurityActivityType =
  | 'login'
  | 'key_change'
  | 'verification'
  | 'device_added'
  | 'device_revoked'
  | 'password_reset';

export type SecurityActivitySeverity = 'info' | 'warning' | 'success' | 'danger';

export interface SecurityActivity {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: SecurityActivityType;
  severity: SecurityActivitySeverity;
  device?: string;
  location?: string;
}
