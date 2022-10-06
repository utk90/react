import React, { useState } from 'react'
import { useEffect } from 'react';
import { userObj } from '../Page/Main';
import Validation from '../Validation/Validation';

const Form = (props) => {
    const [user, setUser] = useState({
        emailId: '',
        password: '',
        firstName: '',
        lastName: '',
        address: '',
        countryCode: '',
        phoneNumber: '',
        acceptTermsAndCondition: ''
    });

    const reinit = ()=> {
        setUser({
            emailId: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            countryCode: '',
            phoneNumber: '',
            acceptTermsAndCondition: ''
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(Validation(props.userObj));
        console.log(user);
    }
    const prevHandler = (e) => {
        e.preventDefault();
        props.handlePrev();
    }
    const nextHandler = (e) => {
        e.preventDefault();
        console.log('---userObj',userObj)
        if(Object.keys(Validation(user, props.pageId)).length===0){
            userObj.emailId = user.emailId;
            document.getElementById('user-form').reset();
            props.handleNext();
        }
        
    }
    const handleChange = (e)=>{
        console.log(e.target.value);
        console.log(e.target.name);
        setUser({...user, [e.target.name]: e.target.value});
    }

    useEffect(()=>{
        console.log('props.formItems',props.formItems);
    })

  return (
    <form onSubmit={handleSubmit} id='user-form'>
        {props.formItems.map(item=>{
            return(
                <div>
                    <label value={item.label}></label>
                    <input type={item.type} id={item.label} value={user[item.label]} name={item.label} placeholder={item.placeholder} required={item.required} onChange={handleChange} />
                </div>
            )
        })}
        <button onClick={prevHandler} disabled={props.pageId === 1}>BACK</button>
        <button>SAVE</button>
        <button onClick={nextHandler} disabled={props.pageId === 3}>SAVE AND NEXT</button>
    </form>
  )
}

export default Form
