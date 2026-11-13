<script lang="ts">
	import { Info } from 'lucide-svelte';

	let {
		src,
		alt,
		class: klass = ''
	}: {
		src: string;
		alt: string;
		class?: string;
	} = $props();

	let captionOpen = $state(false);

	function toggleCaption(event: MouseEvent) {
		event.preventDefault();
		event.stopPropagation();
		captionOpen = !captionOpen;
	}
</script>

<figure class="image-caption {klass}" class:caption-open={captionOpen}>
	<img {src} {alt} loading="lazy" />
	<button
		class="info-button"
		type="button"
		aria-label="Show image description"
		aria-expanded={captionOpen}
		onclick={toggleCaption}
	>
		<Info size={16} aria-hidden="true" />
	</button>
	<figcaption class="caption" aria-hidden="true">{alt}</figcaption>
</figure>

<style>
	.image-caption {
		position: relative;
		width: 100%;
		height: 100%;
		margin: 0;
		overflow: hidden;
		border-radius: inherit;
		background: transparent;
	}

	.image-caption img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
		transition: transform 400ms var(--sida-ease-standard);
	}

	.info-button {
		position: absolute;
		top: 0.5rem;
		right: 0.5rem;
		z-index: 10;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 2.25rem;
		height: 2.25rem;
		padding: 0;
		border: 0;
		border-radius: var(--sida-radius-full);
		background: transparent;
		color: #fff;
		filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.8));
	}

	.info-button:focus-visible {
		outline: var(--sida-focus-ring-width) solid var(--sida-focus-ring);
		outline-offset: var(--sida-focus-ring-offset);
	}

	.caption {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 9;
		padding: 0.75rem;
		background: rgba(15, 15, 15, 0.78);
		color: #fff;
		font-family: 'IBM Plex Sans Variable', 'IBM Plex Sans', sans-serif;
		font-size: 12px;
		line-height: 1.45;
		text-align: left;
		opacity: 0;
		transform: translateY(100%);
		pointer-events: none;
		-webkit-backdrop-filter: blur(8px);
		backdrop-filter: blur(8px);
		transition:
			transform var(--sida-duration-fast) var(--sida-ease-standard),
			opacity var(--sida-duration-fast) var(--sida-ease-standard);
	}

	@media (hover: hover) {
		.image-caption:hover img {
			transform: scale(1.03);
		}

		.image-caption:hover .caption {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.image-caption.caption-open .caption {
		opacity: 1;
		transform: translateY(0);
	}

	@media (prefers-reduced-motion: reduce) {
		.image-caption img,
		.caption {
			transition: none;
		}

		.image-caption:hover img {
			transform: none;
		}
	}
</style>
