import { Add, Edit, Remove } from "@mui/icons-material";
import { Grid, Button, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Selectfield from "../../Components/Shared/SelectField";
import TextField from "../../Components/Shared/TextField";
import { setSingleData, currentUserId, fileUpload, signout } from "../../firebase.client";

function Index() {
  const [profile, setProfile] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [age, setAge] = useState("");
  const now = new Date();
  const [updateCount, setUpdateCount] = useState(0);
  let navigate = useNavigate();

  const experience = [
    { label: "Company", value: "", key: "company" },
    { label: "Company Logo", value: "", key: "companyLogo", type: "file", src: "" },
    { label: "Job Title", value: "", key: "jobTitle" },
    { label: "Job Description", value: "", key: "jobDescription" },
    {
      label: "Start Date",
      value: now.getFullYear() + "/" + now.getMonth() + 1 + "/" + now.getDate(),
      key: "startDate",
      type: "date",
    },
    {
      label: "End Date",
      value: now.getFullYear() + "/" + now.getMonth() + 1 + "/" + now.getDate(),
      key: "endDate",
      type: "date",
    },
  ];

  const [workExperiences, setWorkExperiences] = useState([
    { label: "Experience", fields: [...experience] },
  ]);
  const loggedInUser = JSON.parse(localStorage.getItem("user")) ?? {};

  const signUpForm = [
    { label: "Name", setValue: setName, value: name },
    { label: "Email", setValue: setEmail, value: email },
    { label: "Password", setValue: setPassword, value: password },
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
    { label: "Age", setValue: setAge, value: age },
  ];

  useEffect(() => {
    if (profile) {
      localStorage.setItem("user", JSON.stringify({ ...loggedInUser, profile }));
      setUpdateCount((prev) => prev + 1);
    }
  }, [profile]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setName(loggedInUser.name ?? "");
    setEmail(loggedInUser.email ?? "");
    setPassword(loggedInUser.password ?? "");
    setRole(loggedInUser.role ?? "");
    setProfile(loggedInUser.profile ?? "");
    setAge(loggedInUser.age ?? "");
    setWorkExperiences(
      loggedInUser.workExperiences || [{ label: "Experience", fields: [...experience] }]
    );
  }, [updateCount]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleAddExperience = () => {
    setWorkExperiences((prev) => prev.concat({ label: "Experience", fields: [...experience] }));
  };

  const handleExperienceForm = (index, fieldIdx) => (value, src) => {
    setWorkExperiences((prev) =>
      prev.map((wExp, idx) => {
        if (idx === index) {
          return {
            ...wExp,
            fields: wExp.fields.map((_, fIdx) => {
              if (fIdx === fieldIdx) {
                return { ..._, value: value, src: src || "" };
              } else {
                return _;
              }
            }),
          };
        } else {
          return wExp;
        }
      })
    );
  };

  const handleUpdate = () => {
    // fileUpload
    setSingleData("users", currentUserId(), {
      name,
      email,
      age,
      role,
      profile,
      password,
      workExperiences,
    })
      .then((res) => {
        localStorage.setItem(
          "user",
          JSON.stringify({ name, email, age, role, password, profile, workExperiences })
        );
        setUpdateCount((prev) => prev + 1);
        toast.success("updated profile");
        console.log(res);
      })
      .catch((error) => {
        toast.error(error.msg);
        console.log(error);
      });
  };

  const handleRemoveExperience = (id) => {
    setWorkExperiences((prev) => prev.filter((_, index) => index !== id));
  };

  const handleLogout = () => {
    signout();
    localStorage.clear();
    window.location.href = "/";
    navigate("/");
  };

  return (
    <div className="w-full min-h-screen bg-slate-400 py-5">
      <div className=" w-3/5 mx-auto my-3 bg-white p-10">
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <div className=" w-1/2">
              <p>Profile</p>

              <div
                className="border border-gray-500"
                style={{ width: "300px", height: "300px", position: "relative" }}
              >
                <img src={profile} style={{ width: "300px", height: "300px" }} alt="Profile " />

                <IconButton
                  style={{
                    marginTop: "10px",
                    position: "absolute",
                    top: "0%",
                    right: "0%",
                    transform: "translate(20%, -50%)",
                    backgroundColor: "lightgrey",
                  }}
                  variant="contained"
                  component="label"
                >
                  <Edit />
                  <input
                    type="file"
                    hidden
                    onChange={(e) => {
                      fileUpload(e.target.files[0], "profile", setProfile);
                      // getBase64FromUrl(e.target.files[0], setValue);
                    }}
                  />
                </IconButton>
              </div>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className="w-full flex flex-row justify-end">
              <Button
                onClick={handleLogout}
                style={{ backgroundColor: "#1976d2", color: "#ffffff" }}
              >
                Logout
              </Button>
            </div>
          </Grid>
          {signUpForm.map((field) =>
            field.label === "Role" ? (
              <Grid item xs={6} key={field.label}>
                <Selectfield
                  value={field.value}
                  className="w-full mb-5"
                  setValue={field.setValue}
                  label={field.label}
                  options={field.options}
                />
              </Grid>
            ) : (
              <Grid item xs={6} key={field.label}>
                <TextField
                  value={field.value}
                  className="w-full mb-5"
                  setValue={field.setValue}
                  label={field.label}
                />
              </Grid>
            )
          )}
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div className=" flex flex-row justify-between">
              <p> Work Experience</p>
              <IconButton
                onClick={handleAddExperience}
                style={{ backgroundColor: "#1976d2", color: "#ffffff" }}
              >
                <Add color="#000000" />
              </IconButton>
            </div>
          </Grid>
          {workExperiences.map((exp, index) => (
            <React.Fragment key={index}>
              <Grid item xs={12}>
                <div className=" flex flex-row justify-between">
                  <p>
                    {exp.label} {1 + +index}
                  </p>
                  <IconButton
                    style={{ backgroundColor: "#1976d2", color: "#ffffff" }}
                    onClick={() => handleRemoveExperience(index)}
                  >
                    <Remove />
                  </IconButton>
                </div>
              </Grid>
              {exp.fields.map((field, fieldIdx) => (
                <Grid item xs={6} key={field.label}>
                  <TextField
                    value={field.value}
                    className="w-full mb-5"
                    setValue={handleExperienceForm(index, fieldIdx)}
                    label={field.label}
                    type={field.type}
                    index={index}
                  />
                </Grid>
              ))}
            </React.Fragment>
          ))}
        </Grid>
        <Grid container>
          <Button style={{ backgroundColor: "#1976d2", color: "#ffffff" }} onClick={handleUpdate}>
            Update
          </Button>
        </Grid>
      </div>
    </div>
  );
}

export default Index;
