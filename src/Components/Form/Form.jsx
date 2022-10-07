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
    console.log(e.target.name, e.target.value)
    if (e.target.name === 'acceptTermsAndCondition') {
      setUser({ ...user, [e.target.name]: e.target.checked });
      return;
    }
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
            <label htmlFor={item?.label}>{item?.title}: </label>
            {item.type === 'dropdown' ? <select id="countryCode" name={item.label} onChange={handleChange}>{item?.dropdown.map((stdCode, index) => <option key={stdCode + "_" + index} value={stdCode}>{stdCode}</option>)}</select> : item.type === 'checkbox' ? <input type={item.type} id={item.label} name={item.label} onChange={handleChange} /> :
              <input
                type={item?.type}
                id={item?.label}
                value={
                  item?.label && user?.[item?.label] ? user[item?.label] : ""
                }
                name={item?.label}
                placeholder={`Write ${item?.title}`}
                required={item?.required}
                onChange={handleChange}
              />}
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