import classes from "./App.module.css";

import CurrentDetailsProvider from "./store/CurrentDetailsProvider";
import InputPage from "./pages/InputPage";

function App() {
  return (
    <div className={classes.appContainer}>
      <CurrentDetailsProvider>
        <InputPage />
      </CurrentDetailsProvider>
    </div>
  );
}

export default App;
