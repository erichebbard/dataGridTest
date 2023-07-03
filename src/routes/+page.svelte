
<script>
	import MpsTable from '/src/components/mpsTable.svelte'
    import DemandTable from '/src/components/demandTable.svelte'

    export let data;

    let salesOrderReturnArray = [];

    // console.log(data.grid);
    // console.log(data.columns);
    // console.log(data.demand);

    // let demandData = data.demand
    // let mpsData = data.mps
    let columns = data.columns

    let demandData = data.fixedDemand
    let mpsData = data.fixedMPS

    let isDemandTableInit = false;

    // the below needs to be reactive since it gets initialized once then won't get initialized again
    // until there is a change to the array
    $: isDemandTableInit = salesOrderReturnArray.length > 0
    let isMpsTableInit = false;
    
</script>

<span>Grid is here:</span>
<DemandTable {demandData} {columns} bind:returnArray={salesOrderReturnArray}/>

<!-- make sure that the sales order grid is initialized first, so that you can actually get the return array -->
{#if isDemandTableInit} 
    <MpsTable {mpsData} {columns} compareArray={salesOrderReturnArray}/>
{/if}


<div></div>

<br>
<br>
<div> production days that are producing over the tool capacity will be highlighted red </div>