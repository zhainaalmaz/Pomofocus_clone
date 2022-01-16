import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import classes from './Card.module.css';

const Card = (props) => {
  const bgColor = useSelector((state) => state.timer.globalStyle);

  useEffect(
    () => (document.getElementById('id').style.backgroundColor = bgColor),
    [bgColor]
  );

  return (
    <div id="id" className={`${classes.card} ${props.className}`}>
      {props.children}
    </div>
  );
};

export default Card;
