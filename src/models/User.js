import bcrypt from 'bcrypt';
import { DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';

const { SALT_ROUNDS } = process.env;

const User = sequelize.define(
  'user',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    role: {
      type: DataTypes.STRING(50),
      defaultValue: 'user',
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: false }
);

// Create default admin user
try {
  await User.sync({ alter: true });
  console.log('users table successfully synced.');

  const admin = await User.findOne({ where: { name: 'admin' } });

  if (admin) return;

  const password = await bcrypt.hash('admin', +SALT_ROUNDS);

  await User.create({ role: 'admin', name: 'admin', password });

  console.log('Default admin user created.');
} catch (err) {
  console.error(err);
}
