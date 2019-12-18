import styled from 'styled-components/native';

// import Button from '~/components/Button';
import { TouchableOpacity } from 'react-native';

export const Header = styled.View`
  display: flex;
  flex-direction: row;

  /* justify-content: space-between; */
  /* align-items: center; */
  background: #fff;
  padding: 15px 0px;
`;

export const Button = styled(TouchableOpacity)`
  margin-left: 30px;
`;

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
  background: #ddd;
  padding: 20px 30px;
`;

export const Image = styled.Image`
  margin-left: 20%;
`;
