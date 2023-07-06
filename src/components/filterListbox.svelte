<script lang='ts'>
    import { Autocomplete, InputChip } from '@skeletonlabs/skeleton';
    import type { AutocompleteOption } from '@skeletonlabs/skeleton';

    const flavorOptions: AutocompleteOption[] = [
		{ label: 'Vanilla', value: 'vanilla'},
		{ label: 'Chocolate', value: 'chocolate'},
		{ label: 'Strawberry', value: 'strawberry', keywords: 'fruit', meta: { healthy: true } },
		{ label: 'Neapolitan', value: 'neapolitan', keywords: 'mix, strawberry, chocolate, vanilla', meta: { healthy: false } },
		{ label: 'Pineapple', value: 'pineapple', keywords: 'fruit', meta: { healthy: true } },
		{ label: 'Peach', value: 'peach', keywords: 'fruit', meta: { healthy: true } }
	];

    let inputChip = '';
    let inputChipList: string[] = ['vanilla', 'chocolate'];

    function onInputChipSelect(event: any): void {
		console.log('onInputChipSelect', event.detail);
		if (inputChipList.includes(event.detail.value) === false) {
			inputChipList = [...inputChipList, event.detail.value];
			inputChip = '';
		}
	}
</script>

<div>
    
    <div class="card w-full max-w-lg max-h-96 p-4 overflow-y-auto" tabindex="-1">
        <span class="h3">Filter: Platform</span>
        <InputChip bind:input={inputChip} bind:value={inputChipList} name="chips" />
        <Autocomplete
            bind:input={inputChip}
            options={flavorOptions}
            denylist={inputChipList}
            on:selection={onInputChipSelect}
        />
    </div>
</div>

					