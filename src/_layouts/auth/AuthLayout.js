import styled from "styled-components";
import React from "react";
import PropTypes from "prop-types";
const Wrapper = styled.div`
  background: linear-gradient(to bottom, #e7ffb3, #707070);
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Header = styled.div`
  background: #333;
  height: 10vh;
`;

export default function AuthLayout({ children }) {
  console.log(children);
  return (
    <>
      <Header />
      <Wrapper>{children}</Wrapper>
    </>
  );
}
AuthLayout.propTypes = {
  children: PropTypes.element.isRequired
};
