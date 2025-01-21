import type { Actions } from './$types';
import { PUBLIC_BEARER_TOKEN } from '$env/static/public';
import { redirect } from '@sveltejs/kit';

export const actions = {
	draw: async ({ cookies, request }) => {
        const data = await request.formData();
        console.log('Record the sale');
        console.log(data);

		const response = await fetch('http://rugbyapi.shineconsultglobal.com/api/draw', {
			method: 'POST',
			body: data,
			headers: {Authorization: 'Bearer ' + PUBLIC_BEARER_TOKEN}
		});

		if(response.status == 200) {
			redirect(302, '/thanks');
		}

	}
} satisfies Actions;