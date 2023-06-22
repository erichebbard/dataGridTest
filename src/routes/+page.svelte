
<script>
	import Handsontable from '/src/components/handsontable.svelte'

    export let data;

    console.log(data.grid);
    
    // let data = [
    //     {
    //         type: 'Sales Order Demand',
    //         platform: '737',
    //         rowLabels: '213A3210-7',
    //         luLine: "LU280",
    //         toolQty: 2,
    //         safetyStock: 20,
    //         c06232022: 2,
    //         c06242022: 0,
    //         c06272022: 3,
    //     },
    //     {
    //         type: 'Current MPS',
    //         platform: '737',
    //         rowLabels: '213A3210-7',
    //         luLine: "LU280",
    //         toolQty: 2,
    //         safetyStock: 20,
    //         c06232022: 2,
    //         c06242022: 2,
    //         c06272022: 1,
    //     },
    //     {
    //         type: 'NEW MPS Suggestion',
    //         platform: '737',
    //         rowLabels: '213A3210-8',
    //         luLine: "LU280",
    //         toolQty: 2,
    //         safetyStock: 20,
    //         c06232022: 2,
    //         c06242022: 0,
    //         c06272022: 3,
    //     },
    // ];

    // let columns = [
    // {
    //     title: ' ',
    //     type: 'text',
    //     data: 'type',
    //     renderer: 'negativeValueRenderer'
    // },
    // {
    //     title: 'Platform',
    //     type: 'text',
    //     data: 'platform',
    //     renderer: 'negativeValueRenderer'
    // },
    // {
    //     title: 'Row Labels',
    //     type: 'text',
    //     data: 'rowLabels',
    //     renderer: 'negativeValueRenderer'
    // },
    // {
    //     title: 'LU Line',
    //     type: 'text',
    //     data: 'luLine',
    //     renderer: 'priceRenderer'
    // },
    // {
    //     title: 'Tool Qty',
    //     type: 'numeric',
    //     data: 'toolQty',
    //     renderer: 'negativeValueRenderer'
    // },
    // {
    //     title: 'Safety Stock',
    //     type: 'numeric',
    //     data: 'safetyStock',
    //     renderer: 'negativeValueRenderer'
    // },
    // {
    //     title: '06/23/2022',
    //     type: 'numeric',
    //     data: 'c06232022',
    //     className: 'htCenter',
    //     renderer: 'negativeValueRenderer'
    // },
    // {
    //     title: '06/24/2022',
    //     type: 'numeric',
    //     data: 'c06242022',
    //     className: 'htCenter',
    //     renderer: 'negativeValueRenderer'
    // },
    // {
    //     title: '06/27/2022',
    //     type: 'numeric',
    //     data: 'c06272022',
    //     className: 'htCenter',
    //     renderer: 'negativeValueRenderer'
    // },
    // {
    //     title: 'etc',
    //     type: 'numeric',
    //     data: 'etc',
    //     className: 'htCenter',
    //     renderer: 'negativeValueRenderer'
    // },
    // ];

</script>

<!-- <span>Grid is here:</span>
<Handsontable {data} {columns}/>

<br>
<br>
<div> production days that are producing over the tool capacity will be highlighted red </div> -->