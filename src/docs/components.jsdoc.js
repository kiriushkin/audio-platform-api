/**
 * @swagger
 * components:
 *   schemas:
 *     Audio:
 *       type: object
 *       required:
 *         - id
 *         - title
 *         - releaseDate
 *       properties:
 *         id:
 *           type: string
 *           example: LSVHzNtiPPu3GzZYWPcRJlKWe6U6C4j2
 *         title:
 *           type: string
 *           example: Cool song
 *         duration:
 *           type: float
 *           example: 120.059
 *         durationFormatted:
 *           type: string
 *           example: 2:00
 *         releaseDate:
 *           type: string
 *           example: 22.12.2022
 *         url:
 *           type: string
 *           example: https://api.kiriushkin.pro/audio-platform/api/audio/LSVHzNtiPPu3GzZYWPcRJlKWe6U6C4j2
 *     Error:
 *       type: object
 *       required:
 *         - message
 *       properties:
 *         message:
 *           type: string
 *           example: An error occured while...
 *   securitySchemes:
 *     TokenAuth:
 *       type: http
 *       scheme: bearer
 */
