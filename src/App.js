import React, { useRef, useEffect, useState } from "react";
import Popcat from "./components/Popcat";
import Ranking from "./components/Ranking";
import styles from "./App.module.css";
import { useSelector, useDispatch } from "react-redux";
import NicknameModal from "./components/NicknameModal";
import LoginModal from "./components/LoginModal";

function App() {
  const online = useSelector((state) => state.onlineMode);
  const id = useSelector((state) => state.id);
  const count = useSelector((state) => state.count);
  const rankingMode = useSelector((state) => state.rankingMode);
  const nicknamemodal = useSelector((state) => state.nicknamemodal);
  const loginmodal = useSelector((state) => state.loginmodal);
  const name = useSelector((state) => state.nickname);
  const ws = useRef(null);
  const dispatch = useDispatch();
  const wsurl = //"ws://localhost:8080/popcat_server";
    "wss://port-0-pop-cat-server-cf24lca6hcal.gksl2.cloudtype.app/popcat_server";
  useEffect(() => {
    if (online) {
      console.log("connecting to  ", wsurl);
      ws.current = new WebSocket(wsurl);
      ws.current.onopen = () => {
        console.log("connected");
        if (id.length > 0) {
          ws.current.send(JSON.stringify({ type: "login", id: id }));
        }
      };
      ws.current.onmessage = (e) => {
        const data = JSON.parse(e.data);
        console.log("ws messgae", data);
        if (data.type === "ranking") {
          dispatch({ type: "RANKING", ranking: data.data });
        } else if (data.type === "top10") {
          dispatch({ type: "TOP10", top10: data.data });
        } else if (data.type === "id") {
          console.log("id", data.data);
          if (id.length < 1) {
            dispatch({ type: "ID", id: data.data });
          } else {
            console.log("id is exist", data.data);
            localStorage.setItem("tempId", data.data);
            console.log("save temp id:", localStorage.getItem("tempId"));
          }
        } else if (data.type === "login") {
          console.log(data.count, data.name);
          dispatch({ type: "SET", count: data.count });
          dispatch({ type: "NICKNAME", nickname: data.name });
        } else if (data.type === "loginFail") {
          console.log("login fail temp:", localStorage.getItem("tempId"));
          dispatch({ type: "ID", id: localStorage.getItem("tempId") });
          localStorage.removeItem("tempId");
        }
      };
      ws.current.onclose = (e) => {
        console.log("disconnected");
        dispatch({ type: "OFFLINE" });
        console.log(e);
      };
    }
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [online]);

  useEffect(() => {
    if (online && rankingMode) {
      ws.current.send(
        JSON.stringify({
          type: "count",
          id: id,
          count: count,
        })
      );
    } else if (!online && rankingMode) {
      dispatch({ type: "ONLINE" });
    }
  }, [count]);

  useEffect(() => {
    if (online) {
      ws.current.send(
        JSON.stringify({
          type: "nickname",
          id: id,
          name: name,
        })
      );
    }
  }, [name]);

  return (
    <div className={styles.container}>
      {nicknamemodal ? <NicknameModal /> : null}
      {loginmodal ? <LoginModal /> : null}
      <h1 className={styles.title}>POP CAT</h1>
      <Popcat />
      <div className={styles.idContainer}>
        {id.length < 1 ? null : <p> 아이디: {id}</p>}
      </div>
      <Ranking />
      <footer><a href='https://github.com/CREE1116'>개발자 깃허브 가기</a></footer>
    </div>
  );
}

export default App;
