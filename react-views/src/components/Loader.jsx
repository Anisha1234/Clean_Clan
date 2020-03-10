import React, { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';

const givenLoaderColors = ['primary', 'secondary',
  'success', 'danger', 'warning', 'info', 'light', 'dark'];

const Loader = () => {
  const [colorIndex, setColorIndex] = useState(0);
  useEffect(() => {
    const intervalID = setInterval(() => {
      setColorIndex((cIndex) => (cIndex + 1) % givenLoaderColors.length);
    }, 1000);
    return () => {
      clearInterval(intervalID);
    };
  }, []);
  return (
    <div className="cover-all">
      <div className="center-vert-hor">
        <Spinner
          animation="border"
          variant={givenLoaderColors[colorIndex]}
          size="lg"
        />
      </div>
    </div>
  );
};

export default Loader;
