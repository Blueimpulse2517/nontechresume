import React, { useEffect, useState } from "react";
import styles from "./TemplateSeven.module.css";
import axios from "axios";
import { generatePDF } from "./generatePDF";

const TemplateSeven = () => {
  const [profileData, setProfileData] = useState(null);
  const studId = JSON.parse(localStorage.getItem("StudId"));

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchProfile = async () => {
      try {
        const res = await axios.get(`/StudentProfile/viewProfile/${studId}`);
        setProfileData(res.data.result);
      } catch {
        alert("Failed to load profile");
      }
    };

    fetchProfile();
  }, [studId]);

  const handleDownloadPDF = () => {
    const element = document.getElementById("template-six");
    element.classList.add(styles.forceA4);

    setTimeout(() => {
      generatePDF("template-six", `${profileData?.name}_resume.pdf`);
      element.classList.remove(styles.forceA4);
    }, 300);
  };

  if (!profileData) return null;

  return (
    <div className={styles.wrapper}>
      <div id="template-six" className={styles.resume}>
        <div className={styles.innerBorder}>

        {/* HEADER */}
        <h1 className={styles.title}>RESUME</h1>

        <div className={styles.header}>
          <div>
            <strong>{profileData.name}</strong>
            <div style={{ width: "45%" , marginBottom:"-27px"}}>
              <p>{profileData.address}</p>
            </div>
          </div>

          <div style={{width:"40%"}} className={styles.headerRight}>
            <p><strong>E-mail:</strong> {profileData.email}</p>
            <p><strong>Contact No:</strong> {profileData.phoneNumber}</p>
          </div>
        </div>

        {/* OBJECTIVE */}
        <Section title="Objective">
          <p>
            {profileData.objective
              ? profileData.objective
              : "I wan to excel in the field with hard work, perseverance and dedication."}
          </p>
        </Section>

        {/* EXPERIENCE */}
        <Section title="Experience">
          <ul>
            {profileData.experiences?.map((e, i) => (
              <li key={i}>
                {e.company} – {e.role}
              </li>
            ))}
          </ul>
        </Section>

        {/* EDUCATION */}
        <Section title="Educational Qualifications">
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Course</th>
                <th>University / Board</th>
                <th>Passing Year</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              {profileData.qualificationDetails?.map((q, i) => (
                <tr key={i}>
                  <td>{q.degree}</td>
                  <td>{q.collegeName}</td>
                  <td>{q.yop || "-"}</td>
                  <td>{q.score || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>

        {/* TECHNICAL SKILLS */}
        <Section title="Technical Skills">
          {["Computer", "Typing"].map((heading) => {
            const group = profileData.skills?.find(
              (g) => g.heading === heading
            );

            return group && group.items?.length > 0 ? (
              <p key={heading}>
                <strong>{heading}:</strong> {group.items.join(", ")}
              </p>
            ) : null;
          })}
        </Section>

        {/* HOBBIES */}
        <Section title="Hobbies">
          <ul>
            {profileData.interests?.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        </Section>



        {/* PERSONAL DETAILS */}
        <Section title="Personal Details">
          <div className={styles.personalGrid}>

            <div className={styles.row}>
              <span className={styles.label}>Name</span>
              <span className={styles.colon}>:</span>
              <span>{profileData.name}</span>
            </div>

            <div className={styles.row}>
              <span className={styles.label}>Father Name</span>
              <span className={styles.colon}>:</span>
              <span>{profileData.personalDetails?.[0]?.fatherName || "N/A"}</span>
            </div>

            <div className={styles.row}>
              <span className={styles.label}>Mother Name</span>
              <span className={styles.colon}>:</span>
              <span>{profileData.personalDetails?.[0]?.motherName || "N/A"}</span>
            </div>

            <div className={styles.row}>
              <span className={styles.label}>Date of Birth</span>
              <span className={styles.colon}>:</span>
              <span>
                {profileData?.personalDetails?.[0]?.dob
                  ? new Date(profileData.personalDetails[0].dob).toLocaleDateString(
                      "en-US",
                      { day: "2-digit", month: "short", year: "numeric" }
                    )
                  : "N/A"}
              </span>
            </div>

            <div className={styles.row}>
              <span className={styles.label}>Gender</span>
              <span className={styles.colon}>:</span>
              <span>{profileData.personalDetails?.[0]?.gender || "N/A"}</span>
            </div>

            <div className={styles.row}>
              <span className={styles.label}>Nationality</span>
              <span className={styles.colon}>:</span>
              <span>{profileData.personalDetails?.[0]?.Nationality || "N/A"}</span>
            </div>

            <div className={styles.row}>
              <span className={styles.label}>Languages Known</span>
              <span className={styles.colon}>:</span>
              <span>{profileData.languages?.join(", ") || "N/A"}</span>
            </div>

          </div>
        </Section>

        {/* DECLARATION */}
        <Section title="Declaration">
          <p>
            I hereby affirm that all the above information in this document is
            true to the best of my knowledge.
          </p>
          <p className={styles.thankYou}>Thank You.</p>
          <p className={styles.place}><strong>Place:</strong></p>
          <p className={styles.date}><strong>Date:</strong> __________</p>
        </Section>

        </div>
      </div>

      <button onClick={handleDownloadPDF} className={styles.downloadBtn}>
        Download Template 7 PDF
      </button>
    </div>
  );
};

const Section = ({ title, children }) => (
  <>
    <div className={styles.sectionTitle}>{title}</div>
    <div className={styles.sectionContent}>{children}</div>
  </>
);

export default TemplateSeven;
