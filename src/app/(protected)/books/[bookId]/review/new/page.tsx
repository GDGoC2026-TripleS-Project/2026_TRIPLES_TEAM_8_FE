import ReviewWriteScreen from "@/components/review/ReviewWriteScreen";

type PageProps = {
  params: { bookId: string };
};

export default function Page({ params }: PageProps) {
  return <ReviewWriteScreen bookId={params.bookId} />;
}
