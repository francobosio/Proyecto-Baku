import React from 'react';
import cx from 'classnames';
import SliderContext from './context'
import ShowDetailsButton from './ShowDetailsButton'
import Mark from './Mark'
import './Item.scss'

const Item = ({ movie }) => (
  <SliderContext.Consumer>
    {({ onSelectSlide, currentSlide, elementRef }) => {
      const isActive = false;
      return (
        <div
          ref={elementRef}
          className={cx('item', {
            'item--open': true,
          })}
        >
          <img src={movie.image} alt="" onClick={() => onSelectSlide(movie)} ></img>
          {isActive && <Mark />}
        </div>
      );
    }}
  </SliderContext.Consumer>
);

export default Item;
