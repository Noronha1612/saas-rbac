export function createSlug(text: string): string {
  return text
    .toLowerCase() // Convert text to lowercase
    .normalize('NFD') // Normalize the text to decompose accents
    .replace(/[\u0300-\u036f]/g, '') // Remove the accents
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with hyphens
    .replace(/^-+|-+$/g, '') // Remove leading and trailing hyphens
}
