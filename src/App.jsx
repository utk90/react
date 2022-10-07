import { useState } from "react";
import "./App.css";
import Main from "./Components/Page/Main";
import { ContextAPIProvider } from "./Helper/ContextApi/ContextApi";

const App = () => {
  const [userObj, setUserObj] = useState({
    emailId: "",
    password: "",
    firstName: "",
    lastName: "",
    address: "",
    countryCode: "",
    phoneNumber: "",
    acceptTermsAndCondition: "",
  });

  const updateUserObj = (newObj) => {
    setUserObj(newObj);
  };

  return (
    <div className="App">
      <ContextAPIProvider
        contextData={{
          userObj: userObj,
        }}
      >
        <Main updateUserObj={updateUserObj} />
      </ContextAPIProvider>
    </div>
  );
};

export default App;