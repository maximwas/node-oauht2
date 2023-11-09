import jwt from 'jsonwebtoken';

import { UserModel } from '../../db/models/users.js';
import { UserResponse, Users } from '../../interface/index.js';

const createToken = (id): string => {
  const maxAge = 3 * 24 * 60 * 60;

  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: maxAge
  });
};

export default {
  Mutation: {
    async login(_, { password, email }: Users, context): Promise<UserResponse> {
      const user = new UserModel({ password, email });
      const token = createToken(user._id);

      await user.save();

      return {} as Promise<UserResponse>;
    }
  }
};
