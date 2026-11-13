<script lang="ts">
	import { Pill } from '@rashfordpee/youreka-sida';
	import type { BentoItem } from '$lib/founder.config';
	import ImageWithCaption from './ImageWithCaption.svelte';

	let { item }: { item: BentoItem } = $props();
</script>

<article
	class="bento-tile {item.span} {item.bgClass}"
	class:dark-text={item.darkText}
	data-variant={item.variant}
>
	<a class="bento-link" href={`/${item.id}`} aria-label={item.title ?? item.id}>
		{#if item.tag}
			<span class="card-tag">{item.tag}</span>
		{/if}

		{#if item.variant === 'image'}
			<ImageWithCaption src={item.image} alt={item.imageAlt} />
			<div class="tile-scrim" aria-hidden="true"></div>
			<div class="tile-content">
				{#if item.metric}
					<Pill tone="accent" size="sm">{item.metric}</Pill>
				{/if}
				<h3 class="font-editorial tile-title">{item.title}</h3>
				<p class="tile-description">{item.description}</p>
			</div>
		{:else if item.variant === 'metric'}
			<div class="card-content metric-content">
				{#if item.title}
					<h3 class="font-editorial card-title">{item.title}</h3>
				{/if}
				<div class="metric-body">
					<p class="font-editorial metric-value">{item.value}</p>
					<p class="metric-label">{item.label}</p>
				</div>
			</div>
		{:else if item.variant === 'list'}
			<div class="card-content">
				<h3 class="font-editorial card-title">{item.title}</h3>
				<ul class="item-list">
					{#each item.items as entry (entry)}
						<li>{entry}</li>
					{/each}
				</ul>
			</div>
		{:else}
			<div class="card-content text-content">
				<h3 class="font-editorial card-title">{item.title}</h3>
				<p class="card-description">{item.description}</p>
			</div>
		{/if}
	</a>
</article>

<style>
	.bento-tile {
		position: relative;
		min-width: 0;
		min-height: 15rem;
		overflow: hidden;
		isolation: isolate;
		border: 1px solid transparent;
		border-radius: var(--sida-radius-lg);
		color: var(--sida-text-primary);
		transition:
			border-color var(--sida-duration-fast) var(--sida-ease-standard),
			filter var(--sida-duration-fast) var(--sida-ease-standard);
	}

	.bento-tile[data-variant='image'] {
		min-height: 26rem;
	}

	.bento-link {
		position: absolute;
		inset: -1px;
		display: block;
		border-radius: inherit;
		color: inherit;
		text-decoration: none;
	}

	.bento-link:focus-visible {
		outline-offset: -2px;
	}

	.tile-scrim {
		position: absolute;
		inset: 0;
		z-index: 1;
		background: linear-gradient(
			to top,
			rgba(15, 15, 15, 1) 0%,
			rgba(15, 15, 15, 0.9) 25%,
			transparent 55%
		);
		pointer-events: none;
	}

	.tile-content {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 2;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: var(--sida-space-2);
		padding: var(--sida-space-4) var(--sida-space-4) 2rem;
	}

	.tile-title,
	.card-title {
		display: -webkit-box;
		overflow: hidden;
		color: var(--sida-text-primary);
		font-size: clamp(1.5rem, 3vw, 2.5rem);
		font-weight: 500;
		line-height: 1.05;
		text-wrap: balance;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		line-clamp: 2;
	}

	.tile-title {
		color: #fff;
	}

	.tile-description {
		max-width: 34ch;
		color: rgba(255, 255, 255, 0.8);
		font-size: 0.875rem;
		line-height: 1.5;
	}

	.card-content {
		position: relative;
		z-index: 1;
		display: flex;
		flex-direction: column;
		gap: var(--sida-space-4);
		height: 100%;
		padding: var(--sida-space-5);
	}

	.metric-content {
		justify-content: space-between;
	}

	.metric-body {
		display: flex;
		flex-direction: column;
		gap: var(--sida-space-2);
	}

	.metric-value {
		color: var(--sida-text-primary);
		font-size: clamp(3rem, 6vw, 5rem);
		font-weight: 500;
		line-height: 0.9;
		letter-spacing: -0.03em;
	}

	.metric-label {
		color: var(--sida-text-secondary);
		font-size: 0.875rem;
		line-height: 1.4;
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	.text-content {
		justify-content: flex-start;
	}

	.card-description {
		max-width: 36ch;
		color: var(--sida-text-secondary);
		font-size: 0.875rem;
		line-height: 1.6;
		text-wrap: pretty;
	}

	.item-list {
		display: flex;
		flex-direction: column;
		gap: var(--sida-space-2);
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.item-list li {
		display: flex;
		gap: var(--sida-space-2);
		align-items: baseline;
		color: var(--sida-text-secondary);
		font-size: 0.875rem;
		line-height: 1.45;
	}

	.item-list li::before {
		flex: none;
		width: 0.4rem;
		height: 0.4rem;
		border-radius: 999px;
		background: var(--sida-product-accent);
		content: '';
	}

	.bento-tile[data-variant='metric']::before,
	.bento-tile[data-variant='list']::before {
		position: absolute;
		inset: 0;
		z-index: 0;
		background: #fff;
		opacity: 0;
		content: '';
		pointer-events: none;
		transition: opacity var(--sida-duration-fast) var(--sida-ease-standard);
	}

	.dark-text,
	.dark-text .card-title,
	.dark-text .card-description,
	.dark-text .metric-value,
	.dark-text .metric-label,
	.dark-text .item-list li {
		color: #0f0f0f;
	}

	.dark-text .item-list li::before {
		background: #0f0f0f;
	}

	@media (hover: hover) {
		.bento-tile[data-variant='metric']:hover::before,
		.bento-tile[data-variant='list']:hover::before {
			opacity: 0.045;
		}

		.bento-tile[data-variant='text']:hover {
			border-color: var(--sida-product-accent);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.bento-tile,
		.bento-tile[data-variant='metric']::before,
		.bento-tile[data-variant='list']::before {
			transition: none;
		}
	}
</style>
