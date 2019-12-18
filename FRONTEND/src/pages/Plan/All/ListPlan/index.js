/* eslint-disable no-alert */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import NumberFormat from 'react-number-format';
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
  planFormUpdate,
  planDeleteInRequest,
  planRefresh,
} from '~/store/modules/plan/actions';
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

export default function ListPlan() {
  const classes = useStyles();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [backend, setBackend] = useState(false);
  const [page, setPage] = useState(1);
  const [btnPrev, setBtnprev] = useState(false);
  const [btnNext, setBtnnext] = useState(false);
  const dispatch = useDispatch();
  const refresh = useSelector(state => state.plan.id);

  useEffect(() => {
    async function carrega() {
      try {
        const response = await api.get(`plans?page=${page}`);

        if (response.data.length < 5 || 0) {
          setBtnnext(false);
        } else {
          setBtnnext(true);
        }

        if (page > 1) {
          setBtnprev(true);
        } else {
          setBtnprev(false);
        }

        if (response.data.length !== 0) {
          setPlans(response.data);
          setLoading(true);
          setBackend(false);
        }
      } catch (err) {
        setLoading(true);
        setBackend(true);
      }
    }

    carrega();
  }, [page, refresh]);

  function handleNext() {
    setPage(page + 1);
  }

  function handlePrev() {
    setPage(page - 1);
  }

  function HandleDelete(id) {
    dispatch(planRefresh(0));
    dispatch(planDeleteInRequest(id));
  }

  function HandleUpdate(plan) {
    dispatch(planFormUpdate(plan));
    history.push('/plans/update');
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
                  style={{ minWidth: 290 }}
                  className={classes.tableHead}
                >
                  TÍTULO
                </TableCell>
                <TableCell
                  key="duration"
                  align="center"
                  style={{ minWidth: 50 }}
                  className={classes.tableHead}
                >
                  DURAÇÃO
                </TableCell>
                <TableCell
                  key="price"
                  align="center"
                  style={{ minWidth: 50 }}
                  className={classes.tableHead}
                >
                  VALOR p/Mês
                </TableCell>
                <TableCell
                  key="botoes"
                  align="left"
                  style={{ minWidth: 50 }}
                  className={classes.tableHead}
                />
              </TableRow>
            </TableHead>
            <TableBody>
              {plans.map(i => (
                <TableRow key={i.id} hover>
                  <TableCell className={classes.tableItem}>{i.title}</TableCell>
                  <TableCell className={classes.tableItem} align="center">
                    {i.duration === '1'
                      ? `${i.duration} mês`
                      : `${i.duration} meses`}
                  </TableCell>
                  <TableCell className={classes.tableItem} align="center">
                    <NumberFormat
                      value={i.price}
                      displayType="text"
                      prefix="R$ "
                      fixedDecimalScale
                      decimalScale={2}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <button
                      type="button"
                      onClick={() => {
                        HandleUpdate(i);
                      }}
                      className="update"
                    >
                      <FaUserEdit color="#4d85ee" size={18} />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (
                          window.confirm('Deseja realmente excluir o Plano ?')
                        )
                          HandleDelete(i.id);
                      }}
                      className="trash"
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
