<script lang="ts">
	import { founder } from '$lib/founder.config';
	import Hero from '$lib/components/Hero.svelte';
	import BentoGrid from '$lib/components/BentoGrid.svelte';
	import FloatingActions from '$lib/components/FloatingActions.svelte';
	import SiteFooter from '$lib/components/SiteFooter.svelte';
</script>

<svelte:head>
	<title>{founder.name} - {founder.title}</title>
	<meta name="description" content={founder.thesis} />
</svelte:head>

<main class="min-h-dvh pb-[120px]">
	<Hero />

	<div class="mx-auto w-full max-w-[76rem] px-gutter md:px-8">
		<section class="pt-14 md:pt-20">
			<BentoGrid items={founder.bentoItems} />
		</section>

		<SiteFooter />
	</div>
</main>

<FloatingActions />
