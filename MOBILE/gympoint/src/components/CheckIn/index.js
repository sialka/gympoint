/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';

import { parseISO, formatDistance } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { Container, Info, Label } from './styles';

export default function Appointment({ data }) {
  const checkDate = useMemo(() => {
    return formatDistance(parseISO(data.createdAt), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, [data.createdAt]);

  return (
    <Container>
      <Label>Check-in #{data.checkin}</Label>

      <Info>{checkDate}</Info>
    </Container>
  );
}
