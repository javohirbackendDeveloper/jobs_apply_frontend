import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { CompanyVacancyStore } from "../../stores/CompanyVacansies";
import { BeatLoader } from "react-spinners";
import "./GetOneVacancy.css";
import toast from "react-hot-toast";
import UserStore from "../../stores/UserStore";
import AppliedCandidates from "./AppliedCandidates";

function GetOneVacancy() {
  const [searchParams] = useSearchParams();
  const vacancyId = searchParams.get("id");
  const { applyVacancy } = UserStore();
  const { getOneVacansy, oneVacancy, oneCompany, loading, error } =
    CompanyVacancyStore();
  const { user } = UserStore();
  const navigate = useNavigate();

  const [isApplying, setIsApplying] = useState(false);

  useEffect(() => {
    if (vacancyId) {
      getOneVacansy(vacancyId);
    }
  }, [getOneVacansy, vacancyId]);

  const handleApply = async () => {
    setIsApplying(true);
    try {
      if (user) {
        applyVacancy(vacancyId);
      } else {
        navigate("/loginUser");
        toast.error("Please login as a worker to apply");
      }
    } catch (err) {
      console.error("Application error:", err);
      toast.error("Failed to apply. Please try again.");
    } finally {
      setIsApplying(false);
    }
  };

  if (loading)
    return (
      <div className="loading-container">
        <BeatLoader color="#36d7b7" />
      </div>
    );

  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div className="vacancy-container">
      {oneVacancy && oneCompany && (
        <>
          <div className="vacancy-header">
            <div className="company-logo-container">
              {oneCompany.company_logo?.length > 0 && (
                <img
                  src={oneCompany.company_logo[0]}
                  alt={`${oneCompany.company_name} logo`}
                  className="company-logo"
                />
              )}
            </div>
            <h1>{oneVacancy.position}</h1>
          </div>

          <div className="vacancy-details">
            <section className="detail-section">
              <h2>Job Description</h2>
              <p>{oneVacancy.description || "No description provided"}</p>
            </section>

            <div className="details-grid">
              <section className="detail-section">
                <h2>Company Information</h2>
                <div className="company-info">
                  <p>
                    <strong>Name:</strong> {oneCompany.company_name}
                  </p>
                  <p>
                    <strong>Location:</strong> {oneCompany.location}
                  </p>
                  <p>
                    <strong>Phone:</strong> {oneCompany.phone_number}
                  </p>
                  {oneCompany.company_description && (
                    <p>
                      <strong>About:</strong> {oneCompany.company_description}
                    </p>
                  )}
                </div>
              </section>

              <section className="detail-section">
                <h2>Position Details</h2>
                <div className="position-details">
                  <p>
                    <strong>Level:</strong> {oneVacancy.level}
                  </p>
                  <p>
                    <strong>Work Hours:</strong> {oneVacancy.work_start_hour} -{" "}
                    {oneVacancy.work_end_hour}
                  </p>
                  <p>
                    <strong>Posted:</strong>{" "}
                    {new Date(oneVacancy.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </section>
            </div>

            {(oneVacancy.hard_requirements?.length > 0 ||
              oneVacancy.soft_requirements?.length > 0 ||
              oneVacancy.language_requirements?.length > 0) && (
              <section className="detail-section">
                <h2>Requirements</h2>
                {oneVacancy.hard_requirements?.length > 0 && (
                  <div className="requirements-section">
                    <h3>Technical Skills</h3>
                    <ul>
                      {oneVacancy.hard_requirements.map((req, index) => (
                        <li key={`hard-${index}`}>{req}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {oneVacancy.soft_requirements?.length > 0 && (
                  <div className="requirements-section">
                    <h3>Soft Skills</h3>
                    <ul>
                      {oneVacancy.soft_requirements.map((req, index) => (
                        <li key={`soft-${index}`}>{req}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {oneVacancy.language_requirements?.length > 0 && (
                  <div className="requirements-section">
                    <h3>Language Requirements</h3>
                    <ul>
                      {oneVacancy.language_requirements.map((req, index) => (
                        <li key={`lang-${index}`}>{req}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>
            )}
          </div>

          {(user && (
            <div className="apply-section">
              <button
                onClick={handleApply}
                disabled={isApplying}
                className="apply-button"
              >
                {(isApplying && (
                  <>
                    <BeatLoader color="#ffffff" size={8} /> Applying...
                  </>
                )) ||
                  "Apply for this position"}
              </button>
            </div>
          )) || <AppliedCandidates />}
        </>
      )}
    </div>
  );
}

export default GetOneVacancy;
