import { json } from '@sveltejs/kit'
import { formatPostcssSourceMap } from 'vite';

export const GET = async () => {
    
    let currentDate = new Date();  // Get the current date

    let dateArray = [
        {
            title: 'Platform',
            type: 'text',
            data: 'platform',
            renderer: 'negativeValueRenderer'
        },
        {
            title: 'Part Number',
            type: 'text',
            data: 'partNum',
            renderer: 'negativeValueRenderer'
        },
        {
            title: 'Tool #',
            type: 'text',
            data: 'toolNumber',
            renderer: 'priceRenderer'
        },
        {
            title: 'Tool Qty',
            type: 'numeric',
            data: 'toolQty',
            renderer: 'negativeValueRenderer'
        },
        {
            title: 'Total Capacity',
            type: 'numeric',
            data: 'toolCapacity',
            renderer: 'negativeValueRenderer'
        },
        {
            title: 'Safety Stock',
            type: 'numeric',
            data: 'safetyStock',
            renderer: 'negativeValueRenderer'
        }
    ];

    for (let i = 0; i < 365; i++) {
        let nextDate = new Date(currentDate);  // Create a new date object based on the current date
        nextDate.setDate(currentDate.getDate() + i);  // Increment the date by i days

        // Format the date as 'mm/dd/yyyy /n Weekday'
        let formattedDate = `<span>${(nextDate.getMonth() + 1).toString().padStart(2, '0')}/${nextDate.getDate().toString().padStart(2, '0')}/${nextDate.getFullYear()}<br/>(${getDayOfWeek(nextDate)})</span>`;

        // Format the date as 'mm/dd/yyyy'
        let dataformattedDate = `${(nextDate.getMonth() + 1).toString().padStart(2, '0')}/${nextDate.getDate().toString().padStart(2, '0')}/${nextDate.getFullYear()}`;
        
        // Create the object with the date
        let dateObject = {
            title: formattedDate,
            type: 'numeric',
            data: dataformattedDate,
            className: 'htCenter',
            renderer: 'negativeValueRenderer'
        }
        
        dateArray.push(dateObject);  // Add the object to the array
   
    };

    // console.log(dateArray);

    return json(dateArray);
}

// Function to get the day of the week
function getDayOfWeek(date) {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return daysOfWeek[date.getDay()];
  }
  