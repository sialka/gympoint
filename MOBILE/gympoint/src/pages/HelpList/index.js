/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { TouchableOpacity, Image } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import Answer from '~/components/Answer';

import Background from '~/components/Background';
import logo from '~/assets/logo-small.png';
import Button from '~/components/Button';

import { Container, Header, List, DivButton, DivList } from './styles';

// const data = [1, 2];

export default function HelpList({ navigation }) {
  const id = useSelector(state => state.student.id);
  const [orders, setOrders] = useState([]);

  console.tron.log('HelpList');
  // const { data } = navigation.state.params;

  useEffect(() => {
    async function loadHelpOrders() {
      const response = await api.get(`students/${id}/help-orders`);

      console.tron.log('Response: ', response.data);
      console.tron.log('orders: ', orders);

      setOrders(response.data);
    }

    loadHelpOrders();
  }, [id]);

  console.tron.log(orders);

  return (
    <Background>
      <Header>
        <Image source={logo} />
      </Header>
      <Container>
        <DivButton>
          <Button
            onPress={() => {
              navigation.navigate('HelpForm');
            }}
          >
            Novo pedido de auxílio
          </Button>
        </DivButton>
        <DivList>
          <List
            data={orders}
            keyExtractor={item => item.key}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('HelpAnswer', { data: item });
                  }}
                >
                  <Answer data={item} />
                </TouchableOpacity>
              );
            }}
          />
        </DivList>
      </Container>
    </Background>
  );
}

HelpList.navigationOptions = ({ navigation }) => ({
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Dashboard');
      }}
    >
      <Icon name="chevron-left" size={20} color="red" />
    </TouchableOpacity>
  ),
});
