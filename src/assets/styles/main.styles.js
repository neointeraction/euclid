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


// for login 
export const FullPageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url('https://res.cloudinary.com/dhs3t6x02/image/upload/v1655280230/samples/Bg_rq6ksx.png');
  background-size: cover;
  height: 100vh;
`;
