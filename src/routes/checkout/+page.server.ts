import type { Actions } from './$types';

export const actions = {
	sale: async ({ cookies, request }) => {
    const data = await request.formData();
    console.log('Record the sale');
    console.log(data);

    const response = await fetch('http://rugbyapi.shineconsultglobal.com/api/shirts', {
			method: 'POST',
			body: JSON.stringify({ data }),
			headers: {
				'Content-Type': 'application/json'
			}
		});

    return response;
	}
} satisfies Actions;