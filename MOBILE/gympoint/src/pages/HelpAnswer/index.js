import React from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '~/components/Background';

import logo from '~/assets/logo-small.png';

import Question from '~/components/Question';
import { Container, Header, Button, Image } from './styles';

export default function HelpAnswer({ navigation }) {
  const { data } = navigation.state.params;

  // console.tron.log(data);
  return (
    <Background>
      <Header>
        <Button
          onPress={() => {
            navigation.navigate('HelpList');
          }}
        >
          <Icon name="chevron-left" size={20} color="red" />
        </Button>

        <Image source={logo} />
      </Header>
      <Container>
        <Question data={data} />
      </Container>
    </Background>
  );
}

// HelpAnswer.navigationOptions = ({ navigation }) => ({
//   headerLeft: () => (
//     <TouchableOpacity
//       onPress={() => {
//         navigation.navigate('HelpList');
//       }}
//     >
//       <Icon name="chevron-left" size={20} color="red" />
//     </TouchableOpacity>
//   ),
// });
