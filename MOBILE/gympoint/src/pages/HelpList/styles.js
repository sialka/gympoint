import styled from 'styled-components/native';

export const Header = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  padding: 15px 0px;
`;

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
  background: #ddd;
  padding: 20px 30px;
`;

export const Text = styled.Text`
  color: #000;
`;

export const Image = styled.Image`
  display: flex;
  align-content: center;
  background: red;
`;

export const DivButton = styled.View``;

export const DivList = styled.View`
  padding: 0;
  margin-top: 20px;
  height: 85%;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { marginTop: 0 },
})``;
