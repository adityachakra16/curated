import React, { useState } from "react";

import img1 from "../assets/curateimg1.JPG";
import img2 from "../assets/curateimg2.JPG";
import img3 from "../assets/curateimg3.JPG";

const Tutorial = (props) => {
  const [number, setNumber] = useState(0);
  return (
    <>
      {props.showTutorial && (
        <>
          <div
            className={`justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none font-mono`}
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div
                className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
                style={{
                  width: "600px",
                  maxWidth: "600px",
                  height: "500px",
                  maxHeight: "500px",
                }}
              >
                {/*header*/}
                <div className="flex flex-row items-center justify-center p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3
                    className="text-3xl text-center"
                    style={{ width: "100%" }}
                  >
                    Welcome
                  </h3>
                </div>
                {/*body*/}
                <div
                  className="p-6 text-base text-center"
                  style={{ height: "400px" }}
                >
                  {number === 0 && (
                    <p className="my-4 text-blueGray-500 leading-relaxed">
                      Welcome to the gitcoin curation grant system! <br />
                      This tutorial will help you get started with this
                      platform!
                    </p>
                  )}
                  {number === 1 && (
                    <p
                      className={`my-4 text-blueGray-500 leading-relaxed transform transition-all ease-out`}
                    >
                      This platform is designed to reward you in exchange of
                      getting high quality curation for our grants <br />
                      Next steps would guide you in using this platform!
                    </p>
                  )}
                  {number === 2 && (
                    <p className="my-4 text-blueGray-500 leading-relaxed">
                      There are hints at all the sections which indicate the
                      requirements needed.
                      <div className="flex flex-row items-center justify-center mt-2">
                        <img src={img1} style={{ height: "190px" }} />
                      </div>
                    </p>
                  )}
                  {number === 3 && (
                    <p className="my-4 text-blueGray-500 leading-relaxed">
                      Add your curation through these buttons. Be sure to check
                      thoroughly before adding your curation as wrong curation
                      affects your rewards drastically!
                      <div className="flex flex-row items-center justify-center mt-2">
                        <img src={img3} style={{ height: "190px" }} />
                      </div>
                    </p>
                  )}
                  {number === 4 && (
                    <p className="my-4 text-blueGray-500 leading-relaxed">
                      Earn badges from completing a set number of curations
                      <img src={img2} style={{ height: "190px" }} />
                    </p>
                  )}
                  {number === 5 && (
                    <p className="my-4 text-blueGray-500 leading-relaxed">
                      You are all set to go! Have fun!!
                    </p>
                  )}
                </div>
                {/*footer*/}
                <div className="flex flex-row items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  {number !== 5 && (
                    <button
                      className="flex flex-row text-purple-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => {
                        setNumber(number + 1);
                      }}
                    >
                      Next
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  )}
                  {number === 5 && (
                    <button
                      className="flex flex-row text-purple-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 animate-bounce"
                      type="button"
                      onClick={() => {
                        props.setShowTutorial(false);
                      }}
                    >
                      Get started
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  );
};

export default Tutorial;
