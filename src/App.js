import React, { Component } from 'react'
import Calculator, { sindicateCalculator } from './utils/calculator'
import CurrencyFormat from 'react-currency-format';
import './App.css'

class App extends Component {
  state = {
    salary: {
      total: 0,
      text: 'R$'
    },
    veteran: true,
    months: 0,
    rate: 0.7,
    role: 1.4,
    bonus: 0,
    error: false,
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
    let total = value

    try{
      total = JSON.parse(value)
      this.setState({ salary: { total, text } })

      return total
    } catch {
      this.setState({ salary: { text: '' } })
    }

    return total
  }

  getRatePercent = (rate) => `${(rate * 100).toFixed(0)}%`

  handleSubmit = (event) => {
    event.preventDefault()
    const { salary: { total: salary }, months, rate, role } = this.state
    let userPpr

    if(salary){
      userPpr = Calculator({
        salary,
        months,
        rate,
        role
      }, (bonus) => this.setState({ bonus, error: false }))
      return userPpr
    }

    this.setState({ error: true })

    return false
  }

  render() {
    const { salary: { text }, rate, veteran, bonus, error } = this.state
    const bonusTotal = `R$ ${(bonus - sindicateCalculator(bonus)).toFixed(2)}`
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
          <p>{(bonus && !error) ? bonusTotal : '-'}</p>
          <ul>
            <p className="text-bold">Observações:</p>
            <li>Já aplicado o desconto de <span className="text-bold">3%</span> não obrigatório do sindicato.</li>
            <li>Valor total já descontado os <span className="text-bold">30%</span> da primeira parcela.</li>
            <p className="text-bold">Entenda o cálculo:  <span>(((salário x cargo) x porcentagem) - 30%) - 3% sindicato</span></p>
            <p className="text-bold">Descontado do sindicato: <span>{sindicateCalculator(bonus)} R$</span></p>
          </ul>
        </header>
      </div>
    )
  }
}

export default App
