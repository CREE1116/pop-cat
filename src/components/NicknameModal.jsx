import styles from "./ModalBasic.module.css";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
function NicknameModal(prop) {
  const dispatch = useDispatch();
  const [nickname, setNickname] = useState("");
  // 모달 끄기
  const closeModal = () => {
    dispatch({ type: "NICKNAMEMODAL", modal: false });
  };

  const onClickButton = () => {
    console.log("닉네임 설정: ", nickname);
    dispatch({
      type: "NICKNAME",
      nickname: nickname,
    });
    closeModal();
  };
  function onChangeNickname(e) {
    setNickname(e.target.value);
  }
  const enterPress = (e) => {
    if (e.key === "Enter") {
      onClickButton();
    }
  };
  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);

  return (
    <div className={styles.container}>
      <button className={styles.close} onClick={closeModal}>
        X
      </button>
      <p>닉네임 설정</p>
      <form>
        <input
          value={nickname}
          id="nickname"
          type="text"
          placeholder="닉네임을 넣어주세요(최대 10글자)"
          maxLength="10"
          size="30"
          onChange={onChangeNickname}
          onKeyDown={enterPress}
        ></input>
        <button onClick={onClickButton} id="enterButton">
          엔터!
        </button>
      </form>
    </div>
  );
}
export default NicknameModal;
