import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Team {
  team: string;
  score: string;
}

interface WinnersTableProps {
  teams: Team[];
}

export function WinnersTable({ teams }: WinnersTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead className="w-[100px]">Csapat</TableHead>
          <TableHead>Pontszám</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {teams.map((team, index) => (
          <TableRow className="" key={team.team}>
            <TableCell
              className={`flex justify-end ${
                index === 0
                  ? "font-semibold text-yellow-600"
                  : index === 1
                    ? "font-semibold text-zinc-400"
                    : index === 2
                      ? "font-semibold text-amber-800"
                      : ""
              }`}
            >
              {index < 3 && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-medal mr-2 inline-block"
                >
                  <path d="M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15" />
                  <path d="M11 12 5.12 2.2" />
                  <path d="m13 12 5.88-9.8" />
                  <path d="M8 7h8" />
                  <circle cx="12" cy="17" r="5" />
                  <path d="M12 18v-2h-.5" />
                </svg>
              )}
            </TableCell>
            <TableCell
              className={`font-medium ${
                index === 0
                  ? "text-yellow-600"
                  : index === 1
                    ? "text-zinc-400"
                    : index === 2
                      ? "text-amber-800"
                      : ""
              }`}
            >
              {team.team}
            </TableCell>
            <TableCell
              className={`${
                index === 0 || index === 1 || index === 2 ? "font-semibold" : ""
              }`}
            >
              {team.score}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
