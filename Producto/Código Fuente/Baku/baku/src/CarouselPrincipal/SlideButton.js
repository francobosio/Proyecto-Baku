import IconArrowDown from '../Icons/IconArrowDown'
import './SlideButton.scss'

const SlideButton = ({ onClick, type,tamaño }) => (
  <button style={{width: (tamaño/3),marginTop:(tamaño/3.9), marginBottom:(tamaño/3.9)}} className={`slide-button slide-button--${type}`} onClick={onClick} >
    <span>
      <IconArrowDown />
    </span>
  </button>
);

export default SlideButton;
