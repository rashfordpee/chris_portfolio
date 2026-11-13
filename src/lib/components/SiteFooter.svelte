<script lang="ts">
	import { founder } from '$lib/founder.config';

	const attributionHref =
		'url' in founder.attribution && typeof founder.attribution.url === 'string'
			? founder.attribution.url
			: `https://wa.me/${founder.attribution.whatsapp.replace(/\D/g, '')}`;
</script>

<footer class="mt-16 border-t border-line-subtle py-6 md:py-8">
	<p class="text-sm text-ink-tertiary">
		{founder.labels.attributionPrefix}
		<a class="attribution-link" href={attributionHref}>{founder.attribution.name}</a>
	</p>
</footer>

<style>
	.attribution-link {
		color: inherit;
		text-decoration: underline;
		text-underline-offset: 4px;
		transition: color var(--sida-duration-fast) var(--sida-ease-standard);
	}

	.attribution-link:hover {
		color: var(--sida-product-accent-text);
	}

	.attribution-link:focus-visible {
		outline: var(--sida-focus-ring-width) solid var(--sida-focus-ring);
		outline-offset: var(--sida-focus-ring-offset);
	}

	@media (prefers-reduced-motion: reduce) {
		.attribution-link {
			transition: none;
		}
	}
</style>
