import { FeedBook } from "@/types/feed";
import FeedCard from "./FeedCard";

interface Props {
  books: FeedBook[];
}

export default function FeedList({ books }: Props) {
  return (
    <>
      {books.map((book) => (
        <FeedCard key={book.bookId} book={book} />
      ))}
    </>
  );
}
