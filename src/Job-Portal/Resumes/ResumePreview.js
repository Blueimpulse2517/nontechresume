import React, { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./ResumePreview.module.css";

const ResumePreview = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const studId = localStorage.getItem("StudId");
   const logoutresume = !(Boolean(studId));
  const [resumeAlert, setResumeAlert] = useState({
    show: false,
    selected: null
  });

    const [jobseekerForm, setJobseekerForm] = useState({
    email: "",
    phone: ""
  });
  const alertRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (alertRef.current && !alertRef.current.contains(event.target)) {
        setResumeAlert({ show: false, selected: null });
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!state) return null;

  const { img, templateKey, loginprofile } = state;
  console.log("l[",loginprofile)

  return (
    <>
      {/* Back Button */}
      <div className={styles.backWrapper}>
        <div
          className={styles.resumebackbtn}
          onClick={() => {
            if (window.history.length > 1) {
              navigate(-1);
            } else {
              navigate("/resumes");
            }
          }}
        >
          Back
        </div>
      </div>

      {/* Preview */}
      <div className={styles.previewWrapper}>
         <div style={{display:"flex",justifyContent:"center", backgroundColor:"#f2f2f2"}}>
         <h1>This is how your Resume will look</h1>
         </div>
        <div className={styles.previewContainer} >
           
          <img
            src={img}
            alt="Resume Preview"
            className={styles.previewImage}
            onClick={() =>
              setResumeAlert({ show: true, selected: templateKey })
            }
          />
        </div>

        {/* Alert */}
        {resumeAlert.show && (
          <div className={styles.overlay}>
            <div
              ref={alertRef}
              className={styles.alertBox}
              onClick={(e) => e.stopPropagation()}
            >
              {logoutresume === true ? (
                <>
                  Login as a Job Seeker to explore opportunities and create a
                  strong resume!
                  <div className={styles.btnGroup}>
                    <button
                      className={styles.successBtn}
                      onClick={() => {
                        navigate("/Job-Seeker-Login", {
                          state: { loginpage: "resume" }
                        });
                        setResumeAlert({ show: false, selected: null });
                      }}
                    >
                      Login as Jobseeker
                    </button>

                    <button
                      className={styles.dangerBtn}
                      onClick={() =>
                        setResumeAlert({ show: false, selected: null })
                      }
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                {loginprofile==="cs_center"?
                <>
                 <h3>Enter Jobseeker Details</h3>
                 <input
                  type="email"
                  placeholder="Enter Email ID"
                  className={styles.input}
                  value={jobseekerForm.email}
                  onChange={(e) =>
                    setJobseekerForm({
                      ...jobseekerForm,
                      email: e.target.value
                    })
                  }
                />

<input
  type="text"
  placeholder="Enter Phone Number"
  className={styles.input}
  maxLength={10}
  value={jobseekerForm.phone}
  onChange={(e) => {
    const value = e.target.value;

    // Allow only numbers and limit to 10 digits
    if (/^\d{0,10}$/.test(value)) {
      setJobseekerForm({
        ...jobseekerForm,
        phone: value
      });
    }
  }}
/>

                  <div className={styles.btnGroup}>
                    <button
                      className={styles.successBtn}
                      onClick={() => {
                        if (resumeAlert.selected === "one") {
                          navigate("/resume-form", {
                            state: { formstate: "experience", loginprofile:loginprofile, selectedTemplate: templateKey }
                          });
                        }
                        else if (resumeAlert.selected === "two") {
                          navigate("/resume-form", {
                            state: { formstate: "entrylevelambition", loginprofile:loginprofile, selectedTemplate: templateKey }
                          });
                        }
                        else if (resumeAlert.selected === "three") {
                          navigate("/resume-form", {
                            state: { formstate: "entrylevelpro", loginprofile:loginprofile, selectedTemplate: templateKey }
                          });
                        }
                        else if (resumeAlert.selected === "five") {
                          navigate("/resume-form", {
                            state: { formstate: "testing", loginprofile:loginprofile, selectedTemplate: templateKey }
                          });
                        }
                       else if (resumeAlert.selected === "six") {
                          navigate("/resume-form", {
                            state: { formstate: "nontech", loginprofile:loginprofile, selectedTemplate: templateKey }
                          });
                        }
                        else if (resumeAlert.selected === "seven") {
                          navigate("/resume-form", {
                            state: { formstate: "nontech", loginprofile:loginprofile, selectedTemplate: templateKey }
                          });
                        }
                        else if (resumeAlert.selected === "four") {
                          navigate("/resume-form", {
                            state: { formstate: "fullstack", loginprofile:loginprofile, selectedTemplate: templateKey }
                          });
                        }
                        else {
                          navigate("/resume-form", {
                            state: { formstate: "freshers", loginprofile:loginprofile, selectedTemplate: templateKey }
                          });
                        }
                        setResumeAlert({ show: false, selected: null });
                      }}
                    >
                      Continue
                    </button>

                    <button
                      className={styles.dangerBtn}
                      onClick={() => {
                        
                        setResumeAlert({ show: false, selected: null });
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </>
                :
                <>
                  Ensure your profile is fully completed
                  <div className={styles.btnGroup}>
                    <button
                      className={styles.successBtn}
                      onClick={() => {
                        if (resumeAlert.selected === "one") {
                          navigate("/resume-form", {
                            state: { formstate: "experience", loginprofile:loginprofile, selectedTemplate: templateKey }
                          });
                        }
                        else if (resumeAlert.selected === "two") {
                          navigate("/resume-form", {
                            state: { formstate: "entrylevelambition", loginprofile:loginprofile, selectedTemplate: templateKey }
                          });
                        }
                        else if (resumeAlert.selected === "three") {
                          navigate("/resume-form", {
                            state: { formstate: "entrylevelpro", loginprofile:loginprofile, selectedTemplate: templateKey }
                          });
                        }
                        else if (resumeAlert.selected === "five") {
                          navigate("/resume-form", {
                            state: { formstate: "testing", loginprofile:loginprofile, selectedTemplate: templateKey }
                          });
                        }
                       else if (resumeAlert.selected === "six") {
                          navigate("/resume-form", {
                            state: { formstate: "nontech", loginprofile:loginprofile, selectedTemplate: templateKey }
                          });
                        }
                        else if (resumeAlert.selected === "seven") {
                          navigate("/resume-form", {
                            state: { formstate: "nontech", loginprofile:loginprofile, selectedTemplate: templateKey }
                          });
                        }
                        else if (resumeAlert.selected === "four") {
                          navigate("/resume-form", {
                            state: { formstate: "fullstack", loginprofile:loginprofile, selectedTemplate: templateKey }
                          });
                        }
                        else {
                          navigate("/resume-form", {
                            state: { formstate: "freshers", loginprofile:loginprofile, selectedTemplate: templateKey }
                          });
                        }
                        setResumeAlert({ show: false, selected: null });
                      }}
                    >
                      Continue to Edit profile
                    </button>

                    <button
                      className={styles.dangerBtn}
                      onClick={() => {
                        navigate("/resumes", {
                          state: { selectedTemplate: templateKey }
                        });
                        setResumeAlert({ show: false, selected: null });
                      }}
                    >
                      Continue to Download Resume
                    </button>
                  </div>
                  </>
                }
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ResumePreview;


