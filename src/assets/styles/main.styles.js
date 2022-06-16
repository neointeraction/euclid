import styled from "styled-components";

export const Section = styled.div`
  padding: 10px 0;
`;

export const Box = styled.div`
  background: #ffffff;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  padding: ${(props) => (props.noPadding ? 0 : "24px")};
`;

export const SectionTitle = styled.div`
  font-weight: 700;
  font-size: 20px;
  line-height: 33px;
  color: #262626;
  margin-bottom: 20px;
`;
