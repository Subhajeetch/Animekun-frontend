import React, { useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";

const EmblaCarousel = (props) => {
  const { slides, options, onInit } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  // Expose the emblaApi when it initializes
  useEffect(() => {
    if (emblaApi && onInit) {
      onInit(emblaApi);
    }
  }, [emblaApi, onInit]);

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((slide, index) => (
            <div className="embla__slide mx-1" key={index}>
              {slide}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmblaCarousel;