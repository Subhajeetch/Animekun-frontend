import Link from "next/link";
import React from "react";
import "./HomepageSections.css";
import CustomImage from "../Universal/CustomImage";

const HomePageCetagoryTemplate = ({ data }) => {
  return (
    <div
      className="grid
    template-parent"
    >
      {data.map((anime, index) => (
        <div
          key={anime.id || index}
          className="relative flex items-center justify-between w-full
          overflow-hidden aspect-[9/12] template-child "
        >
          <Link
            className="absolute top-0 right-0 flex flex-col w-full aspect-[9/12] card-item p-2"
            href={`/anime/${anime.id}`}
            style={{ borderRadius: "10px" }}
          >
            <div className="flex-1 rounded-md relative overflow-hidden">
              <CustomImage
                src={anime.poster}
                alt={anime.name}
                className="object-cover object-top h-full w-full"
              />
            </div>
            <div className="w-full">
              <p className="text-[14px] line-clamp-1 py-[1px] font-[700] pl-1">
                {anime.name}
              </p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default HomePageCetagoryTemplate;
