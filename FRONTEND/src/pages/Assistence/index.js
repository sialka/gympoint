import React from 'react';

import ListAssistence from './ListAssistence';
import { Container, Content } from './styles';

export default function Assistence() {
  return (
    <Container>
      <Content>
        <header>
          <h1>Pedidos de auxílio</h1>
        </header>
        <ListAssistence />
      </Content>
    </Container>
  );
}
