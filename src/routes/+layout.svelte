<script lang="ts">
	import '../app.css';
	import { browser } from '$app/environment';
	import { sidaSettings } from '@rashfordpee/youreka-sida';
	import favicon from '#lib/assets/favicon.svg';
	import type { LayoutProps } from './$types';

	if (browser) {
		sidaSettings.update((settings) => ({ ...settings, theme: 'light', product: 'founder' }));
	}

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
