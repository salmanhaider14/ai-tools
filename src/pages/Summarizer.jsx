import { useEffect, useRef, useState } from "react";
import axios from "axios";
import "../app.css";
import { IoCopyOutline } from "react-icons/io5";
function Summarizer() {
  const [articleUrl, setArticleUrl] = useState("");
  const [summary, setSummary] = useState("");
  const textAreaRef = useRef(null);
  const [typedSummary, setTypedSummary] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    setSummary("");
    const res = await axios.post(
      "https://api.oneai.com/api/v0/pipeline",
      {
        input: articleUrl,
        steps: [
          {
            skill: "summarize",
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          "api-key": "b6f83746-f1f6-4a79-9cdd-4668d6b6f73a",
        },
      }
    );

    setSummary(res.data.output[0].text);
    // const res = await axios.post(
    //   "https://api.pawan.krd/v1/completions",
    //   {
    //     model: "text-davinci-003",
    //     prompt: `Human: Please summarize the following article: ${articleUrl}`,
    //     temperature: 0.5,
    //     max_tokens: 300,
    //     stop: ["Human:", "AI:"],
    //   },
    //   {
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer pk-sHhqMuhdNTsjOnSyiQSyVUsWuTKmlMmIdhrcgFWnYzPGqYKV`,
    //     },
    //   }
    // );
    // setSummary(res.data.choices[0].text);

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
      <head>
        <title>Pro Summarizer</title>
      </head>

      <h1 className="text-center pt-5 heading">Instant Article Summarizer</h1>
      <p className="text-center pt-2 sub-heading  ">
        Effortlessly condense any text into a concise summary with our
        AI-powered article summarizer
      </p>

      <div className="d-flex justify-content-center align-items-center mt-5">
        <input
          type="text"
          placeholder="Enter article url"
          className="input"
          onChange={(e) => setArticleUrl(e.target.value)}
        />
        <button type="submit" className="button" onClick={handleSubmit}>
          Generate
        </button>
      </div>
      {isLoading && (
        <div className="text-center mt-3">
          <div class="spinner-grow" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      <div className="d-flex justify-content-center align-items-center mt-5">
        {summary && (
          <div className="summary-container rounded">
            <h1>Summary</h1>
            {typedSummary.length > 0 && (
              <p ref={textAreaRef}>{typedSummary.join("")}</p>
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
