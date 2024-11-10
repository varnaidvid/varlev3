import { auth } from "@/server/auth";
import { api } from "@/trpc/server";
import SchoolDetailCard from "@/components/ui/school-detail-card";

export default async function SchoolDashboard() {
  const session = await auth();

  const schoolWithIncludes = await api.school.getSchoolByAccountId({
    accountId: session?.user.id!,
  });
  if (!schoolWithIncludes) return;

  return (
    <div>
      <h2 className="mb-2 mt-8 text-2xl font-semibold">Iskolád információi</h2>
      <SchoolDetailCard data={schoolWithIncludes} />
    </div>
  );
}
