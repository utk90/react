import React, { useContext, useEffect, useState } from "react";
import { ContextApi } from "../../Helper/ContextApi/ContextApi";
import Validation from "../Validation/Validation";
import "./Form.css";

const Form = (props) => {
  const { userObj } = useContext(ContextApi);
  const { handlePrev, handleNext, handleSave, formItems, pageId } = props;

  const [user, setUser] = useState(userObj);
  const [error, setError] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const prevHandler = (e) => {
    console.log("---user", user);
    console.log("---userObj", userObj);
    setUser(userObj);
    e.preventDefault();
    handlePrev();
  };

  const saveNextHandler = (e, isNext) => {
    e.preventDefault();
    const errors = Validation(user, pageId);
    if (!isNext) {
      if (pageId === 3) {
        setError(errors);
        if (Object.keys(errors).length > 0) return;
      }
      handleSave(user);
      return;
    }
    setError(errors);
    if (Object.keys(errors).length === 0) {
      document.getElementById("user-form").reset();
      if (isNext) handleNext(user);
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    console.log("checking", error);
  });

  return (
    <form onSubmit={handleSubmit} id="user-form">
      <div className="form-title">{`USER FORM STEP-${pageId}`}</div>
      {formItems.map((item, index) => {
        return (
          <div className="label-input" key={item.label + "_" + index}>
            <label value={item?.label}>{item?.title}: </label>
            <input
              type={item?.type}
              id={item?.label}
              value={
                item?.label && user?.[item?.label] ? user[item?.label] : ""
              }
              name={item?.label}
              placeholder={item?.placeholder}
              required={item?.required}
              onChange={handleChange}
            />
            <div className="form-error">{error[item?.label]}</div>
          </div>
        );
      })}
      <div className="back-save-btn">
        <button onClick={prevHandler} disabled={pageId === 1}>
          BACK
        </button>
        <button onClick={(e) => saveNextHandler(e, false)}>SAVE</button>
      </div>
      <button onClick={(e) => saveNextHandler(e, true)} disabled={pageId === 3}>
        SAVE AND NEXT
      </button>
    </form>
  );
};

export default Form;
--------------------------
form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 80vh;
    margin: 0 auto;
    gap: 10px;
    background-color: #ddd;
    width: fit-content;
    padding: 80px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    font-size: 16px;
}

form input {
    padding: 6px;
    margin: 10px 0;
    width: 200px;
}

form label {
    font-size: 20px;
}

.form-title {
    font-size: 40px;
    font-weight: 700;
    margin-bottom: 60px;
}

.form-error {
    position: absolute;
    margin-top: -5px;
    color: red;
}

form .back-save-btn {
    /* margin: 20px 15px; */
    margin-top: 40px;
    margin-bottom: 10px;
}

button {
    cursor: pointer;
    font-size: 16px;
    padding: 10px;
    /* margin: 15px 0; */
}
-----------------------
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { ContextApi } from "../../Helper/ContextApi/ContextApi";
import { postMethod } from "../../Service/Service";
import Form from "../Form/Form";

const form1 = [
  {
    label: "emailId",
    title: "Email Id",
    placeholder: "write email",
    required: true,
    type: "email",
    validation: "",
  },
  {
    label: "password",
    title: "Password",
    placeholder: "write password",
    required: true,
    type: "password", //tbd
    validation:
      "Must contain minimum 2 capital letters, 2 small letter, 2 numbers and 2 special characters.",
  },
];
const form2 = [
  {
    label: "firstName",
    title: "Firstname",
    placeholder: "write firstName",
    required: true,
    type: "text",
    validation: "Allow only alphabets. Minimum of 2 character and maximum 50.",
  },
  {
    label: "lastName",
    title: "Lastname",
    placeholder: "write lastName",
    required: false,
    type: "text", //tbd
    validation: "Allow only alphabets.",
  },
  {
    label: "address",
    title: "Address",
    placeholder: "write address",
    required: true,
    type: "text", //tbd
    validation: "Minimum length 10.",
  },
];
const form3 = [
  {
    label: "countryCode",
    title: "Country Code",
    placeholder: "write countryCode",
    required: true,
    type: "text",
    validation: "Allow only 2 country code, India (+91) and America (+1).",
  },
  {
    label: "phoneNumber",
    title: "Phone no",
    placeholder: "write phoneNumber",
    required: true,
    type: "text", //tbd
    validation: "Allow only 10 digit numeric phone number",
  },
  {
    label: "acceptTermsAndCondition",
    title: "Accept terms and condition",
    placeholder: "write acceptTermsAndCondition",
    required: true,
    type: "text", //tbd
    validation: "",
  },
];

const Main = ({ updateUserObj }) => {
  const { userObj } = useContext(ContextApi);
  const [pageId, setPageId] = useState(1);
  const [userField, setUserField] = useState(form1);

  const handleNext = (objToSave) => {
    console.log("CHECK", pageId);
    updateUserObj(objToSave);
    setPageId(pageId + 1);
  };

  const handlePrev = () => {
    setPageId(pageId - 1);
  };

  const handleSave = (objToSave) => {
    updateUserObj(objToSave);

    if (pageId === 3) {
      postMethod(objToSave).then((data) => console.log("API RES DATA", data));
      console.log("SUBMIT DATA-------->");
    }
  };

  useEffect(() => {
    if (pageId === 1) {
      setUserField(form1);
    } else if (pageId === 2) {
      setUserField(form2);
    } else {
      setUserField(form3);
    }
    console.log("PAGEID", pageId);
  }, [pageId]);

  return (
    <div>
      <Form
        formItems={userField}
        handleNext={handleNext}
        handlePrev={handlePrev}
        handleSave={handleSave}
        pageId={pageId}
        userObj={userObj}
        updateUserObj={updateUserObj}
      />
    </div>
  );
};

export default Main;
-----------------------------
const Validation = (data, pageId) => {
  let error = {};

  console.log("dataToValidate:", data);
  const validatePassword = () => {
    if (data.password?.length < 8) {
      error = {
        ...error,
        password: "Your password must be at least 8 characters",
      };
    }
    if (data.password?.search(/[a-z]/i) < 0) {
      error = {
        ...error,
        password: "Your password must contain at least one letter.",
      };
    }
    if (data.password?.search(/[0-9]/) < 0) {
      error = {
        ...error,
        password: "Your password must contain at least one digit.",
      };
    }
  };

  const validateName = () => {
    if (!(data.firstName?.length > 2 && data.firstName?.length <= 50)) {
      error = {
        ...error,
        firstName: "Your firstName must be at least 2 to 50 characters",
      };
    }
    if (data.lastName && data.lastName?.search(/[a-z]/i) < 0) {
      error = {
        ...error,
        lastName: "Your lastName must contain at least one letter.",
      };
    }
  };

  const validateAddress = () => {
    if (data.address?.length < 10) {
      error = {
        ...error,
        address: "Your address must be at least 10 characters",
      };
    }
  };

  const validatePhone = () => {
    if (data.phoneNumber?.length !== 10) {
      error = {
        ...error,
        phoneNumber: "Your phoneNumber must be 10 digits",
      };
    }
  };

  if (pageId === 1) validatePassword();
  if (pageId === 2) {
    validateName();
    validateAddress();
  }
  if (pageId === 3) {
    validatePhone();
  }

  console.log("------errorAfterValidation:", error);

  return error;
};

export default Validation;
------------------------------
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
--------------------------------
export async function postMethod(userData) {
  const options = {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };

  return await fetch("https://codebuddy.review/submit", options).then((res) =>
    res.json()
  );
}
--------------------------------------
*{
    padding: 0;
    margin: 0;
}

.App {
    height: 100vh;
    background-color: #333;
}
-------------------------------------
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
------------------------------------
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
------------------------------------------
