/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';
// import { Text } from 'react-native';

import { TouchableOpacity } from 'react-native';

import { parseISO, formatDistance } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { Container, Header, Status, Info, Question, Span } from './styles';

export default function Aswer({ data }) {
  const checkDate = useMemo(() => {
    return formatDistance(parseISO(data.created_at), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, [data.created_at]);

  return (
    <Container>
      <Header>
        <Status>
          {data.answer ? (
            <Icon name="check-circle" size={20} color="green" />
          ) : (
            <Icon name="check-circle" size={20} color="#ddd" />
          )}

          <Span>{data.answer ? 'Respondido' : 'Sem resposta'}</Span>
        </Status>
        <Info>{checkDate}</Info>
      </Header>
      <Question>{data.question}</Question>
    </Container>
  );
}
