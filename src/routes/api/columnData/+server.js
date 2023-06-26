import { json } from '@sveltejs/kit'

export const GET = async () => {
    
    let currentDate = new Date();  // Get the current date

    let dateArray = [
        {
            title: 'Platform',
            type: 'text',
            data: 'Platform',
            renderer: 'negativeValueRenderer'
        },
        {
            title: 'Part Number',
            type: 'text',
            data: 'PartNum',
            renderer: 'negativeValueRenderer'
        },
        {
            title: 'Tool #',
            type: 'text',
            data: 'ToolNumber',
            renderer: 'priceRenderer'
        },
        {
            title: 'Tool Qty',
            type: 'numeric',
            data: 'ToolQty',
            renderer: 'negativeValueRenderer'
        },
        {
            title: 'Tool Capacity',
            type: 'numeric',
            data: 'toolCapacity',
            renderer: 'negativeValueRenderer'
        },
        {
            title: 'Safety Stock',
            type: 'numeric',
            data: 'SafetyStock',
            renderer: 'negativeValueRenderer'
        }
    ];

    for (let i = 0; i < 365; i++) {
        let nextDate = new Date(currentDate);  // Create a new date object based on the current date
        nextDate.setDate(currentDate.getDate() + i);  // Increment the date by i days

        // Format the date as 'mm/dd/yyyy'
        let formattedDate = `${(nextDate.getMonth() + 1).toString().padStart(2, '0')}/${nextDate.getDate().toString().padStart(2, '0')}/${nextDate.getFullYear()}`;

        // Create the object with the date
        let dateObject = {
            title: formattedDate,
            type: 'numeric',
            data: formattedDate,
            className: 'htCenter',
            renderer: 'negativeValueRenderer'
        }   
        
        dateArray.push(dateObject);  // Add the object to the array
   
    };

    console.log(dateArray);

    return json(dateArray);
}