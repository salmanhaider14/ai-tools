import { useEffect, useRef, useState } from "react";
import axios from "axios";
import "../app.css";
import { IoCopyOutline } from "react-icons/io5";

function Summarizer() {
  const [articleUrl, setArticleUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [typedSummary, setTypedSummary] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
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

    if (!articleUrl.trim()) {
      setError("Please enter a valid article .");
      return;
    }

    setIsLoading(true);
    setSummary("");
    setError("");

    try {
      const res = await axios.post(
        "https://api.oneai.com/api/v0/pipeline",
        {
          input: articleUrl,
          steps: [{ skill: "summarize" }],
        },
        {
          headers: {
            "Content-Type": "application/json",
            "api-key": import.meta.env.VITE_ONEAI_KEY,
          },
        }
      );

      if (res.data?.output?.length > 0) {
        setSummary(res.data.output[0].text);
      } else {
        setError("No summary could be generated. Please try another article.");
      }
    } catch (err) {
      setError("Failed to generate summary. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      const textToCopy = summary || "";
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(textToCopy);
      } else {
        const range = document.createRange();
        range.selectNodeContents(textAreaRef.current);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand("copy");
        selection.removeAllRanges();
      }
      alert("Text copied to clipboard!");
    } catch {
      alert("Failed to copy text. Please try again.");
    }
  };

  return (
    <div className="App">
      <head>
        <title>Pro Summarizer</title>
      </head>

      <h1 className="text-center pt-5 heading">Instant Article Summarizer</h1>
      <p className="text-center pt-2 sub-heading">
        Effortlessly condense any text into a concise summary with our
        AI-powered article summarizer.
      </p>

      <div className="d-flex justify-content-center align-items-center mt-5">
        <input
          type="text"
          placeholder="Paste your article or blog here"
          className="input"
          value={articleUrl}
          onChange={(e) => setArticleUrl(e.target.value)}
        />
        <button type="submit" className="button" onClick={handleSubmit}>
          Generate
        </button>
      </div>

      {isLoading && (
        <div className="text-center mt-3">
          <div className="spinner-grow" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {error && (
        <div className="text-center mt-3 text-danger">
          <p>{error}</p>
        </div>
      )}

      <div className="d-flex justify-content-center align-items-center mt-5">
        {summary && (
          <div className="summary-container rounded">
            <h1>Summary</h1>
            <p ref={textAreaRef}>{typedSummary.join("")}</p>
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
