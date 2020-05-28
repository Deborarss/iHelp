import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  place-content: center;
  place-items: center;
`;

export const Content = styled.div`
  text-align: center;
  width: 100%;
  max-width: 315px;

  img {
    width: 160px;
  }

  form {
    display: flex;
    flex-direction: column;
    margin: 40px 0;

    h1 {
      margin-bottom: 24px;
    }

    a {
      color: #fff;
      display: block;
      margin-top: 10px;
      transition: color 0.2s;

      :hover {
        color: ${shade(0.2, '#3b9eff')};
      }
    }
  }

  > a {
    color: ${shade(0.2, '#3b9eff')};
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.2s;

    :hover {
      color: ${shade(0.4, '#3b9eff')};
    }

    svg {
      margin-right: 16px;
    }
  }
`;
