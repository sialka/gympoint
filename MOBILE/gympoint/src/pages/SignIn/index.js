import React, { useState } from 'react';
import { Image } from 'react-native';
import { useDispatch } from 'react-redux';

import logo from '~/assets/logo.png';

import Background from '~/components/Background';
import { studentInRequest } from '~/store/modules/student/actions';

import { Container, Form, FormInput, SubmitButton } from './styles';

export default function SignIn() {
  const dispatch = useDispatch();
  const [id, setId] = useState('');

  function handleSubmit() {
    // console.tron.log('submit: ', id);
    dispatch(studentInRequest(id));
  }

  return (
    <Background>
      <Container>
        <Image source={logo} />

        <Form>
          <FormInput
            keyboardType="decimal-pad"
            placeholder="Informe seu ID de cadastro"
            returnKeyType="send"
            value={`${id}`}
            onChangeText={setId}
          />

          <SubmitButton onPress={handleSubmit}>Entrar no Sistema</SubmitButton>
        </Form>
      </Container>
    </Background>
  );
}
