// src/routes/api/gridData

import sql from 'mssql'; 
import { sqlConfig } from '../../../lib/utils/db';
import { json } from '@sveltejs/kit'

const pool = new sql.ConnectionPool(sqlConfig);
const poolConnect = pool.connect();

export const GET = async () => {
    
    const demandData = await executeMPSQuery()

    let demandDataArray = new Array();


    demandData.forEach((row) => {
        // console.log(row)

        const PartNum = row.PartNum

        const objIsFound = demandDataArray.find(row => row.partNum === PartNum);
        
        // console.log(objIsFound !== undefined); // Output: true

        if (objIsFound === undefined) { //initialize new object and push object to array if not found
            const newObj = {
                platform: row.platform ?? 0,
                partNum: row.PartNum ?? 0,
                safetyStock: row.safetystock ?? 0,
                toolNumber: row.tool ?? 0,
                toolQty: row.toolqty ?? 0,
                toolCapacity: 4,
                line: row.line ?? 0,
            }
            demandDataArray.push(newObj);
        }

        // Find the object in the array... You could technically do this in the above if statement, but since it occurs 
        // only once every so many times, the increased performance outweighs the reduced readability.
        const targetObject = demandDataArray.find(row => row.partNum === PartNum);

        if (targetObject) {
            targetObject[row.RequestDate] = row.OrderQty;
        }

        // console.log(targetObject)

    });

    console.log(demandDataArray);

    const summaryRow = {safetyStock: "Total"}
    demandDataArray.push(summaryRow);

    return json(demandDataArray);
    // json(demandData);
}

async function executeMPSQuery() {
    try {
        await poolConnect; // Wait for the connection to be established
    
        const request = pool.request();
        const query = (`
        SELECT 
        platform, 
        PartNum, 
        safetystock, 
        tool, 
        toolqty, 
        line, 
        CONVERT(varchar(10), [RequestDate], 101) AS [RequestDate],
        [OrderQty]
        FROM [dbo].mpsdemand mps
      `);
  
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

// async function executeDemandQuery() {
//     try {
//         await poolConnect; // Wait for the connection to be established
    
//         const request = pool.request();
//         const query = `
//         SELECT [Company], [PartNum], [Plant], [DueDate], [ProdQty]
//         FROM [dbo].[MPSSample]
//         `;
//         const result = await request.query(query);
    
//         console.log(result.recordset); // Output the query result to the console or process it as needed

//         return result.recordset;

//     } catch (error) {
//         console.error('Error executing SQL query:', error);
//     } finally {
//         pool.close(); // Close the connection pool when you're done using it

//         // The pool will only close when an error has occurred

//         console.log("Pool successfully closed")
//     }
// }