import { useEffect, useRef, useState } from "react";
import axios from "axios";
import "../app.css";
import { IoCopyOutline } from "react-icons/io5";

function Highlighter() {
  const [articleUrl, setArticleUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [typedSummary, setTypedSummary] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const textAreaRef = useRef(null);

  useEffect(() => {
    let intervalId;
    if (summary) {
      intervalId = setInterval(() => {
        setTypedSummary((prevTypedSummary) => {
          const nextChar = summary[prevTypedSummary.length];
          if (!nextChar) {
            clearInterval(intervalId);
          }
          return [...prevTypedSummary, nextChar];
        });
      }, 25);
    }
    return () => {
      clearInterval(intervalId);
      setTypedSummary([]);
    };
  }, [summary]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage("");
    setSummary("");
    setTypedSummary([]);

    if (!articleUrl.trim()) {
      setStatusMessage("Please enter a valid article.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axios.post(
        "https://api.oneai.com/api/v0/pipeline",
        {
          input: articleUrl,
          steps: [{ skill: "highlights" }],
        },
        {
          headers: {
            "Content-Type": "application/json",
            "api-key": import.meta.env.VITE_ONEAI_KEY,
          },
        }
      );

      if (res.data && res.data.output && res.data.output[0].labels) {
        setSummary(res.data.output[0].labels);
      } else {
        setStatusMessage(
          "No highlights found. Please try a different article."
        );
      }
    } catch (error) {
      console.error(error);
      setStatusMessage(
        "Failed to fetch highlights. Please check the article or try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (e) => {
    try {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(textAreaRef.current);
      selection.removeAllRanges();
      selection.addRange(range);
      document.execCommand("copy");
      selection.removeAllRanges();
      e.target.focus();
      alert("Text copied successfully!");
    } catch {
      alert("Failed to copy text. Please try again.");
    }
  };

  return (
    <div className="App">
      <head>
        <title>Highlighter</title>
      </head>

      <h1 className="text-center pt-5 heading">Text Highlighter</h1>
      <p className="text-center pt-2 sub-heading">
        Effortlessly point out the most important information in any text
      </p>

      <div className="d-flex justify-content-center align-items-center mt-5">
        <input
          type="text"
          placeholder="Paste your article or blog here"
          className="input"
          value={articleUrl}
          onChange={(e) => setArticleUrl(e.target.value)}
        />
        <button
          type="submit"
          className="button"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? "Generating..." : "Generate"}
        </button>
      </div>

      {statusMessage && (
        <p className="text-center text-danger mt-3">{statusMessage}</p>
      )}

      {isLoading && (
        <div className="text-center mt-3">
          <div className="spinner-grow text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {summary && (
        <div className="d-flex justify-content-center align-items-center mt-5">
          <div className="summary-container rounded">
            <h1>Highlights</h1>
            <ul
              style={{
                paddingTop: "2.5rem",
              }}
              ref={textAreaRef}
            >
              {typedSummary.map((item, index) => (
                <li key={index}>{item?.value}</li>
              ))}
            </ul>
            <IoCopyOutline
              onClick={handleCopy}
              className="icon cursor-pointer"
              size={25}
              title="Copy to clipboard"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Highlighter;
