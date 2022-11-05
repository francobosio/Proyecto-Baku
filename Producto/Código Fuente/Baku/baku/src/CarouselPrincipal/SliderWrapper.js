import './SliderWrapper.scss'

const SliderWrapper = ({ children,tamaño }) => (
  <div className="slider-wrapper" style={{paddingTop: tamaño/3 , paddingBottom: tamaño/3}}>
    {children}
  </div>
);

export default SliderWrapper;
