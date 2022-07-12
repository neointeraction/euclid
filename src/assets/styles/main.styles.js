import styled from "styled-components";

import LoginBg from "../images/login-bg.png";

export const Section = styled.div`
  padding: 10px 0;
`;

export const Box = styled.div`
  background: #ffffff;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  padding: ${(props) => (props.noPadding ? 0 : "24px")};
  border: ${(props) =>
    props.bordered ? "1px solid #005585" : "1px solid #E5E5E5"};
  box-shadow: ${(props) =>
    props.bordered ? "0px 4px 24px rgba(0, 0, 0, 0.08)" : "none"};
`;

export const SectionTitle = styled.h1`
  font-weight: 700;
  font-size: 20px;
  line-height: 33px;
  color: #262626;
  margin-bottom: 20px;
`;

export const BodyText = styled.p`
  font-weight: 400;
  font-size: 18px;
  line-height: 28px;
  color: #000000;
`;

export const BodyTextLight = styled.p`
  font-weight: 300;
  font-size: 16px;
  line-height: 28px;
  color: #8c8c8c;
  margin-top: 5px;
`;

export const FullPageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${LoginBg});
  background-size: cover;
  height: 100vh;
`;

export const ImageLogoLogin = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 30%;
  }
`;

export const RememberForgotFlex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const TableTagContainer = styled.div`
  margin: -5px 0;
`;

export const ActionBox = styled.div`
  margin: ${(props) => (props.small ? "10px 0" : "26px 0")};
`;

export const MultiFormContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  width: 100%;
  overflow-x: auto;
  &::before,
  &::after {
    content: "";
    flex: 1;
  }
  /* scrollbar */
  &::-webkit-scrollbar {
    height: 4px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: #eee;
    border-radius: 4px;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #daeaf3;
    border-radius: 4px;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #bbb;
  }
`;

export const TypesBlock = styled.div`
  margin: 26px 0;
  ${MultiFormContainer} {
    margin-bottom: 20px;
  }
`;

export const InfoWithActions = styled.div`
  padding: 10px 0 0 0;
`;

export const ViewAllBtn = styled.div`
  margin: 10px 0 0 -5px;
  width: 100px;
  & button {
    text-decoration: underline;
  }
`;

export const ProvideEvidenceModalBoxContainer = styled.div`
  background-color: #fff;
  color: #262626;
  border-radius: 4px;
  overflow-x: hidden;
`;

export const ModalActionButtons = styled.div`
  margin: 30px 0 0 0;
`;

export const AlertWrapper = styled.div`
  position: fixed;
  right: 24px;
  top: 80px;
`;

export const HighlightText = styled.span`
  background: #f9d0d0;
`;

export const ProfileRemove = styled.span`
  transition: 0.3s all ease-in-out;
  display: none;
  position: absolute;
  top: 10px;
  right: -2px;
  background: #fff;
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.08);
  border: 1px solid #e5e5e5;
  border-radius: 50%;
  & .MuiButtonBase-root {
    padding: 2px;
    svg {
      width: 16px;
      height: 16px;
    }
  }
`;

export const ProfileUpload = styled.div`
  width: 100%;
  margin-bottom: 20px;
  .avatar {
    width: 120px;
    height: 120px;
  }
  label {
    cursor: pointer;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.3s all ease-in-out;
    width: 120px;
    margin: auto;
    & .MuiAvatar-root {
      &:hover {
        opacity: 0.7;
        transition: 0.3s all ease-in-out;
      }
    }
  }
  input {
    display: none;
  }
  span {
    font-size: 14px;
    text-align: center;
  }
  &:hover {
    ${ProfileRemove} {
      display: block;
      transition: 0.3s all ease-in-out;
    }
  }
`;

export const TripleCollapseContainer = styled.span`
  background: #f9d0d0;
  ${Box} {
    border: none;
    padding: 20px 5px 0 5px;
  }
`;

export const PlainTypesBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

export const PlainTypesItem = styled.div`
  width: 100%;
  background: ${(props) => (props.noBg ? "#fff" : "#daeaf3")};
  padding: ${(props) => (props.noMb ? "0" : "12px")};
  border-radius: 4px;
  margin-bottom: ${(props) => (props.noMb ? "0" : "20px")};
`;

export const ActionFlexTitle = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  > div {
    margin-left: 20px;
  }
`;

export const ChipsContainer = styled.div`
  display: flex;
  justify-content: ${(props) => (props.moMargin ? "flex-end" : "flex-start")};
  align-items: center;
  margin: ${(props) => (props.moMargin ? "0" : "20px 0 0 0")};
  > div {
    margin-right: 20px;
  }
`;

export const TableMore = styled.div`
  cursor: pointer;
`;

export const TableActionImage = styled.img`
  margin-right: 10px;
`;

export const TableActionIcon = styled.div`
  margin-right: 10px;
  margin-bottom: -4px;
  svg {
    width: 16px;
    height: 16px;
  }
`;

export const TempImage = styled.img`
  width: ${(props) => (props.w84 ? "498px" : "100%")};
`;

export const SectionFlex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  ${SectionTitle} {
    margin-bottom: 0;
  }
`;

export const CommentBlock = styled.div`
  margin-top: 20px;
`;

export const TableChipContainer = styled.div`
  display: flex;
  .custom-chip {
    background-color: #f0f0f0;
    color: #262626;
    margin-left: 5px;
    font-size: 12px;
    padding: 5px 6px !important;

    height: 22px !important ;
  }
`;
