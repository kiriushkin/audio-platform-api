import express from 'express';
import multer from 'multer';
import admin from '../middleware/admin.middleware.js';
import audioController from './audio.controller.js';

const router = express.Router();
const upload = multer();

router.get('/:audioId', audioController.getAudio);

router
  .route('/')
  .get(audioController.getAllAudio)
  .post(admin, upload.single('file'), audioController.addAudio)
  .put(admin, audioController.updateAudio)
  .delete(admin, audioController.deleteAudio);

export default router;
