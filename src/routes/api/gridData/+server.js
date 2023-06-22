// src/routes/api/gridData

import sql from 'mssql'; 
import { sqlConfig } from '../../../lib/utils/db';
import { json } from '@sveltejs/kit'

const pool = new sql.ConnectionPool(sqlConfig);
const poolConnect = pool.connect();

export const GET = async () => {
    
    const mpsData = await executeQuery()

    return json(mpsData);
}

async function executeQuery() {
    try {
        await poolConnect; // Wait for the connection to be established
    
        const request = pool.request();
        const query = `
        SELECT [Company], [PartNum], [Plant], [DueDate], [ProdQty]
        FROM [dbo].[MPSSample]
        `;
        const result = await request.query(query);
    
        console.log(result.recordset); // Output the query result to the console or process it as needed

        return result.recordset;

    } catch (error) {
        console.error('Error executing SQL query:', error);
    } finally {
        pool.close(); // Close the connection pool when you're done using it

        // The pool will only close when an error has occurred

        console.log("Pool successfully closed")
    }
}