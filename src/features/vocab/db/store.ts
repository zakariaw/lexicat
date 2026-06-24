import { create } from "zustand";

import {
  deleteWord,
  fetchWords,
  insertWord,
  searchWords,
  updateWordStatus,
} from "@/features/vocab/db/database";

type Word = {
  id: number;
  arabic: string;
  english: string;
  status: "known" | "unknown";
};

type Store = {
  words: Word[];

  load: () => void;

  addWord: (a: string, e: string) => void;
  mark: (id: number, status: "known" | "unknown") => void;
  remove: (id: number) => void;

  search: (term: string) => Word[];
};

export const useVocabStore = create<Store>((set, get) => ({
  words: [],

  // LOAD ALL WORDS
  load: () => {
    const data = fetchWords() as Word[];
    set({ words: data });
  },

  // ADD WORD
  addWord: (arabic, english) => {
    insertWord(arabic, english);
    get().load();
  },

  // UPDATE STATUS
  mark: (id, status) => {
    updateWordStatus(id, status);
    get().load();
  },

  // DELETE WORD
  remove: (id) => {
    deleteWord(id);
    get().load();
  },

  // SEARCH (no state update needed)
  search: (term) => {
    return searchWords(term) as Word[];
  },
}));
