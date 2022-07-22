import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const { SALT_ROUNDS, JWT_SECRET } = process.env;

class AuthService {
  async findUser(name) {
    return User.findOne({ where: { name } });
  }

  async hashPassword(password) {
    return await bcrypt.hash(password, +SALT_ROUNDS);
  }

  async comparePasswords(password, hash) {
    return await bcrypt.compare(password, hash);
  }

  generateToken(id, role) {
    return jwt.sign({ id, role }, JWT_SECRET, { expiresIn: '1w' });
  }
}

export default new AuthService();
