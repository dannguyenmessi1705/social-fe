import styled from "styled-components";

const StyledItem = styled.a`
  border-color: rgba(0, 0, 0, 0.8);
  text-align: left;
  padding: 12px;
  font-size: 12px;
  display: block;
  span {
    display: flex;
    align-items: center;
    color: rgba(0, 0, 0, 1);
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
  }
`;

function Item({ children }) {
  return <StyledItem>{children}</StyledItem>;
}

export default Item;
