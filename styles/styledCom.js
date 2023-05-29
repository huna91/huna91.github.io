import styled from "styled-components";

const Mail_Ul = styled.ul``;

const Mail_Li = styled.li`
  background-color: ${({ selected }) => (selected ? "#f5f5f5" : "")};
  color: ${({ selected }) => (selected ? "var(--zu--m4-color)" : "")};
`;

export { Mail_Ul, Mail_Li };
