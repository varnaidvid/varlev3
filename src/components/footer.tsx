import Link from "next/link";
import Logo from "./logo";
import DotPattern from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";
import { InstagramLogoIcon } from "@radix-ui/react-icons";

export function Footer() {
  return (
    <footer
      className={cn(
        "w-full max-w-7xl rounded-xl border py-14",
        "container mx-auto mt-20 flex items-center justify-center bg-background backdrop-blur-md",
      )}
    >
      <div className="w-full !max-w-screen-lg px-4 sm:px-6 lg:px-8">
        <Link href="https://pagedone.io/" className="flex justify-center">
          <Logo size="medium" iconBg="black" />
        </Link>
        <ul className="mb-10 flex flex-col items-center justify-center gap-7 border-b border-gray-200 py-16 text-lg transition-all duration-500 md:flex-row md:gap-12">
          <li>
            <Link href="" className="text-gray-800 hover:text-gray-900">
              Főoldal
            </Link>
          </li>
          <li>
            <Link href="/" className="text-gray-800 hover:text-gray-900">
              Versenyek
            </Link>
          </li>
          <li>
            <Link href="/blog" className="text-gray-800 hover:text-gray-900">
              Blog
            </Link>
          </li>
        </ul>

        <span className="block text-center text-lg text-gray-500">
          © <a href="https://pagedone.io/">VarleV3</a> 2024
        </span>
      </div>
    </footer>
  );
}
