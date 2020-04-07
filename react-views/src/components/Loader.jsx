<<<<<<< HEAD
<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';

const givenLoaderColors = ['primary', 'danger', 'warning',
  'success', 'secondary', 'light', 'info', 'dark'];

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
=======
import React from 'react';

const Loader = () => (
  <div>
    ...Browser is loading, bitches...
  </div>
);
>>>>>>> 0cb3de1... Rename components to reduce file name length
=======
import React, { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';

const givenLoaderColors = ['primary', 'danger', 'warning',
  'success', 'secondary', 'light', 'info', 'dark'];

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
>>>>>>> b7879d0... bootstrap login and signup page

export default Loader;
