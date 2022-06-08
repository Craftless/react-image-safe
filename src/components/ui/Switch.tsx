import classes from "./Switch.module.css";

function Switch({
  onInput,
}: {
  onInput: React.FormEventHandler<HTMLInputElement>;
}) {
  return (
    <label className={classes.switch}>
      <input type="checkbox" onInput={onInput} />
      <span className={`${classes.slider} ${classes.round}`}></span>
    </label>
  );
}

export default Switch;
