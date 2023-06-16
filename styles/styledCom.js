import styled from "styled-components";

const Mail_input = styled.input`
  box-shadow: 0 0 5px ${({ check }) => (check ? "green" : "pink")};
  border: 1px solid ${({ check }) => (check ? "green" : "pink")};
  width: 100%;
  height: 9%;
  border-radius: 5px;
`;

const Mail_Ul = styled.ul`
  border: 1px solid red;
  list-style-type: style none;
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

const Phone_box = styled.div`
  width: 40px;
  height: 40px;
  text-align: center;
  line-height: 38px;
  border-radius: 5px;
  box-shadow: -4px -4px 13px 0px rgba(255, 255, 255, 0.64),
    4px 4px 10px 0px rgba(13, 39, 80, 0.16);
  margin: 0 ${({ ind }) => (ind === 2 || ind === 6 ? "20px" : "8px")} 0 0;
  border-bottom: 2px solid
    ${({ cur, ind }) => (cur !== ind ? "none" : "fuchsia")};
`;

const Contents_ul = styled.ul`
  height: 228px;
  list-style: none;
  padding: 20px;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`;

export {
  Mail_input,
  Mail_Ul,
  Mail_Li,
  Mail_btn,
  Voice_input,
  Phone_box,
  Contents_ul,
};
