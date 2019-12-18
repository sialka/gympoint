import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import {
  FaArrowCircleLeft,
  FaArrowCircleRight,
  FaTrashAlt,
  FaUserEdit,
} from 'react-icons/fa';
import {
  studentFormUpdate,
  studentDeleteInRequest,
  studentRefresh,
} from '~/store/modules/student/actions';
import history from '~/services/history';

import api from '~/services/api';

import { Container, Loading } from './styles';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  tableHead: {
    color: '#444444',
    fontSize: '16px',
    fontWeight: 'bolder',
    background: 'white',
    border: '0',
    margin: '0',
  },
  tableWrapper: {
    maxHeight: 440,
    overflow: 'auto',
    padding: '10px 15px',
    margin: '15px 0px',
    border: '1px solid white',
  },
  tableItem: {
    color: '#666666',
    lineHeight: '20px',
    fontSize: '16px',
  },
});

export default function Listing() {
  const classes = useStyles();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [backend, setBackend] = useState(false);
  const [page, setPage] = useState(1);
  const [btnPrev, setBtnprev] = useState(false);
  const [btnNext, setBtnnext] = useState(false);
  const dispatch = useDispatch();
  const refresh = useSelector(state => state.student.id);
  const search = useSelector(state => state.student.searchSt);

  useEffect(() => {
    async function carrega() {
      try {
        let tamanho;

        if (search === null) {
          const response = await api.get(`students?page=${page}`);
          tamanho = response.data;
        } else {
          const response = await api.get(`students?page=${page}&q=${search}`);
          tamanho = response.data;
        }

        // Paginação
        if (tamanho.length < 5 || 0) {
          setBtnnext(false);
        } else {
          setBtnnext(true);
        }

        if (page > 1 || 0) {
          setBtnprev(true);
        } else {
          setBtnprev(false);
        }

        if (tamanho.length !== 0) {
          setStudents(tamanho);
          setLoading(true);
          setBackend(false);
        }
      } catch (err) {
        setLoading(true);
        setBackend(true);
      }
    }

    carrega();
  }, [page, refresh, search]);

  function HandleDelete(id) {
    dispatch(studentRefresh(0));
    dispatch(studentDeleteInRequest(id));
  }

  function HandleUpdate(student) {
    dispatch(studentFormUpdate(student));
    history.push('/students/update');
  }

  function handleNext() {
    setPage(page + 1);
  }

  function handlePrev() {
    setPage(page - 1);
  }

  return (
    <Container>
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell
                  key="id"
                  align="left"
                  style={{ minWidth: 10 }}
                  className={classes.tableHead}
                >
                  ID
                </TableCell>
                <TableCell
                  key="nome"
                  align="left"
                  style={{ minWidth: 180 }}
                  className={classes.tableHead}
                >
                  NOME
                </TableCell>
                <TableCell
                  key="email"
                  align="left"
                  style={{ minWidth: 150 }}
                  className={classes.tableHead}
                >
                  E-MAIL
                </TableCell>
                <TableCell
                  key="idade"
                  align="center"
                  style={{ minWidth: 50 }}
                  className={classes.tableHead}
                >
                  IDADE
                </TableCell>
                <TableCell
                  key="botoes"
                  align="left"
                  style={{ minWidth: 50 }}
                  className={classes.tableHead}
                />
              </TableRow>
            </TableHead>
            <TableBody id="tablebody">
              {students.map(i => (
                <TableRow key={i.id} hover>
                  <TableCell className={classes.tableItem}>{i.id}</TableCell>
                  <TableCell className={classes.tableItem}>{i.name}</TableCell>
                  <TableCell className={classes.tableItem}>{i.email}</TableCell>
                  <TableCell className={classes.tableItem} align="center">
                    {i.age}
                  </TableCell>
                  <TableCell align="right">
                    <button
                      type="button"
                      onClick={() => {
                        HandleUpdate(i);
                      }}
                    >
                      <FaUserEdit color="#4d85ee" size={18} />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (
                          // eslint-disable-next-line no-alert
                          window.confirm('Deseja realmente excluir o Aluno ?')
                        )
                          HandleDelete(i.id);
                      }}
                    >
                      <FaTrashAlt color="#de3b3b" size={18} />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <nav>
            {btnPrev ? (
              <button type="button" onClick={handlePrev}>
                <FaArrowCircleLeft size={32} />
              </button>
            ) : (
              ''
            )}
            {btnNext ? (
              <button type="button" onClick={handleNext}>
                <FaArrowCircleRight size={32} />
              </button>
            ) : (
              ''
            )}
          </nav>
        </div>
      </Paper>
      <Loading>
        {loading ? '' : 'Carregando...'}
        {backend ? 'Não foi possivel acessar as informações...' : ''}
      </Loading>
    </Container>
  );
}
