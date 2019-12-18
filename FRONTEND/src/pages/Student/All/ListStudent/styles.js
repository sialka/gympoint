import styled from 'styled-components';

export const Container = styled.div`
  button {
    border: 0;
    background: transparent;
    font-size: 15px;
    margin-left: 10px;
  }

  p {
    color: #444;
    text-align: center;
  }

  .blue {
    color: #4d85ee;
  }

  .red {
    color: #de3b3b;
  }

  nav {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 5px 15px;

    button {
      display: flex;
      justify-content: center;
      height: 32px;
      width: 32px;
      color: #999;
      transition: background 0.2s;

      &:hover {
        color: #333;
      }
    }
  }
`;

export const Loading = styled.div`
  max-width: 100%;
  margin: 25px auto;
  text-align: center;
  font-size: 14px;
  color: #333;
  font-weight: bolder;
`;
