import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Select, Input } from '@rocketseat/unform';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import pt from 'date-fns/locale/pt';
import { addMonths, format, addDays } from 'date-fns';
import * as Yup from 'yup';

import { GoChevronLeft, GoCheck } from 'react-icons/go';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { enrollmentCreateInRequest } from '~/store/modules/enrollment/actions';

import api from '~/services/api';
import { Container, Content } from './styles';

const schema = Yup.object().shape({
  nome: Yup.string().required('Informe um nome para Busca'),
  plan_id: Yup.string().required('Selecione um plano'),
});

export default function CreatePlan() {
  const [listNames, setListNames] = useState([]);
  const [plans, setPlans] = useState([]);
  const [idStudy, setIdStudy] = useState(0);
  const [idPlan, setIdplan] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [enabled, setEnabled] = useState(false);

  const dispatch = useDispatch();

  function handleSubmit(data, { resetForm }) {
    if (startDate === null) {
      document.getElementById('date_error').style.display = 'inline';
      return;
    }

    if (idStudy === 0) {
      document.getElementById('name_error').style.display = 'inline';
      return;
    }

    const plan_id = parseInt(data.plan_id);
    const student_id = parseInt(idStudy);
    const start_date = String(format(startDate, "yyyy-MM-dd'T'HH:mm:ss-03:00"));
    // 2019-09-18T15:20:00-03:00

    dispatch(enrollmentCreateInRequest(student_id, plan_id, start_date));
    resetForm();

    setStartDate(new Date());
    document.getElementById('dt-final').innerText = '00/00/0000';
    document.getElementById('vl-total').innerText = 'R$ 0,00';
  }

  async function handleSearchStudent(e) {
    // Havendo Enter Faz pesquisa por nome no postgres
    if (e.key === 'Enter') {
      setIdStudy(0);
      setListNames([]);
      document.getElementById('name_error').style.display = 'none';
      const search = document.getElementById('nome');
      const list = document.getElementById('lista');

      if (search.value !== '') {
        search.style.border = '1px solid #999';
        const response = await api.get(`/students/?q=${search.value}`);

        const data = response.data.map(i => ({
          id: i.id,
          name: i.name,
        }));

        if (data.length === 0) {
          search.style.border = '1px solid red';
        } else {
          setListNames(data);

          if (data.length === 1) {
            list.value = data[0].id;
            setIdStudy(data[0].id);
            search.value = data[0].name;

            document.getElementById('name_error').style.display = 'none';
            document.getElementById('plan_id').focus();
          }
        }
      } else {
        search.style.border = '1px solid red';
      }
    }
  }

  function handleSelectStudent() {
    // Seleciona o usuario na lista do datalist
    const datalist_names = document.getElementById('lista').childNodes;

    if (datalist_names.length > 0) {
      const search = document.getElementById('nome').value;
      const found = listNames.find(item => item.name === search);

      if (found) {
        setIdStudy(found.id);
      }
    }
  }

  useEffect(() => {
    async function load() {
      const response = await api.get(`/plans/`);
      // console.log(response.data);

      const data = response.data.map(plan => ({
        id: plan.id,
        title: plan.title,
        duration: plan.duration,
        price: plan.price,
      }));

      setPlans(data);
    }

    load();
  }, []);

  function handleSelectPlan(e) {
    const found = plans.find(item => item.id === parseInt(e.target.value));
    setIdplan(found);
  }

  useEffect(() => {
    function handleCalc() {
      const dt_final = document.getElementById('dt-final');
      const vl_total = document.getElementById('vl-total');
      document.getElementById('date_error').style.display = 'none';
      document.getElementById('name_error').style.display = 'none';

      if (enabled) {
        if (idPlan.id > 0 && startDate !== null) {
          const { duration } = idPlan;
          const { price } = idPlan;
          const total = duration * price;
          const dtfinal = addMonths(startDate, duration);
          // console.log(dtfinal);
          dt_final.innerText = format(dtfinal, 'dd/MM/yyyy');
          vl_total.innerText = total.toLocaleString('pt-br', {
            style: 'currency',
            currency: 'BRL',
          });
        } else if (startDate === null) {
          document.getElementById('date_error').style.display = 'inline';
          document.getElementById('date_error').focus();
        }
      }

      setEnabled(true);
    }

    handleCalc();
  }, [startDate, enabled, idPlan, plans]);

  return (
    <Container>
      <Content>
        <Form onSubmit={handleSubmit} schema={schema}>
          <header>
            <h1>Cadastro de matrícula</h1>
            <div>
              <Link to="/enrollments">
                <div>
                  <GoChevronLeft color="white" size={14} />
                  <span>voltar</span>
                </div>
              </Link>
              <Button type="submit">
                <div>
                  <GoCheck color="white" size={14} />
                  <span>salvar</span>
                </div>
              </Button>
            </div>
          </header>
          <main>
            <div className="div-study">
              <label>
                aluno
                <Input
                  list="lista"
                  id="nome"
                  name="nome"
                  placeholder="Buscar aluno"
                  type="text"
                  onKeyPress={handleSearchStudent}
                  onInput={handleSelectStudent}
                  onChange={handleSelectStudent}
                />
                <span id="name_error">Informe um nome válido</span>
                <datalist id="lista">
                  {listNames.map(i => (
                    <option key={i.id}>{i.name}</option>
                  ))}
                </datalist>
              </label>
            </div>
            <div className="div-plan-dates-value">
              <div className="item">
                <label>
                  plano
                  <Select
                    name="plan_id"
                    options={plans}
                    placeholder="Selecione o plano"
                    onChange={handleSelectPlan}
                  />
                </label>
              </div>
              <div className="item">
                <label>
                  data de início
                  <DatePicker
                    id="start_date"
                    placeholderText="Click to select a date"
                    locale={pt}
                    dateFormat="dd/MM/yyyy"
                    dateFormatCalendar="LLLL yyyy"
                    selected={startDate}
                    onChange={date => setStartDate(date)}
                    minDate={new Date()}
                    maxDate={addDays(new Date(), 60)}
                    name="data_start"
                  />
                  <span id="date_error">Informe uma data</span>
                </label>
              </div>
              <div className="item">
                <label>
                  data de término
                  <span className="info" id="dt-final">
                    00/00/000
                  </span>
                </label>
              </div>
              <div className="item">
                <label>
                  valor final
                  <span className="info" id="vl-total">
                    R$ 0,00
                  </span>
                </label>
              </div>
            </div>
          </main>
        </Form>
      </Content>
    </Container>
  );
}
