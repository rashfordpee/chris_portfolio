<script lang="ts">
	import { Button } from '@rashfordpee/youreka-sida';
	import { X } from 'lucide-svelte';
	import QRCode from 'qrcode';
	import { founder } from '$lib/founder.config';
	import QrIcon from './QrIcon.svelte';

	let dialog: HTMLDialogElement;
	let triggerWrap: HTMLDivElement;
	let isOpen = $state(false);
	let qrSvg = $state('');
	let generating = $state(false);

	function toHex(value: string, fallback: string) {
		const color = value.trim();
		if (!color) return fallback;
		if (color.startsWith('#')) return color;

		const match = color.match(/^rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/i);
		if (!match) return fallback;

		const channels = match.slice(1, 4).map(Number);
		if (channels.some((channel) => Number.isNaN(channel) || channel < 0 || channel > 255)) {
			return fallback;
		}

		return `#${channels
			.map((channel) => Math.round(channel).toString(16).padStart(2, '0'))
			.join('')}`;
	}

	function focusTrigger() {
		triggerWrap?.querySelector<HTMLButtonElement>('button')?.focus();
	}

	function handleClose() {
		isOpen = false;
		focusTrigger();
	}

	async function openDialog() {
		if (!dialog || dialog.open) return;

		isOpen = true;
		dialog.showModal();

		if (qrSvg || generating) return;

		generating = true;

		try {
			const styles = getComputedStyle(document.documentElement);
			const dark = toHex(styles.getPropertyValue('--sida-text-primary'), '#111111');
			const light = toHex(styles.getPropertyValue('--sida-surface-elevated'), '#ffffff');

			qrSvg = await QRCode.toString(window.location.href, {
				type: 'svg',
				margin: 1,
				color: { dark, light }
			});
		} catch {
			qrSvg = '';
		} finally {
			generating = false;
		}
	}

	function closeDialog() {
		dialog?.close();
	}

	function handleDialogClick(event: MouseEvent) {
		if (event.target === dialog) closeDialog();
	}
</script>

<div class="qr-trigger-wrap" bind:this={triggerWrap}>
	<Button
		variant="secondary"
		size="medium"
		onclick={openDialog}
		aria-expanded={isOpen}
		aria-controls="qr-dialog"
		aria-haspopup="dialog"
	>
		{#snippet startIcon()}
			<QrIcon size={20} />
		{/snippet}
		{founder.labels.qrButtonAria}
	</Button>
</div>

<dialog
	id="qr-dialog"
	class="qr-dialog"
	bind:this={dialog}
	aria-labelledby="qr-dialog-title"
	onclose={handleClose}
	onclick={handleDialogClick}
>
	<button
		class="qr-close"
		type="button"
		aria-label={founder.labels.close}
		onclick={closeDialog}
	>
		<X size={20} aria-hidden="true" />
	</button>
	<h2 id="qr-dialog-title" class="font-editorial qr-title">{founder.labels.qrDialogTitle}</h2>
	<div
		class="qr-card"
		role="img"
		aria-label={`${founder.labels.scanAria} - ${founder.name}`}
		aria-busy={!qrSvg}
	>
		{#if qrSvg}{@html qrSvg}{/if}
	</div>
	<p class="qr-caption">{founder.labels.scanCaption}</p>
</dialog>

<style>
	.qr-trigger-wrap {
		flex: none;
		width: auto;
	}

	.qr-dialog {
		width: min(92vw, 360px);
		max-height: calc(100dvh - var(--sida-space-8));
		margin: auto;
		padding: var(--sida-space-6);
		overflow: visible;
		border: 0;
		border-radius: var(--sida-radius-sm);
		background: var(--sida-surface-elevated);
		color: var(--sida-text-primary);
		box-shadow: var(--sida-shadow-lg);
	}

	.qr-dialog::backdrop {
		background: var(--sida-surface-overlay);
		-webkit-backdrop-filter: blur(4px);
		backdrop-filter: blur(4px);
	}

	.qr-close {
		position: absolute;
		top: var(--sida-space-3);
		right: var(--sida-space-3);
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: var(--sida-touch-target);
		height: var(--sida-touch-target);
		border: 0;
		border-radius: var(--sida-radius-full);
		background: transparent;
		color: var(--sida-text-primary);
		transition: background-color var(--sida-duration-fast) var(--sida-ease-standard);
	}

	.qr-close:hover {
		background: rgba(15, 15, 15, 0.06);
	}

	.qr-close:focus-visible {
		outline: var(--sida-focus-ring-width) solid var(--sida-focus-ring);
		outline-offset: var(--sida-focus-ring-offset);
	}

	.qr-title {
		padding-inline: var(--sida-space-8);
		color: var(--sida-text-primary);
		font-size: 1.5rem;
		font-weight: 500;
		line-height: 1.1;
		text-align: center;
	}

	.qr-card {
		width: 240px;
		height: 240px;
		margin: var(--sida-space-5) auto 0;
		overflow: hidden;
		border-radius: var(--sida-radius-xs);
		background: var(--sida-surface-elevated);
	}

	.qr-card :global(svg) {
		display: block;
		width: 100%;
		height: 100%;
	}

	.qr-caption {
		margin-top: var(--sida-space-3);
		color: var(--sida-text-secondary);
		font-size: 0.75rem;
		line-height: 1.4;
		text-align: center;
	}

	@media (prefers-reduced-motion: reduce) {
		.qr-close {
			transition: none;
		}
	}
</style>
