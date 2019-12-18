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

export const Header = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const Status = styled.View`
  display: flex;
  flex-direction: row;
`;

export const Info = styled.Text`
  display: flex;
  color: #999;
`;

export const Span = styled.Text`
  margin-left: 10px;
  font-weight: bold;
  color: #333;
`;

export const Question = styled.Text`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  color: #666;
`;
