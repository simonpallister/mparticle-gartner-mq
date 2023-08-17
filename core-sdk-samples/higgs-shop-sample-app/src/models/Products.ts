const products: Product[] = [
    {
        id: '16655302',
        label: 'Nike Tech Fleece Joggers',
        imageUrl: '/products/jd_CU4495-063_C_0004_b.webp',
        altText: 'Nike Tech Fleece Joggers',
        price: 130,
        category: 'Mens',
        brand: 'Nike',
        variants: {
            size: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
        },
        description:
            'For all-day comfort from the sofa to the streets, check out these mens Tech Fleece Joggers from Nike. ',
    },
    {
        id: '19045289',
        label: 'Tommy Hilfiger Quarter Zip Track Top',
        imageUrl: '/products/jd_ANZ0046312_a.webp',
        altText: 'Tommy Hilfiger Quarter Zip Track Top',
        price: 199,
        category: 'Mens',
        brand: 'Tommy Hilfiger',
        variants: {
            color: ['Black', 'White'],
            size: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
        },
        description:
            'Pair heritage style with modern vibes with this mens Track Top from Tommy Hilfiger',
    },
    {
        id: '18462943',
        label: 'adidas Originals Boyfriend Hoodie',
        imageUrl: '/products/jd_443238_a.webp',
        altText: 'adidas Originals Boyfriend Hoodie',
        price: 100.0,
        category: 'Womens',
        brand: 'adidas',
        variants: {
            color: ['Orange'],
            size: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
        },
        description:
            'Cop a classic casual for your laidback looks in this womens 3-Stripes Essential Boyfriend Hoodie from adidas Originals',
    },
    {
        id: '16474551',
        label: 'JUICY COUTURE Diamante Halter Top',
        imageUrl: '/products/jd_625410_a.webp',
        altText: 'Unisex Tee',
        category: 'Apparel',
        brand: 'mParticle',
        price: 80.0,
        variants: {
            color: ['Green'],
            size: ['XS', 'S', 'M', 'L'],
        },
        description:
            'Cop a vintage look from Juicy Couture with this womens Diamante Halter Top',
    },
    {
        id: '128742',
        label: 'Puma Crew Tracksuit Childrens',
        imageUrl: '/products/jd_ANZ0017987_c.webp',
        altText: 'Puma Crew Tracksuit Childrens',
        price: 50.0,
        category: 'Kids',
        brand: 'Puma',
        variants: {
            color: ['Black'],
            size: ['XS', 'S', 'M', 'L'],
        },
        description:
            'Elevate your lil ones laidback outfits with this childrens Crew Tracksuit from Puma',
    },
    {
        id: '128741',
        label: 'Nike Tape Tracksuit Childrens',
        imageUrl: '/products/jd_36G796-A8F_C_0066_c.webp',
        altText: 'Nike Tape Tracksuit Childrens',
        price: 85.0,
        category: 'Kids',
        variants: {
            color: ['Pink'],
            size: ['XS', 'S', 'M', 'L'],
        },
        brand: 'Nike',
        description: '',
    },
];

export interface Product {
    id: string;
    label: string;
    altText: string;
    imageUrl: string;
    price: number;
    description: string;
    category?: string;
    brand?: string;
    couponCode?: string;
    position?: number;
    variants?: {
        color?: string[];
        size?: string[];
    };
}

export const getProductById = (id: string) => products.find((p) => p.id === id);

export const formatCurrency = (num: number) =>
    `$${num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`;

export default products;
