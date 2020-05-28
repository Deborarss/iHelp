import styled from 'styled-components';

export const Container = styled.div`
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
