"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function ToastCatcher() {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    if (searchParams.get("toast")) {
      const type = searchParams.get("type") as any;
      const message = decodeURIComponent(searchParams.get("message") || "");

      if (type === "error") toast.error(message);
      else toast.success(message);

      history.replaceState(null, "", pathname);
    }
  }, [searchParams, pathname]);

  return <div className="hidden" />;
}
