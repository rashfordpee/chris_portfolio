import { error } from '@sveltejs/kit';
import { founder } from '$lib/founder.config';

export const entries = () => founder.bentoItems.map((item) => ({ slug: item.id }));

export const load = ({ params }) => {
	const item = founder.bentoItems.find((i) => i.id === params.slug);

	if (!item) throw error(404, 'Not found');

	return { item };
};
