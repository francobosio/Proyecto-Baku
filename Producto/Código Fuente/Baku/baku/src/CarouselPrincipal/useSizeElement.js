import { useState, useRef, useLayoutEffect } from 'react'
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
const useSizeElement = () => {
  const width2 = useWidth();
  const elementRef = useRef(null);
  const [width, setWidth] = useState(0);

   useLayoutEffect(() => {
    setWidth(elementRef.current.clientWidth);
  }, [width2]);
  return { width, elementRef };
}

export default useSizeElement;