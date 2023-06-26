// src/routes/api/gridData

import sql from 'mssql'; 
import { sqlConfig } from '../../../lib/utils/db';
import { json } from '@sveltejs/kit'

const pool = new sql.ConnectionPool(sqlConfig);
const poolConnect = pool.connect();

export const GET = async () => {
    
    const mpsData = await executeMPSQuery()
    // const demandData = await executeDemandQuery()

    let mpsDataArray = new Array();


    mpsData.forEach((row) => {
        // console.log(row)

        const PartNum = row.PartNum

        const objIsFound = mpsDataArray.find(row => row.PartNum === PartNum);
        
        // console.log(objIsFound !== undefined); // Output: true

        if (objIsFound === undefined) { //initialize new object and push to array if not found
            const newObj = {
                Platform: "placeholder",
                PartNum: row.PartNum,
                ToolNumber: "placeholder",
                ToolQty: 2,
                toolCapacity: 4,
                SafetyStock: 20
            }
            mpsDataArray.push(newObj);
        }

        // Find the object in the array... You could technically do this in the above if statement, but since it occurs 
        // only once every so many times, the increased performance outweighs the reduced readability.
        const targetObject = mpsDataArray.find(row => row.PartNum === PartNum);

        if (targetObject) {
            targetObject[row.DueDate] = row.ProdQty;
        }

        // console.log(targetObject)

    });

    console.log(mpsDataArray);

    return json(mpsDataArray);
    // json(demandData);
}

async function executeMPSQuery() {
    try {
        await poolConnect; // Wait for the connection to be established
    
        const request = pool.request();
        const query = `
        SELECT 
        [Company], 
        [PartNum], 
        [Plant], 
        CONVERT(varchar(10), [DueDate], 101) AS [DueDate],
        [ProdQty]
        FROM [dbo].[MPSSample]
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