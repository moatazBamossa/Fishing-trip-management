import { FC } from 'react';
import './style.css'; // Import the CSS styles

const Loader: FC = () => {
  return (
    <div className="loader-container">
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
