import {Suspense} from 'react';
import {Await, NavLink, useAsyncValue} from 'react-router';
import {useAnalytics, useOptimisticCart} from '@shopify/hydrogen';
import {useAside} from '~/components/Aside';
import {getT} from '~/lib/translations';
import {COLLECTOR_CATEGORIES} from '~/lib/categories';
import logoStamp from '~/assets/logo-stamp.svg';

/**
 * @param {HeaderProps}
 */
export function Header({header, isLoggedIn, cart, publicStoreDomain, language}) {
  const {shop, menu} = header;
  const t = getT(language);
  return (
    <header className="header">
      <NavLink
        prefetch="intent"
        to="/"
        className={({ isActive }) => `header-brand${isActive ? ' active' : ''}`}
        end
      >
        <img src={logoStamp} alt="" className="header-logo-stamp" width="60" height="60" />
        <strong>{t('brandName')}</strong>
      </NavLink>
      <HeaderMenu
        menu={menu}
        viewport="desktop"
        primaryDomainUrl={header.shop.primaryDomain.url}
        publicStoreDomain={publicStoreDomain}
        language={language}
        useCollectorNav
      />
      <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} language={language} />
    </header>
  );
}

/**
 * @param {{
 *   menu: HeaderProps['header']['menu'];
 *   primaryDomainUrl: HeaderProps['header']['shop']['primaryDomain']['url'];
 *   viewport: Viewport;
 *   publicStoreDomain: HeaderProps['publicStoreDomain'];
 *   language?: string;
 *   useCollectorNav?: boolean;
 * }}
 */
export function HeaderMenu({
  menu,
  primaryDomainUrl,
  viewport,
  publicStoreDomain,
  language,
  useCollectorNav,
}) {
  const className = `header-menu-${viewport}`;
  const {close} = useAside();
  const t = getT(language);
  const menuItems = (menu || FALLBACK_HEADER_MENU).items;

  const navLinkClass = ({ isActive }) => `header-menu-item${isActive ? ' active' : ''}`;

  const collectorLinks = useCollectorNav
    ? [
        ...COLLECTOR_CATEGORIES.map((cat) => (
          <NavLink
            className={navLinkClass}
            end={false}
            key={cat.handle}
            onClick={close}
            prefetch="intent"
            to={`/collections/${cat.handle}`}
          >
            {t(cat.key)}
          </NavLink>
        )),
        <NavLink
          className={navLinkClass}
          end={false}
          key="collections"
          onClick={close}
          prefetch="intent"
          to="/collections"
        >
          {t('navCollections')}
        </NavLink>,
      ]
    : [];

  const getPath = (item) => {
    if (!item?.url) return '';
    const raw =
      item.url.includes('myshopify.com') ||
      item.url.includes(publicStoreDomain) ||
      item.url.includes(primaryDomainUrl)
        ? new URL(item.url).pathname
        : item.url;
    return raw.replace(/\/$/, '') || '/';
  };

  const extraLinks = menuItems
    .filter((item) => {
      if (!item.url) return false;
      const path = getPath(item);
      // When using collector nav we already have "All Collections" — hide any menu item that goes to /collections
      if (useCollectorNav && path === '/collections') return false;
      return true;
    })
    .map((item) => {
      const url =
        item.url.includes('myshopify.com') ||
        item.url.includes(publicStoreDomain) ||
        item.url.includes(primaryDomainUrl)
          ? new URL(item.url).pathname
          : item.url;
      const label = menuLabelFromItem(item, t, getPath(item));
      return (
        <NavLink
          className={navLinkClass}
          end={false}
          key={item.id}
          onClick={close}
          prefetch="intent"
          to={url}
        >
          {label}
        </NavLink>
      );
    });

  return (
    <nav className={className} role="navigation">
      {viewport === 'mobile' && (
        <NavLink
          end
          onClick={close}
          prefetch="intent"
          className={navLinkClass}
          to="/"
        >
          {t('navHome')}
        </NavLink>
      )}
      {collectorLinks}
      {extraLinks}
    </nav>
  );
}

function menuLabelFromItem(item, t, path) {
  const p = path ?? (new URL(item.url || '', 'https://x').pathname.replace(/\/$/, '') || '/');
  if (p.includes('/blogs/')) return t('navBlog');
  if (p.includes('/policies')) return t('navPolicies');
  if (p.includes('/pages/about')) return t('navAbout');
  if (p === '/collections') return t('navCollections');
  return item.title;
}

/**
 * @param {Pick<HeaderProps, 'isLoggedIn' | 'cart'> & { language?: string }}
 */
function HeaderCtas({isLoggedIn, cart, language}) {
  const t = getT(language);
  return (
    <nav className="header-ctas" role="navigation">
      <HeaderMenuMobileToggle />
      <NavLink
        prefetch="intent"
        to="/account"
        className={({ isActive }) => (isActive ? 'active' : '')}
      >
        <Suspense fallback={t('navSignIn')}>
          <Await resolve={isLoggedIn} errorElement={t('navSignIn')}>
            {(loggedIn) => (loggedIn ? t('navAccount') : t('navSignIn'))}
          </Await>
        </Suspense>
      </NavLink>
      <SearchToggle language={language} />
      <CartToggle cart={cart} language={language} />
    </nav>
  );
}

function HeaderMenuMobileToggle() {
  const {open} = useAside();
  return (
    <button
      type="button"
      className="header-menu-mobile-toggle reset"
      onClick={() => open('mobile')}
      aria-label="Open menu"
    >
      <span className="hamburger" aria-hidden>
        <span />
        <span />
        <span />
      </span>
    </button>
  );
}

function SearchToggle({language}) {
  const {open} = useAside();
  const t = getT(language);
  return (
    <button type="button" className="reset header-cta-btn" onClick={() => open('search')}>
      {t('navSearch')}
    </button>
  );
}

/**
 * @param {{count: number | null; language?: string}}
 */
function CartBadge({count, language}) {
  const {open} = useAside();
  const {publish, shop, cart, prevCart} = useAnalytics();
  const t = getT(language);

  return (
    <a
      href="/cart"
      className="header-cta-cart"
      onClick={(e) => {
        e.preventDefault();
        open('cart');
        publish('cart_viewed', {
          cart,
          prevCart,
          shop,
          url: window.location.href || '',
        });
      }}
    >
      {t('navCart')} {count === null ? <span>&nbsp;</span> : count}
    </a>
  );
}

/**
 * @param {Pick<HeaderProps, 'cart'> & { language?: string }}
 */
function CartToggle({cart, language}) {
  return (
    <Suspense fallback={<CartBadge count={null} language={language} />}>
      <Await resolve={cart}>
        <CartBanner language={language} />
      </Await>
    </Suspense>
  );
}

function CartBanner({language}) {
  const originalCart = useAsyncValue();
  const cart = useOptimisticCart(originalCart);
  return <CartBadge count={cart?.totalQuantity ?? 0} language={language} />;
}

const FALLBACK_HEADER_MENU = {
  id: 'gid://shopify/Menu/199655587896',
  items: [
    /* "Collections" omitted when useCollectorNav — we show "All Collections" in collector links */
    {
      id: 'gid://shopify/MenuItem/461609533496',
      resourceId: null,
      tags: [],
      title: 'Blog',
      type: 'HTTP',
      url: '/blogs/journal',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609566264',
      resourceId: null,
      tags: [],
      title: 'Policies',
      type: 'HTTP',
      url: '/policies',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609599032',
      resourceId: 'gid://shopify/Page/92591030328',
      tags: [],
      title: 'About',
      type: 'PAGE',
      url: '/pages/about',
      items: [],
    },
  ],
};

/**
 * @param {{
 *   isActive: boolean;
 *   isPending: boolean;
 * }}
 */
/** @typedef {'desktop' | 'mobile'} Viewport */
/**
 * @typedef {Object} HeaderProps
 * @property {HeaderQuery} header
 * @property {Promise<CartApiQueryFragment|null>} cart
 * @property {Promise<boolean>} isLoggedIn
 * @property {string} [language]
 * @property {string} publicStoreDomain
 */

/** @typedef {import('@shopify/hydrogen').CartViewPayload} CartViewPayload */
/** @typedef {import('storefrontapi.generated').HeaderQuery} HeaderQuery */
/** @typedef {import('storefrontapi.generated').CartApiQueryFragment} CartApiQueryFragment */
