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
    navActionFigures: 'Marvel',
    navHotWheels: 'Hot Wheels',
    navBlog: 'Blog',
    navPolicies: 'Policies',
    navAbout: 'About',
    navAccount: 'Account',
    navSignIn: 'Sign in',
    navCart: 'Cart',
    navSearch: 'Search',

    // Home
    heroHeadline: 'Where collectors find their next treasure.',
    heroSubhead: 'Rare figures, trading cards, and toys — bid or buy. Curated for collectors who know the difference.',
    heroCta: 'Explore collections',
    heroCtaSecondary: 'New arrivals',
    shopByCategory: 'Shop by category',
    shopByCategorySub: 'Browse our collector categories',
    featuredCollection: 'Featured collections',
    recommendedProducts: 'New & trending',
    viewAllCollections: 'View all collections',
    newArrivals: 'New arrivals',
    shopNewArrivals: 'Shop new arrivals',
    trustFreeShipping: 'Free shipping',
    trustEasyReturns: 'Easy returns',
    trustSecureCheckout: 'Secure checkout',
    whyShopWithUs: 'Why collect with us',
    whyCurated: 'Curated collectibles',
    whyCuratedDesc: 'Hand-picked toys and figures from trusted brands.',
    whyBidOrBuy: 'Bid or buy',
    whyBidOrBuyDesc: 'Snag deals at auction or buy now — your choice.',
    newsletterHeadline: 'Stay in the loop',
    newsletterSub: 'New drops, restocks & collector tips. No spam.',
    newsletterCta: 'Subscribe',
    newsletterPlaceholder: 'Your email',

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

    heroHeadline: 'Donde los coleccionistas encuentran su próximo tesoro.',
    heroSubhead: 'Figuras raras, cartas y juguetes — puja o compra. Curado para quien sabe la diferencia.',
    heroCta: 'Explorar colecciones',
    heroCtaSecondary: 'Novedades',
    shopByCategory: 'Comprar por categoría',
    shopByCategorySub: 'Explora nuestras categorías para coleccionistas',
    featuredCollection: 'Colecciones destacadas',
    recommendedProducts: 'Nuevo y tendencias',
    viewAllCollections: 'Ver todas las colecciones',
    newArrivals: 'Novedades',
    shopNewArrivals: 'Ver novedades',
    trustFreeShipping: 'Envío gratis',
    trustEasyReturns: 'Devoluciones fáciles',
    trustSecureCheckout: 'Pago seguro',
    whyShopWithUs: 'Por qué comprar con nosotros',
    whyCurated: 'Coleccionables curados',
    whyCuratedDesc: 'Juguetes y figuras seleccionados de marcas de confianza.',
    whyBidOrBuy: 'Puja o compra',
    whyBidOrBuyDesc: 'Ofertas en subasta o compra ya — tú eliges.',
    newsletterHeadline: 'Mantente al día',
    newsletterSub: 'Nuevos lanzamientos, re-stock y tips. Sin spam.',
    newsletterCta: 'Suscribirme',
    newsletterPlaceholder: 'Tu correo',

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
