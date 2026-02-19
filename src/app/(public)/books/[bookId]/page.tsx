import BookDetailScreen from "@/components/book/BookDetailScreen";

type PageProps = {
  params: { bookId: string };
};

export default function Page({ params }: PageProps) {
  return <BookDetailScreen bookId={params.bookId} />;
}
