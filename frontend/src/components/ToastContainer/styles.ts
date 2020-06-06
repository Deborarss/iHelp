import styled, { css } from 'styled-components';

interface ToastProps {
  type?: string;
  hasDescription: boolean;
}

export const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 30px;
  overflow: hidden;
`;

export const Toast = styled.div<ToastProps>`
  width: 360px;
  position: relative;
  padding: 16px 30px 16px 16px;
  border-radius: 10px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  background-color: #ebf8ff;
  color: #1890d8;

  & + div {
    margin-top: 8px;
  }

  ${(props) =>
    props.type === 'success' &&
    css`
      background: #e6fffa;
      color: #2e656a;
    `}

  ${(props) =>
    props.type === 'error' &&
    css`
      background: #fddede;
      color: #c53030;
    `}

    ${(props) =>
      !props.hasDescription &&
      css`
        p {
          display: none;
        }
      `}

    > svg {
    margin: 2px 12px 0 0;
  }

  div {
    width: 100%;

    p {
      margin-top: 4px;
      font-size: 14px;
      opacity: 0.8;
      line-height: 20px;
    }
  }

  button {
    position: absolute;
    right: 16px;
    top: 19px;
    opacity: 0.6;
    border: none;
    color: inherit;
    background: transparent;
  }
`;
