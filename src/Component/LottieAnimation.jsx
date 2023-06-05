import React from 'react';
import lottie from 'lottie-web';
import { useEffect, useRef } from 'react';
const Loading = ({ iconJson }) => {
  const container = useRef(null);
  useEffect(() => {
    const animation = lottie.loadAnimation({
      container: container.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: iconJson
    });
    return () => {
      animation.destroy();
    };
  }, [iconJson]);

  return <div ref={container}></div>;
};
export default Loading;
