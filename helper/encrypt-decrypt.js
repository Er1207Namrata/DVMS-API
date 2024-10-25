
import  crypto from 'crypto'



const secretKey = 'DVMSNavy@C711@40';
const algorithm = 'aes-256-cbc'; 
//const key = db.secretKey; 
//console.log(key)
const iv = crypto.randomBytes(16); 
const encryptDecrypt = {
  encrypt: async function(plainText) {
    const iv = Buffer.alloc(16); // Initialization vector
    const cipher = crypto.createCipheriv('aes-128-cbc', Buffer.from(secretKey), iv);
    let encrypted = cipher.update(plainText, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
  },
  
  decrypt: async function(cipherText) {
    //console.log(cipherText);
    if (cipherText.includes(" "))
      {
          cipherText = cipherText.replace(" ", "+");
      }
    const iv = Buffer.alloc(16); // Initialization vector
    const buffer = Buffer.from(cipherText, 'base64');
    const aes = crypto.createDecipheriv('aes-128-cbc', Buffer.from(secretKey), iv);
    let decrypted = aes.update(buffer, 'binary', 'utf8');
    decrypted += aes.final('utf8');
    
    return decrypted.toString();
  }
};

export default encryptDecrypt;
