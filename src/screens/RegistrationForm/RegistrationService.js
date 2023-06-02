export const initiateState = () => {
  return {
    name: { value: "", error: "" },
    age: { value: "", error: "" },
    dob: { value: "", error: "" },
    phone_number: { value: "", error: "" },
    password: { value: "", error: "" },
    confirm_password: { value: "", error: "" },
    address: { value: [""], error: "" },
  };
};
