import Link from "next/link";

export const metadata = {
  title: "Animekun",
  description: "One of the best anime streaming platform"
};

export default function Home() {
  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <Link
          className="text-xl font-[800] px-4 py-2 rounded-md bg-main"
          href="/home"
        >
          Homepage 
        </Link>
      </div>
    </>
  );
}
