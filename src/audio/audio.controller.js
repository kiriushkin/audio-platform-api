import fs from 'fs';
import audioService from './audio.service.js';

class AudioController {
  async getAudio(req, res) {
    try {
      const { audioId } = req.params;

      const { path, headers } = await audioService.getAudioStats(audioId);

      headers.forEach((header) => {
        res.set(header.key, header.value);
      });

      const stream = fs.createReadStream(path);

      stream.pipe(res);
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: err.message });
    }
  }

  async getAllAudio(req, res) {
    try {
      const audio = await audioService.getAllAudio();

      res.send(audio);
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: err.message });
    }
  }

  async addAudio(req, res) {
    try {
      const { file, body: audio } = req;

      if (!file || !audio.title || !audio.releaseDate)
        return res.status(400).send({ message: 'File of title is missing.' });

      const resp = await audioService.addAudio(file, audio);

      if (!resp) throw new Error();

      res.status(201).send(resp.dataValues);
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: err.message });
    }
  }

  async updateAudio(req, res) {
    try {
      const { body: audio } = req;
      if (!audio.id || !audio.title)
        return res.status(400).send({ message: 'Id or title is missing.' });

      const [rows, [newAudio]] = await audioService.updateAudio(audio);

      if (rows === 0)
        return res
          .status(404)
          .send({ message: 'Audio with that id not found.' });

      res.send(newAudio);
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: err.message });
    }
  }

  async deleteAudio(req, res) {
    try {
      const { id } = req.body;
      if (!id) return res.status(400).send({ message: 'Id is missing.' });

      const audio = await audioService.getAudio(id);

      if (audio === null)
        return res.status(404).send({ message: 'Audio not found.' });

      await audioService.deleteAudio(audio.id, audio.url);

      res.send({ message: 'Audio deleted.' });
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: err.message });
    }
  }
}

export default new AudioController();
