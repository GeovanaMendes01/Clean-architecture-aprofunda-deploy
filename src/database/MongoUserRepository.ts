import { UserModel } from "./mongooseUserModel";

export interface IUser {
  name: string;
  email: string;
  password: string;
}

export class MongoUserRepository {
  async create(user: IUser) {
    const newUser = await UserModel.create(user);
    return newUser;
  }

  async findByEmail(email: string) {
    const user = await UserModel.findOne({ email });
    return user;
  }
}