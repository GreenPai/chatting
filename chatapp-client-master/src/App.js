import socket from "./server";
import "./App.css";
import { useEffect } from "react";
import { useState } from "react";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    askUserName();
  }, []);
  const askUserName = () => {
    const userName = prompt("당신의 이름을 입력하세요");
    console.log("uuu", userName);

    socket.emit("login", userName, (res) => {
      console.log("Res", res);
      if (res?.ok) {
        setUser(res.data);
      }
    });
  };
  return (
    <div>
      <div className="App"></div>
    </div>
  );
}

export default App;
