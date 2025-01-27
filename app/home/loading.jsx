import { SlidesSkeleton } from "../../Sections/HomePage/HomepageSlides.jsx";
import { GenreSectionSkeliton } from "../../Sections/HomePage/GenreSection.jsx";
import LoadingSke from "../../Sections/Universal/Loader.jsx";

export default function Loading() {
  return (
    <>
      <div className="w-full min-h-screen bg-backgroundtwo">
        <SlidesSkeleton />

        <div className="h-[30px] w-full"></div>

        <GenreSectionSkeliton />

        <div className="h-[30px] w-full"></div>
        <div className="flex justify-center mt-4">
          <LoadingSke />
        </div>
      </div>
    </>
  );
}
