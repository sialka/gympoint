import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';

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

import { format, parseISO } from 'date-fns';

import pt from 'date-fns/locale/pt';

import { MdCheckCircle } from 'react-icons/md';
import {
  enrollmentDeleteInRequest,
  enrollmentRefresh,
  enrollmentFormUpdate,
} from '~/store/modules/enrollment/actions';
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
    maxHeight: 500,
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
  tableDeleted: {
    color: '#999',
    textDecoration: 'line-through',
  },
});

export default function ListEnrollments() {
  const classes = useStyles();
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [backend, setBackend] = useState(false);
  const [page, setPage] = useState(1);
  const [btnPrev, setBtnprev] = useState(false);
  const [btnNext, setBtnnext] = useState(false);
  const dispatch = useDispatch();
  const search = useSelector(state => state.student.searchEn);
  const refresh = useSelector(state => state.enrollment.id);

  useEffect(() => {
    async function carrega() {
      try {
        let resul;

        if (search === null) {
          const response = await api.get(`enrollments?page=${page}`);
          resul = response.data;
        } else {
          const response = await api.get(
            `enrollments?page=${page}&q=${search}`
          );
          resul = response.data;
        }

        // const data = response.data.map(i => ({
        const data = resul.map(i => ({
          ...i,
          start_date_formated: format(
            parseISO(i.start_date),
            "d 'de' MMMM 'de' yyyy",
            { locale: pt }
          ),
          end_date_formated: format(
            parseISO(i.end_date),
            "d 'de' MMMM 'de' yyyy",
            { locale: pt }
          ),
        }));

        // if (data.length < 5 || 0) {
        if (resul.length < 5 || 0) {
          setBtnnext(false);
        } else {
          setBtnnext(true);
        }

        if (page > 1) {
          setBtnprev(true);
        } else {
          setBtnprev(false);
        }

        // if (data.length !== 0) {
        if (resul.length !== 0) {
          setEnrollments(data);
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

  function handleNext() {
    setPage(page + 1);
  }

  function handlePrev() {
    setPage(page - 1);
  }

  function HandleDelete(id) {
    dispatch(enrollmentRefresh(false));
    dispatch(enrollmentDeleteInRequest(id));
  }

  function HandleUpdate(enrollment) {
    // console.log(enrollment.id, enrollment.student.id, enrollment.student.name, enrollment.plan.id, enrollment.start_date)
    dispatch(
      enrollmentFormUpdate(
        enrollment.id,
        enrollment.student.id,
        enrollment.student.name,
        enrollment.plan.id,
        enrollment.start_date
      )
    );
    history.push('/enrollments/update');
  }

  return (
    <Container>
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell
                  key="name"
                  align="left"
                  style={{ minWidth: 150 }}
                  className={classes.tableHead}
                >
                  ALUNO
                </TableCell>
                <TableCell
                  align="center"
                  style={{ minWidth: 50 }}
                  className={classes.tableHead}
                >
                  PLANO
                </TableCell>
                <TableCell
                  align="center"
                  style={{ minWidth: 75 }}
                  className={classes.tableHead}
                >
                  INÍCIO
                </TableCell>
                <TableCell
                  align="center"
                  style={{ minWidth: 75 }}
                  className={classes.tableHead}
                >
                  TÉRMINO
                </TableCell>
                <TableCell
                  align="center"
                  style={{ minWidth: 50 }}
                  className={classes.tableHead}
                >
                  ATIVA
                </TableCell>
                <TableCell
                  align="left"
                  style={{ minWidth: 50 }}
                  className={classes.tableHead}
                />
              </TableRow>
            </TableHead>
            <TableBody>
              {enrollments.map(i => (
                <TableRow key={i.id} hover>
                  <TableCell className={classes.tableItem}>
                    {i.student === null ? (
                      <span className={classes.tableDeleted}>
                        Aluno deletado
                      </span>
                    ) : (
                      <span>{i.student.name}</span>
                    )}
                  </TableCell>
                  <TableCell className={classes.tableItem} align="center">
                    {i.plan === null ? (
                      <span className={classes.tableDeleted}>
                        Plano deletado
                      </span>
                    ) : (
                      <span>{i.plan.title}</span>
                    )}
                  </TableCell>
                  <TableCell className={classes.tableItem} align="center">
                    {i.start_date_formated}
                  </TableCell>
                  <TableCell className={classes.tableItem} align="center">
                    {i.end_date_formated}
                  </TableCell>
                  <TableCell className={classes.tableItem} align="center">
                    {i.active ? (
                      <MdCheckCircle color="#42cb59" />
                    ) : (
                      <MdCheckCircle color="#dddddd" />
                    )}
                  </TableCell>
                  <TableCell align="right">
                    {i.student === null || i.plan === null ? (
                      ''
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          HandleUpdate(i);
                        }}
                      >
                        <FaUserEdit color="#4d85ee" size={18} />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => {
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
