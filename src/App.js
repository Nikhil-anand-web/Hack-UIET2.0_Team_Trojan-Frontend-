import { useEffect, useState } from "react";
import "./App.css";
import justis from "./images/justis.png";
import skillIndia from "./images/skillindia.png";
import digitalIndia from "./images/digitalindia.png";
import Mki from "./images/Makeinindia.png";
import LOGO from "./images/ham.png";
import human from "./images/humanchat.png";
import aires from "./images/ai2.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMicrophone , faArrowRight } from '@fortawesome/free-solid-svg-icons'


function App() {
  const [userCurrentChat, setUserCurrentChat] = useState("");
  return (
    <div >
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
        background: "linear-gradient(90deg, rgba(255, 141, 30, 1) 0%, rgba(88, 247, 255, 1) 51%, rgba(56, 255, 154, 1) 100%)",

        height: "60px",
        display: "flex",
        justifyContent: "space-between",
      }}
      className="md:flex-wrap sm:flex-wrap"
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
    <div style={{ display: "flex", width: "100%", justifyContent: "center" }} className="glass  h-[100vh] md:flex-wrap" >
      <div
        style={{
          height: "78%",
          width: "95%",
          backgroundColor: "rgba(169, 169, 169, 0.42)",
          overflow: "hidden",
          borderRadius: "1rem",
          backdropFilter: " blur(2px)",
        }}
        className="mx-auto mt-5"
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
    <div className="absolute bottom-9 mx-auto flex w-[95%] ">
      <form onSubmit={submitHandler} className="w-[90%] mx-auto">
        <input
          value={inpState}
          onChange={(e) => setInpState(e.target.value)}
          type="text"
          className="rounded-lg w-[98%] h-10 mr-3 "
        />
        
        <button type="submit" className="relative" >
        <FontAwesomeIcon icon={faMicrophone} className="absolute right-8 bottom-0 text-blue-500 h-5 " />
        <FontAwesomeIcon icon={faArrowRight} className=" bg-blue-500 text-white absolute p-3 h-4 -bottom-3 rounded-lg" />
        </button>
      </form>
    </div>
  );
}
