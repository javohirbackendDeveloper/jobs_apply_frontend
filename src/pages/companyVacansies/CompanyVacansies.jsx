import React, { useEffect } from "react";
import { CompanyVacancyStore } from "../../stores/CompanyVacansies";
import { companyStore } from "../../stores/CompanyStore";
import { Clock, Briefcase, Star, Plus } from "lucide-react";
import "./CompanyVacansies.css";
import { Link, useLocation } from "react-router-dom";

function CompanyVacansies() {
  const { company } = companyStore();
  const { getCompanyVacansies, vacansies } = CompanyVacancyStore();

  useEffect(() => {
    getCompanyVacansies(company);
  }, [getCompanyVacansies, company]);

  return (
    <div className="vacancy-container">
      <div className="vacancy-header-container">
        <h2 className="vacancy-title">Kompaniya Vakansiyalari</h2>
        <Link to="/add_vacancy" className="add-vacancy-link">
          <Plus size={20} className="add-icon" />
          <span>Add Vacancy</span>
        </Link>
      </div>

      {vacansies.length === 0 ? (
        <p className="no-vacancies">Hozircha vakansiyalar mavjud emas</p>
      ) : (
        <div className="vacancy-grid">
          {vacansies.map((vacancy) => (
            <div key={vacancy.id} className="vacancy-card">
              <Link
                to={`/getOneVacancy?id=${vacancy.id}`}
                className="vacancy-link"
              >
                <div className="vacancy-header">
                  <h3 className="vacancy-position">{vacancy.position}</h3>
                  <span
                    className={`vacancy-level ${vacancy.level.toLowerCase()}`}
                  >
                    {vacancy.level}
                  </span>
                </div>

                <p className="vacancy-description">{vacancy.description}</p>

                <div className="vacancy-details">
                  <div className="detail-item">
                    <Clock size={16} className="detail-icon" />
                    <span>
                      Ish vaqti: {vacancy.work_start_hour} -{" "}
                      {vacancy.work_end_hour}
                    </span>
                  </div>

                  <div className="detail-item">
                    <Briefcase size={16} className="detail-icon" />
                    <span>Lavozim: {vacancy.position}</span>
                  </div>
                </div>

                {vacancy.hard_requirements &&
                  vacancy.hard_requirements.length > 0 && (
                    <div className="requirements-section">
                      <h4 className="requirements-title">Talablar:</h4>
                      <div className="requirements-list">
                        {vacancy.hard_requirements.map((req, index) => (
                          <div key={index} className="requirement-item">
                            <Star size={14} className="requirement-icon" />
                            <span>{req}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CompanyVacansies;
