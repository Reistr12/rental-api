import { Notification } from '../entities/notification.entity';

export interface NotificationRepository {
  create(notification: Notification): Promise<void>;
  findByRecipientId(recipientId: string): Promise<Notification[]>;
}
