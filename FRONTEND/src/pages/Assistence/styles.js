import styled from 'styled-components';

export const Container = styled.div`
  background: #f5f5f5;
  height: 90%;
  max-width: 1080px;
  margin: 0 auto;
`;

export const Content = styled.div`
  padding-top: 38px;
  max-width: 65%;
  margin: 0 auto;

  header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    h1 {
      font-size: 24px;
      font-weight: bold;
      color: #444444;
    }
  }
`;
