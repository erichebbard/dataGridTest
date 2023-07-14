
<script>
	import MpsTable from '/src/components/mpsTable.svelte'
    import DemandTable from '/src/components/demandTable.svelte'
    import GridTable from '/src/components/gridTable.svelte'
    import UploadMpsButton from '/src/components/uploadMpsButton.svelte';
    import FilterListbox from '/src/components/filterListbox.svelte';
    import DropdownFilter from '/src/components/dropdownFilter.svelte';

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
    // let exceptionColumns = data.exceptionColumns;
    let exceptionColumns = data.fixedExceptions;

    let demandData = data.fixedDemand;
    let mpsData = data.fixedMPS;
    let filterData = data.fixedFilter;

    let selectedOptions = [];


    // the below needs to be reactive since it gets initialized once then won't get initialized again
    // until there is a change to the array... I've also tested this, and the array will only get 
    // initialized **once** at the end of the gridInit() function, therefore the isDemandTableInit value
    // won't pass a partially complete array
    $: isDemandTableInit = salesOrderReturnArray.length > 0
    $: isMpsTableInit = mpsReturnArray.length > 0



    function handlePlatformSelection(event) {
        selectedOptions = event.detail;

        console.log("Platform", selectedOptions);

        // soFilterPlugin.addCondition(1, 'by_value', filterList);;
        // soFilterPlugin.filter();
    }

    function handleToolSelection(event) {
        selectedOptions = event.detail;

        console.log("Tool", selectedOptions);
        // soFilterPlugin.addCondition(1, 'by_value', filterList);;
        // soFilterPlugin.filter();
    }

    

    function handlePlatformFilter() {
        
        // const filterList = [['5A3223-4', '416T2155-2', '416U6030-14']]; // move this to function inputs when you are ready

        // soFilterPlugin.addCondition(1, 'by_value', filterList);;
        // soFilterPlugin.filter();

        // mpsFilterPlugin.addCondition(1, 'by_value', filterList);;
        // mpsFilterPlugin.filter();

    }

</script>

{#if isDemandTableInit && isMpsTableInit} 
    <UploadMpsButton/>
    <div class='py-5 px-10 flex-3 flex-col columns-3'>
        <!-- <FilterListbox/>
        <FilterListbox/>
        <FilterListbox/> -->
        
        <DropdownFilter on:selection={handlePlatformSelection} title='Filter By Platform'/>
        <DropdownFilter on:selection={handleToolSelection} title='Filter By Tool'/>

        <p>Selected options: {selectedOptions.join(', ')}</p>

    </div>
    <div> Both tables loaded successfully!</div>
{/if}

<div class='py-10 px-10'>
    <GridTable data={demandData} {columns} bind:filtersPlugin={soFilterPlugin} bind:returnArray={salesOrderReturnArray} compareArray={[]} isReadOnly=true exceptionColumns={exceptionColumns} />
</div>

<div class='py-10 px-10'>
    <!-- make sure that the sales order grid is initialized first, so that you can actually get the return array -->
    {#if isDemandTableInit} 
        <GridTable data={mpsData} {columns} bind:filtersPlugin={mpsFilterPlugin} bind:returnArray={mpsReturnArray} compareArray={salesOrderReturnArray} isReadOnly=false exceptionColumns={exceptionColumns} />
    {/if}
</div>


<!-- <div>
    <button on:click={handleFilter}>Filter</button>
    <button on:click={handleFilter}>Unfilter</button>
</div> -->

<br>
<br>
<div> production days that are producing over the tool capacity will be highlighted red </div>