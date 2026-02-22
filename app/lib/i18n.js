/**
 * Parse Accept-Language header and return preferred language code (EN or ES).
 * Respects browser/system language for automatic EN/ES switching.
 */
export function getLanguageFromRequest(request) {
  const acceptLanguage = request.headers.get('Accept-Language') || '';
  // e.g. "es-MX,es;q=0.9,en;q=0.8" -> prefer Spanish
  const first = acceptLanguage.split(',')[0]?.trim().toLowerCase();
  if (first?.startsWith('es')) return 'ES';
  return 'EN';
}

/**
 * i18n language for Storefront API (Hydrogen i18n).
 * EN -> US, ES -> MX (or ES for Spain if you prefer).
 */
export function getI18nFromRequest(request) {
  const lang = getLanguageFromRequest(request);
  return lang === 'ES'
    ? { language: 'ES', country: 'MX' }
    : { language: 'EN', country: 'US' };
}
