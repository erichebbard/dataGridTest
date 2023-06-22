

// const sql = require('mssql')

// Get the connection parameters
export const sqlConfig = {
  server: '173.248.150.144',
  database: 'ERPEdge',
  user: 'sa',
  password: '3r$pE#dge@696!',
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 5000
  },
  options: {
    encrypt: false, // Use this option if your SQL Server requires an encrypted connection
    trustServerCertificate: false,
    tdsVersion: '7_1'
  },
};




// // creating function to be used on server-side
// export const fetchMPSdata = async () => {
//     try {
//         // make sure that any items are correctly URL encoded in the connection string
//         await sql.connect(sqlConfig)
//         const result = await sql.query`select * from dbo.MPSDemand`
//         console.dir(result)
//        } catch (err) {
//         // ... error checks
//        }
// }





// fetch MPS data via query

// async function fetchMPSdata() {
//     try {
//       await poolConnect; // Wait for the connection to be established
  
//       const request = pool.request();
//       const query = `
//         SELECT [Company], [PartNum], [Plant], [DueDate], [ProdQty]
//         FROM [dbo].[MPSSample]
//       `;
//       const result = await request.query(query);
  
//       console.log(result.recordset); // Output the query result to the console or process it as needed
//     } catch (error) {
//       console.error('Error executing SQL query:', error);
//     } finally {
//       pool.close(); // Close the connection pool when you're done using it
//     }
//   }