import type { Actions } from './$types';
import { PUBLIC_BEARER_TOKEN } from '$env/static/public';

export const actions = {
	sale: async ({ cookies, request }) => {
    const data = await request.formData();
    console.log('Record the sale');
    console.log(data);

    const response = await fetch('http://rugbyapi.shineconsultglobal.com/api/shirts', {
			method: 'POST',
			body: data,
			headers: {Authorization: 'Bearer ' + PUBLIC_BEARER_TOKEN}
		});

    console.log(response);
	}
} satisfies Actions;