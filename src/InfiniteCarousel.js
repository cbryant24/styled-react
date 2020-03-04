import React, { useState, useEffect, useRef } from 'react';
import { useSwipeable } from 'react-swipeable';

import { Div, Li, Ul } from '@cbryant24/styled-react';

import { usePrev, useWindowSize } from './hooks';

//TODO: docuemnt props infinite (inifinite loop of carousel)
//TODO: docuemnt props type (preview: thubmnail previes below)
//TODO: document props initialItem (builds order based on initial order)
//TODO: create readme of personalized components and create library as part of starter skeleton project
const InfiniteCarousel = ({
  children,
  carouselStyle,
  carouselItemStyle,
  initialSlide = 0,
  bp,
  maxItems
}) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(initialSlide);
  const [carouselTranslateVals, setCarouselTranslateVals] = useState(null);
  const [visibleCarouselCount, setVisibleCarouselCount] = useState(null);
  const [maxCarouselCount, setMaxCarouselCount] = useState(
    maxItems || children.length
  );
  const { width } = useWindowSize();
  const prevActiveSlideIndex = usePrev(activeSlideIndex);

  useEffect(() => {
    setVisibleCarouselCount(carouselCountToDisplay());
  }, []);

  useEffect(() => {
    setCarouselTranslateVals(createCarouselTranslatVals());
  }, [activeSlideIndex, visibleCarouselCount]);

  const handlers = useSwipeable({
    onSwipedLeft: () => goToPrevSlide(),
    onSwipedRight: () => goToNextSlide(),
    preventDefaultTouchmoveEvent: true
  });

  // ;
  function carouselCountToDisplay() {
    const carouselItemsOnScreen =
      maxCarouselCount < Math.floor(width / bp)
        ? maxCarouselCount
        : Math.floor(width / bp) - 1;
    return carouselItemsOnScreen;
  }

  function createCarouselTranslatVals() {
    if (!visibleCarouselCount) return;

    let i = 0;
    let carouselLengthEnd = children.length - 1;
    const upperLowerLimit = Math.floor(visibleCarouselCount / 2);

    let lowerLimit = activeSlideIndex - upperLowerLimit;
    const upperLimit =
      visibleCarouselCount % 2 === 0
        ? activeSlideIndex + upperLowerLimit
        : activeSlideIndex + upperLowerLimit + 1;
    const carouselPositions = {};
    while (lowerLimit < upperLimit) {
      let carouselItemTransform = {
        animation: {
          in: {
            from: { transform: `translateX(${(i - 1) * bp}px)` },
            to: { transform: `translateX(${i * bp}px)` }
          },
          duration_in: 0.5,
          animation_fill_mode: 'forwards'
        }
      };

      if (
        i + 1 === visibleCarouselCount &&
        prevActiveSlideIndex < activeSlideIndex
      ) {
        debugger;
        carouselItemTransform = {
          animation: {
            in: {
              from: { transform: `translateX(${10 * bp}px)` },
              to: { transform: `translateX(${i * bp}px)` }
            },
            duration_in: 0.5,
            animation_fill_mode: 'forwards'
          }
        };
      }
      if (lowerLimit === activeSlideIndex) {
        // carouselPositions[lowerLimit] = {
        //   transform: `translateX(${i * bp}px) scale(1.2)`
        // };
        // i++;
        // lowerLimit++;
        // continue;
        // carouselItemTransform = {
        //   transform: `translateX(${i * bp}px) scale(1.2)`
        // };
        carouselItemTransform = {
          animation: {
            in: {
              from: { transform: `translateX(${(i - 1) * bp}px) scale(1)` },
              to: { transform: `translateX(${i * bp}px) scale(1.2)` }
            },
            duration_in: 0.5,
            animation_fill_mode: 'forwards'
          }
        };
      }
      if (children[lowerLimit]) {
        carouselPositions[lowerLimit] = carouselItemTransform;
        lowerLimit++;
        i++;
        continue;
      }

      if (lowerLimit >= children.length) {
        carouselPositions[lowerLimit - children.length] = carouselItemTransform;
        carouselLengthEnd--;
        lowerLimit++;
        i++;
        continue;
      }

      carouselPositions[children.length + lowerLimit] = carouselItemTransform;
      carouselLengthEnd--;
      lowerLimit++;
      i++;
      continue;
    }

    return carouselPositions;
  }

  function goToSlide() {
    setActiveSlideIndex(3);
  }

  function goToPrevSlide(e) {
    let slide = activeSlideIndex;
    let slidesLength = children.length;

    if (slide < 1) {
      slide = slidesLength;
    }

    --slide;

    setActiveSlideIndex(slide);
  }

  function goToNextSlide(e) {
    let slide = activeSlideIndex;
    let slidesLength = children.length - 1;

    if (slide === slidesLength) {
      slide = -1;
    }

    ++slide;

    setActiveSlideIndex(slide);
  }

  function carouselIndicator(index) {
    return (
      <Div>
        <Div display={index === activeSlideIndex ? 'active' : 'non-active'}>
          {`carousel indicator ${index}`}
        </Div>
      </Div>
    );
  }

  function getTranslatePosition(index) {
    if (carouselTranslateVals[index]) return carouselTranslateVals[index];

    return { visibility: 'hidden', height: 0, width: 0 };
  }

  // ;
  if (
    visibleCarouselCount !== null &&
    carouselCountToDisplay() !== visibleCarouselCount
  ) {
    setVisibleCarouselCount(carouselCountToDisplay());
  }

  function carouselSlide(index) {
    const carouselItemPosition = getTranslatePosition(index);
    return (
      <Li
        id={`carousel-item-${index}`}
        gridRow="1 / span 1"
        gridColumn="1 / span 1"
        transition="transform 1s"
        width={bp}
        height={bp}
        {...carouselItemStyle}
        {...carouselItemPosition}
      >
        {children[index]}
      </Li>
    );
  }

  if (!carouselTranslateVals) return <Div></Div>;

  return (
    <div {...handlers}>
      <Div {...carouselStyle}>
        <Ul
          id="styled-react-carousel-ul"
          display="grid"
          gridTemplateRows="100%"
          gridColumnRows="100%"
          width="100%"
        >
          {children.map((item, idx) => carouselSlide(idx))}
        </Ul>
      </Div>
    </div>
  );
};

export default InfiniteCarousel;
