import cx from 'classnames';
import SliderContext from './context'
import Mark from './Mark'
import './Item.scss'
import Image from 'material-ui-image';

const Item = ({ movie,tamaño }) => (
  <SliderContext.Consumer>
    {({ onSelectSlide, currentSlide, elementRef }) => {
       const isActive = currentSlide && currentSlide._id === movie._id;
      return (
        <div
          ref={elementRef}
          className={cx('item', {
            'item--open': isActive,
          })}>
          
          <Image src={movie.imagenPath} style={{height: tamaño,width:(tamaño*2)}}  aspectRatio={0.8} color={"#4B9C8E"} onClick={() => onSelectSlide(movie)}>
          </Image>
          {isActive && <Mark />}
        </div>
      );
    }}
  </SliderContext.Consumer>
);

export default Item;
