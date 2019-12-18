import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  display: flex;
  background: #f5f5f5;
  height: 90%;
  max-width: 1080px;
  margin: 0 auto;
`;

export const Content = styled.div`
  margin: 38px auto;
  width: 70%;

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

    div {
      display: flex;
      flex-direction: row;
      height: 36px;
      align-items: center;

      a {
        background: #ee4d64;
        border-radius: 4px;
        height: 36px;
        font-weight: bold;
        color: #fff;
        font-size: 14px;
        transition: background 0.2s;
        margin-right: 16px;
        text-transform: uppercase;
        padding: 0 15px;

        span {
          margin-left: 10px;
        }

        &:hover {
          background: ${darken(0.1, '#ee4d64')};
        }
      }

      input {
        height: 36px;
        border-radius: 4px;
        font-size: 14px;
        padding: 0 32px;
        border: 1px solid #dddddd;

        &::placeholder {
          color: #c9c9c9;
        }
      }
    }
  }

  .table {
    background: red;
    padding: 10px;
  }
  .table2 {
    padding: 10px 20px;
  }
`;
