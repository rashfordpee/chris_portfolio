<script lang="ts">
	import type { BentoItem } from '$lib/founder.config';
	import BentoTile from './BentoTile.svelte';

	let { items }: { items: readonly BentoItem[] } = $props();
</script>

<div class="bento">
	{#each items as item (item.id)}
		<BentoTile {item} />
	{/each}
</div>

<style>
	.bento {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--sida-space-4);
	}

	@media (min-width: 768px) {
		.bento {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (min-width: 1024px) {
		.bento {
			grid-template-columns: repeat(4, 1fr);
			grid-auto-rows: minmax(240px, auto);
		}
	}
</style>
