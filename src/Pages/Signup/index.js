import Button from "../../Components/Shared/Button";
import React, { useState } from "react";
import TextField from "../../Components/Shared/TextField";
import AuthWrapper from "../../Components/Shared/AuthWrapper";
import { useNavigate } from "react-router-dom";
import Selectfield from "../../Components/Shared/SelectField";
import { toast } from "react-toastify";
import { signUp, signIn } from "../../firebase.client";

function Index() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [isFormValid, setIsFormValid] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const registeredUsers = JSON.parse(localStorage.getItem("users")) ?? [];
  let navigate = useNavigate();

  const clearForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setRole("");
    setErrorMsg("");
    setIsFormValid(true);
  };

  const signInForm = [
    { label: "Email", setValue: setEmail, value: email },
    { label: "Password", setValue: setPassword, value: password },
  ];

  const signUpForm = [
    { label: "Name", setValue: setName, value: name },
    ...signInForm,
    {
      label: "Role",
      setValue: setRole,
      value: role,
      options: [
        { role: "Admin", value: "admin" },
        { role: "User", value: "user" },
        { role: "Operator", value: "operator" },
      ],
    },
  ];

  const handleRegister = async () => {
    try {
      if (name && email && password && role) {
        const isUserExist = registeredUsers.some((user) => user.email === email);
        if (isUserExist) {
          setIsFormValid(false);
          setErrorMsg("User with same email already exist");
          toast.error("User with same email already exist");
        } else {
          setIsFormValid(true);
          setErrorMsg("");
          await signUp({ name, email, password, role });
          toast.success("User created successfully");
          localStorage.setItem(
            "users",
            JSON.stringify([{ name, email, password, role }, ...registeredUsers])
          );
          setIsSignUp(false);
          clearForm();
        }
      } else {
        setIsFormValid(false);
        toast.error("Please fill all input fields");
        setErrorMsg("Please fill all input fields");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.msg);
    }
  };

  const handleLogin = async () => {
    try {
      if (email && password) {
        const isUserExist = registeredUsers.some(
          (user) => user.email === email && user.password === password
        );
        if (isUserExist) {
          const user = await signIn({ email, password });
          localStorage.setItem("user", JSON.stringify(user));
          setIsFormValid(true);
          clearForm();
          navigate("/profile");
        } else {
          setIsFormValid(false);
          setErrorMsg("Invalid user email or password");
          toast.error("Invalid user email or password");
        }
      } else {
        setIsFormValid(false);
        setErrorMsg("Please fill all input fields");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.msg);
    }
  };

  return (
    <AuthWrapper>
      <div className=" h-auto p-10 box-border flex flex-col w-3/6 bg-white rounded-md">
        <p className=" text-5xl text-center mb-8 font-bold">{isSignUp ? "Register" : "Sign In"}</p>
        {isSignUp ? (
          <>
            {signUpForm.map((field) =>
              field.label === "Role" ? (
                <Selectfield
                  key={field.label}
                  value={field.value}
                  className="w-full mb-5"
                  setValue={field.setValue}
                  label={field.label}
                  options={field.options}
                />
              ) : (
                <TextField
                  key={field.label}
                  value={field.value}
                  className="w-full mb-5"
                  setValue={field.setValue}
                  label={field.label}
                />
              )
            )}
          </>
        ) : (
          <>
            {signInForm.map((field) => (
              <TextField
                key={field.label}
                value={field.value}
                className="w-full mb-5"
                setValue={field.setValue}
                label={field.label}
              />
            ))}
            <div className=" w-full text-right">
              <span
                className=" cursor-pointer underline text-blue-500"
                onClick={() => navigate("/forgot")}
              >
                Forgot Password
              </span>
            </div>
          </>
        )}

        <div className="mb-5">
          {!isFormValid && <small className=" text-red-400">{errorMsg}</small>}
        </div>
        <div className=" w-full text-center">
          <Button
            onClick={isSignUp ? handleRegister : handleLogin}
            label={isSignUp ? "Sign Up" : "Sign In"}
          />
          <div className="mt-4">
            {isSignUp ? (
              <p>
                Already have an account?{" "}
                <span
                  className=" cursor-pointer underline text-blue-500"
                  onClick={() => {
                    setIsSignUp(false);
                    clearForm();
                  }}
                >
                  Sign In
                </span>
              </p>
            ) : (
              <p>
                Don't have an account?{" "}
                <span
                  className=" cursor-pointer underline text-blue-500"
                  onClick={() => {
                    setIsSignUp(true);
                    clearForm();
                  }}
                >
                  Sign Up
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </AuthWrapper>
  );
}

export default Index;
