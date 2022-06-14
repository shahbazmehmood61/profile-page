import Button from "../../Components/Shared/Button";
import React, { useState } from "react";
import TextField from "../../Components/Shared/TextField";
import AuthWrapper from "../../Components/Shared/AuthWrapper";
import { useNavigate } from "react-router-dom";

function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [isEmailExist, setIsEmailExist] = useState(false);
  const [givenEmail, setGivenEmail] = useState();
  const registeredUsers = JSON.parse(localStorage.getItem("users")) ?? [];
  let navigate = useNavigate();

  const clearForm = () => {
    setEmail("");
    setPassword("");
  };

  const verifyEmailForm = [{ label: "Email", setValue: setEmail, value: email }];

  const changePasswordForm = [{ label: "Password", setValue: setPassword, value: password }];

  const handleCheckUser = () => {
    if (email) {
      const isUserExist = registeredUsers.filter((user) => user.email === email);
      if (isUserExist.length > 0) {
        setGivenEmail(isUserExist[0]);
        setIsEmailExist(true);
      } else {
        setIsEmailExist(false);
        setErrorMsg("User with given email don't exist");
        setIsFormValid(false);
        clearForm();
      }
    } else {
      setIsFormValid(false);
      setErrorMsg("Please enter email");
    }
  };

  const handleChangePassword = () => {
    if (password) {
      const updatedList = registeredUsers.map((user) =>
        user.email === givenEmail.email ? { ...user, password } : user
      );
      localStorage.setItem("users", JSON.stringify(updatedList));
      navigate("/");
    } else {
      setIsFormValid(false);
      setErrorMsg("Please fill all input fields");
    }
  };

  return (
    <AuthWrapper>
      <div className=" h-auto p-10 box-border flex flex-col w-3/6 bg-white rounded-md">
        <p className=" text-5xl text-center mb-8 font-bold">
          {isEmailExist ? "Reset Password" : "Find User"}
        </p>
        {isEmailExist ? (
          <>
            {changePasswordForm.map((field) => (
              <TextField
                key={field.label}
                value={field.value}
                className="w-full mb-5"
                setValue={field.setValue}
                label={field.label}
              />
            ))}
          </>
        ) : (
          <>
            {verifyEmailForm.map((field) => (
              <TextField
                key={field.label}
                value={field.value}
                className="w-full mb-5"
                setValue={field.setValue}
                label={field.label}
              />
            ))}
          </>
        )}

        <div className="mb-5">
          {!isFormValid && <small className=" text-red-400">{errorMsg}</small>}
        </div>
        <div className=" w-full text-center">
          <Button
            onClick={isEmailExist ? handleChangePassword : handleCheckUser}
            label={isEmailExist ? "Reset Password" : "Check Email"}
          />

          <p className="mt-4">
            Don't have an account?{" "}
            <span className=" cursor-pointer underline text-blue-500" onClick={() => navigate("/")}>
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </AuthWrapper>
  );
}

export default Index;
