const Validation = (data, pageId) => {
  let error = {};

  const validateEmail = () => {
    if (data.emailId?.length === 0) {
      error = {
        ...error,
        emailId: "Email id required",
      };
    } else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.emailId))) {
      error = {
        ...error,
        emailId: "Email id is invalid",
      };
    }
  }

  console.log("dataToValidate:", data);
  const validatePassword = () => {
    if (data.password?.length === 0) {
      error = {
        ...error,
        password: "Password required",
      };
    } else if (data.password?.search(/^(?=.*?[A-Z].{2,})(?=.*?[a-z].{2,})(?=.*?[0-9].{2,})(?=.*?[#?!@$%^&*-_+].{2,}).{8,}$/) < 0) {
      error = {
        ...error,
        password: "Your password must contain at least 2 capital letter, 2 small letter, 2 numbers and 2 special characters",
      };
    }
  };

  const validateName = () => {
    if (data.firstName?.length === 0) {
      error = {
        ...error,
        firstName: "Firstname required",
      };
    } else if (!(data.firstName?.length > 2 && data.firstName?.length <= 50)) {
      error = {
        ...error,
        firstName: "Firstname must be at least 2 to 50 characters",
      };
    } else if (!/^[a-zA-Z]*$/g.test(data.firstName)) {
      error = {
        ...error,
        firstName: "Firstname must only contain alphabets",
      };
    }
    if (data.lastName && (!/^[a-zA-Z]*$/g.test(data.lastName))) {
      error = {
        ...error,
        lastName: "Lastname must only contain alphabets",
      };
    }
  };

  const validateAddress = () => {
    if (data.address?.length === 0) {
      error = {
        ...error,
        address: "Address required",
      };
    } else if (data.address?.length < 10) {
      error = {
        ...error,
        address: "Address must be at least 10 characters",
      };
    }
  };

  const validateCountryCode = () => {
    if (data.countryCode?.length === 0) {
      error = {
        ...error,
        countryCode: "Country code required",
      };
    } else if (data.countryCode !== '+91' && data.countryCode !== '+1') {
      error = {
        ...error,
        countryCode: "Country code must be either +91 or +1",
      };
    }
  };

  const validatePhone = () => {
    if (data.phoneNumber?.length === 0) {
      error = {
        ...error,
        phoneNumber: "Phone number required",
      };
    } else if (!data.phoneNumber.match(/^\d{10}$/)) {
      error = {
        ...error,
        phoneNumber: "Phone number must be 10 digit numeric",
      };
    }
  };

  const validateTC = () => {
    if (!data.acceptTermsAndCondition) {
      error = {
        ...error,
        acceptTermsAndCondition: "Accept Terms and condition required",
      };
    }
  };

  if (pageId === 1) {
    validateEmail();
    validatePassword();
  }
  if (pageId === 2) {
    validateName();
    validateAddress();
  }
  if (pageId === 3) {
    validateCountryCode();
    validatePhone();
    validateTC();
  }

  console.log("------errorAfterValidation:", error);

  return error;
};

export default Validation;