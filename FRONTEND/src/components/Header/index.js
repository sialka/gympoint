import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { signOut } from '~/store/modules/auth/actions';

import logo from '~/assets/logo-header.png';

import { Container } from './styles';

export default function Header() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <header>
        <div>
          <Link to="/">
            <img src={logo} alt="gympoint" />
            GYMPOINT
          </Link>

          <ul>
            <li>
              <NavLink activeStyle={{ color: '#333333' }} to="/students">
                alunos
              </NavLink>
            </li>
            <li>
              <NavLink activeStyle={{ color: '#333333' }} to="/plans">
                planos
              </NavLink>
            </li>
            <li>
              <NavLink activeStyle={{ color: '#333333' }} to="/enrollments">
                matrículas
              </NavLink>
            </li>
            <li>
              <NavLink activeStyle={{ color: '#333333' }} to="/assistences">
                pedidos de auxílio
              </NavLink>
            </li>
          </ul>
        </div>
        <aside>
          <div>
            <strong>{profile.name}</strong>
            <button type="button" onClick={handleSignOut}>
              sair do sistema
            </button>
          </div>
        </aside>
      </header>
    </Container>
  );
}
