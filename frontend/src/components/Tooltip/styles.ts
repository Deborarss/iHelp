import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  span {
    width: 160px;
    position: absolute;
    background: #ffa500;
    padding: 8px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    opacity: 0;
    transition: opacity 0.4s;
    display: none;
    bottom: calc(100% + 12px);
    left: 50%;
    transform: translateX(-50%);

    &::before {
      content: '';
      border-style: solid;
      border-color: #ffa500 transparent;
      border-width: 6px 6px 0 6px;
      top: 100%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  &:hover span {
    opacity: 1;
    display: block;
  }
`;
