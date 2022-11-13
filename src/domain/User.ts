export default class User {

  constructor(
    public id: string|null = null,
    public name: string,
    public password: string,
    public createdAt?: Date|null,
    public updatedAt?: Date|null,
    public deletedAt?: Date|null,
  ) {}
}
