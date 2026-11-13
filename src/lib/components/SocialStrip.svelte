<script lang="ts">
	import { siInstagram, siWhatsapp } from 'simple-icons';
	import { Mail } from 'lucide-svelte';
	import { founder } from '$lib/founder.config';
	import Icon from './Icon.svelte';
	import LinkedInIcon from './icons/LinkedInIcon.svelte';

	type SocialLink = {
		label: string;
		href: string;
		ariaLabel: string;
		network: 'instagram' | 'whatsapp' | 'linkedin' | 'email';
		path?: string;
		external: boolean;
	};

	let { variant = 'default' }: { variant?: 'default' | 'on-image' } = $props();

	const links: SocialLink[] = [
		{
			label: founder.labels.social.instagram,
			href: `https://instagram.com/${founder.contact.instagram}`,
			ariaLabel: `${founder.labels.social.instagram}: @${founder.contact.instagram}`,
			network: 'instagram',
			path: siInstagram.path,
			external: true
		},
		{
			label: founder.labels.social.whatsapp,
			href: `https://wa.me/${founder.contact.whatsapp}`,
			ariaLabel: `${founder.labels.social.whatsapp}: ${founder.contact.phone}`,
			network: 'whatsapp',
			path: siWhatsapp.path,
			external: true
		},
		{
			label: founder.labels.social.linkedin,
			href: `https://linkedin.com/in/${founder.contact.linkedin}`,
			ariaLabel: `${founder.labels.social.linkedin}: ${founder.contact.linkedin}`,
			network: 'linkedin',
			external: true
		},
		{
			label: founder.labels.social.email,
			href: `mailto:${founder.contact.email}`,
			ariaLabel: `${founder.labels.social.email}: ${founder.contact.email}`,
			network: 'email',
			external: false
		}
	];
</script>

<section aria-label={founder.labels.elsewhere}>
	<h2
		class="text-xs font-medium uppercase tracking-[0.16em] text-ink-tertiary"
		class:sr-only={variant === 'on-image'}
	>
		{founder.labels.elsewhere}
	</h2>
	<ul class="flex flex-wrap gap-3" class:mt-4={variant !== 'on-image'}>
		{#each links as link (link.label)}
			<li>
				<a
					class="social-link"
					class:on-image={variant === 'on-image'}
					href={link.href}
					aria-label={link.ariaLabel}
					title={link.label}
					target={link.external ? '_blank' : undefined}
					rel={link.external ? 'noopener noreferrer' : undefined}
				>
					{#if link.network === 'linkedin'}
						<LinkedInIcon size={20} />
					{:else if link.network === 'email'}
						<Mail size={20} aria-hidden="true" />
					{:else}
						<Icon path={link.path ?? ''} size={20} />
					{/if}
				</a>
			</li>
		{/each}
	</ul>
</section>

<style>
	.social-link {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: var(--sida-touch-target);
		height: var(--sida-touch-target);
		border: 1px solid var(--sida-border-default);
		border-radius: var(--sida-radius-full);
		color: var(--sida-text-primary);
		background: transparent;
		transition:
			background-color var(--sida-duration-fast) var(--sida-ease-standard),
			border-color var(--sida-duration-fast) var(--sida-ease-standard),
			color var(--sida-duration-fast) var(--sida-ease-standard);
	}

	.social-link.on-image {
		border-color: transparent;
		background: rgba(255, 255, 255, 0.12);
		color: #fff;
		-webkit-backdrop-filter: blur(8px);
		backdrop-filter: blur(8px);
	}

	.social-link:focus-visible {
		outline: var(--sida-focus-ring-width) solid var(--sida-focus-ring);
		outline-offset: var(--sida-focus-ring-offset);
	}

	@media (hover: hover) {
		.social-link:hover {
			background: var(--sida-product-accent);
			border-color: var(--sida-product-accent);
			color: var(--sida-product-accent-contrast);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.social-link {
			transition: none;
		}
	}
</style>
