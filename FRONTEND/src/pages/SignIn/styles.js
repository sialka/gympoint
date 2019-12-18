import styled from 'styled-components';

import { darken } from 'polished';

export const Content = styled.div`
  width: 100%;
  max-width: 360px;
  text-align: center;
  background: #fff;
  padding: 45px 30px;
  border-radius: 4px;

  h1 {
    text-transform: uppercase;
    font-size: 29px;
    font-weight: bold;
    color: #ee4d64;
  }

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    label {
      display: flex;
      flex-direction: column;
      font-weight: bolder;
      font-size: 14px;
      color: #444444;
      text-align: left;
      margin-top: 10px;
      margin-bottom: 15px;

      input {
        background: #fff;
        border: 1px solid #dddddd;

        border-radius: 4px;
        height: 44px;
        padding: 0 15px;
        color: #444444;
        margin-top: 10px;

        &::placeholder {
          color: #999999;
        }
      }
    }

    button {
      margin: 5px 0 0;
      height: 44px;
      background: #ee4d64;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.05, '#ee4d64')};
      }
    }

    span {
      color: #ee4d64;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }
  }
`;
