import React, { useContext } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import LoginContext from "../../store/login-context";

const Header = () => {
  const navigate = useNavigate();
  const { isLogin, onLogout } = useContext(LoginContext);
  const handleLogout = () => {
    navigate("/");
    onLogout();
  };

  return (
    <header className="Header">
      <NavLink to="/main" className="title nav-link">
        Peterpan Blog
      </NavLink>
      <nav className="link-page">
        <ul className="nav nav-tabs">
          <li>
            <NavLink to="/main" className="nav-main nav-link">
              메인
            </NavLink>
          </li>
          <li>
            <NavLink to="/board" className="nav-board nav-link">
              게시판
            </NavLink>
          </li>
          <li>
            <NavLink to="/playground" className="nav-board nav-link">
              Playground
            </NavLink>
          </li>
        </ul>
      </nav>
      <nav className="link-util">
        <ul className="nav nav-tabs">
          <li>
            {isLogin ? (
              <div className="form-group">
                <NavLink to="/profile" className="nav-login nav-link">
                  프로필
                </NavLink>
                <button className="nav-login nav-link" onClick={handleLogout}>
                  로그아웃
                </button>
              </div>
            ) : (
              <NavLink to="/login" className="nav-login nav-link">
                로그인
              </NavLink>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default React.memo(Header);
