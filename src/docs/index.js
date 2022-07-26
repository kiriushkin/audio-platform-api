import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const { CLIENT_URL } = process.env;

const router = express.Router();

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'Audio Platform API',
      description: `#### An API for [Audio Platform App](${CLIENT_URL}). You can also view Github [Repo](https://github.com/kiriushkin/audio-platform-api).`,
    },
    servers: [
      {
        url: 'http://localhost:5010/api',
        description: 'Development Server',
      },
      {
        url: 'https://api.kiriushkin.pro/audio-platform/api',
        description: 'Production Server',
      },
    ],
  },
  apis: ['./docs/*jsdoc.js'],
};

const swaggerSpec = swaggerJsdoc(options);

router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default router;
