import React, { Component } from 'react';
import { overtimeCalculator } from './utils/calculator';
import CurrencyFormat from 'react-currency-format';
import './App.css';

class App extends Component {
  state = {
    salary: {
      total: 0,
      text: 'R$'
    },
    days: 0,
    extraDayHours: 0,
    extraNightHours: 0,
    bonus: 0,
    error: false,
  };

  componentDidUpdate() {
    window.state = this.state;
  }

  updateState = ({ target }, parse) => {
    let value = target.value;
    if (parse) value = value && JSON.parse(value);
    this.setState({ [target.name]: value });

    return value;
  };

  updateSalary = ({ formattedValue: text , value }) => {
    let total = value;

    try {
      total = JSON.parse(value)
      this.setState({ salary: { total, text } });

      return total;
    } catch {
      this.setState({ salary: { text: '' } });
    }

    return total;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { salary: { total: salary }, days, extraDayHours, extraNightHours } = this.state;
    let bonus;

    if (salary) {
      bonus = overtimeCalculator({
        salary,
        days,
        extraDayHours,
        extraNightHours,
      })
      
      this.setState({ bonus, error: false });

      return bonus;
    }

    this.setState({ error: true });

    return false;
  }

  render() {
    const { salary: { text }, bonus, error } = this.state
    const bonusTotal = `R$ ${bonus}`;

    return (
      <div className="App">
        <header className="App-header">
          <div className="App-logo"></div>
          <form style={{ display: 'flex', flexDirection: 'column'}} onSubmit={(event) => this.handleSubmit(event)}>
            <div className="row">
              <label>*Salário <span className={`text-error ${error && 'active'}`}>(Obrigatório)</span></label>
              <label className="currency">R$ </label>
              <CurrencyFormat 
                className={`input input-salary ${error && 'input-error'}`}
                displayType={'input'}
                thousandSeparator
                name="salary"
                value={text}
                onValueChange={(event) => this.updateSalary(event)}
              />
            </div>
            
            <div className="row">
              <label>*Dias de sobreaviso <span className={`text-error ${error && 'active'}`}>(Obrigatório)</span></label>
              <input
                type="normal"
                name="days"
                className={`input input-salary ${error && 'input-error'}`}
                onChange={(event) => this.updateState(event, true)}
              />
            </div>

            <div className="row">
              <label>*Horas extras trabalhadas (dia) <span className={`text-error ${error && 'active'}`}>(Obrigatório)</span></label>
              <input
                type="normal"
                name="extraDayHours"
                className={`input input-salary ${error && 'input-error'}`}
                onChange={(event) => this.updateState(event, true)}
              />
            </div>

            <div className="row">
              <label>*Horas extras trabalhadas (noite) <span className={`text-error ${error && 'active'}`}>(Obrigatório)</span></label>
              <input
                type="normal"
                name="extraNightHours"
                className={`input input-salary ${error && 'input-error'}`}
                onChange={(event) => this.updateState(event, true)}
              />
            </div>
            
            <button type="submit">Calcular</button>
          </form>
          <p>{(bonus && !error) ? bonusTotal : '-'}</p>
          <ul>
            <p className="text-bold">Observações:</p>
            <li>O bonus de sobreaviso é em cima de <span className="text-bold">1/3</span> das horas trabalhadas.</li>
            <li>Caso trabalhe durante este período, além das horas ordinárias, ganha-se no mínimo <span className="text-bold">50%</span> a mais para cada hora.</li>
            <li>Trabalhando sob adicional noturno, adiciona-se mais <span className="text-bold">20%</span> para cada hora.</li>
            <p className="text-bold">Entenda o cálculo:  <span>(((salárioHora / 3) x horasSobreAviso) + possíveisHorasExtras) (Sobre as horas extras incide o salárioHora ordinário)</span></p>
          </ul>
        </header>
      </div>
    )
  }
};

export default App;
