import { useEffect, useRef, useState } from "react";
import "./App.css";
import justis from "./images/justis.png";
import skillIndia from "./images/skillindia.png";
import digitalIndia from "./images/digitalindia.png";
import Mki from "./images/Makeinindia.png";
import LOGO from "./images/ham.png";
import human from "./images/humanchat.png";
import aires from "./images/ai2.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { About } from "./components/About";
import { Link } from "react-router-dom";

import {
  faEllipsis,
  faPause,
  faMicrophone,
  faArrowRight,
  faVolumeHigh,
} from "@fortawesome/free-solid-svg-icons";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Route, Routes } from "react-router-dom";
import Burger from "./components/Burger";

function App() {
  const [userCurrentChat, setUserCurrentChat] = useState("");
  useEffect(() => {
    window.addEventListener("beforeunload", function (e) {
      // Make an AJAX request to clear the session
      fetch(
        "https://83bc-2402-3a80-4389-8021-80bf-cc1a-2791-aff.ngrok-free.app/"
      );
    });
  }, []);
  return (
    <div className="h-full">
      <Header />

      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/" element={<ChatHistoryContainer userCurrentChat={userCurrentChat} setUserCurrentChat={setUserCurrentChat} />} />
      </Routes>
    </div>
  );
}

export default App;

function Header({ imageheight, style }) {
  return (
    <header
      style={{
        overflow: "hidden",
        backgroundColor: "rgb(2 25 175)",
        // backgroundImage:
        //   "linear-gradient(83.84deg, #0088FF -6.87%, #A033FF 26.54%, #FF5C87 58.58%)",

        height: "80px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "10px",
      }}
      className="md:flex-wrap sm:flex-wrap "
    >
      <div className="flex items-center w-[50%] logo">
        <Burger />
        <div className="flex justify-between w-[90%]  ">
          <img
            style={{ height: "50px", marginLeft: "8px" }}
            src={justis}
            alt=""
          />
          <img
            style={{ height: "50px", marginLeft: "8px" }}
            src={LOGO}
            alt=""
            // className=" "
          />
        </div>
      </div>

      <div id="logoHide" style={{ display: "flex" }}>
        <img style={{ height: "50px", marginLeft: "8px" }} src={Mki} alt="" />
        <img
          style={{ height: "50px", marginLeft: "8px", paddingLeft: "2px" }}
          src={skillIndia}
          alt=""
        />
        <img
          style={{ height: "50px", marginLeft: "6px" }}
          src={digitalIndia}
          alt=""
        />
      </div>
    </header>
  );
}
function ChatHistoryContainer({ style, userCurrentChat, setUserCurrentChat }) {
  const [ch, setCh] = useState([]);

  const [err, setErr] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const url =
    "https://83bc-2402-3a80-4389-8021-80bf-cc1a-2791-aff.ngrok-free.app/";
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  // const url = "google.com";
  const refLast = useRef(null);
  useEffect(() => {
    refLast.current.scrollIntoView({ behavior: "smooth" });
  }, [ch, isLoading]);
  useEffect(
    function caller() {
      const controlerOfRequest = new AbortController();
      async function fetcher() {
        try {
          const data = {
            question: userCurrentChat,
          };
          const requestOptions = {
            method: "POST",
            headers: {
              "Content-Type": "application/json", // Set the content type according to your API's requirements
            },
            body: JSON.stringify(data), // Convert data to JSON format
            credentials: "include",
            signal: controlerOfRequest.signal,
          };
          setIsLoading(true);
          setErr("");
          const response = await fetch(url, requestOptions);
          if (!response.ok) {
            throw new Error("something wents wrong");
          }

          const datares = await response.json();
          setIsLoading(false);
          setCh(datares);
          console.log(datares);
        } catch (e) {
          setIsLoading(false);
          console.log(e.message);
          setErr(e.message);
        }
      }
      if (userCurrentChat !== "") {
        fetcher();
      }
      return () => controlerOfRequest.abort();
    },
    [userCurrentChat]
  );

  return (
    <div
      style={{ width: "100%", justifyContent: "center" }}
      className="glass  h-[85vh] md:flex-wrap "
    >
      <div
        style={{
          height: "78%",
          width: "95%",
          backgroundColor: "rgba(169, 169, 169, 0.42)",
          borderRadius: "1rem",
          backdropFilter: " blur(2px)",
        }}
        className="mx-auto mt-5 overflow-y-scroll scrollRuk"
      >
        <div style={{ height: "100px" }}>
          {ch.length === 0 && (
            <ChatsOfAi
              disStr={
                "Hello I am Here to Help You. The More We Talk The More We Get"
              }
            />
          )}
          {ch.map((element, index) =>
            Object.entries(element).map(([key, value]) => (
              <>
                <ChatOfHuman key={index + "hmn"} disStr={key} />
                <ChatsOfAi
                  ref={index === ch.length - 1 ? refLast : null}
                  key={index + "ai"}
                  disStr={value}
                />
              </>
            ))
          )}

          {isLoading && <Spinner />}
          <p ref={refLast}></p>
        </div>
      </div>
      {listening && <SpeakingGif />}
      <TextField
        userCurrentChat={userCurrentChat}
        listening={listening}
        setUserCurrentChat={setUserCurrentChat}
        transcript={transcript}
        resetTranscript={resetTranscript}
        browserSupportsSpeechRecognition={browserSupportsSpeechRecognition}
      />
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
        alignItems: "center",
      }}
    >
      <img style={{ height: "50px", marginLeft: "8px" }} src={aires} alt="" />
      <p
        style={{
          color: "white",
          backgroundColor: "rgb(13, 131, 240)",
          // backgroundImage:
          //   "linear-gradient(83.84deg, #0088FF -6.87%, #A033FF 26.54%, #FF5C87 58.58%)",
          padding: "1rem",
          borderRadius: "0.65rem",
        }}
      >
        {disStr}
      </p>
      <Spellout str={disStr} />
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
          backgroundColor: "rgb(8 205 27 / 55%)",
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
function TextField({
  setUserCurrentChat,
  listening,
  transcript,
  resetTranscript,
  browserSupportsSpeechRecognition,
}) {
  const [inpState, setInpState] = useState("");
  console.log(Boolean(inpState));

  function submitHandler(e) {
    e.preventDefault();
    setUserCurrentChat((old) => (old = inpState ? inpState : transcript));
  }
  return (
    <div>
      <form
        id="frm"
        onSubmit={submitHandler}
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "8vh",
        }}
        className="w-[95%] flex    mx-auto"
      >
        <input
          value={inpState ? inpState : transcript}
          onChange={(e) => {
            resetTranscript();
            setInpState(e.target.value);
          }}
          type="text"
          className="rounded-lg w-[91%] h-10 mr-3 "
          style={{ backgroundColor: "#c3c3c3" }}
        />
        {browserSupportsSpeechRecognition && (
          <Speak
            inpState={inpState}
            setInpState={setInpState}
            listening={listening}
            transcript={transcript}
            resetTranscript={resetTranscript}
          />
        )}

        <button type="submit" className="relative">
          <FontAwesomeIcon
            icon={faArrowRight}
            style={{ marginRight: "20px", marginLeft: "20px" }}
            className="  bg-blue-500 text-white  p-3 w-8 h-4  rounded-lg"
          />
        </button>
      </form>
    </div>
  );
}

function Spinner() {
  return (
    <div style={{ height: "20vh" }} className="glassType2">
      <div className="spinner"></div>
    </div>
  );
}
function Speak({
  inpState,
  listening,
  transcript,
  resetTranscript,
  setInpState,
}) {
  function recorder() {
    if (!listening) {
      resetTranscript();
      SpeechRecognition.startListening();
    } else {
      SpeechRecognition.stopListening();
    }
  }

  return (
    <i onClick={recorder}>
      <FontAwesomeIcon icon={faMicrophone} className=" text-blue-500 h-5 " />
    </i>
  );
}

/* ab ye component ko btn wale mein karliyo bus iske liye bhi vo loading wala state variable try kar sukta hai ye position uss arrow wale ki le lega apne aap */
function PauseBtn() {
  return (
    <div>
      <FontAwesomeIcon
        icon={faPause}
        className=" bg-blue-500 text-white absolute p-3 w-8 h-4 -bottom-3 rounded-lg"
      />
    </div>
  );
}

/* ab iss function ko har uss ai bot ke aage lagana hai ye bhi tabhi apply karna padega jab ap call ho rhi hogi aur jab bot kuch data type kar rha hoga */
function SpeakingGif() {
  return (
    <div style={{ position: "absolute" }} className="glassType2">
      <div className="spinner2"></div>
    </div>
  );
}
function Spellout({ str }) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  function spell() {
    if (!isSpeaking) {
      setIsSpeaking(true);
      window.speechSynthesis.cancel();
      let speech = new SpeechSynthesisUtterance();
      speech.text = str;
      window.speechSynthesis.speak(speech);
    } else if (isSpeaking) {
      setIsSpeaking(false);
      window.speechSynthesis.cancel();
    }
  }

  return (
    <p style={{ marginLeft: "5px" }} onClick={spell}>
      <FontAwesomeIcon
        icon={faVolumeHigh}
        style={{ fontSize: "1.5rem", color: "rgb(13, 131, 240)" }}
      />
    </p>
  );
}
