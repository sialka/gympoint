/* eslint-disable no-return-assign */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Modal from 'react-modal';

import { FaArrowCircleLeft, FaArrowCircleRight, FaEdit } from 'react-icons/fa';

import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { assistenceInRequest } from '~/store/modules/assistence/actions';

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
  tableDeleted: {
    color: '#999',
    textDecoration: 'line-through',
  },
});

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '20px 25px',
  },
};

export default function ListEnrollments() {
  const classes = useStyles();
  const [helps, setHelps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [backend, setBackend] = useState(false);
  const [page, setPage] = useState(1);
  const [btnPrev, setBtnprev] = useState(false);
  const [btnNext, setBtnnext] = useState(false);

  const [id, setId] = useState();
  const [question, setQuestion] = useState();
  const dispatch = useDispatch();

  let title;
  let subtitle;
  let modalquestion;
  let answer;
  let input;
  let button;

  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    async function carrega() {
      try {
        const response = await api.get(`students/help-orders?page=${page}`);

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
          setHelps(response.data);
          setLoading(true);
          setBackend(false);
        }
      } catch (err) {
        setLoading(true);
        setBackend(true);
      }
    }

    Modal.setAppElement('body');
    carrega();
  }, [page]);

  function handleNext() {
    setPage(page + 1);
  }

  function handlePrev() {
    setPage(page - 1);
  }

  function openModal(i) {
    setQuestion(i.question);
    setId(i.id);
    setIsOpen(true);
  }

  function submit() {
    const resp = document.getElementById('aswer').value;
    dispatch(assistenceInRequest(id, resp));
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    title.style.display = 'flex';
    title.style.flexDirection = 'row';
    title.style.justifyContent = 'space-between';
    title.style.color = '#444';
    title.style.textTransform = 'uppercase';
    title.style.fontSize = '16px';
    title.style.marginBottom = '10px';

    subtitle.style.color = '#444';
    subtitle.style.textTransform = 'uppercase';
    subtitle.style.fontSize = '16px';
    subtitle.style.marginBottom = '10px';
    subtitle.style.fontWeight = 'bolder';

    modalquestion.style.width = '300px';
    modalquestion.style.display = 'flex';
    modalquestion.style.flexDirection = 'row';
    modalquestion.style.marginBottom = '20px';

    answer.style.display = 'flex';
    answer.style.flexDirection = 'column';
    answer.style.marginBottom = '10px';

    input.style.borderRadius = '4px';
    input.style.border = '1px solid #999';
    input.style.padding = '10px 15px';
    input.style.height = '100px';
    input.style.marginBottom = '10px';
    input.style.resize = 'none';

    button.style.border = '0';
    button.style.background = '#de3b3b';
    button.style.borderRadius = '4px';
    button.style.fontSize = '15px';
    button.style.color = '#fff';
    button.style.padding = '10px 15px';
  }

  function closeModal() {
    setIsOpen(false);
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
                  align="left"
                  style={{ minWidth: 50 }}
                  className={classes.tableHead}
                />
              </TableRow>
            </TableHead>
            <TableBody>
              {helps.map(i => (
                <TableRow key={i.id} hover>
                  <TableCell className={classes.tableItem}>
                    <span>{i.student.name}</span>
                  </TableCell>
                  <TableCell align="right">
                    <button
                      type="button"
                      onClick={() => {
                        openModal(i);
                      }}
                    >
                      <FaEdit color="#4d85ee" size={18} />
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

        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h2 ref={_title => (title = _title)}>perguntar do aluno</h2>
          <div ref={_modalquestion => (modalquestion = _modalquestion)}>
            {question}
          </div>
          <p ref={_subtitle => (subtitle = _subtitle)}>sua reposta</p>
          <form onSubmit={submit}>
            <div ref={_answer => (answer = _answer)}>
              <textarea
                ref={_input => (input = _input)}
                type="text"
                id="aswer"
                placeholder="..."
              />
              <button type="submit" ref={_button => (button = _button)}>
                Responde aluno
              </button>
            </div>
          </form>
        </Modal>
      </Paper>
      <Loading>
        {loading ? '' : 'Carregando...'}
        {backend ? 'Não foi possivel acessar as informações...' : ''}
      </Loading>
    </Container>
  );
}
