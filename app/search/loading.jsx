import "../../Styles/AnimeCardGrid.css";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  const divs = 34;
  return (
    <>
      <div className="flex-1 mx-auto mt-2 p-4 bg-backgroundtwo">
        <div className="flex justify-between items-center">
          <div
            className="h-[56px] w-[200px]  bg-gradient-to-l
        from-transparent to-backgroundHover
            rounded-md"
          ></div>
          <Skeleton className="h-[34px] w-[64px] rounded-md" />
        </div>

        <div className="mt-6 min-h-screen">
          <div className="grid animeCardGrid gap-4 gap-y-14">
            {Array.from({ length: divs }).map((_, index) => (
              <div key={index} className="aspect-[9/12]">
                <Skeleton className="h-full w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
