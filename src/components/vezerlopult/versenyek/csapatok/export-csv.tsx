"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { CSVLink } from "react-csv";

export default function ExportCSV({
  data,
  filename,
}: {
  data: any;
  filename: string;
}) {
  return (
    <Button asChild>
      <CSVLink
        data={data}
        filename={filename}
        separator=";"
        className="btn btn-primary"
      >
        <Download />
        Exportálás CSV-be
      </CSVLink>
    </Button>
  );
}
