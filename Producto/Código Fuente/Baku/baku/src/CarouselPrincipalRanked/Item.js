import cx from 'classnames';
import Slider2Context from './context'
import Mark from './Mark'
import './Item.scss'
import Image from 'material-ui-image';

const Item = ({ movie,tamaño  }) => (
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
          <Image src={movie.imagenPath} style={{height: tamaño,width:(tamaño*2)}}  aspectRatio={0.8} color={"#4B9C8E"} onClick={() => onSelectSlide(movie)}>
          </Image>
          {isActive && <Mark />}
        </div>
      );
    }}
  </Slider2Context.Consumer>
);

export default Item;
