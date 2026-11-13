<script lang="ts">
	import { QrCode } from 'lucide-svelte';

	let { size = 24 }: { size?: number } = $props();
</script>

<QrCode {size} aria-hidden="true" />
