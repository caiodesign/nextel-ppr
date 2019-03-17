import React, { Component } from 'react'
import Calculator from './utils/calculator'
import CurrencyFormat from 'react-currency-format';
import './App.css'

class App extends Component {
  state = {
    salary: {
      total: 1000,
      text: 'R$'
    },
    veteran: true,
    months: 0,
    rate: 0.7,
    role: 1.4,
    bonus: 0,
  }

  updateState = ({ target }, parse) => {
    let value = target.value
    if(parse) value = value && JSON.parse(value)
    this.setState({ [target.name]: value })

    return value
  }

  updateRate = ({target: { value }}) => {
    const inPercent = value && JSON.parse((value / 100))
    this.setState({ rate: inPercent })

    return inPercent
  }

  updateSalary = ({ formattedValue: text , value }) => {
    this.setState({ 
      salary: {
        total: value && JSON.parse(value),
        text,
      }
    })

    return value
  }

  getRatePercent = (rate) => `${(rate * 100).toFixed(0)}%`

  handleSubmit = (event) => {
    event.preventDefault()
    const { salary: { total: salary }, months, rate, role } = this.state
    const userPpr = Calculator({
      salary,
      months,
      rate,
      role
    }, (bonus) => this.setState({ bonus }))

    return userPpr
  }

  render() {
    const { salary: { text }, rate, veteran, bonus } = this.state
    return (
      <div className="App">
        <header className="App-header">
          <div className="App-logo"></div>
          <form style={{ display: 'flex', flexDirection: 'column'}} onSubmit={(event) => this.handleSubmit(event)}>
            <div className="row">
              <label>Salário</label>
              <label className="currency">R$ </label>
              <CurrencyFormat 
                className="input input-salary"
                displayType={'input'}
                thousandSeparator
                name="salary"
                value={text}
                onValueChange={(event) => this.updateSalary(event)}
              />
            </div>
            
            <div className="row">
              <label>Mais de 1 ano Nextel?</label>
              <select className="input-select input" name="veteran" onChange={(event) => this.updateState(event, true)}>
                <option value={true}>Sim</option>
                <option value={false}>Não</option>
              </select>
            </div>

            {!veteran && (
              <div className="row">
                <label>Quantos meses?</label>
                  <select name="months" className="input input-select" onChange={(event) => this.updateState(event, true)}>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                  <option value={6}>6</option>
                  <option value={7}>7</option>
                  <option value={8}>8</option>
                  <option value={9}>9</option>
                  <option value={10}>10</option>
                  <option value={11}>11</option>
                  <option value={12}>12</option>
                </select>
              </div>
            )}

            <div className="row">
              <label>Porcentagem (Bonus Nextel, OKR, nota individual)</label>
              <input
                className="input"
                type="range" min="70"
                max="150"
                name="rate"
                onChange={(event) => this.updateRate(event)}
              />
              {this.getRatePercent(rate)}
            </div>
            
            <div className="row">
              <select name="role" className="input input-select">
                <option value={1.4}>Analista/Especialista</option>
                <option value={2.6}>Cordenador</option>
              </select>
            </div>

            <button type="submit">Calcular</button>
          </form>
          <p>{bonus ? (`R$ ${bonus}`) : 'R$ 0'}</p>
          <ul>
            <p className="text-bold">Observações:</p>
            <li>Não aplicado o desconto não obrigatório do sindicato.</li>
            <li>Valor total já descontado os <span className="text-bold">30%</span> da primeira parcela.</li>
            <p className="text-bold">Entenda o cálculo:  <span>((salário x cargo) x porcentagem) - 30%</span></p>
          </ul>
        </header>
      </div>
    )
  }
}

export default App
