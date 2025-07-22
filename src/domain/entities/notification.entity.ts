export class Notification {
  constructor(
    public readonly id: string,
    public recipientId: string, // User
    public message: string,
    public sentAt: Date = new Date()
  ) {}

}
