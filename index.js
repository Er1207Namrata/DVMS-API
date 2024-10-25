import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
const { json, urlencoded } = bodyParser;
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import authHeaderToken from './validators/auth-token.js';
import allRoutes from './routes/routes.js'
import errorMiddleware  from './helper/errorMidddleware.js';
// import AllRoutes from './routes/routes';
// import pool from './config/db'
import swaggerUi  from 'swagger-ui-express' //Added by maqsood 
import specs from './swagger.js' //Added by maqsood 
import session from 'express-session';

const app = express();

app.use(json());
app.use(urlencoded({extended:false}));
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use("/storage", express.static(join(__dirname, "storage")));



const PORT = process.env.PORT || 204;



// db connection


  // pool.connect((err,client,release)=>{
  //   if(err){
  //       return console.log('Error in connection')
  //   }
  //   client.query('SELECT NOW()',(err,result)=>{
  //       release()
  //       if(err){
  //           return console.error('Error executing query')
  //       }
  //       console.log("Connected to Database!")
  //   })
  // })
  app.use(session({
    secret: 'your-session-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
  }));
app.use(authHeaderToken);

app.get('/', (req, res) => {
    return res.send('Working fine!')
  });
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  
  app.use(`/api/${process.env.API_VERSION}`,allRoutes);
  
  app.get('/error', (req, res) => {
    throw new Error('Test error for email notification!');
  });
  app.use(errorMiddleware);
 
app.listen(PORT, () => console.log(`App listening at port ${PORT}`));

export default app;