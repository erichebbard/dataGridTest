
    <script>

        import { onMount } from 'svelte';
        import '/node_modules/handsontable/dist/handsontable.full.min.css'
        
        export let demandData;
        export let columns;
        export let returnArray = [];
        // console.log(demandData);
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

        let lastRow = demandData.length-1;
    
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

            if (row < lastRow) {

                let toolCapacity = demandData[row].toolCapacity ?? 0;
                let totalProduction = value ?? 0;
                // console.log("row is " + row)
                // console.log("col is " + col)
                // console.log("value is " + totalProduction)
                // console.log(mpsData[row].toolCapacity)
                
                // if the row contains a negative number
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
        
        let hotInstance;
        
        function gridInit(node) {

            // maps function to a lookup string
            // The registerRenderer method is used in the browser environment and may not be available during server-side rendering (SSR) or in non-browser environments where the navigator object is not defined.
            // move the registration of the custom renderer inside the gridInit function, which will ensure it is executed in the browser environment. 
            Handsontable.renderers.registerRenderer('negativeValueRenderer', negativeValueRenderer);
            Handsontable.renderers.registerRenderer('priceRenderer', priceRenderer);
            // Handsontable.renderers.registerRenderer('firstRowRenderer', firstRowRenderer);

            
            // initialize the Handsontable instance
            try {

                hotInstance = new Handsontable(node, {
                    data:demandData,
                    columns:columns,
                    width: '100%',
                    height: '200px',
                    colHeaders: true,
                    rowHeaders: false,
                    colWidths: 100,
                    columnSorting: true,
                    filters: true,
                    dropdownMenu: true,
                    renderAllRows: true,
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

                    // ****************************** //
                    // This doesn't actually work so
                    // just wait until you figure it 
                    // out in the future
                    // ****************************** //

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
                });

                // console.log(node);
                // console.log(hotInstance);

                
            } catch (error) {
                console.log('Handsontable initialization error:', error);
            }
            
            // console.log(hotInstance.getData());

            bind:returnArray = hotInstance.getData();
            
            // now that the Handsontable is initialized, we can initialize the subcomponents 
            // try {
            //     undoRedo.enable();
            // } catch (error) {
            //     console.log('Handsontable initialization error:', error);
            // }
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