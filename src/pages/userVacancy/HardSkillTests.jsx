import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import UserStore from "../../stores/UserStore";
import { ALPHABET } from "../../dummyData/languages";
import { BeatLoader } from "react-spinners";
import "./HardSkillTests.css";
import toast from "react-hot-toast";

function HardSkillTests() {
  const [searchParams] = useSearchParams();
  const vacancyId = searchParams.get("vacancyId");
  const hardSkillToken = searchParams.get("verify");
  const navigate = useNavigate();

  const { getHardSkillTests, testItems, resolveHardSkillTests } = UserStore();
  const [start, setStart] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [testAnswers, setTestAnswers] = useState([]);
  const [currentTestIndex, setCurrentTestIndex] = useState(0);

  useEffect(() => {
    if (vacancyId && hardSkillToken) {
      setLoading(true);
      getHardSkillTests({ vacancyId, hardSkillToken })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }
  }, [vacancyId, hardSkillToken, getHardSkillTests]);

  const handleStart = () => setStart(true);

  const handleAnswerSelect = (questionIndex, optionIndex) => {
    setTestAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[questionIndex] = optionIndex + 1; // 1-based index
      return newAnswers;
    });
  };

  const handleNextQuestion = () => {
    if (currentTestIndex < testItems.length - 1) {
      setCurrentTestIndex((prev) => prev + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentTestIndex > 0) {
      setCurrentTestIndex((prev) => prev - 1);
    }
  };

  const handleEnd = () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to finish the test?"
    );
    if (isConfirmed) {
      submitAnswers();
    }
  };

  const submitAnswers = async () => {
    try {
      setLoading(true);
      setError(null);

      const completeAnswers = testItems.map((_, i) => testAnswers[i] || 0);

      await resolveHardSkillTests({
        vacancyId,
        answers: completeAnswers,
      });

      navigate("/");
    } catch (err) {
      console.error("Submit error:", err);
      setError(err.message || "Failed to submit test");
      toast.error(err.message || "Testni yuborishda xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="loading-container">
        <BeatLoader color="#36d7b7" />
      </div>
    );

  if (error) return <div className="error-message">{error}</div>;

  if (!start) {
    return (
      <div className="test-start-container">
        <h1>Technical Skills Assessment</h1>
        <p>This test contains {testItems.length} questions</p>
        <button
          className="start-button"
          onClick={handleStart}
          disabled={testItems.length === 0}
        >
          Start Test
        </button>
      </div>
    );
  }

  const currentTest = testItems[currentTestIndex];

  return (
    <div className="test-container">
      <div className="test-progress">
        Question {currentTestIndex + 1} of {testItems.length}
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${((currentTestIndex + 1) / testItems.length) * 100}%`,
            }}
          />
        </div>
      </div>

      <div className="question-card">
        <h3 className="question-text">{currentTest.question}</h3>

        <div className="options-list">
          {currentTest.options.map((option, optionIndex) => (
            <div
              key={optionIndex}
              className={`option-item ${
                testAnswers[currentTestIndex] === optionIndex + 1
                  ? "selected"
                  : ""
              }`}
              onClick={() => handleAnswerSelect(currentTestIndex, optionIndex)}
            >
              <span className="option-letter">{ALPHABET[optionIndex]}</span>
              <span className="option-text">{option}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="navigation-buttons">
        <button
          className="nav-button prev-button"
          onClick={handlePrevQuestion}
          disabled={currentTestIndex === 0}
        >
          Previous
        </button>

        {currentTestIndex < testItems.length - 1 ? (
          <button
            className="nav-button next-button"
            onClick={handleNextQuestion}
          >
            Next
          </button>
        ) : (
          <button
            className="nav-button submit-button"
            onClick={handleEnd}
            disabled={testAnswers[currentTestIndex] === undefined}
          >
            {loading ? <BeatLoader color="#fff" size={8} /> : "Submit Test"}
          </button>
        )}
      </div>
    </div>
  );
}

export default HardSkillTests;
