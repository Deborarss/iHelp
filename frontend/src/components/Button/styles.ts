import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  background: #3b9eff;
  height: 56px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  font-weight: 500;
  margin-top: 16px;
  width: 100%;
  color: #fff;
  transition: background-color 0.2s;

  :hover {
    background-color: ${shade(0.2, '#3b9eff')};
  }
`;
