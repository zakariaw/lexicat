// ===============================
// 🇸🇦 Arabic NLP Preprocessing
// Clean → Tokenise → Clitic Split
// ===============================

// -------------------------------
// 1. CLEANING
// -------------------------------

export function removeDiacritics(text: string): string {
  // Harakat + tanween + shadda
  return text.replace(/[\u0617-\u061A\u064B-\u0652]/g, "");
}

export function removeTatweel(text: string): string {
  return text.replace(/ـ/g, "");
}

export function normalizeArabic(text: string): string {
  return (
    text
      // Alef variants
      .replace(/أ|إ|آ/g, "ا")
      // Ya variants
      .replace(/ى/g, "ي")
      // Hamza variants
      .replace(/ؤ/g, "و")
      .replace(/ئ/g, "ي")
      // Taa marbuta
      .replace(/ة/g, "ه")
  );
}

export function cleanText(text: string): string {
  text = removeDiacritics(text);
  text = removeTatweel(text);
  text = normalizeArabic(text);
  return text;
}

// -------------------------------
// 2. TOKENISATION
// -------------------------------

export function tokenize(text: string): string[] {
  // Extract Arabic/word tokens
  // Works well for MVP; ignores punctuation
  return text.match(/[\p{L}\p{N}_]+/gu) || [];
}

// -------------------------------
// 3. CLITIC SPLITTING
// -------------------------------

// Common Arabic prefixes (clitics)
const PREFIXES = ["و", "ف", "ب", "ك", "ل", "س"];
const DEFINITE_ARTICLE = "ال";

// Handle pronoun suffixes (optional simple MVP support)
const PRONOUN_SUFFIXES = ["ه", "ها", "هم", "هن", "ك", "كم", "كن", "ي"];

// -------------------------------
// Split a single word into clitics
// -------------------------------

export function splitClitics(word: string): string[] {
  const parts: string[] = [];

  // -----------------------
  // 1. PREFIX stripping
  // -----------------------
  while (word.length > 1 && PREFIXES.includes(word[0])) {
    parts.push(word[0]);
    word = word.slice(1);
  }

  // -----------------------
  // 2. Definite article "ال"
  // -----------------------
  if (word.startsWith(DEFINITE_ARTICLE) && word.length > 2) {
    parts.push("ال");
    word = word.slice(2);
  }

  // -----------------------
  // 3. SUFFIX stripping (very basic MVP)
  // -----------------------
  for (const suffix of PRONOUN_SUFFIXES) {
    if (word.endsWith(suffix) && word.length > suffix.length + 1) {
      word = word.slice(0, -suffix.length);
      parts.push(suffix);
      break;
    }
  }

  // -----------------------
  // 4. Remaining root
  // -----------------------
  if (word.length > 0) {
    parts.push(word);
  }

  return parts;
}

// -------------------------------
// 4. FULL PIPELINE
// -------------------------------

export function processArabicText(text: string): string[] {
  const cleaned = cleanText(text);
  const tokens = tokenize(cleaned);

  const result: string[] = [];

  for (const token of tokens) {
    result.push(...splitClitics(token));
  }

  return result;
}

// -------------------------------
// 5. OPTIONAL: frequency helper
// -------------------------------

export function getTokenFrequency(tokens: string[]): Map<string, number> {
  const freq = new Map<string, number>();

  for (const token of tokens) {
    freq.set(token, (freq.get(token) || 0) + 1);
  }

  return freq;
}

// -------------------------------
// 6. EXAMPLE USAGE
// -------------------------------

const sample =
  "إِنَّ اللّٰهَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ وَالسَّمَاءُ مُزَيَّنَةٌ بِالنُّجُومِ";

const processed = processArabicText(sample);

console.log("TOKENS:", processed);
console.log("FREQUENCY:", getTokenFrequency(processed));
