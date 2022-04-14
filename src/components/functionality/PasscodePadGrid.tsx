import classes from "./PasscodePadGrid.module.css";

const buttonNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

function PasscodePad() {

  return (
    <div className={classes.outerContainer}>
      <div className={classes.grid}>
        {buttonNumbers.map((item) => {
          return <div className={classes["buttons-container"]}><div className={classes["button-container"]}><button className={classes.button}>{item}</button></div></div>;
        })}
      </div>
    </div>
  );
}

export default PasscodePad;
