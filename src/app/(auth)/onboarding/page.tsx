import OnboardingClient from "./OnboardingClient";

export const dynamic = "force-dynamic";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ code?: string }>;
}) {
  const params = await searchParams;
  return <OnboardingClient code={params.code} />;
}
