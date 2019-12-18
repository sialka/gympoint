/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Image } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import { studentInRequest, studentExit } from '~/store/modules/student/actions';

import Background from '~/components/Background';
import Button from '~/components/Button';
import CheckIn from '~/components/CheckIn';

import logo from '~/assets/logo-small.png';

import { Container, Header, List, DivButton, DivList, Exit } from './styles';

export default function Dashboard() {
  const dispatch = useDispatch();
  const [checkins, setCheckins] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const id = useSelector(state => state.student.id);

  useEffect(() => {
    async function loadCheckins() {
      const resul = await api.get(`students/${id}/checkins`);

      const response = resul.data.map((item, index) => {
        return {
          ...item,
          checkin: index + 1,
        };
      });

      setCheckins(response);
    }

    loadCheckins();
  }, [id, refresh]);

  function handCheckIn() {
    dispatch(studentInRequest(id));
    refresh === false ? setRefresh(true) : setRefresh(false);
  }

  function handExit() {
    dispatch(studentExit());
  }

  return (
    <Background>
      <Header>
        <Image source={logo} />
      </Header>
      <Container>
        <DivButton>
          <Button onPress={handCheckIn}>Novo check-in</Button>
        </DivButton>
        <DivList>
          <List
            data={checkins}
            keyExtractor={item => item.key}
            renderItem={({ item }) => <CheckIn data={item} key={item.id} />}
          />
          <Exit onPress={handExit}>Mudar ID</Exit>
        </DivList>
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Check-ins',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="beenhere" size={20} color={tintColor} />
  ),
};
