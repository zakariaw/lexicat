type Chapter = {
  id: number;
  title_en: string;
  title_ar: string;
  content: string;
};

export default function Reader() {
  // const { id } = useLocalSearchParams<{ id: string }>();
  // const [chapter, setChapter] = useState<Chapter | null>(null);
  // useEffect(() => {
  //   async function loadChapter() {
  //     if (!id) return;
  //     const data = await getChapterById(Number(id));
  //     setChapter(data);
  //   }
  //   loadChapter();
  // }, [id]);
  // if (!chapter) {
  //   return (
  //     <View>
  //       <Text>Chapter not found.</Text>
  //     </View>
  //   );
  // }
  // return (
  //   <View className="flex-1">
  //     <Text className="text-black text-right text-base/18 p-4">
  //       {chapter.content}
  //     </Text>
  //   </View>
  // );
}
