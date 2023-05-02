import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="App">
      <head>
        <title>InsightfulSum</title>
      </head>

      <h1 className="text-center pt-5 heading">
        Get the Essence of Any Article with Our Tools
      </h1>
      <p className="text-center pt-2 heading fs-5 ">
        Improve your research skills by utilizing our advanced <br></br> article
        summarization and sentence extraction technology
      </p>
      <div className="cards d-flex flex-wrap justify-content-center align-items-center gap-5 mt-5 ">
        <Link
          to={"/summarizer"}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div className="card rounded ">
            <h4>Pro Summarizer</h4>
            <p>
              Summarize any article into a few key points with our advanced
              summarization tool
            </p>
          </div>
        </Link>
        <Link
          to={"/highlighter"}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div className="card rounded">
            <h4>Extractify</h4>
            <p>
              Extract important sentences from lengthy articles with our
              sentence extraction feature
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;
