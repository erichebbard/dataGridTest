<script lang='ts'>
    import { Modal, modalStore } from '@skeletonlabs/skeleton';
    import type { ModalSettings, ModalComponent } from '@skeletonlabs/skeleton';

    
    function modalConfirm(): void {
		const modal: ModalSettings = {
			type: 'confirm',
			title: 'Please Confirm',
			body: 'Are you sure you want to overwrite the current MPS with the modified MPS?',
			response: (r: boolean) => console.log('response:', r)
		};
		modalStore.trigger(modal);
	}

</script>

<button class="btn variant-filled" on:click={modalConfirm}>Upload MPS</button>
<Modal/>
