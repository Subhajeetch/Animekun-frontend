"use client"

import React, { useCallback } from "react";
import { DotButton, useDotButton } from "./Buttons.jsx";
import { PrevButton, NextButton, usePrevNextButtons } from "./Arrow.jsx";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import PropTypes from "prop-types";
import "./Embla.css";

const EmblaCarousel = props => {
  const { slides, options } = props;
  const autoplayOptions = { delay: 3000, stopOnInteraction: false };
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay(autoplayOptions)
  ]);

  const onNavButtonClick = useCallback(emblaApi => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? autoplay.reset
        : autoplay.stop;

    resetOrStop();
  }, []);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi,
    onNavButtonClick
  );

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi, onNavButtonClick);

  return (
    <section className="embla1 relative w-full">
      <div className="embla__viewport1" ref={emblaRef}>
        <div className="embla__container1 will-change-transform">
          {slides.map((slide, index) => (
            <div className="embla__slide1" key={slide.id || index}>
              <div className="embla__slide__number1">{slide}</div>
            </div>
          ))}
        </div>
      </div>

      <div
        className="flex justify-end gap-1.5 absolute w-full bottom-2
      right-0 pr-4 md:pr-[54px]"
      >
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            onClick={() => onDotButtonClick(index)}
            className={`embla__dot1${
              index === selectedIndex ? " embla__dot1--selected" : ""
            }`}
          />
        ))}
      </div>

      <div
        className="hidden md:flex absolute w-full top-1/2
      left-1/2 transform -translate-x-1/2 -translate-y-1/2 justify-between"
      >
        <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
        <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
      </div>
    </section>
  );
};

EmblaCarousel.propTypes = {
  slides: PropTypes.array.isRequired,
  options: PropTypes.object
};

export default EmblaCarousel;
