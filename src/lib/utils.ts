/**
 * Format INR price with comma-separated thousands (Indian format)
 * e.g. 12500 → "₹12,500"
 */
export function formatINR(price: number): string {
  return '₹' + price.toLocaleString('en-IN');
}

/**
 * Convert a linear slider value (0-1) into a logarithmic budget value.
 * This makes low-budget values easier to pick on the slider.
 */
export function logSliderToValue(position: number, min: number, max: number): number {
  const minLog = Math.log(min);
  const maxLog = Math.log(max);
  const value = Math.exp(minLog + (maxLog - minLog) * position);
  // Round to nearest 100
  return Math.round(value / 100) * 100;
}

/**
 * Convert a budget value to a linear slider position (0-1).
 */
export function valueToLogSlider(value: number, min: number, max: number): number {
  const minLog = Math.log(min);
  const maxLog = Math.log(max);
  return (Math.log(value) - minLog) / (maxLog - minLog);
}

/**
 * Tokenize text by lowercasing and removing stop-words.
 */
export function tokenize(text: string): string[] {
  const STOP_WORDS = new Set([
    'a', 'an', 'the', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
    'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
    'should', 'may', 'might', 'can', 'shall', 'and', 'but', 'or', 'nor',
    'for', 'so', 'yet', 'to', 'of', 'in', 'on', 'at', 'by', 'with',
    'from', 'up', 'about', 'into', 'through', 'during', 'before', 'after',
    'above', 'below', 'between', 'under', 'again', 'further', 'then',
    'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'each',
    'every', 'both', 'few', 'more', 'most', 'other', 'some', 'such', 'no',
    'not', 'only', 'own', 'same', 'than', 'too', 'very', 'just', 'because',
    'as', 'until', 'while', 'i', 'my', 'me', 'he', 'she', 'it', 'we',
    'they', 'them', 'his', 'her', 'its', 'our', 'their', 'this', 'that',
    'these', 'those', 'really', 'loves', 'love', 'likes', 'like',
  ]);

  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .split(/\s+/)
    .filter((w) => w.length > 1 && !STOP_WORDS.has(w));
}

/**
 * Get a category icon (emoji) for display.
 */
export function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    tech: '💻',
    kitchen: '🍳',
    wellness: '🧘',
    books: '📚',
    'home-decor': '🏡',
    fashion: '👗',
    outdoor: '🏔️',
    stationery: '✏️',
    'food-drink': '☕',
    experience: '🎭',
    jewellery: '💎',
    'jewellery-personal': '💍',
    'intimate-apparel': '👙',
    'personal-care': '🧴',
    games: '🎮',
    music: '🎵',
    art: '🎨',
    gardening: '🌱',
  };
  return icons[category] || '🎁';
}
