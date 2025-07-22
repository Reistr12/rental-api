export type UserRole = 'LOCADOR' | 'INQUILINO';

export class User {
  constructor(
    public readonly id: string,
    public name: string,
    public email: string,
    public password: string, // hash
    public role: UserRole,
    public createdAt: Date = new Date()
  ) {}

  changeName(newName: string) {
    if (newName.length < 2) {
      throw new Error('Nome muito curto');
    }
    this.name = newName;
  }

  changePassword(newHashedPassword: string) {
    this.password = newHashedPassword;
  }
}
