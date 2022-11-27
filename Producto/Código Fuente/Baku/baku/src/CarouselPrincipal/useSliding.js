import { useState, useRef,  useLayoutEffect } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

function useWidth() {
  const theme = useTheme();
  const keys = [...theme.breakpoints.keys].reverse();
  return (
    keys.reduce((output, key) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const matches = useMediaQuery(theme.breakpoints.up(key));
      return !output && matches ? key : output;
    }, null) || 'xs'
  );
}
  const PADDINGS = 110;

  const useSliding = (elementWidth, countElements) => {
  const width2 = useWidth();
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [distance, setDistance] = useState(0);
  const [totalInViewport, setTotalInViewport] = useState(0)
  const [viewed, setViewed] = useState(0.0);

  useLayoutEffect(() => {
    //expresar padding en piceles en vez de porcentaje para que funcione en todos los dispositivos
    const containerWidth = containerRef.current.clientWidth - PADDINGS;

    setContainerWidth(containerWidth);
    const calculoIntermedio = elementWidth === 0 ? 600 : elementWidth;
    setTotalInViewport(containerWidth / calculoIntermedio );
  }, [width2]);

  const handlePrev = () => {
    setViewed(viewed - totalInViewport);
    setDistance(distance + containerWidth);
  }

  const handleNext = () => {
    setViewed(viewed + totalInViewport);
    setDistance(distance - containerWidth)
  }

  const slideProps = {
    style: { transform: `translate3d(${distance}px, 0, 0)` }
  };

  const hasPrev = distance < 0;
  const hasNext = (viewed + totalInViewport) < countElements;
  return { handlePrev, handleNext, slideProps, containerRef, hasPrev, hasNext };
}

export default useSliding;