import SharedFilePage from "@/app/Components/Share/SharedFilePage";

export default async function Page({
  params
}: {
  params: Promise<{ token: string }>
}) {
  // Await the params promise
  const { token } = await params;
  return <SharedFilePage token={token} />;
}