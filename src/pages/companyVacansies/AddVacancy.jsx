import React, { useState } from "react";
import { CompanyVacancyStore } from "../../stores/CompanyVacansies";
import {
  Clock,
  Plus,
  X,
  Briefcase,
  Star,
  HardHat,
  Smile,
  FileText,
  Globe,
} from "lucide-react";
import "./AddVacancy.css";
import { useNavigate } from "react-router-dom";
import { LANGUAGES } from "../../dummyData/languages";
import Cookies from "js-cookie";

function AddVacancy() {
  const { createVacancy } = CompanyVacancyStore();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    position: "",
    level: "Junior",
    hard_requirements: [],
    soft_requirements: [],
    work_start_hour: "09:00",
    work_end_hour: "18:00",
    description: "",
    hard_skill_tests: 0,
    currentHardReq: "",
    currentSoftReq: "",
    languages: [],
    currentLanguage: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleAddRequirement = (type) => {
    if (type === "hard" && formData.currentHardReq.trim()) {
      setFormData((prev) => ({
        ...prev,
        hard_requirements: [...prev.hard_requirements, prev.currentHardReq],
        currentHardReq: "",
      }));
    } else if (type === "soft" && formData.currentSoftReq.trim()) {
      setFormData((prev) => ({
        ...prev,
        soft_requirements: [...prev.soft_requirements, prev.currentSoftReq],
        currentSoftReq: "",
      }));
    }
  };

  const handleAddLanguage = () => {
    if (formData.currentLanguage.trim()) {
      setFormData((prev) => ({
        ...prev,
        languages: [...prev.languages, prev.currentLanguage],
        currentLanguage: "",
      }));
    }
  };

  const handleKeyPress = (e, type) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (type === "hard" || type === "soft") {
        handleAddRequirement(type);
      }
    }
  };

  const handleRemoveRequirement = (type, index) => {
    if (type === "hard") {
      setFormData((prev) => ({
        ...prev,
        hard_requirements: prev.hard_requirements.filter((_, i) => i !== index),
      }));
    } else if (type === "soft") {
      setFormData((prev) => ({
        ...prev,
        soft_requirements: prev.soft_requirements.filter((_, i) => i !== index),
      }));
    } else if (type === "language") {
      setFormData((prev) => ({
        ...prev,
        languages: prev.languages.filter((_, i) => i !== index),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const result = await createVacancy(
        {
          position: formData.position,
          level: formData.level,
          hard_requirements: formData.hard_requirements,
          soft_requirements: formData.soft_requirements,
          work_start_hour: formData.work_start_hour,
          work_end_hour: formData.work_end_hour,
          description: formData.description,
          hard_skill_tests: Number(formData.hard_skill_tests),
          language_requirements: formData.languages,
        },
        navigate
      );
    } catch (err) {
      console.error("Error creating vacancy:", err);
      setError(
        err.message ||
          "Vakansiya yaratishda xato yuz berdi. Iltimos, qayta urunib ko'ring."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-vacancy-container">
      <h2 className="add-vacancy-title">Yangi Vakansiya Qo'shish</h2>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="vacancy-form">
        {/* Position */}
        <div className="form-group">
          <label htmlFor="position">
            <Briefcase size={16} className="input-icon" />
            Lavozim:
          </label>
          <input
            type="text"
            id="position"
            name="position"
            value={formData.position}
            onChange={handleChange}
            required
            placeholder="Frontend developer"
          />
        </div>

        {/* Level */}
        <div className="form-group">
          <label htmlFor="level">
            <Star size={16} className="input-icon" />
            Darajasi:
          </label>
          <select
            id="level"
            name="level"
            value={formData.level}
            onChange={handleChange}
            required
          >
            <option value="Junior">Junior</option>
            <option value="Middle">Middle</option>
            <option value="Senior">Senior</option>
          </select>
        </div>

        {/* Work Hours */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="work_start_hour">
              <Clock size={16} className="input-icon" />
              Ish boshlanish vaqti:
            </label>
            <input
              type="time"
              id="work_start_hour"
              name="work_start_hour"
              value={formData.work_start_hour}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="work_end_hour">
              <Clock size={16} className="input-icon" />
              Ish tugash vaqti:
            </label>
            <input
              type="time"
              id="work_end_hour"
              name="work_end_hour"
              value={formData.work_end_hour}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Hard Requirements */}
        <div className="form-group">
          <label>
            <HardHat size={16} className="input-icon" />
            Texnik talablar:
          </label>
          <div className="requirements-input">
            <input
              type="text"
              value={formData.currentHardReq}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  currentHardReq: e.target.value,
                }))
              }
              onKeyPress={(e) => handleKeyPress(e, "hard")}
              placeholder="Masalan: React, TypeScript"
            />
            <button
              type="button"
              className="add-req-btn"
              onClick={() => handleAddRequirement("hard")}
              disabled={!formData.currentHardReq.trim()}
            >
              <Plus size={16} />
            </button>
          </div>
          <div className="requirements-list">
            {formData.hard_requirements.map((req, index) => (
              <div key={index} className="requirement-item">
                <span>{req}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveRequirement("hard", index)}
                  className="remove-req-btn"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Soft Requirements */}
        <div className="form-group">
          <label>
            <Smile size={16} className="input-icon" />
            Yumshoq ko'nikmalar:
          </label>
          <div className="requirements-input">
            <input
              type="text"
              value={formData.currentSoftReq}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  currentSoftReq: e.target.value,
                }))
              }
              onKeyPress={(e) => handleKeyPress(e, "soft")}
              placeholder="Masalan: Jamoa ishi, Kommunikatsiya"
            />
            <button
              type="button"
              className="add-req-btn"
              onClick={() => handleAddRequirement("soft")}
              disabled={!formData.currentSoftReq.trim()}
            >
              <Plus size={16} />
            </button>
          </div>
          <div className="requirements-list">
            {formData.soft_requirements.map((req, index) => (
              <div key={index} className="requirement-item">
                <span>{req}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveRequirement("soft", index)}
                  className="remove-req-btn"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Languages */}
        <div className="form-group">
          <label>
            <Globe size={16} className="input-icon" />
            Til Talablari:
          </label>
          <div className="requirements-input">
            <select
              value={formData.currentLanguage}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  currentLanguage: e.target.value,
                }))
              }
              onKeyPress={(e) => e.key === "Enter" && handleAddLanguage()}
            >
              <option value="">Tilni tanlang</option>
              {LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
            <button
              type="button"
              className="add-req-btn"
              onClick={handleAddLanguage}
              disabled={!formData.currentLanguage.trim()}
            >
              <Plus size={16} />
            </button>
          </div>
          <div className="requirements-list">
            {formData.languages.map((langCode, index) => {
              const lang = LANGUAGES.find((l) => l.code === langCode);
              return (
                <div key={index} className="requirement-item">
                  <span>{lang ? lang.name : langCode}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveRequirement("language", index)}
                    className="remove-req-btn"
                  >
                    <X size={14} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Description */}
        <div className="form-group">
          <label htmlFor="description">
            <FileText size={16} className="input-icon" />
            Tavsif:
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={5}
            placeholder="Vakansiya haqida batafsil ma'lumot..."
          />
        </div>

        {/* Hard Skill Tests */}
        <div className="form-group">
          <label htmlFor="hard_skill_tests">
            <HardHat size={16} className="input-icon" />
            Texnik testlar soni:
          </label>
          <input
            type="number"
            id="hard_skill_tests"
            name="hard_skill_tests"
            min="0"
            value={formData.hard_skill_tests}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          {isSubmitting ? "Yuborilmoqda..." : "Vakansiyani Saqlash"}
        </button>
      </form>
    </div>
  );
}

export default AddVacancy;
