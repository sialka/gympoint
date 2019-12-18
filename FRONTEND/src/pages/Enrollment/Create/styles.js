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
  width: 80%;

  header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    h1 {
      font-size: 24px;
      font-weight: bold;
      color: #444;
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
      span {
        margin-top: 10px;
        color: red;
        font-weight: normal;
        text-transform: initial;
        font-size: 12px;
      }
    }

    .div-study {
      display: flex;
      flex-direction: row;
      font-size: 1rem;

      label {
        display: flex;
        flex-direction: column;
        width: 100%;
        font-weight: bold;
        color: #444;
        text-transform: uppercase;

        input {
          margin-top: 5px;
          border-radius: 4px;
          border: 1px solid #999999;
          height: 38px;
          padding: 0px 10px;

          &:focus:hover {
            outline: none;
            box-shadow: 0px 0px 5px #61c5fa;
            border: 1px solid #5ab0db;
          }
        }
      }
    }

    .div-plan-dates-value {
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      .item {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 24%;

        label {
          display: flex;
          flex-direction: column;
          width: 100%;
          margin-top: 25px;
          font-weight: bold;

          color: #444;
          text-transform: uppercase;

          input {
            margin-top: 5px;
            border-radius: 4px;
            border: 1px solid #999999;
            height: 38px;
            padding: 0px 10px;
            width: 100%;
          }

          select {
            margin-top: 5px;
            border-radius: 4px;
            border: 1px solid #999999;
            height: 38px;
            padding: 0px 10px;

            &:focus:hover {
              outline: none;
              box-shadow: 0px 0px 5px #61c5fa;
              border: 1px solid #5ab0db;
            }
          }

          .info {
            margin-top: 5px;
            border-radius: 4px;
            border: 1px solid #999999;
            height: 38px;
            padding: 10px 10px;
            text-align: center;
            background: #d3d3d3;
            color: #444;
            font-size: 1rem;
          }
        }
      }
    }
  }
`;
