<script>

    import { onMount } from 'svelte';
    import '/node_modules/handsontable/dist/handsontable.full.min.css'
    
    export let data;
    export let columns;
    export let returnArray = [];
    export let exceptionColumns = [];
    export let filtersPlugin;
    let hotInstance; // binded
    // export let compareArray = [];
    // export let isReadOnly = false;
    // export let isFormatted = true; 
    
    
    // export let isTableInit;
    // console.log(data);
    let isScriptLoaded = false;
    let isStyleLoaded = false;
    let isPageReady = false;
    $: isPageReady = isScriptLoaded && isStyleLoaded;
    
    let Handsontable;

    onMount(() => {
        (async () => {
            const module = await import('handsontable');
            Handsontable = module.default;
            
            isStyleLoaded = true;
            isScriptLoaded = true;
        })();
    });

    let counter = 0;
    let lastRow = data.length-1;


    // *******************************************
    // Initializing the array to highlight
    // non-working days... The border was my 
    // best option since I wouldn't have to 
    // deal with the conditional formatting
    // *******************************************
    const borderArray = [];

    for (let i = 0; i < exceptionColumns.length; i++) {
        const value = exceptionColumns[i];

        borderArray.push({
                range: {
                    from: {
                        row: 0,
                        col: value+1,
                    },
                    to: {
                        row: lastRow,
                        col: value+1,
                    },
                },
                top: {
                    width: 5,
                    color: '#5292F7',
                },
                bottom: {
                    width: 2,
                    color: '#5292F7',
                },
                start: {
                    width: 2,
                    color: '#5292F7',
                },
                end: {
                    width: 2,
                    color: '#5292F7',
                },
            });
    };

    // falsy check before doing anything against potentially undefined Handsontable
    $: Handsontable && console.log(Handsontable);
    
    function firstRowRenderer(instance, td, row, col, prop, value, cellProperties) {
        Handsontable.renderers.TextRenderer.apply(this, arguments);
        td.style.fontWeight = 'bold';
        td.style.color = 'green';
        td.style.background = '#CEC';
    }
    
    function priceRenderer(instance, td, row, col, prop, value, cellProperties) {
        Handsontable.renderers.TextRenderer.apply(this, arguments);

        if (row < lastRow) { // handles the 'Total' row since it returns NULL values if it's empty

            let toolCapacity = data[row].toolCapacity ?? 0;
            let totalProduction = value ?? 0;
            // console.log("row is " + row)
            // console.log("col is " + col)
            // console.log("value is " + totalProduction)
            // console.log(data[row].toolCapacity)
            
            // if production is above capacity
            if (totalProduction > toolCapacity) {
    
                // add class 'make-me-red'
                td.style.background = 'red';
            }
        }
    }
    
    function negativeValueRenderer(instance, td, row, col, prop, value, cellProperties) {
        Handsontable.renderers.TextRenderer.apply(this, arguments);

        // console.log("row is " + row)
        // console.log("col is " + col)
        // console.log("value is " + value)
        // console.log(instance)
        // console.log("prop is " + prop)

        
        // console.log("Counter is " + counter)
        // counter++; 
        
        
        if (!value || value === '') {
            td.style.background = '';
            
        } else {
            if (value === 'Gigabox') {
                td.style.fontStyle = 'italic';
            }
            
            td.style.background = '';
        }
    }
    
    // maps function to a lookup string
    // Handsontable.renderers.registerRenderer('negativeValueRenderer', negativeValueRenderer);
    
    
    
	function gridInit(node) {
        
        // maps function to a lookup string
        // The registerRenderer method is used in the browser environment and may not be available during server-side rendering (SSR) or in non-browser environments where the navigator object is not defined.
        // move the registration of the custom renderer inside the gridInit function, which will ensure it is executed in the browser environment. 
        Handsontable.renderers.registerRenderer('negativeValueRenderer', negativeValueRenderer);
        Handsontable.renderers.registerRenderer('priceRenderer', priceRenderer);
																						 

        
        // initialize the Handsontable instance
        try {

            bind:hotInstance = new Handsontable(node, {
                data:data,
                columns:columns,
                width: '100%',
                height: '200px',
                className: 'custom-table',
                colHeaders: true,
                rowHeaders: false,
                colWidths: 100,
                columnSorting: true,
                filters: true,
                dropdownMenu: true,
                undo: true,
                readOnly: false,
                // manualColumnResize: true,
                licenseKey: "non-commercial-and-evaluation",
                cells(row, col) {
                    const cellProperties = {};
                    // const data = this.instance.getData(); // This makes it EXTREMELY slow... Hopefully we don't need to use it! 
                    
                    // make sure isReadOnly false so that it doesn't start formatting the MPS table
                    if (col > 5) {
                        cellProperties.renderer = 'priceRenderer'; // uses lookup map
                    }
                    
                    return cellProperties;
                },
                customBorders: borderArray,

                // this currently breaks the undo functionality but lets keep using it for now
                columnSummary() {
                    // initialize an array
                    const configArray = [];

                    for (let i = 6; i < this.hot.countCols(); i++) { // iterating over visible columns
                        // for each visible column, add a column summary with a configuration
                        configArray.push({
                            sourceColumn: i,
                            type: 'sum',
                            reversedRowCoords: true,
                            // display the column summary in the bottom row (because of the reversed row coordinates)
                            destinationRow: 0,
                            destinationColumn: i,
                            forceNumeric: true
                        });
                    }
                    return configArray;
                },
                
            });

            bind:filtersPlugin = hotInstance.getPlugin('filters');
            // console.log(filtersPlugin);

            // console.log(node);
            // console.log(hotInstance);

        } catch (error) {
            console.log('Handsontable initialization error:', error);
        }

		bind:returnArray = hotInstance.getData();

    }
    
    function handleUndo() {
        hotInstance.undo();
    }

    function handleRedo() {
        hotInstance.redo();
    }
    
    
    
</script>


<!-- <div use:gridInit></div> -->

{#if isPageReady}

    <div>
        <button on:click={handleUndo}>Undo</button>
        <button on:click={handleRedo}>Redo</button>
    </div>

    <div use:gridInit></div>
{/if}