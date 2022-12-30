import React from "react";
import Popcat from "./components/Popcat";
import Ranking from "./components/Ranking";
import styles from "./App.module.css";
function App() {
  return (
    <div className={styles.container}>
      <Popcat />
      <Ranking />
    </div>
  );
}

export default App;
