import { Link } from "react-router-dom";

import "./WhichLogin.css";

function WhichLogin() {
  return (
    <div className="login-choice-container">
      <h2 className="login-title">Login as a company or worker</h2>
      <div className="login-options">
        <Link to="/loginCompany" className="login-option">
          Login as a Company
        </Link>
        <Link to="/loginUser" className="login-option">
          Login as a Worker
        </Link>
      </div>
    </div>
  );
}

export default WhichLogin;
