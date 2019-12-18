import React from 'react';
import { Link } from 'react-router-dom';

import { GoPlus } from 'react-icons/go';
import ListPlan from './ListPlan';
import { Container, Content } from './styles';

export default function Student() {
  return (
    <Container>
      <Content>
        <header>
          <h1>Gerenciando planos</h1>
          <div>
            <Link to="/plans/create">
              <div>
                <GoPlus color="white" size={14} />
                <span>cadastrar</span>
              </div>
            </Link>
          </div>
        </header>
        <ListPlan />
      </Content>
    </Container>
  );
}
