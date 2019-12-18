import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1080px;
  margin: 0 auto;
  padding-top: 15px;

  header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    background: #fff;
    padding: 11px 22px;
    border: 1px solid #ddd;

    div {
      display: flex;

      a {
        display: flex;
        align-items: center;
        font-size: 15px;
        color: #ee4d64;
        font-weight: bold;
        padding-right: 22px;
        padding-top: 7px;
        padding-bottom: 7px;

        img {
          margin-right: 9px;
        }
      }
    }

    ul {
      display: flex;
      align-items: center;
      border-left: 1px solid #ddd;
      padding-left: 30px;

      li {
        a {
          margin-left: 16px;
          color: #999;
          text-transform: uppercase;
        }
      }
    }
  }
  aside {
    div {
      display: flex;
      flex-direction: column;

      strong {
        font-weight: bold;
        font-size: 14px;
        color: #666;
        text-align: right;
      }
      button {
        border: 0;
        color: #de3b3b;
        font-size: 14px;
        background: transparent;
        text-align: right;
      }
    }
  }
`;
