import React, { useRef, useEffect, useState } from "react";
import Popcat from "./components/Popcat";
import Ranking from "./components/Ranking";
import styles from "./App.module.css";
import reducer from "./store";
import { createStore } from "redux";
import { Provider, useSelector, useDispatch } from "react-redux";

function App() {
  const online = useSelector((state) => state.onlineMode);
  const id = useSelector((state) => state.id);
  const count = useSelector((state) => state.count);
  const ws = useRef(null);
  const dispatch = useDispatch();
  const wsurl =
    "wss://port-0-pop-cat-server-cf24lca6hcal.gksl2.cloudtype.app/popcat_server";
  useEffect(() => {
    if (online) {
      console.log("connecting to  ", wsurl);
      ws.current = new WebSocket(wsurl);
      ws.current.onopen = () => {
        console.log("connected");
      };
      ws.current.onmessage = (e) => {
        const data = JSON.parse(e.data);
        if (data.type === "ranking") {
          dispatch({ type: "RANKING", ranking: data.data });
          console.log(data.data);
        } else if (data.type === "top10") {
          dispatch({ type: "TOP10", top10: data.data });
          console.log(data.data);
        } else if (data.type === "id") {
          dispatch({ type: "ID", id: data.data });
          console.log(data.data);
        }
      };
      ws.current.onclose = () => {
        console.log("disconnected");
        dispatch({ type: "OFFLINE" });
      };
    }
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [online]);

  useEffect(() => {
    if (online) {
      console.log(
        JSON.stringify({
          id: id,
          count: count,
        })
      );
      ws.current.send(
        JSON.stringify({
          id: id,
          count: count,
        })
      );
    }
  }, [count]);

  return (
    <div className={styles.container}>
      <Popcat />
      <Ranking />
    </div>
  );
}

export default App;
