import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import history from '~/services/history';
import { Form, Select } from '@rocketseat/unform';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import pt from 'date-fns/locale/pt';
import { addMonths, format, addDays } from 'date-fns';

import * as Yup from 'yup';

import { GoChevronLeft, GoCheck } from 'react-icons/go';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { enrollmentUpdateInRequest } from '~/store/modules/enrollment/actions';

import api from '~/services/api';
import { Container, Content } from './styles';

const schema = Yup.object().shape({
  plan_id: Yup.string().required('Selecione um plano'),
});

export default function CreatePlan() {
  const enrollments = useSelector(state => state.enrollment);

  const [id, setId] = useState(0);
  const [plans, setPlans] = useState([]);
  const [idPlan, setIdplan] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [loadData, setLoadData] = useState(true);

  const dispatch = useDispatch();

  function handleSubmit() {

    if (startDate === null) {
      document.getElementById('date_error').style.display = 'inline';
      return
    }

    const enrollment_id = parseInt(id);
    const plan_id = idPlan.id;
    const start_date = String(format(startDate, "yyyy-MM-dd'T'HH:mm:ss-03:00"));
    // console.log(enrollment_id, plan_id, start_date);

    dispatch(enrollmentUpdateInRequest(enrollment_id, plan_id, start_date));
  }

  function handleSelectPlan(e){
    const found = plans.find(item => item.id === parseInt(e.target.value));
    setIdplan(found);
  }

  useEffect(() => {

    async function load(){
      // Set id Enrollment
      setId(enrollments.id);

      // Set Name
      const name = document.getElementById('name');
      name.innerText = enrollments.student_name;

      // Load Plan
      const response = await api.get(`/plans/`);

      const data = response.data.map(plan => ({
        id: plan.id,
        title: plan.title,
        duration: plan.duration,
        price: plan.price,
      }));
      setPlans(data);

      // Set Plan
      document.getElementById('plan_id').value = enrollments.plan_id;
      const found = data.find(item => item.id === parseInt(enrollments.plan_id));
      setIdplan(found);

      // set Date
      const year = enrollments.start_date.slice(0,4);
      const month = enrollments.start_date.slice(5,7);
      const day = enrollments.start_date.slice(8,10);
      const st_date = (month + ', ' + day + ', '+ year);
      setStartDate(new Date(st_date));

      // Calc
      const duration = found.duration;
      const price = found.price;
      const total = duration * price;
      const dtfinal = addMonths(startDate, duration);

      document.getElementById('dt-final').innerText = format(dtfinal, "dd/MM/yyyy");
      document.getElementById('vl-total').innerText = total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});

      setLoadData(false);
    }

    function handleCalc(){
      // if (enabled) {
        const dt_final = document.getElementById('dt-final');
        const vl_total = document.getElementById('vl-total');

        if (idPlan.id > 0 && startDate !== null) {
          const duration = idPlan.duration;
          const price = idPlan.price;
          const total = duration * price;
          const dtfinal = addMonths(startDate, duration);

          dt_final.innerText = format(dtfinal, "dd/MM/yyyy");
          vl_total.innerText = total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
          document.getElementById('date_error').style.display = 'none';
        }else{
          if (startDate === null) {
            document.getElementById('date_error').style.display = 'inline';
            document.getElementById('date_error').innerText = "Informe uma data";
          }
        }

      // }
      // setEnabled(true);
    }

    if (enrollments.id === 0 ) {
      history.push('/enrollments');
    }else{
      if (loadData){
        load();
      } else {
        handleCalc();
      }
    }

    handleCalc();
  }, [startDate, loadData, idPlan, plans, enrollments])

  return (
    <Container>
      <Content>
        <Form onSubmit={handleSubmit} schema={schema}>
          <header>
            <h1>Edição de matrícula</h1>
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
                <span id="name" className="info">
                  Nome de fulano
                </span>
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
                  <span id="date_error"></span>
                </label>
              </div>
              <div className="item">
                <label>
                  data de término
                  <span
                    className="info"
                    id="dt-final"
                  >00/00/000</span>
                </label>
              </div>
              <div className="item">
                <label>
                  valor final
                  <span
                    className="info"
                    id="vl-total"
                  >R$ 0,00</span>
                </label>
              </div>
            </div>
          </main>
        </Form>
      </Content>
    </Container>
  );
}
