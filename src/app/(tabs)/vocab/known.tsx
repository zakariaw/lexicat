import { useEffect } from "react";

import { View } from "react-native";

import { VocabCard } from "@/features/vocab/components/vocabcard";

import { useVocabStore } from "@/features/vocab/db/store";

export default function KnownScreen() {
  const { words, load } = useVocabStore();

  useEffect(() => {
    load();
  }, []);

  const knownWords = words.filter((w) => w.status === "unknown");

  return (
    <View>
      {knownWords.map((word) => (
        <VocabCard
          key={word.id}
          english={word.english}
          arabic={word.arabic}
          count={word.id} // or replace later with real count logic
          onDelete={() => console.log("delete", word.id)}
          onEdit={() => console.log("edit", word.id)}
        />
      ))}
    </View>
  );
}
