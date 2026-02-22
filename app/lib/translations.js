/**
 * UI copy for Jose's Juguetes — English and Spanish.
 * Use with useRouteLoaderData('root').language (EN | ES).
 */
export const translations = {
  EN: {
    // Brand
    brandName: "Jose's Juguetes",
    brandTagline: "Collect • Bid • Buy",
    brandTaglineShort: "Jose's Toys — Collectibles & more",

    // Nav
    navHome: 'Home',
    navCollections: 'All Collections',
    navCategories: 'Shop by Category',
    navPokemon: 'Pokémon',
    navStarWars: 'Star Wars',
    navTradingCards: 'Trading Cards',
    navPopFigures: 'POP! Figures',
    navActionFigures: 'Action Figures',
    navHotWheels: 'Hot Wheels',
    navBlog: 'Blog',
    navPolicies: 'Policies',
    navAbout: 'About',
    navAccount: 'Account',
    navSignIn: 'Sign in',
    navCart: 'Cart',
    navSearch: 'Search',

    // Home
    heroHeadline: "Collectibles you'll love",
    heroSubhead: 'Find rare toys, POP! figures, trading cards & more. Bid or buy — your next treasure is here.',
    heroCta: 'Shop now',
    shopByCategory: 'Shop by category',
    shopByCategorySub: 'Browse our collector categories',
    featuredCollection: 'Featured collection',
    recommendedProducts: 'Recommended for you',
    viewAllCollections: 'View all collections',

    // Footer
    footerTagline: "Jose's Juguetes — Collectibles, toys & more for every collector.",
    privacyPolicy: 'Privacy Policy',
    refundPolicy: 'Refund Policy',
    shippingPolicy: 'Shipping Policy',
    termsOfService: 'Terms of Service',

    // Search
    searchPlaceholder: 'Search collectibles...',
    searchButton: 'Search',
    viewAllResults: 'View all results for',
  },
  ES: {
    brandName: "Jose's Juguetes",
    brandTagline: 'Colecciona • Puja • Compra',
    brandTaglineShort: "Jose's Juguetes — Coleccionables y más",

    navHome: 'Inicio',
    navCollections: 'Todas las colecciones',
    navCategories: 'Comprar por categoría',
    navPokemon: 'Pokémon',
    navStarWars: 'Star Wars',
    navTradingCards: 'Cartas coleccionables',
    navPopFigures: 'Figuras POP!',
    navActionFigures: 'Figuras de acción',
    navHotWheels: 'Hot Wheels',
    navBlog: 'Blog',
    navPolicies: 'Políticas',
    navAbout: 'Nosotros',
    navAccount: 'Cuenta',
    navSignIn: 'Entrar',
    navCart: 'Carrito',
    navSearch: 'Buscar',

    heroHeadline: 'Coleccionables que te encantarán',
    heroSubhead: 'Encuentra juguetes raros, figuras POP!, cartas y más. Puja o compra — tu próximo tesoro está aquí.',
    heroCta: 'Comprar ahora',
    shopByCategory: 'Comprar por categoría',
    shopByCategorySub: 'Explora nuestras categorías para coleccionistas',
    featuredCollection: 'Colección destacada',
    recommendedProducts: 'Recomendados para ti',
    viewAllCollections: 'Ver todas las colecciones',

    footerTagline: "Jose's Juguetes — Coleccionables, juguetes y más para cada coleccionista.",
    privacyPolicy: 'Política de privacidad',
    refundPolicy: 'Política de reembolso',
    shippingPolicy: 'Política de envíos',
    termsOfService: 'Términos de servicio',

    searchPlaceholder: 'Buscar coleccionables...',
    searchButton: 'Buscar',
    viewAllResults: 'Ver todos los resultados de',
  },
};

/** Get translation function for a language code */
export function getT(lang) {
  const L = lang === 'ES' ? 'ES' : 'EN';
  return (key) => translations[L][key] ?? translations.EN[key] ?? key;
}
