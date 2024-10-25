import swaggerJsdoc from 'swagger-jsdoc'
import path from 'path'
const options = {
    swaggerDefinition: {
        info: {
            title: 'DVMS API',
            version: '1.0.0',
            description: 'Need Help? Contact to technical support team.'
        },
        basePath: 'http://localhost:204',
    },    
    apis: ['./routes/*.js'], 
};

const specs = swaggerJsdoc(options);

export default specs;
