
<script>
	import MpsTable from '/src/components/mpsTable.svelte'
    import DemandTable from '/src/components/demandTable.svelte'

    export let data;

    // console.log(data.grid);
    // console.log(data.columns);
    // console.log(data.demand);

    // let demandData = data.demand
    // let mpsData = data.mps
    let columns = data.columns

    let demandData = data.fixedDemand
    let mpsData = data.fixedMPS
    
</script>

<span>Grid is here:</span>
<DemandTable {demandData} {columns}/>
<MpsTable {mpsData} {columns}/>

<br>
<br>
<div> production days that are producing over the tool capacity will be highlighted red </div>