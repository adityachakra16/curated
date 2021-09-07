import React, { useEffect, useState } from "react";
import {
  getMyStats,
  getPendingGrants,
  submitCuration,
} from "../adapters/moralis";
import Loader from "./Loader";
import Confetti from "react-dom-confetti";
import Modal from "./Modal";
import ReactTooltip from "react-tooltip";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";

const config = {
  angle: 90,
  spread: 360,
  startVelocity: 50,
  elementCount: 100,
  dragFriction: 0.12,
  duration: 3500,
  stagger: 3,
  width: "10px",
  height: "10px",
  perspective: "500px",
  colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
};

const formatAddress = (address) => {
  return `${address?.substr(0, 4 + 2)}${8 < 42 ? "..." : ""}${address?.substr(
    42 - 4,
    42
  )}`;
};

const GrantDetail = (props) => {
  const [grants, setgrants] = useState({});
  const [idx, setIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [confetti, setConfetti] = useState(false);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    console.log(props.email);
    getPendingGrants(props.email).then((res) => {
      console.log(res);
      setgrants(res);
      setLoading(false);
    });
  }, [props.email]);

  const addCuration = (valid) => {
    setLoading(true);
    console.log(props.email);
    submitCuration(valid, grants[idx].get("grantId"), props.email).then(
      (res) => {
        setIdx(idx + 1);
        getMyStats(props.email).then((res) => {
          if (Math.floor(res.get("numCurations") / 5) > props.badges) {
            props.setBadges(Math.floor(res.get("numCurations") / 5));
            setLoading(false);
            setModal(true);
            setConfetti(true);
          }
          setLoading(false);
          setConfetti(false);
        });
      }
    );
  };
  if (loading) {
    return <Loader />;
  }
  if (idx === grants.length) {
    return (
      <div
        className="flex flex-col font-mono justify-center items-center h-full"
        style={{ height: "80vh" }}
      >
        <div className="">No Grants available</div>
      </div>
    );
  }
  const divStyle = {
    backcolor: "blue",
  };
  return (
    <div className="flex flex-col font-mono">
      <div className="flex flex-col h-full">
        <Modal show={modal} setModal={setModal} />
        <div className="flex flex-col justify-center items-center">
          <Confetti active={confetti} config={config} />
        </div>
        <img
          src={grants[idx]?.get("metadata").properties.bannerImage}
          alt=""
          height="290px"
          className="object-contain h-72 w-full"
          style={{
            backgroundColor: `${
              grants[idx]?.get("metadata").properties.image_css === ""
                ? "#000000"
                : grants[idx]
                    ?.get("metadata")
                    .properties.image_css.substr(17, 8)
            }`,
          }}
        ></img>
      </div>
      <div className="flex flex-row p-10 px-44">
        <div className="w-3/4">
          <div className="flex flex-col border-b-1">
            <h2 className="text-3xl font-semi my-8 tracking-wide">
              {grants[idx]?.get("metadata").name}
            </h2>{" "}
            <div className="flex flex-row mb-6">
              {grants[idx]
                ?.get("metadata")
                .properties.keywords.map((tag, idx) => {
                  return (
                    <div className="py-0 mr-3" key={idx}>
                      <span className="text-sm bg-purple-100 text-purple-600 border-gray-500 rounded-xl py-0 px-2">
                        {tag}
                      </span>
                    </div>
                  );
                })}
              <div
                className="animate-pulse text-gray-500 hover:animate-none hover:text-yellow-500"
                data-tip
                data-for="tags"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <ReactTooltip id="tags" aria-haspopup="true">
                <ol>
                  <li>Do the categories have correct spelling?</li>
                  <li>
                    Must be a category that Gitcoin allows on the platform
                  </li>
                  <li>Are the categories relevant to the grant?</li>
                </ol>
              </ReactTooltip>
            </div>
          </div>
          <div className="flex flex-col py-6 border-b-1">
            <div className="flex flex-row">
              <div
                className="grid grid-flow-col grid-cols-2 grid-rows-3 gap-4"
                style={{ width: "100%" }}
              >
                <div className="">
                  <i className="fa fa-link text-gray-400"></i>{" "}
                  <a
                    target="_blank"
                    href="https://nftlibrary.substack.com/"
                    className="py-1 px-2 mr-2 hover:underline text-purple-600"
                  >
                    {grants[idx]?.get("metadata").properties.projectWebsite}
                  </a>
                </div>
                <div className="">
                  <i className="fab fa-twitter text-gray-400"></i>{" "}
                  <a
                    target="_blank"
                    href={`https://twitter.com/${
                      grants[idx]?.get("metadata").properties.twitterHandle
                    }`}
                    className="py-1 px-2 hover:underline text-purple-600 mr-2"
                  >
                    {grants[idx]?.get("metadata").name}
                  </a>
                </div>
                <div className="">
                  <i className="fas fa-stopwatch text-gray-400"></i>{" "}
                  <a className="text-primary py-1 px-2 font-weight-normal mr-2 text-gray-500">
                    {
                      grants[idx]?.get("metadata").properties
                        .last_update_natural
                    }
                  </a>
                </div>

                <div className="">
                  <span>
                    <i className="text-gray-400 ml-1 mr-1 pr-1 pr-md-0 ml-md-0 mr-md-2 fab fa-ethereum"></i>{" "}
                    <a
                      href={`https://etherscan.io/address/${grants[idx]?.get(
                        "owner"
                      )}`}
                      target="_blank"
                      className="hover:underline text-purple-600"
                    >
                      {formatAddress(grants[idx]?.get("owner"))}
                    </a>{" "}
                    <button type="button" className="text-purple-300">
                      {/* <i className="fa fa-copy"></i> */}
                    </button>
                  </span>{" "}
                </div>
                <div className="">
                  <i className="fas fa-globe text-gray-400"></i>{" "}
                  <a className="text-primary py-1 px-2 font-weight-normal mr-2">
                    {grants[idx]?.get("metadata").properties.region?.label ===
                    ""
                      ? "Unknown"
                      : grants[idx]?.get("metadata").properties.region?.label}
                  </a>
                </div>
              </div>
              <div
                className="flex flex-col ml-2 animate-pulse text-gray-500 hover:animate-none hover:text-yellow-500"
                data-tip
                data-for="links"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <ReactTooltip id="links" aria-haspopup="true">
                <ol>
                  <li>Are all the links functional?</li>
                  <li>Are all the links legit?</li>
                  <li>Are the links relevant?</li>
                </ol>
              </ReactTooltip>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-row">
              <span className="text-3xl py-6">About</span>
              <div
                className="flex flex-col ml-2 justify-center items-center animate-pulse text-gray-500 hover:animate-none hover:text-yellow-500"
                data-tip
                data-for="about"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <ReactTooltip id="about" aria-haspopup="true">
                <ol>
                  <li>Is the description of the grant clear?</li>
                  <li>Does the grammar make sense?</li>
                  <li>Does it include all the relevant information?</li>
                </ol>
              </ReactTooltip>
            </div>
            <span className="text-base text-gray-500 font-normal tracking-tighter">
              {/* {grants[idx]?.get("metadata").description} */}
              <ReactQuill
                value={grants[idx]?.get("metadata").description_rich}
                readOnly={true}
                theme={"bubble"}
              />
            </span>
          </div>
        </div>
        <div className="w-1/4 ml-12">
          <div className="flex flex-col">
            <div className="flex flex-col justify-center px-2 py-3">
              <h2 className="text-3xl font-semi tracking-wide my-8">Team</h2>{" "}
              <img
                src={
                  grants[idx]?.get("metadata").properties.admin_profile
                    ?.avatar_url
                }
                alt="nftlibrary"
                width="50"
                height="50"
                className="rounded-circle bg-light"
              />{" "}
              <div className="flex flex-row">
                <a
                  href={
                    grants[idx]?.get("metadata").properties.admin_profile?.url
                  }
                  className="mt-2 hover:underline text-purple-600"
                  target="_blank"
                >
                  {
                    grants[idx]?.get("metadata").properties.admin_profile
                      ?.handle
                  }
                </a>
                <div
                  className="flex flex-col items-center justify-center mt-2 ml-2 animate-pulse text-gray-500 hover:animate-none hover:text-yellow-500"
                  data-tip
                  data-for="team"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <ReactTooltip id="team" aria-haspopup="true">
                  <ol>
                    <li>Does the profile seem legit?</li>
                    <li>What is their trust score?</li>
                  </ol>
                </ReactTooltip>
              </div>
            </div>
            <div className="relative">
              <div className="flex flex-col">
                <h2 className="text-3xl font-semi tracking-wide my-8">
                  Curate
                </h2>{" "}
                <span className="text-sm pb-4 flex flex-row">
                  What are the requirements
                  <svg
                    data-tip
                    data-for="global"
                    className="w-5 h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <ReactTooltip id="global" aria-haspopup="true">
                    <p>Requirements (for the Gitcoin entity):</p>
                    <ol>
                      <li>Must be in the correct category</li>
                      <li>
                        Must be a category that Gitcoin allows on the platform
                      </li>
                      <li>Must be a legitimate project</li>
                      <li>Must have a description that makes sense</li>
                      <li>No offensive content</li>
                      <li>Image of the project makes sense</li>
                    </ol>
                  </ReactTooltip>
                </span>
                <div className="flex flex-row">
                  <button
                    className="bg-purple-100 text-purple-600 rounded-xl px-2 flex flex-row mr-4 hover:bg-purple-300 ransition-colors duration-1000 ease-in-out"
                    onClick={() => addCuration("Yes")}
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Approve
                  </button>
                  <button
                    className="bg-red-300 text-purple-600 rounded-xl px-2 flex flex-row mr-4 hover:bg-red-400 ransition-colors duration-1000 ease-in-out"
                    onClick={() => addCuration("No")}
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    Reject
                  </button>
                  <button
                    className="bg-yellow-200 text-purple-600 rounded-xl px-2 flex flex-row mr-4 hover:bg-yellow-400 ransition-colors duration-1000 ease-in-out"
                    onClick={() => addCuration("Unsure")}
                  >
                    <svg
                      className="w-6 h-6 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Unsure
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrantDetail;
