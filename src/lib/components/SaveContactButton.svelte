<script lang="ts">
	import { Button } from '@rashfordpee/youreka-sida';
	import { browser } from '$app/environment';
	import { formatVCard, type VCard } from 'vcard-ts';
	import { founder } from '$lib/founder.config';

	function splitName(fullName: string) {
		const parts = fullName.trim().split(/\s+/);
		const familyName = parts.length > 1 ? (parts.pop() ?? '') : '';
		return { givenName: parts.join(' '), familyName };
	}

	function handleSave() {
		if (!browser) return;

		const pageUrl = window.location.href;
		const { givenName, familyName } = splitName(founder.name);
		const vcard: VCard = {
			version: '3.0',
			formattedName: founder.name,
			name: { givenName, familyName },
			title: founder.title,
			organization: { name: founder.org },
			phones: [{ value: founder.contact.phone, types: ['cell', 'voice'] }],
			emails: [{ value: founder.contact.email, types: ['work', 'internet'] }],
			url: pageUrl,
			note: `Met at ${founder.conference}.`
		};

		const vcardString = formatVCard(vcard).replace(/\r?\n/g, '\r\n');
		const blob = new Blob([vcardString], { type: 'text/vcard;charset=utf-8' });
		const url = URL.createObjectURL(blob);
		const slug = founder.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
		const link = document.createElement('a');

		link.href = url;
		link.download = `${slug}.vcf`;
		link.style.display = 'none';
		document.body.appendChild(link);
		link.click();
		link.remove();
		window.setTimeout(() => URL.revokeObjectURL(url), 10_000);
	}
</script>

<Button variant="primary" size="medium" onclick={handleSave}>
	{founder.labels.saveContact}
</Button>
