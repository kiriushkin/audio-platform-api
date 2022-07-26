/**
 * @swagger
 * /audio/{audioId}:
 *   get:
 *     summary: Return an audio stream
 *     tags:
 *       - Audio
 *     responses:
 *       '200':
 *         description: An audio stream.
 *         content:
 *           audio/mp3:
 *             schema:
 *               type: string
 *               format: binary
 *       default:
 *         description: Unexpected error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 * /audio:
 *   get:
 *     summary: Return an array of audio
 *     tags:
 *       - Audio
 *     responses:
 *       '200':
 *         description: An array of audio.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Audio'
 *       default:
 *         description: Unexpected error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   post:
 *     summary: Add an audio
 *     tags:
 *       - Audio
 *     security:
 *       - TokenAuth: []
 *     requestBody:
 *       description: Form data with audio info
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *               - title
 *               - releaseDate
 *             properties:
 *               file:
 *                 type: file
 *                 format: binary
 *               title:
 *                 type: string
 *                 example: Cool song
 *               releaseDate:
 *                 type: string
 *                 example: 22.10.2022
 *     responses:
 *       '201':
 *         description: A JSON object with audio data.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Audio'
 *       '400':
 *         description: File or title is missing.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       default:
 *         description: Unexpected error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   put:
 *     summary: Update an audio
 *     tags:
 *       - Audio
 *     security:
 *       - TokenAuth: []
 *     requestBody:
 *       description: A JSON object with new audio info
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Audio'
 *     responses:
 *       '200':
 *         description: A JSON object with audio data.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Audio'
 *       '400':
 *         description: Id or title is missing.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       '404':
 *         description: Audio not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       default:
 *         description: Unexpected error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   delete:
 *     summary: Delete an audio
 *     tags:
 *       - Audio
 *     security:
 *       - TokenAuth: []
 *     requestBody:
 *       description: A JSON object with audio id.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: LSVHzNtiPPu3GzZYWPcRJlKWe6U6C4j2
 *     responses:
 *       '200':
 *         description: A JSON object with successful message.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Audio successfuly deleted.
 *       '400':
 *         description: Id is missing.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       '404':
 *         description: Audio not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       default:
 *         description: Unexpected error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
