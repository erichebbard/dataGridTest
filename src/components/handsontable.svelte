<svelte:head>
	<script src="node_modules/handsontable/dist/handsontable.full.min.js"
				on:load={() => isScriptLoaded = true} />
	<link href="node_modules/handsontable/dist/handsontable.full.min.css" rel="stylesheet" media="screen" 
				on:load={() => isStyleLoaded = true} />
</svelte:head>

<script>
	export let data;
    export let columns;

	let isScriptLoaded = false;
	let isStyleLoaded = false;
	let isPageReady = false;
	$: isPageReady = isScriptLoaded && isStyleLoaded;

	function gridInit(node) {
		new Handsontable(node, {
            data:data,
            columns:columns,
            width: '100%',
            height: 'auto',
            colHeaders: true,
            rowHeaders: true,
            colWidths: 100,
            columnSorting: true,
            manualColumnResize: true,
			licenseKey: "non-commercial-and-evaluation"
		});
	}
</script>


<div use:gridInit></div>