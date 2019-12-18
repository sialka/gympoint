/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';

import { parseISO, formatDistance } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { Container, DivQuestion, Header, Title, Times, DivAnswer, Info } from './styles';

export default function Question({ data }) {
  const checkDate = useMemo(() => {
    return formatDistance(parseISO(data.updated_at), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, [data.createdAt]);

  return (
    <Container>
      <DivQuestion>
        <Header>
          <Title>PERGUNTA</Title>
          <Times>{checkDate}</Times>
        </Header>
        <Info>
          {data.question}
        </Info>
      </DivQuestion>

      <DivAnswer>
        <Header>
          <Title>RESPOSTA</Title>
        </Header>
        <Info>
          {data.answer === null ? '...' : data.answer }
        </Info>
      </DivAnswer>
    </Container>
  );
}
