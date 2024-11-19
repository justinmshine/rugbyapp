import type { RugbyShirts, Dimensions, Review, Scan, Country } from '$lib/types';
import type { PageLoad } from './$types';
import { PUBLIC_BEARER_TOKEN } from '$env/static/public';

export const load: PageLoad = async ({ fetch }) => {
	const products = await fetch('http://rugbyapi.shineconsultglobal.com/api/shirts', {
		method: 'GET',
		headers: {Authorization: 'Bearer ' + PUBLIC_BEARER_TOKEN}
	  }).then((res) => res.json());

	console.log(products);  

	return {
		products: products.data as RugbyShirts[]
	};
};
