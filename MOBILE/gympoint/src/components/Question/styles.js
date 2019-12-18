import styled from 'styled-components/native';

export const Container = styled.View`
  margin-bottom: 10px;
  padding: 14px 16px;
  border-radius: 4px;
  background: #fff;

  display: flex;
  flex-direction: column;
  /* align-items: center; */
  /* justify-content: space-between; */
`;

export const DivQuestion = styled.View`
  display: flex;
  flex-direction: column;
  margin: 10px 0px;
`;

export const Header = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const Title = styled.Text`
  font-weight: bold;
  color: #333;
  font-size: 16;
`;

export const Times = styled.Text`
  color: #999;
`;

export const DivAnswer = styled.View`
  display: flex;
  margin: 5px 0px;
`;

export const Info = styled.Text`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  color: #999;
`;
