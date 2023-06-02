import { useEffect, useState } from "react";
import { initiateState } from "./RegistrationService";
import CustomInput from "./components/CustomInput";
import { Box, Button, Grid, InputLabel, TextField } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import IconButton from "@mui/material/IconButton";
import { useHistory } from "react-router";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch, useSelector } from "react-redux";
import { formData } from "../../redux/userSlice";
import moment from "moment";

const Registration = (props) => {
  const [userInfo, setUserInfo] = useState(initiateState());
  const [isEdit, setIsEdit] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const userDataFromRedux = useSelector((state) => state.user.formData);

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    const userId = props.match.params.userId;
    const currentUser = userDataFromRedux.find(
      (user) => user.phone_number == userId
    );
    if (currentUser !== undefined) {
      setUserInfo({
        name: { value: currentUser.name, error: "" },
        age: { value: currentUser.age, error: "" },
        dob: { value: currentUser.dob, error: "" },
        phone_number: { value: currentUser.phone_number, error: "" },
        password: { value: currentUser.password, error: "" },
        confirm_password: { value: currentUser.confirm_password, error: "" },
        address: { value: currentUser.address, error: "" },
      });
      setIsEdit(true);
    }
  };

  const handleValidation = () => {
    const updatedUserInfo = JSON.parse(JSON.stringify(userInfo));
    if (updatedUserInfo.name.value === "") {
      updatedUserInfo.name.error = "name is invalid";
    }
    if (
      updatedUserInfo.phone_number.value === "" ||
      updatedUserInfo.phone_number.value?.length < 8
    ) {
      updatedUserInfo.phone_number.error = "mobile number is invalid";
    }
    if (
      updatedUserInfo.password.value === "" ||
      !/^(?=.*[A-Z])(?=.*[!@#$%^&*])(.{10,})$/.test(
        updatedUserInfo.password.value
      )
    ) {
      updatedUserInfo.password.error = "password is invalid";
    }
    if (
      updatedUserInfo.confirm_password.value === "" ||
      updatedUserInfo.confirm_password.value !== updatedUserInfo.password.value
    ) {
      updatedUserInfo.confirm_password.error = "password is not matched";
    }
    if (updatedUserInfo.age.value === "") {
      updatedUserInfo.age.error = "age is not valid";
    }
    if (updatedUserInfo.age.value === "") {
      updatedUserInfo.age.error = "age is not valid";
    }
    if (updatedUserInfo.dob.value === "") {
      updatedUserInfo.dob.error = "date of birth is not valid";
    }
    for (let index = 0; index < userInfo.address.value.length; index++) {
      if (updatedUserInfo.address.value[index] === "") {
        updatedUserInfo.address.error =
          "Please enter address or remove this field";
      }
    }
    setUserInfo(updatedUserInfo);
    if (
      updatedUserInfo.name.error ||
      updatedUserInfo.age.error ||
      updatedUserInfo.phone_number.error ||
      updatedUserInfo.password.error ||
      updatedUserInfo.confirm_password.error ||
      updatedUserInfo.address.error
    ) {
      return false;
    } else return true;
  };

  const onChangeHandler = (event) => {
    const key = event.target.name;
    const value = event.target.value;
    if (key === "name" && !/^[A-Za-z ]{0,20}$/.test(value)) return;
    if (key === "phone_number" && !/^[^a-zA-Z]{0,10}$/.test(value)) return;
    setUserInfo({
      ...userInfo,
      [key]: {
        // ...userInfo[key],
        value: value,
        error: "",
      },
    });
  };

  const onChangeHandlerForDate = (value) => {
    const date = new Date(value).toLocaleDateString("en-GB", {
      month: "2-digit",
      day: "2-digit",
      year: "2-digit",
    });
    setUserInfo({
      ...userInfo,
      dob: {
        error: "",
        value: date,
      },
    });
  };

  const handleAddressChange = (index, value) => {
    const updatedAddresses = { ...userInfo.address };
    updatedAddresses.value[index] = value;
    const isBlank = updatedAddresses.value.find((address) => {
      return address === "";
    });
    if (isBlank === undefined) updatedAddresses.error = "";

    setUserInfo({
      ...userInfo,
      address: updatedAddresses,
    });
  };

  const addAddressField = () => {
    setUserInfo({
      ...userInfo,
      address: { ...userInfo.address, value: [...userInfo.address.value, ""] },
    });
  };

  const removeAddressField = (index) => {
    if (userInfo.address.value.length > 1) {
      const updatedAddresses = [...userInfo.address.value];
      updatedAddresses.splice(index, 1);
      setUserInfo({
        ...userInfo,
        address: { ...userInfo.address, value: updatedAddresses },
      });
    }
  };

  const submit = () => {
    const isValid = handleValidation();
    if (isValid) {
      const updateUserData = [...userDataFromRedux];
      let indexToRemove = null;
      debugger;
      if (isEdit) {
        for (let index = 0; index < updateUserData.length; index++) {
          if (updateUserData[index].phone_number == userInfo.phone_number.value)
            indexToRemove = index;
          break;
        }
        updateUserData.splice(indexToRemove, 1);
      }
      const currentUserdata = {
        name: userInfo.name.value,
        age: userInfo.age.value,
        dob: userInfo.dob.value,
        phone_number: userInfo.phone_number.value,
        password: userInfo.password.value,
        confirm_password: userInfo.confirm_password.value,
        address: userInfo.address.value,
      };
      updateUserData.push(currentUserdata);
      dispatch(formData(updateUserData));
      setUserInfo(initiateState());
      history.push("/");
    }
  };

  const getForm = () => {
    return (
      <Grid container px={"20%"} mt={4} spacing={2}>
        <Grid item md={6} lg={6}>
          <CustomInput
            required
            placeHolder="Enter your name"
            type="text"
            disabled={false}
            name="name"
            label="Name"
            onChange={onChangeHandler}
            value={userInfo.name.value}
            error={userInfo.name.error}
            helperText={userInfo.name.error}
          />
        </Grid>
        <Grid item md={6} lg={6}>
          <CustomInput
            required
            placeHolder="Enter your phone number"
            type="number"
            disabled={false}
            name="phone_number"
            label="Phone Number"
            onChange={onChangeHandler}
            value={userInfo.phone_number.value}
            error={userInfo.phone_number.error}
            helperText={userInfo.phone_number.error}
          />
        </Grid>
        <Grid item md={6} lg={6}>
          <CustomInput
            required
            placeHolder="Enter your password"
            type="password"
            disabled={false}
            name="password"
            label="Password"
            onChange={onChangeHandler}
            value={userInfo.password.value}
            error={userInfo.password.error}
            helperText={userInfo.password.error}
          />
        </Grid>
        <Grid item md={6} lg={6}>
          <CustomInput
            required
            placeHolder="Confirm your password"
            type="password"
            disabled={false}
            name="confirm_password"
            label="Confirm Password"
            onChange={onChangeHandler}
            value={userInfo.confirm_password.value}
            error={userInfo.confirm_password.error}
            helperText={userInfo.confirm_password.error}
          />
        </Grid>
        <Grid item md={6} lg={6}>
          <CustomInput
            required
            placeHolder="Enter your age"
            type="number"
            disabled={false}
            name="age"
            label="Age"
            onChange={onChangeHandler}
            value={userInfo.age.value}
            error={userInfo.age.error}
            helperText={userInfo.age.error}
          />
        </Grid>

        <Grid item md={6} lg={6}>
          <InputLabel>* Date of birth</InputLabel>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                // value={new Date(userInfo.dob.value)}
                onChange={(value) => onChangeHandlerForDate(value)}
                sx={{ width: "100%" }}
              />
            </DemoContainer>
          </LocalizationProvider>
          {userInfo.dob.error && (
            <Box color={"red"} fontSize={"13px"} mt={0.2}>
              {userInfo.dob.error}
            </Box>
          )}
        </Grid>
        {userInfo.address.value.map((address, index) => (
          <Grid item md={12} lg={12}>
            <Box
              key={index}
              display={"flex"}
              alignItems={"center"}
              position={"relative"}
            >
              <Box width={"100%"}>
                <CustomInput
                  required
                  placeHolder={`Enter your addess ${index + 1}`}
                  type="text"
                  disabled={false}
                  name="confirm_password"
                  label={`Address ${index + 1}`}
                  onChange={(e) => handleAddressChange(index, e.target.value)}
                  value={address}
                  error={userInfo.address.error && address === ""}
                  helperText={address === "" ? userInfo.address.error : ""}
                />
              </Box>
              <Box position={"absolute"} right={"-80px"} top={"34px"}>
                {index === userInfo.address.value.length - 1 && (
                  <IconButton
                    onClick={addAddressField}
                    color="primary"
                    aria-label="Add Address"
                  >
                    <AddIcon />
                  </IconButton>
                )}
                {index > 0 && (
                  <IconButton
                    onClick={() => removeAddressField(index)}
                    color="secondary"
                    aria-label="Remove Address"
                  >
                    <RemoveIcon />
                  </IconButton>
                )}
              </Box>
            </Box>
          </Grid>
        ))}
        <Grid item md={12} lg={12} display={"flex"} justifyContent={"center"}>
          <Button variant="contained" onClick={submit}>
            Submit
          </Button>
        </Grid>
      </Grid>
    );
  };

  return <>{getForm()}</>;
};

export default Registration;
