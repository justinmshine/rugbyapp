<script lang="ts">
	import type { RugbyShirts, Dimensions, Review, Scan, Country } from '$lib/types';
    import { Log } from 'phosphor-svelte';
	import CartItem from './cart-item.svelte';
	import ShoppingCart from 'phosphor-svelte/lib/ShoppingCart';
	import X from 'phosphor-svelte/lib/X';

	let { data } = $props();

	let cartOpen = $state(false);
	let cartProducts = $state<RugbyShirts[]>([]);
	let product_type = $state(0);

	const cartStats = $derived.by(() => {
		let quantity = 0;
		let total = 0;
		for (const product of cartProducts) {
			quantity += product.quantity;
			total += product.price * product.quantity;
		}
		return {
			quantity,
			total
		};
	});

	let stockValues:object[] = [];
	let sizeValues = data.products[0].dimension;
	data.products.forEach((item, i) => {
		stockValues[item.id]= item.stock;
	});


	const qualifiesForFreeShipping = $derived(cartStats.total >= 50);

	let freeShippingAlertCount = 0;

	//set size and quantity of the product ordered using these variables
	let size = 0;
	let quantity = 0;

	$effect(() => {
		if (freeShippingAlertCount > 0) return;
		if (qualifiesForFreeShipping) {
			alert('You have qualified for free shipping!');
			freeShippingAlertCount++;
		}
	});

	function removeFromCart(id: number) {
		cartProducts = cartProducts.filter((product) => product.id !== id);
	}

	const updateType = () => {
		product_type = product_type
	}

</script>

<div class="flex items-center bg-gray-300 p-4">
	<span class="text-lg font-bold">Shine Rugby Shirts Store</span>
	<div class="relative ml-auto flex items-center">
		<button
			onclick={() => (cartOpen = !cartOpen)}
			class="flex items-center rounded-full bg-sky-600 px-4 py-2 text-white hover:bg-sky-700"
		>
			<ShoppingCart class="mr-2 size-5" />
			<span>Cart ({cartStats.quantity})</span>
		</button>
		{#if cartOpen}
			<div class="absolute right-0 top-8 z-10 mt-2 w-80 rounded-lg bg-white shadow-xl">
				<div class="relative p-4">
					<h2 class="mb-4 text-lg font-semibold">Your Cart</h2>
					<button
						class="absolute right-4 top-4 rounded-full p-1 hover:bg-gray-100"
						aria-label="close cart"
						onclick={() => (cartOpen = false)}
					>
						<X class="size-4" />
					</button>
					{#each cartProducts as _, i}
						<CartItem bind:cartProduct={cartProducts[i]} removeItem={removeFromCart} />
					{/each}
					<div class="mt-4 border-gray-200 pt-4">
						<p class="text-lg font-semibold">Total: ${cartStats.total.toFixed(2)}</p>
					</div>
					<button>Checkout</button>
				</div>
			</div>
		{/if}
	</div>
</div>

<div class="grid grid-cols-1 gap-6 bg-gray-100 p-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
	{#each data.products as product}
		{#if product.stock?.length > 0 }
			<div class="overflow-hidden rounded-xl bg-white shadow-lg">
				<img src="http://rugbyapi.shineconsultglobal.com/storage/{product.image.location}" alt={product.title} class="h-48 w-full object-contain" />
				<div class="p-4">
					<p class="mb-2 overflow-hidden truncate text-lg font-medium text-gray-800">
						{product.title}
					</p>
					<select bind:value={product_type} onchange={updateType}>
						{#each Object.values(stockValues[product.id]) as inStock}
							{#if inStock.stock > 0}
								{#each sizeValues as inSize}
									{#if inSize.id == inStock.size_id}
										<option value="{ inSize.id }">{ inSize.type }</option>
									{/if}
								{/each}
							{/if}						
						{/each}
					</select>
					<div class="flex items-center justify-between">
						<p class="text-xl font-bold">${product.price}</p>
						<button
							class="rounded-full bg-sky-600 px-4 py-2 text-white transition-colors duration-300 hover:bg-sky-700"
							onclick={() => {
								cartProducts.push({
									id: product.id,
									quantity: 1,
									type: product_type,
									product: product
								});
							}}
						>
							Add to cart
						</button>
					</div>
				</div>
			</div>
		{/if}
	{/each}
</div>
