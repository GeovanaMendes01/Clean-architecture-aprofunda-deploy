import bcrypt from 'bcrypt';
import { gerarToken } from "../shared/helper/jwt";
import { MongoUserRepository } from "../database/MongoUserRepository";

const userRepository = new MongoUserRepository();

interface IUserRegister {
  name: string;
  email: string;
  password: string;
}

interface IUserLogin {
  email: string;
  password: string;
}

export default {
  register: async ({ name, email, password }: IUserRegister) => {
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error("Usuário já cadastrado");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userRepository.create({
      name,
      email,
      password: hashedPassword
    });

    return { id: user._id, name: user.name, email: user.email };
  },

  login: async ({ email, password }: IUserLogin) => {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new Error("Credenciais inválidas");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Credenciais inválidas");
    }

    const token = gerarToken({ userId: user._id, email: user.email });
    return token;
  }
};