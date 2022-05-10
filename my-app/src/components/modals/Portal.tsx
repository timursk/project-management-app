import styled from '@emotion/styled';
import React, { FC, useEffect } from 'react';
import ReactDOM from 'react-dom';

interface PortalProps {
  children: React.ReactNode;
}

// Это два соседних контейнера в DOM
const Portal: FC<PortalProps> = ({ children }) => {
  // Create div to contain everything
  const el = React.useMemo(() => document.createElement('div'), []);
  // On mount function
  React.useEffect(() => {
    const target: HTMLElement = document.body;

    target.appendChild(el);
    return () => {
      target.removeChild(el);
    };
  }, [el]);
  return ReactDOM.createPortal(children, el);
};

export default Portal;
