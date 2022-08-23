import React from 'react';
import cx from 'classnames';
import SliderContext from './context'
import Mark from './Mark'
import './ItemRanking.scss'

const ItemRanking = ({ movie }) => (
  <SliderContext.Consumer>
    {
    ({ onSelectSlide, currentSlide, elementRef }) => {
      const isActive = false;
      let incremento = 0;
      
      
      return (
        <div
          ref={elementRef}
          className={cx('item', {
            'item--open': true,
          })}
        >
          <img src={movie.imagenPath} alt="" onClick={() => onSelectSlide(movie)}></img>
          {isActive && <Mark />}
        </div>
      );
    }}
  </SliderContext.Consumer>
);

export default ItemRanking;
