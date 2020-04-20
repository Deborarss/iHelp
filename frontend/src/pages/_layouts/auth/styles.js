import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: linear-gradient(-90deg, #7DDE92, #2EBFA5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 315px;
  text-align: center;

  img {
    width: 160px;
  }

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    input {
      background: rgba(0, 0, 0, 0.1);
      border: none;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: #fff;
      margin-bottom: 10px;

      &::placeholder {
        color: #fff;
        font-size: 16px;
      }
    }

    button {
      margin-top: 5px;
      height: 44px;
      background: #3b9eff;
      font-weight: bold;
      color: #fff;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.04, '#3b9eff')};
      }
    }

    a {
      color: #fff;
      margin-top: 15px;
      font-size: 16px;
      opacity: 0.8;

      &:hover {
        opacity: 1;
      }
    }
  }
`;
