<script lang="ts">
	import { ArrowLeft } from 'lucide-svelte';
	import { founder, type BentoItem } from '$lib/founder.config';
	import FloatingActions from '$lib/components/FloatingActions.svelte';
	import ImageWithCaption from '$lib/components/ImageWithCaption.svelte';
	import SiteFooter from '$lib/components/SiteFooter.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const item = $derived(data.item as BentoItem);
</script>

<svelte:head>
	<title>{item.title ?? item.id} - {founder.name}</title>
	<meta
		name="description"
		content={item.variant === 'image' ? item.description : founder.thesis}
	/>
</svelte:head>

<main class="detail-page min-h-dvh pb-[120px]">
	<a class="back-link" href="/">
		<ArrowLeft size={16} aria-hidden="true" />
		<span>Back to profile</span>
	</a>

	{#if item.variant === 'image'}
		<header class="detail-hero">
			<img class="detail-hero-image" src={item.image} alt={item.imageAlt} />
			<div class="detail-scrim" aria-hidden="true"></div>
			<h1 class="font-editorial detail-title">{item.title}</h1>
		</header>

		<div class="detail-body">
			{#if item.tag}
				<span class="card-tag detail-body-tag">{item.tag}</span>
			{/if}
			<p class="detail-intro">{item.description}</p>

			{#if item.metric}
				<p class="font-editorial detail-metric">{item.metric}</p>
			{/if}

			{#if item.detailImages?.length}
				<section class="detail-gallery" aria-labelledby="detail-gallery-heading">
					<h2 id="detail-gallery-heading" class="font-editorial detail-gallery-heading">
						Inside {item.title}
					</h2>
					<div class="detail-gallery-grid">
						{#each item.detailImages as image (image.src)}
							<ImageWithCaption
								class="detail-gallery-item {image.span}"
								src={image.src}
								alt={image.alt}
							/>
						{/each}
					</div>
				</section>
			{/if}

			<SiteFooter />
		</div>
	{/if}
</main>

<FloatingActions />

<style>
	.detail-page {
		background: var(--sida-surface-canvas);
	}

	.back-link {
		position: fixed;
		top: 1rem;
		left: var(--sida-page-gutter-mobile);
		z-index: 60;
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 0.875rem;
		border: 1px solid var(--sida-border-default);
		border-radius: var(--sida-radius-full);
		background: color-mix(in srgb, var(--sida-surface-elevated) 88%, transparent);
		color: var(--sida-text-primary);
		font-size: 0.875rem;
		font-weight: 500;
		text-decoration: none;
		box-shadow: 0 4px 16px rgba(17, 17, 17, 0.08);
		-webkit-backdrop-filter: blur(8px);
		backdrop-filter: blur(8px);
		transition:
			background-color var(--sida-duration-fast) var(--sida-ease-standard),
			border-color var(--sida-duration-fast) var(--sida-ease-standard),
			color var(--sida-duration-fast) var(--sida-ease-standard);
	}

	.back-link :global(svg) {
		flex: none;
	}

	.back-link:hover {
		border-color: var(--sida-product-accent);
		background: var(--sida-product-accent);
		color: var(--sida-product-accent-contrast);
	}

	.back-link:focus-visible {
		outline: var(--sida-focus-ring-width) solid var(--sida-focus-ring);
		outline-offset: var(--sida-focus-ring-offset);
	}

	.detail-hero {
		position: relative;
		width: 100%;
		height: 50vh;
		overflow: hidden;
		background: #0f0f0f;
	}

	.detail-hero-image {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
	}

	.detail-scrim {
		position: absolute;
		inset: 0;
		background: linear-gradient(to top, rgba(15, 15, 15, 0.95) 0%, transparent 60%);
		pointer-events: none;
	}

	.detail-body-tag {
		position: static;
		display: inline-block;
		margin-bottom: 1rem;
	}

	.detail-title {
		position: absolute;
		right: var(--sida-page-gutter-mobile);
		bottom: 2rem;
		left: var(--sida-page-gutter-mobile);
		z-index: 2;
		color: #fff;
		font-size: clamp(2rem, 5vw, 4rem);
		font-weight: 500;
		line-height: 1.05;
		text-wrap: balance;
	}

	.detail-body {
		width: 100%;
		max-width: 76rem;
		margin-inline: auto;
		padding-top: 4rem;
		padding-inline: var(--sida-page-gutter-mobile);
	}

	.detail-intro {
		max-width: 65ch;
		margin: 0;
		padding-block: 0 4rem;
		color: var(--sida-text-primary);
		font-size: 1.125rem;
		line-height: 1.7;
		text-wrap: pretty;
	}

	.detail-metric {
		margin: 0 0 4rem;
		color: var(--sida-text-primary);
		font-size: clamp(3rem, 6vw, 5rem);
		font-weight: 500;
		line-height: 0.95;
		letter-spacing: -0.03em;
	}

	.detail-gallery {
		padding-bottom: 4rem;
	}

	.detail-gallery-heading {
		margin: 0 0 var(--sida-space-6);
		color: var(--sida-text-primary);
		font-size: clamp(1.75rem, 3vw, 2.25rem);
		font-weight: 500;
		line-height: 1.05;
	}

	.detail-gallery-grid {
		display: grid;
		grid-template-columns: 1fr;
		grid-auto-rows: 16rem;
		gap: var(--sida-space-4);
	}

	@media (min-width: 768px) {
		.back-link {
			left: var(--sida-space-8);
		}

		.detail-hero {
			height: 60vh;
		}

		.detail-title {
			right: var(--sida-space-8);
			bottom: var(--sida-space-8);
			left: var(--sida-space-8);
		}

		.detail-body {
			padding-inline: var(--sida-space-8);
		}

		.detail-gallery-grid {
			grid-template-columns: repeat(3, 1fr);
			grid-auto-rows: 20rem;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.back-link {
			transition: none;
		}
	}
</style>
