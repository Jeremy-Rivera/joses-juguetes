import {Await, useLoaderData, useRouteLoaderData, Link} from 'react-router';
import {Suspense} from 'react';
import {Image} from '@shopify/hydrogen';
import {ProductItem} from '~/components/ProductItem';
import {getT} from '~/lib/translations';
import {COLLECTOR_CATEGORIES} from '~/lib/categories';

/**
 * @type {Route.MetaFunction}
 */
export const meta = () => {
  return [{title: "Jose's Juguetes — Collectibles & Toys"}];
};

/**
 * @param {Route.LoaderArgs} args
 */
export async function loader(args) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return {...deferredData, ...criticalData};
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 * @param {Route.LoaderArgs}
 */
async function loadCriticalData({context}) {
  const [{collections}] = await Promise.all([
    context.storefront.query(FEATURED_COLLECTIONS_QUERY),
  ]);

  return {
    featuredCollections: collections.nodes.slice(0, 3),
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 * @param {Route.LoaderArgs}
 */
function loadDeferredData({context}) {
  const recommendedProducts = context.storefront
    .query(RECOMMENDED_PRODUCTS_QUERY)
    .catch((error) => {
      // Log query errors, but don't throw them so the page can still render
      console.error(error);
      return null;
    });

  return {
    recommendedProducts,
  };
}

export default function Homepage() {
  /** @type {LoaderReturnData} */
  const data = useLoaderData();
  const rootData = useRouteLoaderData('root');
  const language = rootData?.language;
  const t = getT(language);

  return (
    <div className="home">
      <section className="hero">
        <h1>{t('heroHeadline')}</h1>
        <p>{t('heroSubhead')}</p>
        <Link className="hero-cta" to="/collections">
          {t('heroCta')}
        </Link>
      </section>
      <section className="shop-by-category">
        <h2>{t('shopByCategory')}</h2>
        <p className="shop-by-category-sub">{t('shopByCategorySub')}</p>
        <div className="category-grid">
          {COLLECTOR_CATEGORIES.map((cat) => (
            <Link
              key={cat.handle}
              className="category-tile"
              to={`/collections/${cat.handle}`}
            >
              {t(cat.key)}
            </Link>
          ))}
          <Link to="/collections" className="category-tile category-tile-all">
            {t('viewAllCollections')}
          </Link>
        </div>
      </section>
      <FeaturedCollections collections={data.featuredCollections} language={language} />
      <RecommendedProducts products={data.recommendedProducts} language={language} />
    </div>
  );
}

/**
 * @param {{
 *   collections: FeaturedCollectionFragment[];
 *   language?: string;
 * }}
 */
function FeaturedCollections({collections, language}) {
  const t = getT(language);
  if (!collections?.length) return null;
  return (
    <section className="featured-section">
      <h2 className="section-heading">{t('featuredCollection')}</h2>
      <div className="featured-collections-grid">
        {collections.map((collection) => (
          <Link
            key={collection.id}
            className="featured-collection-card"
            to={`/collections/${collection.handle}`}
          >
            <div className="card-image">
              {collection.image ? (
                <Image
                  data={collection.image}
                  sizes="(min-width: 56em) 400px, (min-width: 36em) 50vw, 100vw"
                  aspectRatio="4/3"
                />
              ) : (
                <span className="card-placeholder">
                  {collection.title.slice(0, 2).toUpperCase()}
                </span>
              )}
            </div>
            <div className="card-body">
              <h3>{collection.title}</h3>
              <span>Shop →</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

/**
 * @param {{
 *   products: Promise<RecommendedProductsQuery | null>;
 *   language?: string;
 * }}
 */
function RecommendedProducts({products, language}) {
  const t = getT(language);
  return (
    <div className="recommended-products">
      <h2 className="section-heading">{t('recommendedProducts')}</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={products}>
          {(response) => (
            <div className="recommended-products-grid">
              {response
                ? response.products.nodes.map((product) => (
                    <ProductItem key={product.id} product={product} />
                  ))
                : null}
            </div>
          )}
        </Await>
      </Suspense>
      <br />
    </div>
  );
}

const FEATURED_COLLECTIONS_QUERY = `#graphql
  fragment FeaturedCollection on Collection {
    id
    title
    image {
      id
      url
      altText
      width
      height
    }
    handle
  }
  query FeaturedCollections($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 6, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollection
      }
    }
  }
`;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
    id
    title
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    featuredImage {
      id
      url
      altText
      width
      height
    }
  }
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
`;

/** @typedef {import('./+types/_index').Route} Route */
/** @typedef {import('storefrontapi.generated').FeaturedCollectionFragment} FeaturedCollectionFragment */
/** @typedef {import('storefrontapi.generated').RecommendedProductsQuery} RecommendedProductsQuery */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
