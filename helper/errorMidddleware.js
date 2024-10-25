
import  sendErrorEmail from '../helper/emailError.js'

const errorMiddleware = (err, req, res, next) => {
  console.error(err.stack);

  // Send email with error details
  sendErrorEmail(err);

  // Respond to the client
  res.status(500).json({ message: 'Internal Server Error' }); 

};

export default errorMiddleware
