import Link from "next/link";
import { auth } from "@/server/auth";
import { cn } from "@/lib/utils";
import DotPattern from "@/components/ui/dot-pattern";
import Logo from "../components/logo";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default async function Hero() {
  
  const session = await auth();

  return (
      <>
        <div className="absolute left-0 overflow-hidden w-full mb-[-14rem] pt-18 md:pt-32 lg:pt-48">
        <DotPattern className="z-0 absolute inset-0 w-full h-full blur-md" />
          <div className="flex flex-row justify-around space-x-12 w-full px-4 md:px-6">
            <div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="space-y-2 z-50">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-black">
                    VARLEV3
                  </h1>
                  <p className="mx-auto max-w-[700px] md:text-xl text-black">
                    Dusza
                  </p>
                </div>
              </div>
              <div className="flex justify-center mt-6 z-50">
                {!session && (
                  <Link href="/bejelentkezes">
                    <Button className="w-full sm:w-auto mr-6 z-50">
                      <ArrowRight className="mr-2 size-4" />
                      Bejelentkezés
                    </Button>
                  </Link>
                )}

                {session && (
                  <Link href="/vezerlopult">
                    <Button className="w-full sm:w-auto mr-4 z-50">
                      <ArrowRight className="mr-2 size-4" />
                      Vezérlőpult
                    </Button>
                  </Link>
                )}

                <Link href="/versenyek">
                  <Button variant="outline" className="w-full sm:w-auto">
                    Versenyek
                  </Button>
                </Link>
              </div>
            </div>
            <div className="z-50">
              <img src="/varlev3_icon.svg" alt="" />
            </div>
          </div>
          <svg className="scale-105" viewBox="0 0 426 106" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.823792 105.25L425.176 0.5V105.25H0.823792Z" fill="#fff"/>
          </svg>
        </div>
      </>
    );
  };
