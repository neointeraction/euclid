import styled from "styled-components";

export const HeaderContainer = styled.div`
  padding: 0 24px;
  background: #ffffff;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.16);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  max-height: 65px;
  /* min-height: 64px; */
`;

export const LogoContainer = styled.div`
  margin-right: 40px;
`;

export const LeftMenuBlock = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  list-style: none;
  flex-grow: 1;
  & .link {
    text-decoration: none;
    color: inherit;
  }
`;
export const MenuItemList = styled.div`
  padding: 14px 30px;
  font-weight: 600;
  min-height: 32px;
  font-size: 16px;
  line-height: 32px;
  text-transform: uppercase;
  color: ${(props) => (props.isActive ? "#005585" : "rgba(38, 38, 38, 0.6)")};
  border-bottom: ${(props) =>
    props.isActive ? "4px solid #005585" : "4px solid #fff"};
  cursor: pointer;
  transition: 0.3s all ease-in-out;
  & .home-icon {
    fill: ${(props) => (props.isActive ? "#005585" : "#8c8c8c")};
    margin-bottom: -4px;
  }
  &:hover {
    background: #daeaf3;
    border-bottom: ${(props) =>
      props.isActive ? "4px solid #005585" : "4px solid #daeaf3"};
  }
`;

export const RightMenuBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const LastLoginText = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: rgba(38, 38, 38, 0.4);
  margin-right: 40px;
`;

export const ProfileBlock = styled.div`
  margin: 0;
`;

export const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;

export const NameTag = styled.div`
  margin-left: 10px;
  .p-user-name {
    font-weight: 400;
    font-size: 16px;
    line-height: 21px;
    color: #595959;
    display: block;
    margin-bottom: 5px;
  }
  .custom-chip {
    background-color: #005585;
    color: #fff;
  }
`;
export const MenuArrow = styled.div`
  margin-left: 60px;
`;
