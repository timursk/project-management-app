import React, { FC } from 'react';
import ReactDOM from 'react-dom';

interface PortalProps {
  children: React.ReactNode;
}

//Portal is the neighbour element for app.
const Portal: FC<PortalProps> = ({ children }) => {
  // Create div to contain any content of modal
  const el = React.useMemo(() => document.createElement('div'), []);
  // On mount function appends modal wrapper (el), on unmount removes it
  React.useEffect(() => {
    const target: HTMLElement = document.body;

    target.appendChild(el);
    return () => {
      target.removeChild(el);
    };
  }, []);
  return ReactDOM.createPortal(children, el);
};

export default Portal;
