import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CompanyVacancyStore } from "../../stores/CompanyVacansies";
import {
  ChevronDown,
  ChevronUp,
  User,
  Mail,
  Briefcase,
  Phone,
  Calendar,
} from "react-feather";
import "./AppliedCandidates.css";
import { companyStore } from "../../stores/CompanyStore";
import UserStore from "../../stores/UserStore";
import { ChatsStore } from "../../stores/chats";
function AppliedCandidates() {
  const { company } = companyStore();
  const { user } = UserStore();

  const {
    getSubmittedCandidates,
    submitted_candidates,
    getPassedToHardSkills,
    passedToHardSkills,
    getPassedToSoftSkills,
    passedToSoftSkills,
  } = CompanyVacancyStore();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const vacancyId = searchParams.get("id");
  const { sendMessageAsCompany } = ChatsStore();
  const navigate = useNavigate();

  const [expandedSection, setExpandedSection] = useState({
    submitted: false,
    hardSkills: false,
    softSkills: false,
  });

  const toggleSection = (section) => {
    setExpandedSection((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  useEffect(() => {
    getSubmittedCandidates(vacancyId);
    getPassedToHardSkills(vacancyId);
    getPassedToSoftSkills(vacancyId);
  }, [vacancyId]);

  const getInitials = (name) => {
    const names = name.split(" ");
    return names
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const sendMessage = (candidateId) => {
    const senderId = user?.id || company?.id;
    const receiverId = candidateId;
    const messageText = "Congrats you passed to soft skill part";

    sendMessageAsCompany({ senderId, receiverId, messageText, navigate });
  };
  const renderCandidateCard = (candidate) => (
    <div className="candidate-card" key={candidate.email}>
      <div className="card-header">
        <div className="avatar">{getInitials(candidate.fullName)}</div>
        <div className="candidate-info">
          <h3>{candidate.fullName}</h3>
          <p className="position">{candidate.position}</p>
        </div>
      </div>

      <div className="card-details">
        <div className="detail-item">
          <Mail size={16} />
          <span>{candidate.email}</span>
        </div>
        {candidate.phone && (
          <div className="detail-item">
            <Phone size={16} />
            <span>{candidate.phone}</span>
          </div>
        )}
        {candidate.appliedDate && (
          <div className="detail-item">
            <Calendar size={16} />
            <span>
              Applied: {new Date(candidate.appliedDate).toLocaleDateString()}
            </span>
          </div>
        )}
      </div>

      <div className="card-actions">
        <button className="view-btn">View Profile</button>
        <button
          className="contact-btn"
          onClick={() => sendMessage(candidate.id)}
        >
          Contact
        </button>
      </div>
    </div>
  );

  return (
    <div className="applied-candidates-container">
      <h1 className="page-title">Applied Candidates</h1>

      <div className="candidate-section">
        <div
          className="section-header"
          onClick={() => toggleSection("submitted")}
        >
          <h2>Submitted Candidates ({submitted_candidates.length})</h2>
          {expandedSection.submitted ? <ChevronUp /> : <ChevronDown />}
        </div>
        {expandedSection.submitted && (
          <div className="candidates-list">
            {submitted_candidates.length > 0 ? (
              submitted_candidates.map(renderCandidateCard)
            ) : (
              <p className="no-candidates">No submitted candidates yet</p>
            )}
          </div>
        )}
      </div>

      <div className="candidate-section">
        <div
          className="section-header"
          onClick={() => toggleSection("hardSkills")}
        >
          <h2>Passed to Hard Skill ({passedToHardSkills.length})</h2>
          {expandedSection.hardSkills ? <ChevronUp /> : <ChevronDown />}
        </div>
        {expandedSection.hardSkills && (
          <div className="candidates-list">
            {passedToHardSkills.length > 0 ? (
              passedToHardSkills.map(renderCandidateCard)
            ) : (
              <p className="no-candidates">
                No candidates passed to hard skills yet
              </p>
            )}
          </div>
        )}
      </div>

      <div className="candidate-section">
        <div
          className="section-header"
          onClick={() => toggleSection("softSkills")}
        >
          <h2>Passed to Soft Skill ({passedToSoftSkills.length})</h2>
          {expandedSection.softSkills ? <ChevronUp /> : <ChevronDown />}
        </div>
        {expandedSection.softSkills && (
          <div className="candidates-list">
            {passedToSoftSkills.length > 0 ? (
              passedToSoftSkills.map(renderCandidateCard)
            ) : (
              <p className="no-candidates">
                No candidates passed to soft skills yet
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AppliedCandidates;
