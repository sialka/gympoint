import styled from 'styled-components/native';

import { TouchableOpacity } from 'react-native';
import Button from '~/components/Button';

export const Header = styled.View`
  display: flex;
  flex-direction: row;

  /* justify-content: space-between; */
  /* align-items: center; */
  background: #fff;
  padding: 15px 0px;
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

export const ButtonSend = styled(Button)`
  margin-top: 50px;
`;

export const ButtonReturn = styled(TouchableOpacity)`
  margin-left: 30px;
`;
