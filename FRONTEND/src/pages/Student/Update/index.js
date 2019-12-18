import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import history from '~/services/history';

import * as Yup from 'yup';
import { GoChevronLeft, GoCheck } from 'react-icons/go';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { studentUpdate } from '~/store/modules/student/actions';

import { Container, Content } from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  age: Yup.number()
    .integer()
    .positive()
    .typeError('Campo númerico')
    .required('A idade é obrigatória'),
  weight: Yup.number()
    .positive()
    .typeError('Campo númerico')
    .required('O peso é obrigatório'),
  height: Yup.number()
    .positive()
    .typeError('Campo númerico')
    .required('A altura é obrigatória'),
});

export default function UpdateStudent() {
  const dispatch = useDispatch();
  const student = useSelector(state => state.student);
  // console.log('update: ', student);

  useEffect(() => {

    if (student.id === 0 ) {
      history.push('/students');
    }

  }, [student])

  function handleSubmit(data) {
    const { name, age, email, weight, height } = data;

    dispatch(studentUpdate(name, age, email, weight, height));
  }

  return (
    <Container>
      <Content>
        <Form schema={schema} initialData={student} onSubmit={handleSubmit}>
          <header>
            <h1>Edição de aluno</h1>
            <div>
              <Link to="/students">
                <div>
                  <GoChevronLeft color="white" size={14} />
                  <span>voltar</span>
                </div>
              </Link>
              <Button type="submit">
                <div>
                  <GoCheck color="white" size={14} />
                  <span>salvar</span>
                </div>
              </Button>
            </div>
          </header>
          <main>
            <div>
              <label>
                nome completo
                <Input name="name" placeholder="Digite o nome" />
              </label>
            </div>
            <div>
              <label>
                endereço de e-mail
                <Input name="email" placeholder="exemplo@email.bom" disabled/>
              </label>
            </div>
            <div>
              <label>
                idade
                <Input type="number" name="age" placeholder="0" />
              </label>
              <label>
                peso (em kg)
                <Input name="weight" placeholder="0" />
              </label>
              <label>
                altura
                <Input name="height" placeholder="0" />
              </label>
            </div>
          </main>
        </Form>
      </Content>
    </Container>
  );
}
