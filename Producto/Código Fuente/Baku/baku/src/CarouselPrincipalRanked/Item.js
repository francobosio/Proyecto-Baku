import React from 'react';
import cx from 'classnames';
import Slider2Context from './context'
import Mark from './Mark'
import './Item.scss'

const Item = ({ movie }) => (
  <Slider2Context.Consumer>
    {({ onSelectSlide, currentSlide, elementRef }) => {
       const isActive = currentSlide && currentSlide._id === movie._id;
      return (
        <div
          ref={elementRef}
          className={cx('item', {
            'item--open': isActive,
          })}>
          
          {(movie.ordenRanking?(<h1 className='numero' onClick={() => onSelectSlide(movie)}>{movie.ordenRanking}</h1> ): null)}
          <img src={movie.imagenPath} alt="" onClick={() => onSelectSlide(movie)} ></img>
          {isActive && <Mark />}
        </div>
      );
    }}
  </Slider2Context.Consumer>
);

export default Item;
