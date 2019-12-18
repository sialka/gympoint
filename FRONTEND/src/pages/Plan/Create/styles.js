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

  form {
    main {
      span {
        margin-top: 5px;
        padding-left: 5px;
        font-size: 10px;
        color: red;
      }
    }
  }

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

      button {
        background: #ee4d64;
        border-radius: 4px;
        height: 36px;
        font-weight: bold;
        color: #fff;
        font-size: 14px;
        margin-right: 16px;
        text-transform: uppercase;
        padding: 0 15px;
        transition: background 0.2s;

        &:hover {
          background: ${darken(0.1, '#ee4d64')};
        }

        div {
          span {
            margin-left: 10px;
          }
        }
      }

      a {
        background: #999;
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
          background: ${darken(0.1, '#999')};
        }
      }
    }
  }

  main {
    display: flex;
    flex-direction: column;
    margin: 20px auto;
    width: 90%;

    div {
      margin-top: 20px;

      &:last-child {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }

      label {
        display: flex;
        flex-direction: column;
        font-size: 14px;
        color: #444;
        font-weight: bold;
        text-transform: uppercase;

        input {
          margin-top: 5px;
          border-radius: 4px;
          border: 1px solid #999999;
          height: 38px;
          padding: 0px 20px;
        }

        .total {
          display: flex;
          width: 200px;
          height: 38px;
          border-radius: 4px;
          background: #ddd;
          border: 1px solid #999;
          padding: 0px 20px;
          align-items: center;
          font-size: 14px;
          color: #444;
          font-weight: normal;
        }
      }
    }
  }
`;
