export default async function CompetitionPage({
  params,
}: {
  params: { id: string };
}) {
  return <div>competition {params.id}</div>;
}
