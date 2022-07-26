/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Return jwt token
 *     tags:
 *       - Auth
 *     requestBody:
 *       description: JSON object with username and password
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: foo_user
 *               password:
 *                 type: string
 *                 example: foo_password
 *     responses:
 *       '200':
 *         description: A JSON object with token and user data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - value
 *                 - user
 *               properties:
 *                 value:
 *                   type: string
 *                   example: your_token
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     role:
 *                       type: string
 *                       example: user
 *       '400':
 *         description: Missing name or password.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       '401':
 *         description: Wrong password.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       '404':
 *         description: User not found.
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
