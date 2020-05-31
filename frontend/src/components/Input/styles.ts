import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  border: 2px solid rgb(0, 0, 0, 0.1);
  padding: 16px;
  width: 100%;
  color: #fff;
  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  ${(props) =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${(props) =>
    props.isFocused &&
    css`
      color: #ffa500;
      border-color: #ffa500;
    `}

  ${(props) =>
    props.isFilled &&
    css`
      color: #ffa500;
    `}

  input {
    background: transparent;
    width: 100%;
    border: 0;
    color: #fff;

    &::placeholder {
      color: #fff;
      font-size: 16px;
    }
  }

  > svg {
    margin-right: 16px;
  }
`;

export const Error = styled.div`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }
`;
