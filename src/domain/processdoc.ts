// ======================================================
// Arabic NLP Pipeline (Clean → Tokenise → Split → Analyse)
// ======================================================

// ----------------------
// 1. CLEANING
// ----------------------

export function removeDiacritics(text: string): string {
  return text.replace(/[\u0617-\u061A\u064B-\u0652]/g, "");
}

export function removeTatweel(text: string): string {
  return text.replace(/ـ/g, "");
}

export function normalizeArabic(text: string): string {
  return text
    .replace(/أ|إ|آ/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ؤ/g, "و")
    .replace(/ئ/g, "ي")
    .replace(/ة/g, "ه");
}

export function cleanText(text: string): string {
  text = removeDiacritics(text);
  text = removeTatweel(text);
  text = normalizeArabic(text);
  return text;
}

// ----------------------
// 2. TOKENISATION
// ----------------------

export function tokenize(text: string): string[] {
  return text.match(/[\p{L}\p{N}_]+/gu) || [];
}

// ----------------------
// 3. CLITIC SPLITTING
// ----------------------

const PREFIXES = ["و", "ف", "ب", "ك", "ل", "س"];
const DEFINITE_ARTICLE = "ال";

export function splitClitics(word: string): string[] {
  const parts: string[] = [];

  // peel prefixes
  while (word.length > 1 && PREFIXES.includes(word[0])) {
    parts.push(word[0]);
    word = word.slice(1);
  }

  // handle "ال"
  if (word.startsWith(DEFINITE_ARTICLE) && word.length > 2) {
    parts.push("ال");
    word = word.slice(2);
  }

  if (word.length > 0) {
    parts.push(word);
  }

  return parts;
}

export function cliticTokenize(tokens: string[]): string[] {
  const result: string[] = [];

  for (const token of tokens) {
    result.push(...splitClitics(token));
  }

  return result;
}

// ----------------------
// 4. FREQUENCY ANALYSIS
// ----------------------

export function getFrequency(tokens: string[]): Map<string, number> {
  const freq = new Map<string, number>();

  for (const token of tokens) {
    freq.set(token, (freq.get(token) || 0) + 1);
  }

  return freq;
}

// ----------------------
// 5. DEDUPLICATION (safe, separate output)
// ----------------------

export function deduplicate(tokens: string[]): string[] {
  return [...new Set(tokens)];
}

// ----------------------
// 6. FULL PIPELINE OUTPUT
// ----------------------

export type ArabicAnalysisResult = {
  rawTokens: string[];
  tokens: string[];
  uniqueTokens: string[];
  frequency: Map<string, number>;
};

export function analyzeArabicText(text: string): ArabicAnalysisResult {
  const cleaned = cleanText(text);

  const baseTokens = tokenize(cleaned);

  const tokens = cliticTokenize(baseTokens);

  return {
    rawTokens: baseTokens,
    tokens,
    uniqueTokens: deduplicate(tokens),
    frequency: getFrequency(tokens),
  };
}

// ----------------------
// 7. EXAMPLE USAGE
// ----------------------

const sample =
  "إِنَّ اللّٰهَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ وَالسَّمَاءُ بِالنُّجُومِ";

const result = analyzeArabicText(sample);

console.log("TOKENS:", result.tokens);
console.log("UNIQUE:", result.uniqueTokens);
console.log("FREQUENCY:", Object.fromEntries(result.frequency));
