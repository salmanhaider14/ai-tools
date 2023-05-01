import { useEffect, useRef, useState } from "react";
import axios from "axios";
import "../app.css";
import { IoCopyOutline } from "react-icons/io5";
function Summarizer() {
  const [myText, setmyText] = useState("");
  const [grammerReport, setGrammerReport] = useState("");
  const textAreaRef = useRef(null);
  const [typedRepot, setTypedReport] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let intervalId;
    if (grammerReport) {
      intervalId = setInterval(() => {
        setTypedReport((preveTypedReport) => {
          const nextChar = grammerReport[preveTypedReport.length];
          if (!nextChar) {
            clearInterval(intervalId);
          }
          return [...preveTypedReport, nextChar];
        });
      }, 25);
    }
    return () => {
      clearInterval(intervalId);
      setTypedReport([]);
    };
  }, [grammerReport]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setGrammerReport("");
    const res = await axios.post(
      "https://api.pawan.krd/v1/completions",
      {
        model: "text-davinci-003",
        prompt: `Human:   Highlight the error and improvements in the following text. Also tell what you haved improved in the text : ${myText}`,
        temperature: 0.4,
        max_tokens: 300,
        stop: ["Human:", "AI:"],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer pk-sHhqMuhdNTsjOnSyiQSyVUsWuTKmlMmIdhrcgFWnYzPGqYKV`,
        },
      }
    );
    setGrammerReport(res.data.choices[0].text);
    setIsLoading(false);
  };

  const handleCopy = (e) => {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(textAreaRef.current);
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand("copy");
    selection.removeAllRanges();
    e.target.focus();
    alert("text copied");
  };

  return (
    <div className="App">
      <nav class="navbar navbar-expand-lg bg-transparent">
        <div class="container-fluid">
          <a class="navbar-brand ps-5 fw-bold text-primary" href="/">
            <p>Summ It</p>
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
              {/* <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
      <h1 className="text-center pt-5 heading">
        Proofread Your Text Like a Pro with AI
      </h1>
      <p className="text-center pt-2 heading fs-5">
        The Only Tool You Need to Write Perfectly
      </p>

      <div className="d-flex justify-content-center align-items-center mt-5">
        <input
          type="text"
          placeholder="Enter your text"
          className="input"
          onChange={(e) => setmyText(e.target.value)}
        />
        <button type="submit" className="button" onClick={handleSubmit}>
          Generate
        </button>
      </div>
      {isLoading && (
        <div className="text-center">
          <div class="spinner-grow" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      <div className="d-flex justify-content-center align-items-center mt-5">
        {grammerReport && (
          <div className="summary-container rounded">
            <h1>Improved Text</h1>
            {typedRepot.length > 0 && (
              <p ref={textAreaRef}>{typedRepot.join("")}</p>
            )}
            <IoCopyOutline
              onClick={handleCopy}
              className="icon cursor-pointer"
              size={25}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Summarizer;
