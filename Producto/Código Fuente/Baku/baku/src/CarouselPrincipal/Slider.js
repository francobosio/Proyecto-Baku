import React, { useState } from 'react';
import cx from 'classnames';
import SliderContext from './context'
import Content from './Content'
import SlideButton from './SlideButton'
import SliderWrapper from './SliderWrapper'
import useSliding from './useSliding'
import useSizeElement from './useSizeElement'
import './Slider.scss'
import { Collapse } from '@mui/material';

const Slider = ({ children, activeSlide }) => {
  const [currentSlide, setCurrentSlide] = useState(activeSlide);
  const { width, elementRef } = useSizeElement();
  const {
    handlePrev,
    handleNext,
    slideProps,
    containerRef,
    hasNext,
    hasPrev
  } = useSliding(width, React.Children.count(children));
  
  const handleSelect = movie => {
    setCurrentSlide(movie);
  };

  const handleClose = () => {
      setCurrentSlide(null);  
  };

  const contextValue = {
    onSelectSlide: handleSelect,
    onCloseSlide: handleClose,
    elementRef,
    currentSlide,
  };

  return (
    <SliderContext.Provider value={contextValue}>
      <SliderWrapper tamaño={width}>
        <div
          className={cx('slider', { 'slider--open': currentSlide != null })}
        >
          <div ref={containerRef} className="slider__container" {...slideProps}>{children}</div>
        </div>
        {hasPrev && <SlideButton onClick={handlePrev} type="prev" tamaño={width} />}
        {hasNext && <SlideButton onClick={handleNext} type="next" tamaño={width}/>}
      </SliderWrapper>
      <Collapse in={currentSlide}>
      {currentSlide && <Content movie={currentSlide} onClose={handleClose} tamaño={width}/>}
      </Collapse>
    </SliderContext.Provider>

  );
};

export default Slider;
