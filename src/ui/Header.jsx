import { useState } from "react";
import useUser from "../features/authentication/useUser";
import { Navigate, Link, NavLink } from "react-router-dom";
import {
  FaCaretDown,
  FaSearch,
  FaHome,
  FaFacebookMessenger,
  FaBell,
  FaTh,
} from "react-icons/fa";
import styled from "styled-components";

import { API_URL } from "../utils/constants";
import Profile from "./Profile";
import Search from "./Search";
const Header = (props) => {
  const { user, isLoading } = useUser();
  const [showUser, setShowUser] = useState(false);

  return (
    <Container>
      {!user && <Navigate to="/signin" />}
      <Content>
        <Logo>
          <Link to="/feed">
            <img src="/images/logo.svg" alt="" />
          </Link>
        </Logo>
        <Search />
        <Nav>
          <NavListWrap>
            <NavList to="/feed">
              <FaHome className="text-2xl" />
              <span className="hover:text-slate-50">Home</span>
            </NavList>

            <NavList to="/chat">
              <FaFacebookMessenger className="text-2xl" />
              <span>Messaging</span>
            </NavList>

            <NavButton>
              <FaBell className="text-2xl" />
              <span>Notifications</span>
            </NavButton>

            <User onClick={() => setShowUser(!showUser)}>
              {user && user.avatar ? (
                <img src={`${API_URL}/images/${user.avatar}`} alt="user" />
              ) : (
                <img src="/Images/user.svg" alt="user" />
              )}
              <span>
                Me
                <FaCaretDown />
              </span>
              {showUser && <Profile />}
            </User>

            <Work>
              <FaTh className="text-2xl" />
              <span>
                Work
                <FaCaretDown />
              </span>
            </Work>
          </NavListWrap>
        </Nav>
      </Content>
    </Container>
  );
};
export default Header;

/*________________________________________________________________________________*/

const Container = styled.div`
  background-color: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 100;
`;
/*___________________________________________________*/
const Content = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  min-height: 100%;
  max-width: 1128px;
  @media (max-width: 768px) {
    padding: 10px;
  }
`;
/*___________________________________________________*/
const Logo = styled.span`
  margin-right: 8px;
  font-size: 0px;
  @media (max-width: 365px) {
    width: 10px;
  }
`;

/*___________________________________________________*/
const Nav = styled.nav`
  margin-left: auto;
  display: block;
  @media (max-width: 768px) {
    position: fixed;
    left: 0;
    bottom: 0;
    background: white;
    width: 100%;

    /* box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 6px 9px rgb(0 0 0 / 20%); */
  }
`;
/*___________________________________________________*/
const NavListWrap = styled.ul`
  display: flex;
  flex-wrap: nowrap;
  list-style-type: none;
  justify-content: space-evenly;
  .active {
    span:after {
      content: "";
      transform: scaleX(1);
      border-bottom: 2px solid var(--white, #fff);
      bottom: 0;
      left: 0;
      position: absolute;
      transition: transform 0.2s ease-in-out;
      width: 100%;
      border-color: rgba(0, 0, 0, 0.9);
      @media (max-width: 768px) {
        border: none;
      }
    }
  }
`;
/*___________________________________________________*/
const NavList = styled(NavLink)`
  justify-content: center;
  display: flex;
  align-items: center;
  background: transparent;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  font-size: 12px;
  font-weight: 400;
  justify-content: center;
  line-height: 1.5;
  min-height: 52px;
  min-width: 80px;
  position: relative;
  text-decoration: none;
  span {
    color: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
  }
  @media (max-width: 768px) {
    min-width: 70px;
    font-size: 10.5px;
  }
`;

const NavButton = styled.li`
  justify-content: center;
  display: flex;
  align-items: center;
  background: transparent;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  font-size: 12px;
  font-weight: 400;
  justify-content: center;
  line-height: 1.5;
  min-height: 52px;
  min-width: 80px;
  position: relative;
  text-decoration: none;
  span {
    color: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
  }
  @media (max-width: 768px) {
    min-width: 70px;
    font-size: 10.5px;
  }

  &:hover,
  &:active {
    span {
      color: rgba(0, 0, 0, 1);
    }
  }
`;

const User = styled(NavButton)`
  svg {
    width: 24px;
    border-radius: 50%;
  }
  img:first-of-type {
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }
  span {
    display: flex;
    align-items: center;
  }
  img:last-child {
    width: fit-content;
    height: fit-content;
  }
  @media (max-width: 767px) {
    position: fixed;
    top: 5px;
    right: 0px;
  }
`;

const Work = styled(User)`
  border-left: 1px solid rgba(0, 0, 0, 0.08);
  img:last-child {
    width: fit-content;
    height: fit-content;
  }
  @media (max-width: 767px) {
    display: none;
  }
`;
/*________________________________________________________________________________*/
