import { useEffect, useState } from "react";
import "./App.css";
import justis from "./images/justis.png";
import skillIndia from "./images/skillindia.png";
import digitalIndia from "./images/digitalindia.png";
import Mki from "./images/Makeinindia.png";
import LOGO from "./images/ham.png";
import human from "./images/humanchat.png";
import aires from "./images/ai2.png";
function App() {
  const [userCurrentChat, setUserCurrentChat] = useState("");
  return (
    <div>
      <Header />
      <ChatHistoryContainer
        userCurrentChat={userCurrentChat}
        setUserCurrentChat={setUserCurrentChat}
      />
      <TextField
        userCurrentChat={userCurrentChat}
        setUserCurrentChat={setUserCurrentChat}
      />
      <p>{userCurrentChat}</p>
    </div>
  );
}

export default App;

function Header({ imageheight, style }) {
  return (
    <header
      style={{
        overflow: "hidden",
        backgroundColor: "#007BFF",

        height: "50px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <img style={{ height: "50px", marginLeft: "8px" }} src={justis} alt="" />
      <img style={{ height: "50px", marginLeft: "8px" }} src={LOGO} alt="" />
      <div style={{ display: "flex" }}>
        <img style={{ height: "50px", marginLeft: "8px" }} src={Mki} alt="" />
        <img
          style={{ height: "50px", marginLeft: "8px" }}
          src={skillIndia}
          alt=""
        />
        <img
          style={{ height: "50px", marginLeft: "8px" }}
          src={digitalIndia}
          alt=""
        />
      </div>
    </header>
  );
}
function ChatHistoryContainer({ style, userCurrentChat, setUserCurrentChat }) {
  const [ch, setCh] = useState([
    { question: "here is the answer" },
    { question2: "here is the answer2" },
    { question2: "here is the answer2" },
    { question2: "here is the answer2" },
    { question2: "here is the answer2" },
    { question2: "here is the answer2" },
  ]);
  const url = "http://192.168.234.1:8000/";
  // const url = "google.com";

  useEffect(
    function caller() {
      async function fetcher() {
        const data = {
          question: userCurrentChat,
        };
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Set the content type according to your API's requirements
          },
          body: JSON.stringify(data), // Convert data to JSON format
        };
        const response = await fetch(url, requestOptions);
        const datares = await response.json();
        setCh(datares);
        console.log(datares);
      }
      if (userCurrentChat !== "") {
        fetcher();
      }
    },
    [userCurrentChat]
  );

  return (
    <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
      <div
        style={{
          height: "79vh",
          width: "91%",
          backgroundColor: "rgba(169, 169, 169, 0.42)",

          overflow: "scroll",
          borderRadius: "1rem",
          marginTop: "3%",
          backdropFilter: " blur(2px)",
        }}
      >
        <div style={{ height: "100px" }}>
          {ch.map((element) =>
            Object.entries(element).map(([key, value]) => (
              <>
                <ChatOfHuman disStr={key} />
                <ChatsOfAi disStr={value} />
              </>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
function ChatsOfAi({ disStr }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "start",
        padding: "1rem",
        borderRadius: "0.65rem",
      }}
    >
      <img style={{ height: "50px", marginLeft: "8px" }} src={aires} alt="" />
      <p
        style={{
          color: "white",
          backgroundColor: "rgb(13, 131, 240)",
          padding: "1rem",
          borderRadius: "0.65rem",
        }}
      >
        {disStr}
      </p>
    </div>
  );
}

function ChatOfHuman({ disStr }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "end",
        padding: "1rem",
        borderRadius: "0.65rem",
      }}
    >
      <p
        style={{
          backgroundColor: "#69FF6B",
          padding: "1rem",
          borderRadius: "0.65rem",
          color: "white",
        }}
      >
        {disStr}
      </p>
      <img style={{ height: "50px", marginLeft: "8px" }} src={human} alt="" />
    </div>
  );
}
function TextField({ userCurrentChat, setUserCurrentChat }) {
  const [inpState, setInpState] = useState("");
  function submitHandler(e) {
    e.preventDefault();
    setUserCurrentChat((old) => (old = inpState));
  }
  return (
    <div>
      <form onSubmit={submitHandler}>
        <input
          value={inpState}
          onChange={(e) => setInpState(e.target.value)}
          type="text"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
