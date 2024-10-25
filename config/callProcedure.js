
import pkg from 'pg';
const { Pool } = pkg;
const env=process.env.NODE_ENV|| 'development'
import config from '../config/config.js'

const pool = new Pool({
  user: config[env].username,
  password: config[env].password,
  database: config[env].database,
  host: config[env].host,
  port: config[env].port,
  //ssl: config[env].dialectOptions.ssl // Add SSL configuration if required
});

const callprocMenthod={
 POST :async function(requestData,procName) {
   try {
    
     const json=JSON.parse(requestData);
     const client = await pool.connect();
     var param="";
     const keyNames = Object.keys(json);
     const values=Object.values(json);
     const placeholders = values.map((_, index) => `$${index + 1}`).join(',');
     const query = `CALL ${procName}(${placeholders})`;
     const result = await client.query(query, values);
     client.release();
     return result.rows;
   } catch (error) {
     console.error('Error executing stored procedure:', error);
     throw error;
   }
 },
 POSTOBJECT :async function(requestData,procName) {
  try {
   
    const json=requestData;
    const client = await pool.connect();
    var param="";
    const keyNames = Object.keys(json);
    const values=Object.values(json);
    const placeholders = values.map((_, index) => `$${index + 1}`).join(',');
    const query = `CALL ${procName}(${placeholders})`;
    const result = await client.query(query, values);
    client.release();
    return result.rows;
  } catch (error) {
    console.error('Error executing stored procedure:', error);
    throw error;
  }
},
 
  GET :async function(requestData,procName) {
   try {
    let query;
     const json=JSON.parse(requestData);
     const client = await pool.connect();
     var param="";
     const keyNames = Object.keys(json);
     const values=Object.values(json);
     var j=1;
     for(var i=0;i<=keyNames.length-1;i++)
     {
       param=param+'$'+j+',';
       
       j=j+1;
     }    
     param=param.slice(0, -1);  
     if(procName=="get_multiple_tables")
      {
         query = 'SELECT * FROM '+procName+'('+')';
      }
     else
     {
       query = 'SELECT * FROM '+procName+'('+param+')';
     }
     const result = await client.query(query, values);
     console.log(result);
     client.release();
     return result.rows;
   } catch (error) {
     console.error('Error executing stored procedure:', error);
     throw error;
   }
 },
 GETWITHPEARA :async function(procName) {
  try {
   let query;
   const client = await pool.connect();
    if(procName=="get_multiple_tables")
     {
        query = 'SELECT * FROM '+procName+'()';
     }
    else
    {
      query = 'SELECT * FROM '+procName+'()';
    }
    const result = await client.query(query);
    client.release();
    return result.rows;
  } catch (error) {
    console.error('Error executing stored procedure:', error);
    throw error;
  }
},
POSTXML :async function(requestData,procName) {
  try {
    //const json=JSON.parse(requestData);
    const client = await pool.connect();
    var param="";
    const keyNames = Object.keys(requestData);
    const values=Object.values(requestData);
    const placeholders = values.map((_, index) => `$${index + 1}`).join(',');
    const query = `CALL ${procName}(${placeholders})`;
    const result = await client.query(query, values);
    client.release();
    return result.rows;
  } catch (error) {
    console.error('Error executing stored procedure:', error);
    throw error;
  }
}
}

export default callprocMenthod