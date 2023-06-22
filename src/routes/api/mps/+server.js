// import { fetchMPSdata } from '$lib/utils'
// import { json } from '@sveltejs/kit'

import sql from 'mssql';
import { sqlConfig } from '../../../lib/utils';

// connect to the sql database
const pool = new sql.ConnectionPool(sqlConfig);
const poolConnect = pool.connect();

// creating function to be used on server-side
export const GET = async () => {
    try {
        await poolConnect; // Wait for the connection to be established
    
        const request = pool.request();
        const query = `
          SELECT [Company], [PartNum], [Plant], [DueDate], [ProdQty]
          FROM [dbo].[MPSSample]
        `;
        const result = await request.query(query);
        
        
        console.log(result.recordset); // Output the query result to the console or process it as needed
        
        return result;
        
      } catch (error) {
        console.error('Error executing SQL query:', error);
      } finally {
        pool.close(); // Close the connection pool when you're done using it
      }

      
}