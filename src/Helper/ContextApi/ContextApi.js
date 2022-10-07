import { createContext, useEffect, useState } from "react";

export const ContextApi = createContext({});

export const ContextAPIProvider = (props) => {
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

  useEffect(() => {
    setUserObj(props?.contextData?.userObj);
  }, [props.contextData.userObj]);

  const value = {
    userObj,
  };

  return (
    <>
      <ContextApi.Provider value={value}>{props.children}</ContextApi.Provider>
    </>
  );
};