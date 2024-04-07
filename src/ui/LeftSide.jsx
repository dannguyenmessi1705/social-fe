import { Link } from "react-router-dom";
import styled from "styled-components";
import { CgProfile } from "react-icons/cg";

import { API_URL } from "../utils/constants";
import Item from "./Item";
import useUserDetail from "../features/user/useUserDetail";

const LeftSide = ({ user }) => {
  const { userDetail } = useUserDetail(user.userId);

  return (
    <div>
      <ArtCard>
        <UserInfo>
          <CardBackground />
          <Link className="text-lg font-semibold text-slate-800" to="/user">
            <Photo src={`${API_URL}/images/${user.avatar}`} />
            <span>Welcome, {user.fullName}</span>
          </Link>
        </UserInfo>
        <Widget>
          <Link to="/myfollowers">
            <div>
              <span>Followers</span>
            </div>
            <p>{userDetail?.followers}</p>
          </Link>
          <Link to="/myfollowings">
            <div>
              <span>Followings</span>
            </div>
            <p>{userDetail?.followings}</p>
          </Link>
        </Widget>
        <Item to="/profiles">
          <span>
            <CgProfile className="mr-1" />
            My Profiles
          </span>
        </Item>
      </ArtCard>

      <CommunityCard>
        <Link to="/groups">
          <span>Groups</span>
        </Link>
        <Link to="/feed">
          <span>
            Events
            <img src="/Images/plus-icon.svg" alt="" />
          </span>
        </Link>
        <Link to="/feed">
          <span>Follow Hashtags</span>
        </Link>
      </CommunityCard>
    </div>
  );
};
export default LeftSide;

const ArtCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  transition: box-shadow 83ms;
  position: relative;
  border: none;
  box-shadow:
    0 0 0 1px rgb(0 0 0 / 15%),
    0 0 0 rgb(0 0 0 / 20%);
`;
const UserInfo = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  padding: 12px 12px 16px;
  word-wrap: break-word;
  word-break: break-word;
`;
const CardBackground = styled.div`
  background: url("/Images/card-bg.svg");
  background-position: center;
  background-size: 462px;
  height: 54px;
  margin: -12px -12px 0;
`;
const Photo = styled.img`
  box-shadow: none;
  width: 72px;
  height: 72px;
  box-sizing: border-box;
  background-clip: content-box;
  background-color: white;
  background-position: center;
  background-size: 60%;
  background-repeat: no-repeat;
  border: 2px solid white;
  margin: -38px auto 12px;
  border-radius: 50%;
`;

const Widget = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  padding-top: 12px;
  padding-bottom: 12px;
  & > a {
    text-decoration: none;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 4px 12px;
    &:hover {
      background-color: rgba(0, 0, 0, 0.08);
    }
    div {
      display: flex;
      flex-direction: column;
      text-align: left;
      span {
        font-size: 12px;
        line-height: 1.333;
        &:first-child {
          color: rgba(0, 0, 0, 0.6);
        }
        &:nth-child(2) {
          color: rgba(0, 0, 0, 1);
          font-weight: 600;
        }
      }
    }
  }
  p {
    color: #0a66c2;
    font-size: 13px;
    font-weight: 600;
  }
`;

const CommunityCard = styled(ArtCard)`
  padding: 8px 0 0;
  text-align: left;
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 75px;
  a {
    color: black;
    padding: 4px 12px 4px 12px;
    font-size: 12px;
    &:hover {
      color: #0a66c2;
    }
    span {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    &:last-child {
      color: rgba(0, 0, 0, 0.6);
      text-decoration: none;
      border-top: 1px solid #d6cec2;
      padding: 12px;
      &:hover {
        background-color: rgba(0, 0, 0, 0.08);
      }
    }
  }
`;
