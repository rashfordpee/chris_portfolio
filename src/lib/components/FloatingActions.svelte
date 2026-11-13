<script lang="ts">
	import SaveContactButton from './SaveContactButton.svelte';
	import QrDialog from './QrDialog.svelte';
</script>

<div class="floating-actions">
	<SaveContactButton />
	<QrDialog />
</div>

<style>
	.floating-actions {
		position: fixed;
		bottom: 2rem;
		left: 50%;
		z-index: 50;
		display: flex;
		gap: 1rem;
		align-items: center;
		flex-wrap: nowrap;
		width: max-content;
		max-width: 90vw;
		padding: 0.5rem;
		border: 1px solid rgba(255, 255, 255, 0.12);
		border-radius: calc(var(--sida-radius-md) * 2);
		background: rgba(15, 15, 15, 0.78);
		box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35);
		transform: translateX(-50%);
		-webkit-backdrop-filter: blur(14px);
		backdrop-filter: blur(14px);
	}

	.floating-actions :global(.sidas-btn) {
		flex: 0 0 auto;
	}

	@media (max-width: 360px) {
		.floating-actions {
			gap: 0.5rem;
			padding: 0.375rem;
		}
	}
</style>
