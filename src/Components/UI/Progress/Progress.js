import classes from './Progress.module.css';

export default function ProgressPercentage({ percent }) {
  return (
    <div className={classes.container}>
      <div className={classes.progress} style={{ width: `${percent}%` }} />
    </div>
  );
}
