<script>
    import { createEventDispatcher, onMount } from 'svelte';

    export let title; 
    export let filterList = [];
    

    let isOpen = false;
    
    let selectedOptions = [];
    let options = [
      { id: 'deselectAll', label: 'Deselect All' },
      { id: 'selectAll', label: 'Select All' },
      { id: 'MOLD65C33530-11', label: 'MOLD65C33530-11' },
      { id: 'MOLD65C33530-17', label: 'MOLD65C33530-17' },
      { id: 3, label: 'Option 3' },
      { id: 4, label: 'Option 4' },
    ];

    let searchQuery = '';
    let searchedOptions = options;
  
    const dispatch = createEventDispatcher();
  
    function toggleDropdown() {
      isOpen = !isOpen;
    }

    function handleOptionClick(optionId) {
      if (optionId === 'deselectAll') {
        selectedOptions = [];
      } else if (optionId === 'selectAll') {
            bind:selectedOptions = options.filter(option => option.id !== 'deselectAll' && option.id !== 'selectAll').map(option => option.id);
      } else {
        if (selectedOptions.includes(optionId)) {
            bind:selectedOptions = selectedOptions.filter(id => id !== optionId);
        } else {
            bind:selectedOptions = [...selectedOptions, optionId];
        }
      }
    }
  
    function handleApply() {
      dispatch('selection', selectedOptions);
      isOpen = false;
    }

    function filterOptions() {
    if (!searchQuery) {
      searchedOptions = options;
    }
    const searchLower = searchQuery.toLowerCase();
    searchedOptions = options.filter(option => option.label.toLowerCase().includes(searchLower));
  }
 
    // Event listener to close dropdown on click outside
    onMount(() => {
      function handleClickOutside(event) {
        if (!event.target.closest('.dropdown')) {
          isOpen = false;
          handleApply();
            }
        }
  
        window.addEventListener('click', handleClickOutside);

        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    });
</script>  

<style>
    .dropdown {
        position: relative;
        display: inline-block;
        /* z-index: 999; */
    }

    .dropdown-content {
        position: absolute;
        z-index: 999;
        background-color: #fff;
        border: 1px solid #ccc;
        padding: 5px;
        max-height: 200px;
        overflow-y: auto;
    }

    .dropdown-content label input[type="checkbox"] {
        margin-right: 0.5rem;
        margin-left: 0.5rem;
    }

    .dropdown-option {
        display: flex;
        align-items: center;
        cursor: pointer;
    }
</style>

<div class="dropdown outline outline-3 border-tertiary-800 rounded-lg">
  <button on:click={toggleDropdown} class="p-2 bg-primary-600 text-black font-semibold w-48">{title} {isOpen ? '▲' : '▼'}</button>
  {#if isOpen}
  <div class="dropdown-content rounded-md outline outline-1 border-tertiary-800 translate-y-2">
    <div class='pb-1'>
      <input type="text" placeholder="Search..." bind:value={searchQuery} on:input={filterOptions} class="px-2 py-1"/>
    </div>
    {#each searchedOptions as option}
          <div class=' justify-center py-1 px-2 rounded-md hover:bg-primary-300 duration-300 active:bg-primary-500'>

              {#if option.id === 'deselectAll' || option.id === 'selectAll'}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <div class="dropdown-option" on:click={() => handleOptionClick(option.id)}>
                    {option.label}
                </div>
              {:else}
              <!-- svelte-ignore a11y-click-events-have-key-events -->
              <div class="dropdown-option" on:click={() => handleOptionClick(option.id)}>
                <div class='pr-1'>
                  <input type="checkbox" checked={selectedOptions.includes(option.id)}/>
                </div>
                  <span>{option.label}</span>
              </div>
              {/if}
          </div>
      {/each}
      <!-- <button on:click={handleApply}>Apply</button> -->
      </div>
  {/if}
</div>