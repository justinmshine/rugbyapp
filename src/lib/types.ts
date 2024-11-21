export type RugbyShirts = {
	id: number;
	title: string;
	description: string;
	category: string;
	price: number;
	discountPercentage: number;
	rating: number;
	sku: string;
	weight: number;
	quantity: number;	
	type: number;
	dimension: Dimensions;
	stock: Stock;
	warrantyInformation: string;
	shippingInformation: string;
	availabilityStatus: string;
	reviews: Review[];
	returnPolicy: string;
	minimumOrderQuantity: number;
	meta: Scan;
	thumbnail: string;
	image: string[];
};

export type CartProduct = {
	id: string
	product: RugbyShirts;
	quantity: number;
	type: number;
	image: string[];
	dimension: Dimensions;
}

export type Dimensions = {
	type: string
	waist: number;
	length: number;
	chest: number;
};

export type Review = {
	rating: number;
	comment: string;
	addedAt: Date;
	reviewerName: string;
	reviewerEmail: string;
};

export type Scan = {
	createdAt: string;
	updatedAt: string;
	barcode: string;
	qrCode: string;
};

export type Country = {
	name: string;
	capitalCity: string;
	isoCode: string;
};

export type Stock = {
	stock: number;
	shirt: number;
	size: number;
};