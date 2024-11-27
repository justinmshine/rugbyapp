<script lang='ts'>
	import type { PageData, ActionData } from './$types';

    let { data, form }: { data: PageData, form: ActionData } = $props();

    let retrievedObject = typeof window !== 'undefined' ? localStorage.getItem('cartCheckout') : null;
    //console.log('retrievedObject: ', JSON.parse(retrievedObject));
    let sales_data = JSON.parse(retrievedObject);
    let sizeValues = $state([]);
    if(sales_data !== null && sales_data.length > 0) {
        sizeValues = sales_data[0].dimension;
    }

    console.log(sizeValues);

    const totalSales = $derived.by(() => {
		let quantity = 0;
		let total = 0;
        if(sales_data !== null) {
            for (const product of sales_data) {
                quantity += product.quantity;
                total += product.price * product.quantity;
            }
        }
		return {
			quantity,
			total
		};
	});
</script>

{#if sales_data !== null}
    <div class="flex items-center bg-gray-300 p-4">
        <span class="text-lg font-bold">Shine Rugby Shirts Checkout</span>
    </div>
    <div class="max-w-sm mt-4 mx-auto">
        <h2 class="text-red-800 font-extra-bold">Sale Details</h2><br>
        {#each sales_data as sale}
            { sale.product.title } ( { sizeValues[sale.type -1].type } x { sale.quantity } )
            £{ sale.price }
            <br>
        {/each}
        <br>
        <h2 class="text-red-800 font-extra-bold">{ totalSales.quantity } Items, Total Cost: £{ totalSales.total }</h2>
    </div>
    <form class="max-w-sm mt-4 mx-auto" method="POST" action="?/sale">
        <div class="mb-5">
            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
            <input type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>
        <div class="mb-5">
            <label for="surname" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your surname</label>
            <input type="text" name="surname" id="surname" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>
        <div class="mb-5">
            <label for="address1" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address line 1</label>
            <input type="text" name="address1" id="address1" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>
        <div class="mb-5">
            <label for="address2" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address line 2</label>
            <input type="text" name="address2" id="address2" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </div>
        <div class="mb-5">
            <label for="city" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City</label>
            <input type="text" name="city" id="city" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>
        <div class="mb-5">
            <label for="country" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Country</label>
            <input type="text" name="country" id="country" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>
        <div class="mb-5">
            <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
            <input type="number" name="phone" id="phone" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>
        <div class="mb-5">
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
            <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>
        <fieldset>
            <legend>Card Details:</legend>
            <div class="mb-5">
                <input type="number" name="card" id="card" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" pattern="\d*" minlength="12" maxlength="19" placeholder="Card Number" required />
            </div>
            <div class="mb-5">
                <input type="text" name="expires" id="expires" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" maxlength="7" placeholder="MM / YY" required />
            </div>
            <div class="mb-5">
                <input type="number" name="cvc" id="cvc" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" pattern="\d*" maxlength="3" placeholder="CVC" required />
            </div>
          </fieldset>
        <div class="mb-5">
            <button  class="rounded-full bg-sky-600 px-4 py-2 text-white transition-colors duration-300 hover:bg-sky-700">Complete Sale</button>
        </div>
    </form>
{/if}
