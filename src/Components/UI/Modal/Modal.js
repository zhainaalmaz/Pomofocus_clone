import React, { useRef } from 'react';
import classes from './Modal.module.css';

const Modal = ({ children }) => {
  const divRef = useRef(null);

  return (
    <div className={classes.container}>
      <div className={classes.overlay}>
        <div className={classes.modal} ref={divRef}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
