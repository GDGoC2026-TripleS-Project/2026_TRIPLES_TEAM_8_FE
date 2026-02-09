type Props = {
  bookId: string;
};

export default function BookDetailScreen({ bookId }: Props) {
  return (
    <main className="min-h-dvh bg-gray-white px-5 py-6">
      <h1 className="typo-h1-sb text-primary-dark">도서 상세</h1>
      <p className="typo-body-m mt-2 text-gray-text2">bookId: {bookId}</p>
    </main>
  );
}
