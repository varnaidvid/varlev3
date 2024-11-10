import { CircleArrowRight, Files, Settings } from 'lucide-react';

export default function HomePage() {
  return (
    <section className="py-32">
      <div className="m-auto mt-20 flex flex-col gap-28">
        <div className="flex flex-col gap-7">
          <h1 className="text-4xl font-semibold lg:text-7xl">
            Idén az első helyezetre törünk.
          </h1>
          <p className="max-w-xl text-lg">
            Az elmúlt két évben a Varle csapata a harmadik és negyedik helyen végzett a versenyen. Idén az első helyezés a célunk, amiért mindent meg is teszünk.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <img
            src="/varlev3_icon.svg"
            alt="VarleV3"
            className="w-full max-h-96 rounded-2xl"
          />
          <div className="flex flex-col justify-between gap-10 rounded-2xl bg-gray-100 p-10">
            <p className="text-sm text-muted-foreground">CSAPATUNKROL</p>
            <p className="text-lg font-medium">
              Csapatunkkal a Budapesti Bolyai János Műszaki Technikumot képviseljük a versenyen. A csapatunk kizárólag az iskolában tanuló diákokból áll, akik a programozás iránti szenvedélyüket szeretnék kamatoztatni.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-6 md:gap-20">
          <div className="max-w-xl">
            <h2 className="mb-2.5 text-3xl font-semibold md:text-5xl">
              Csapattagok
            </h2>
          </div>
          <div className="grid gap-10 md:grid-cols-3">
            <div className="flex flex-col">
              <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-accent">
                <Files className="size-5" />
              </div>
              <h3 className="mb-3 mt-2 text-lg font-semibold">
                Várnai Dávid
              </h3>
              <p className="text-muted-foreground">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam nostrum inventore modi cumque! Accusantium non a ipsum inventore, assumenda tempore odio omnis minima. Sit voluptates temporibus laudantium minima eaque iusto!
              </p>
            </div>
            <div className="flex flex-col">
              <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-accent">
                <CircleArrowRight className="size-5" />
              </div>
              <h3 className="mb-3 mt-2 text-lg font-semibold">
                Várszegi Barnabás
              </h3>
              <p className="text-muted-foreground">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat illum cum nisi architecto minus debitis placeat, minima quia maiores deserunt vitae culpa voluptatum fugit molestiae omnis incidunt sapiente sint! Quis.
              </p>
            </div>
            <div className="flex flex-col">
              <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-accent">
                <Settings className="size-5" />
              </div>
              <h3 className="mb-3 mt-2 text-lg font-semibold">
                Lénárt Dániel
              </h3>
              <p className="text-muted-foreground">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae facilis numquam voluptatibus impedit consequatur iure? Labore deserunt voluptatibus facere porro impedit, voluptate velit dolorum perferendis. A deleniti aliquam iste neque.
              </p>
            </div>
          </div>
        </div>
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <p className="mb-10 text-sm font-medium text-muted-foreground">
              TECH STACK
            </p>
            <h2 className="mb-2.5 text-3xl font-semibold md:text-5xl">
              Mivel dolgozunk?
            </h2>
          </div>
          <div>
            
          </div>
        </div>
      </div>
    </section>
  );
};
