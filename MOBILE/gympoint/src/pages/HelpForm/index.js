import React, { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import TextArea from 'react-native-textarea';
import { studentQuestion } from '~/store/modules/student/actions';
import Background from '~/components/Background';
import { Header, Container, ButtonSend, ButtonReturn, Image } from './styles';
import logo from '~/assets/logo-small.png';

export default function HelpForm({ navigation }) {
  const id = useSelector(state => state.student.id);
  const dispatch = useDispatch();
  const [question, setQuestion] = useState('');

  const styles = StyleSheet.create({
    textarea: {
      textAlignVertical: 'top', // hack android
      height: 200,
      fontSize: 14,
      color: '#333',
      backgroundColor: '#fff',
    },
  });

  function handSend() {
    dispatch(studentQuestion(id, question));

    setQuestion('');
  }

  function onChange(text) {
    setQuestion(text);
  }

  return (
    <Background>
      <Header>
        {/* teste */}
        <ButtonReturn
          onPress={() => {
            navigation.navigate('HelpList');
          }}
        >
          <Icon name="chevron-left" size={20} color="red" />
        </ButtonReturn>
        {/* fim do  teste */}
        <Image source={logo} />
      </Header>
      <Container>
        <TextArea
          style={styles.textarea}
          onChangeText={onChange}
          defaultValue={question}
          maxLength={120}
          placeholder="Inclua seu pedido de auxilio"
          placeholderTextColor="#c7c7c7"
        />
        <ButtonSend onPress={handSend}>Enviar Pedido</ButtonSend>
      </Container>
    </Background>
  );
}

// HelpForm.navigationOptions = ({ navigation }) => ({
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
