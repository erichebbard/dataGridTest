
<script>

    import { onMount } from 'svelte';
    import '/node_modules/handsontable/dist/handsontable.full.min.css'
    
    export let mpsData;
    export let columns;
    console.log(mpsData);
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
        
        let toolCapacity = mpsData[row];
        // console.log(toolQuantity);
        
        // if the row contains a negative number
        if (parseFloat(value, 10) > toolCapacity) {

            // add class 'make-me-red'
            td.style.background = 'red';
        }
        
        // console.log(parseFloat(value, 10))
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
        
        console.log("Good!")
        
        // maps function to a lookup string
        // The registerRenderer method is used in the browser environment and may not be available during server-side rendering (SSR) or in non-browser environments where the navigator object is not defined.
        // move the registration of the custom renderer inside the gridInit function, which will ensure it is executed in the browser environment. 
        Handsontable.renderers.registerRenderer('negativeValueRenderer', negativeValueRenderer);
        Handsontable.renderers.registerRenderer('priceRenderer', priceRenderer);

        

        try {

            new Handsontable(node, {
                data:mpsData,
                columns:columns,
                width: '100%',
                height: '200px',
                colHeaders: true,
                rowHeaders: false,
                colWidths: 100,
                columnSorting: true,
                filters: true,
                dropdownMenu: true,
                // manualColumnResize: true,
                licenseKey: "non-commercial-and-evaluation",
                cells(row, col) {
                    const cellProperties = {};
                    // const data = this.instance.getData(); // This makes it EXTREMELY slow... Hopefully we don't need to use it! 

                    if (col > 5) {
                        cellProperties.renderer = 'priceRenderer'; // uses lookup map
                    }
                    
                    return cellProperties;
                },

                
                // set the `columnSummary` configuration option to a function
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
                }
    
                // afterSelection(row, col, row2, col2) {
                //     const meta = this.getCellMeta(row2, col2);
    
                //     if (meta.readOnly) {
                //     this.updateSettings({fillHandle: false});
    
                //     } else {
                //     this.updateSettings({fillHandle: true});
                //     }
                // },
                // cells(row, col) {
                //     const cellProperties = {};
                //     const data = this.instance.getData();
    
                //     if (row === 0 || data[row] && data[row][col] === 'readOnly') {
                //     cellProperties.readOnly = true; // make cell read-only if it is first row or the text reads 'readOnly'
                //     }
    
                //     // if (row === 0) {
                //     // cellProperties.renderer = firstRowRenderer; // uses function directly
    
                //     // }
                //     // } else {
                //     // cellProperties.renderer = 'priceRenderer'; // uses lookup map
                //     // }
    
                //     if (col > 5) {
                //         cellProperties.renderer = 'priceRenderer';
                //     }
    
                //     return cellProperties;
                // }
            });

        } catch (error) {
            console.log('Handsontable initialization error:', error);
        }
    }

</script>


<!-- <div use:gridInit></div> -->

{#if isPageReady}
	<div use:gridInit></div>
{/if}