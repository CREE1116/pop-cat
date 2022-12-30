import React from "react";
import Popcat from "./components/Popcat";
import Ranking from "./components/Ranking";
import styles from "./App.module.css";
import reducer from "./store";
import { createStore } from "redux";
import { Provider, useSelector, useDispatch } from "react-redux";

function App() {
  const store = createStore(reducer);
  return (
    <div className={styles.container}>
      <Provider store={store}>
        <Popcat />
        <Ranking />
      </Provider>
    </div>
  );
}

export default App;
