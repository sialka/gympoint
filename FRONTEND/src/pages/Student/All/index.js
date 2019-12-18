import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { GoPlus } from 'react-icons/go';
import { searchInStudy } from '~/store/modules/student/actions';

import ListStudent from './ListStudent';

import { Container, Content } from './styles';

export default function Student() {
  const dispatch = useDispatch();
  const search = useSelector(state => state.student.searchSt);

  function send(e) {
    if (e.key === 'Enter') {
      const search = document.getElementById('search').value;
      dispatch(searchInStudy(search));
    }
  }

  useEffect(() => {
    document.getElementById('search').value = search;
  });

  return (
    <Container>
      <Content>
        <header>
          <h1>Gerenciando alunos</h1>
          <div>
            <Link to="/students/create">
              <div>
                <GoPlus color="white" size={14} />
                <span>cadastrar</span>
              </div>
            </Link>
            <input
              type="text"
              id="search"
              placeholder="Buscar aluno"
              onKeyPress={send}
            />
          </div>
        </header>
        <ListStudent />
      </Content>
    </Container>
  );
}
