import classes from './Switch.module.css';

export default function Switch({ onClick, checked }) {
  return (
    <div className={classes.center}>
      <input type="checkbox" name="" onClick={onClick} checked={checked} />
    </div>
  );
}
