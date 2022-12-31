import React, { useState, useEffect, useRef } from "react";
import styles from "./Ranking.module.css";
import { useDispatch, useSelector } from "react-redux";

function Ranking(props) {
  const [RankingMode, setRankingMode] = useState(false);
  const dispatch = useDispatch();
  const count = useSelector((state) => state.count);
  const Top10 = useSelector((state) => state.top10);
  const id = useSelector((state) => state.id);
  const ranking = useSelector((state) => state.ranking);

  useEffect(() => {
    const onlineButton = document.getElementsByClassName(
      styles.onlineButton
    )[0];
    onlineButton.addEventListener("click", () => {
      setRankingMode((prev) => !prev);
    });
    return () => {
      onlineButton.removeEventListener("click", () => {
        setRankingMode((prev) => !prev);
      });
    };
  }, []);
  useEffect(() => {
    if (RankingMode) {
      dispatch({ type: "ONLINE" });
    } else dispatch({ type: "OFFLINE" });
  }, [RankingMode]);
  return (
    <div className={styles.RankingDiv}>
      <button className={styles.onlineButton}>
        {RankingMode ? "오프라인가자!" : "온라인가자!"}
      </button>
      {RankingMode ? (
        <>
          <div className={styles.rankList}>
            <h1 className={styles.title}>Ranking</h1>
            {Top10 === undefined ? null : (
              <div className={styles.rankList}>
                {Top10.map((item, index) => (
                  <p key={item.id.substring(0, 5)}>
                    {item.ranking}등: {item.id.substring(0, 5)} ({item.count})
                  </p>
                ))}
              </div>
            )}
            <p>
              YOU :{ranking}등 {id.substring(0, 5)} ({count})
            </p>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default Ranking;
