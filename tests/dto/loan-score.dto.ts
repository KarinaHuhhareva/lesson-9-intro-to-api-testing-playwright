export class LoanDecisionRequestDto {
  age: number
  income: number
  debt: number
  employed: boolean
  loanAmount: number
  loanPeriod: number

  constructor(
    age = 30,
    income = 2000,
    debt = 0,
    employed = true,
    loanAmount = 5000,
    loanPeriod = 24,
  ) {
    this.age = age
    this.income = income
    this.debt = debt
    this.employed = employed
    this.loanAmount = loanAmount
    this.loanPeriod = loanPeriod
  }
}
