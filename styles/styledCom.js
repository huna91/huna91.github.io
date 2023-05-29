import styled from "styled-components";

const Mail_input = styled.input`
  box-shadow: 0 0 5px ${({ check }) => (check ? "green" : "pink")};
  border: 1px solid ${({ check }) => (check ? "green" : "pink")};
`;

const Mail_Ul = styled.ul`
  border: 1px solid red;
`;

const Mail_Li = styled.li`
  background-color: ${({ selected }) => (selected ? "#f5f5f5" : "")};
  color: ${({ selected }) => (selected ? "var(--zu--m4-color)" : "")};
`;

const Mail_btn = styled.button`
  opacity: ${({ able }) => (able ? 1 : 0.6)};
  background-color: ${({ able }) => (able ? "blue" : "grey")};
  cursor: pointer;
`;
/* cursor: ${({ able }) => (able ? pointer) : (not-allowed))}; */

export { Mail_input, Mail_Ul, Mail_Li, Mail_btn };
