import styled from 'styled-components';

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  /* align-items: center; */
  padding: 2px;
  flex: 1;

  & > .content {
    flex: 1;
    text-align: start;
    color: rgb(106, 106, 106);
    display: flex;
    align-items: center;
  }

  & > .content > .icon {
    padding: 0px 8px;
  }

  & > .content > .title {
    font-size: 14px;
  }

  input[type="radio"]:checked ~ & {
    background-color: #f0f0f0;
  }
  input[type="radio"]:checked ~ & > .content {
    color: black;
  }

  & > .actions {
    visibility: hidden;
    display: flex;
    align-items: center;
  }
  & > .actions > button {
    background-color: transparent;
    border: none;
  }

  & > .hidden {
    display: none;
  }

  & .error {
    color: red;
    display: block;
  }

  &:hover > .actions {
    visibility: visible;
  }

  & > .actions > button > .icon {
    color: rgb(106, 106, 106);
  }
  & > .actions > button > .icon:hover {
    color: black;
  }
`;


export const MaybeSpan = styled.span`
  display: ${(props) => (props.visible ? "inherit" : "none")};
`;

export default StyledDiv;
