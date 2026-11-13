export const founder = {
	name: 'Christabel Raymond',
	title: 'Co-Founder & CEO',
	thesis: '"What youre supposed to do when you dont like a thing is change it. If you cant change it, change the way you think about it. Dont complain." This quote by Maya Angelou is the guiding principle of my life and work. I believe that we can always find a way to make things better, and that we should never settle for less than what we deserve.',

	org: 'Tomrays Technology Ltd.',
	conference: 'AFSNET 2026',
	portrait: {
		src: '/images/portrait.jpg',
		alt: 'Portrait of Christabel Raymond'
	},
	bentoItems: [
		{
			id: 'qivo',
			variant: 'image',
			span: 'lg:col-span-2 lg:row-span-2',
			bgClass: 'bg-[#0f0f0f]',
			image: '/images/stealth_image.png',
			imageAlt: 'STEALTH brand artwork for Qivo House of Brands',
			title: 'Qivo House of Brands',
			description:
				'A product of TRT Ltd that builds web applications to solve the needs of small businesses.',
			metric: 'Still in development',
			tag: 'SaaS'
		},
		{
			id: 'orekelewa',
			variant: 'image',
			span: 'lg:col-span-2 lg:row-span-2',
			bgClass: 'bg-[#1a1a1a]',
			image: '/images/orekelewa_image.jpg',
			imageAlt:
				'Hand holding a jar of Orekelewa Organics Pure Shea with Coconut Oil hair and body butter',
			title: 'Orekelewa',
			description:
				'As a passionate entrepreneur i retail the orekelewa shea butter cream, available in different sizes and flavours.',
			metric: '500+ sold',
			tag: 'Product',
			detailImages: [
				{
					src: '/images/ore2.jpg',
					alt: 'Orekelewa Pure Shea with Coconut Oil Berry Blast body butter jar',
					span: 'md:col-span-2'
				},
				{
					src: '/images/ore3.jpg',
					alt: 'Orekelewa Pure Shea with Coconut Oil Berry Blast jar held in hand',
					span: 'md:col-span-1'
				},
				{
					src: '/images/ore4.jpg',
					alt: 'Orekelewa Pure Shea with Coconut Oil Butterscotch Drops jar held in hand',
					span: 'md:col-span-3'
				}
			]
		},
		{
			id: 'tomrays-technology',
			variant: 'image',
			span: 'md:col-span-2 lg:col-span-2 lg:row-span-2',
			bgClass: 'bg-[#0f0f0f]',
			image: '/images/stealth_image.png',
			imageAlt: "STEALTH brand artwork for Tomray's Technology LTD",
			title: "Tomray's Technology LTD",
			description:
				"The parent company behind Qivo House of Brands, building practical digital products and brands for small businesses, which i head as CEO.",
			tag: 'Company'
		},
		{
			id: 'modelling',
			variant: 'image',
			span: 'lg:col-span-2 lg:row-span-2',
			bgClass: 'bg-[#1a1a1a]',
			image: '/images/model_potrait.jpg',
			imageAlt: 'At the African Fashion Fiesta ',
			title: 'Modelling',
			description:
				'Editorial and commercial modelling work across brand campaigns and creative projects.',
			tag: 'Modelling',
			detailImages: [
				{
					src: '/images/model2.jpg',
					alt: 'Modelling at the Afican Fashion Fiesta',
					span: 'md:col-span-2'
				},
				{
					src: '/images/model3.jpg',
					alt: 'Modelling at the Afican Fashion Fiesta',
					span: 'md:col-span-1'
				},
				{
					src: '/images/model4.jpg',
					alt: 'Modelling at the Afican Fashion Fiesta',
					span: 'md:col-span-1'
				},
				{
					src: '/images/model5.jpg',
					alt: 'Modelling at the Afican Fashion Fiesta',
					span: 'md:col-span-2'
				}
			]
		}
	],
	contact: {
		phone: '+2347056717634',
		email: 'christabellraymond@gmail.com',
		whatsapp: '+2347056717634',
		instagram: 'tosam_ray',
		linkedin: 'christabel-raymond-9a4ba11a1',
	},
	labels: {
		elsewhere: 'Elsewhere',
		saveContact: 'Save Contact',
		scanCaption: 'Scan to open this page.',
		scanAria: 'QR code linking to this page',
		qrButtonAria: 'Show QR code',
		qrDialogTitle: 'Scan to connect',
		close: 'Close',
		attributionPrefix: 'Designed & built by',
		social: {
			instagram: 'Instagram',
			whatsapp: 'WhatsApp',
			linkedin: 'LinkedIn',
			email: 'Email'
		}
	},
	attribution: { name: 'bobothebuilder', whatsapp: '+2347086349731' }
} as const;

export type Founder = typeof founder;

type BentoBase = {
	id: string;
	span: string;
	bgClass: string;
	darkText?: boolean;
	tag?: string;
	detailImages?: readonly { src: string; alt: string; span: string }[];
};

export type BentoItem =
	| (BentoBase & {
			variant: 'image';
			image: string;
			imageAlt: string;
			title: string;
			description: string;
			metric?: string;
	  })
	| (BentoBase & {
			variant: 'metric';
			value: string;
			label: string;
			title?: string;
	  })
	| (BentoBase & {
			variant: 'list';
			title: string;
			items: readonly string[];
	  })
	| (BentoBase & {
			variant: 'text';
			title: string;
			description: string;
	  });
