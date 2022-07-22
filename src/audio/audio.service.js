import fs from 'fs/promises';
import mp3 from 'get-mp3-duration';
import { nanoid } from 'nanoid';
import Audio from '../models/Audio.js';

const { PATH_TO_AUDIO, APP_URL } = process.env;

const AUDIO_URL = APP_URL + 'audio' + '/';

class AudioService {
  async getAudioStats(id) {
    const path = PATH_TO_AUDIO + id;
    const stats = await fs.stat(path);

    const data = {
      path,
      headers: [
        { key: 'accept-ranges', value: 'bytes' },
        { key: 'Content-Length', value: stats.size },
        { key: 'Content-Range', value: `bytes 0-${stats.size}/${stats.size}` },
        { key: 'Content-Type', value: 'audio/mp3' },
      ],
    };

    return data;
  }

  async getAudio(id) {
    return await Audio.findOne({ where: { id } });
  }

  async getAllAudio() {
    return await Audio.findAll({ raw: true, order: [['createdAt', 'ASC']] });
  }

  async addAudio(file, data) {
    const { title, releaseDate } = data;
    const id = nanoid(32);
    const duration = mp3(file.buffer) / 1000;
    const durationFormatted = timeToString(duration);
    const path = PATH_TO_AUDIO + id;
    const url = AUDIO_URL + id;

    try {
      await fs.stat(PATH_TO_AUDIO);
    } catch (err) {
      await fs.mkdir('static');
      await fs.mkdir(PATH_TO_AUDIO);
    }

    fs.writeFile(path, file.buffer);

    const audio = {
      id,
      title,
      duration,
      durationFormatted,
      releaseDate,
      url,
    };

    return await Audio.create(audio);
  }

  async updateAudio(audio) {
    return await Audio.update(audio, {
      where: { id: audio.id },
      returning: true,
    });
  }

  async deleteAudio(id, url) {
    fs.unlink(url.replace(AUDIO_URL, PATH_TO_AUDIO));
    return await Audio.destroy({ where: { id } });
  }
}

const timeToString = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);

  return `${minutes}:${String(seconds).length === 1 ? '0' + seconds : seconds}`;
};

export default new AudioService();
