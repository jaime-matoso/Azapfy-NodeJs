import express, { Request, Response, Router } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import router from './routes/notas';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(router);

const port = 3000;

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Notas - Azapfy',
            version: '1.0.0',
        },
    },
    apis: ['./routes/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
