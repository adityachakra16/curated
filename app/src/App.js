import React, { useEffect, useState } from "react";
import { addUser, getMyStats } from "./adapters/moralis";
import EmailLogin from "./components/EmailLogin";
import GrantDetail from "./components/GrantDetail";
import Navbar from "./components/Navbar";
import Tutorial from "./components/Tutorial";
const App = () => {
  const [email, setEmail] = useState("");
  const [badges, setBadges] = useState(0);
  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    if (email) {
      getMyStats(email).then((res) => {
        setBadges(Math.floor(res.get("numCurations") / 2));
      });
    }
  }, [email]);

  const responseGoogle = (response) => {
    addUser("test5@gmail.com").then((res) => {
      console.log(res);
      if (res !== "User already exists") {
        setShowTutorial(true);
      }
    });
    if (response.profileObj.email) {
      setEmail("test5@gmail.com");
    }
  };
  return (
    <div className="min-vh-100 d-flex flex-column">
      <Navbar badges={badges} />
      <Tutorial showTutorial={showTutorial} setShowTutorial={setShowTutorial} />
      {email !== "" ? (
        <GrantDetail
          email={"test5@gmail.com"}
          badges={badges}
          setBadges={setBadges}
        />
      ) : (
        <EmailLogin responseGoogle={responseGoogle} />
      )}
    </div>
  );
};
export default App;
