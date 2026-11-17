import { User } from './User';

export interface Contact {
  id: string;
  user: User;
  isFavorite?: boolean;
  isBlocked?: boolean;
  addedAt: string;
}
