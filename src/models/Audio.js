import { DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';

const Audio = sequelize.define('audio', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  duration: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  durationFormatted: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  releaseDate: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

try {
  await Audio.sync({ alter: true });
  console.log('audio table successfully synced.');
} catch (err) {
  console.error(err);
}

export default Audio;
