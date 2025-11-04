export function formatCurrency(value: number, currency: string = 'USD', locale: string = 'en-US') {
  try {
    return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value);
  } catch {
    // Fallback for platforms without Intl currency support
    const sign = value < 0 ? '-' : '';
    return `${sign}${Math.abs(value).toFixed(2)}`;
  }
}

export function formatDate(iso: string, locale: string = 'en-US') {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString(locale, { year: 'numeric', month: 'short', day: 'numeric' });
  } catch {
    return iso;
  }
}

