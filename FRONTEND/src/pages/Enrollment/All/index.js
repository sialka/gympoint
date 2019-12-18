import React from 'react';

import { Link } from 'react-router-dom';
import { GoPlus } from 'react-icons/go';

import ListEnrollments from './ListEnrollments';
import { Container, Content } from './styles';

export default function Enrollment() {
  return (
    <Container>
      <Content>
        <header>
          <h1>Gerenciando matrículas</h1>
          <div>
            <Link to="/enrollments/create">
              <div>
                <GoPlus color="white" size={14} />
                <span>cadastrar</span>
              </div>
            </Link>
          </div>
        </header>
        <ListEnrollments />
      </Content>
    </Container>
  );
}
