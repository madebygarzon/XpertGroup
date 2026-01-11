// Helper method added to component
export function getRatingStars(rating: number | undefined): string {
  if (!rating) return '';
  return '★'.repeat(rating) + '☆'.repeat(5 - rating);
}
