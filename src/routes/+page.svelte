
<script>
	import MpsTable from '/src/components/mpsTable.svelte'
    import DemandTable from '/src/components/demandTable.svelte'
    import GridTable from '/src/components/gridTable.svelte'

    export let data;

    let salesOrderReturnArray = [];
    let mpsReturnArray = [];

    let soFilterPlugin;
    let mpsFilterPlugin;

    // console.log(data.grid);
    // console.log(data.columns);
    // console.log(data.demand);

    // let demandData = data.demand
    // let mpsData = data.mps
    let columns = data.columns;
    // let filterData = data.filter;

    let demandData = data.fixedDemand;
    let mpsData = data.fixedMPS;
    let filterData = data.fixedFilter;

    // the below needs to be reactive since it gets initialized once then won't get initialized again
    // until there is a change to the array... I've also tested this, and the array will only get 
    // initialized **once** at the end of the gridInit() function, therefore the isDemandTableInit value
    // won't pass a partially complete array
    $: isDemandTableInit = salesOrderReturnArray.length > 0
    $: isMpsTableInit = mpsReturnArray.length > 0

    function handleFilter() {
        soFilterPlugin.addCondition(1, 'eq', ['5A3223-4']);;
        soFilterPlugin.filter();

        mpsFilterPlugin.addCondition(1, 'eq', ['5A3223-4']);;
        mpsFilterPlugin.filter();

    }


    
</script>

{#if isDemandTableInit && isMpsTableInit} 
    <div> Both tables loaded successfully!</div>>
{/if}

<span>Grid is here:</span>
<GridTable data={demandData} {columns} bind:filtersPlugin={soFilterPlugin} bind:returnArray={salesOrderReturnArray} compareArray={salesOrderReturnArray} isReadOnly=true/>

<!-- make sure that the sales order grid is initialized first, so that you can actually get the return array -->
{#if isDemandTableInit} 
    <GridTable data={mpsData} {columns} bind:filtersPlugin={mpsFilterPlugin} bind:returnArray={mpsReturnArray} compareArray={salesOrderReturnArray} isReadOnly=false/>
{/if}

<div>
    <button on:click={handleFilter}>Filter</button>
    <button on:click={handleFilter}>Unfilter</button>
</div>

<div></div>

<br>
<br>
<div> production days that are producing over the tool capacity will be highlighted red </div>