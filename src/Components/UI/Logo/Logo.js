import React from 'react';
import classes from './Logo.module.css';

const Logo = ({ onClick }) => {
  return (
    <div className={classes.text}>
      <h2 className={classes.link} onClick={onClick}>
        Pomofocus
      </h2>
    </div>
  );
};

export default Logo;
