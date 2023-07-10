// src/routes/api/gridData

import sql from 'mssql'; 
import { sqlConfig } from '../../../lib/utils/db';
import { json } from '@sveltejs/kit'

const pool = new sql.ConnectionPool(sqlConfig);
const poolConnect = pool.connect();

export const GET = async () => {
    
    const exceptionsData = await executeExceptionsQuery()
    // const demandData = await executeDemandQuery()

    const formattedDateArray = convertDatesToMMDDYYYY(exceptionsData);
    // console.log(formattedDateArray);

    return json(formattedDateArray);
}

async function executeExceptionsQuery() {
    try {
        await poolConnect; // Wait for the connection to be established
    
        const request = pool.request();
        const query = `
        SELECT * 
        FROM [dbo].MPS_NonWorkDay
        `;

        const result = await request.query(query);
        
        // console.log(result.recordset); 
        // Output the query result to the console or process it as needed

        return result.recordset;

    } catch (error) {
        console.error('Error executing SQL query:', error);
    } finally {
        pool.close(); // Close the connection pool when you're done using it

        // The pool will only close when an error has occurred

        console.log("Pool successfully closed")
    }
}

function convertDatesToMMDDYYYY(dateArray) {
    const formattedDates = dateArray.map(dateObj => {
      const date = new Date(dateObj.NonWorkDay);
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${month}/${day}/${year}`;
    });
  
    return formattedDates;
  }