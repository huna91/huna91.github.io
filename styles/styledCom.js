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
  cursor: pointer;
`;
/* opacity: ${({ able }) => (able ? 1 : 0.6)};
  background-color: ${({ able }) => (able ? "blue" : "grey")}; */
/* cursor: ${({ able }) => (able ? pointer) : (not-allowed))}; */

const Voice_input = styled.input`
  width: 400px;
  height: 36px;
  border: none;
  border-radius: 5px;
`;

export { Mail_input, Mail_Ul, Mail_Li, Mail_btn, Voice_input };
