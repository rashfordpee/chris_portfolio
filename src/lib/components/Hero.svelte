<script lang="ts">
	import { founder } from '$lib/founder.config';
	import SocialStrip from './SocialStrip.svelte';
</script>

<figure class="hero">
	<img
		class="hero-image"
		src={founder.portrait.src}
		alt={founder.portrait.alt}
		loading="eager"
		fetchpriority="high"
	/>
	<figcaption class="hero-caption">
		<div class="hero-scrim" aria-hidden="true"></div>
		<div class="hero-content">
			<div class="hero-copy">
				<p class="font-editorial hero-eyebrow">{founder.title}</p>
				<h1 class="font-editorial hero-name">{founder.name}</h1>
				<p class="hero-thesis">{founder.thesis}</p>
				<div class="hero-socials">
					<SocialStrip variant="on-image" />
				</div>
			</div>
		</div>
	</figcaption>
</figure>

<style>
	.hero {
		position: relative;
		width: 100%;
		height: 70vh;
		overflow: hidden;
		background: var(--sida-surface-canvas);
	}

	.hero-image {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
	}

	.hero-caption {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 2;
		min-height: 60%;
		padding-bottom: 2rem;
	}

	.hero-scrim {
		position: absolute;
		inset: 0;
		z-index: 1;
		min-height: 60%;
		background: linear-gradient(
			to top,
			rgba(15, 15, 15, 0.95) 0%,
			rgba(15, 15, 15, 0.7) 40%,
			transparent 100%
		);
		pointer-events: none;
	}

	.hero-content {
		position: relative;
		z-index: 2;
		width: 100%;
		max-width: 76rem;
		margin-inline: auto;
		padding: 0 var(--sida-page-gutter-mobile);
	}

	.hero-copy {
		max-width: min(100%, 60rem);
		animation: hero-copy-rise var(--sida-duration-slow) var(--sida-ease-decelerate) both;
	}

	.hero-eyebrow {
		margin-top: 8px;
		color: rgba(255, 255, 255, 0.82);
		font-size: var(--sida-font-size-xs, 0.75rem);
		font-weight: 500;
		letter-spacing: 0.16em;
		text-transform: uppercase;
	}

	.hero-name {
		margin-top: var(--sida-space-2);
		color: #eceef2;
		font-size: clamp(3rem, 9vw, 5.5rem);
		font-weight: 500;
		line-height: 0.95;
		letter-spacing: -0.03em;
		text-wrap: balance;
	}

	.hero-thesis {
		margin-top: var(--sida-space-3);
		max-width: 34ch;
		color: #e6e8ec;
		font-size: 1.125rem;
		line-height: 1.6;
		text-wrap: pretty;
	}

	.hero-socials {
		margin-top: var(--sida-space-4);
	}

	@keyframes hero-copy-rise {
		from {
			opacity: 0;
			transform: translateY(1.25rem);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (min-width: 768px) {
		.hero {
			height: min(88vh, 900px);
		}

		.hero-content {
			padding: 0 var(--sida-space-8);
		}

		.hero-thesis {
			font-size: 1.25rem;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.hero-copy {
			animation: none;
		}
	}
</style>
