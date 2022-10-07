import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ContextApi } from "../../Helper/ContextApi/ContextApi";
import { postMethod } from "../../Service/Service";
import Form from "../Form/Form";

const form1 = [
  {
    label: "emailId",
    title: "Email Id",
    required: true,
    type: "email",
    validation: "Required field",
  },
  {
    label: "password",
    title: "Password",
    required: true,
    type: "password",
    validation:
      "Must contain minimum 2 capital letters, 2 small letter, 2 numbers and 2 special characters.",
  },
];
const form2 = [
  {
    label: "firstName",
    title: "Firstname",
    required: true,
    type: "text",
    validation: "Allow only alphabets. Minimum of 2 character and maximum 50.",
  },
  {
    label: "lastName",
    title: "Lastname",
    required: false,
    type: "text", //tbd
    validation: "Allow only alphabets.",
  },
  {
    label: "address",
    title: "Address",
    required: true,
    type: "text", //tbd
    validation: "Minimum length 10.",
  },
];
const form3 = [
  {
    label: "countryCode",
    title: "Country Code",
    required: true,
    type: "dropdown",
    validation: "Allow only 2 country code, India (+91) and America (+1).",
    dropdown: ['', '+91', '+1']
  },
  {
    label: "phoneNumber",
    title: "Phone no",
    required: true,
    type: "text", //tbd
    validation: "Allow only 10 digit numeric phone number",
  },
  {
    label: "acceptTermsAndCondition",
    title: "Accept terms and condition",
    required: true,
    type: "checkbox", //tbd
    validation: "Required",
  },
];

const Main = ({ updateUserObj }) => {
  const { userObj } = useContext(ContextApi);
  const [pageId, setPageId] = useState(1);
  const [userField, setUserField] = useState(form1);
  const navigate = useNavigate();

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
      delete objToSave.acceptTermsAndCondition;
      postMethod(objToSave).then((data) => console.log("API RES DATA", data)).then(() => {
        navigate('/posts');
      });
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