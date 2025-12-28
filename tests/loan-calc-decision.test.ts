import { expect, test } from '@playwright/test'

import { StatusCodes } from 'http-status-codes'
import { LoanDecisionRequestDto } from './dto/loan-score.dto'

const URL = 'https://backend.tallinn-learning.ee/api/loan-calc/decision'

test.describe('Loan Decision API', () => {
  test('Positive decision – low risk', async ({ request }) => {
    const dto = new LoanDecisionRequestDto(40, 5000, 0, true, 3000, 12)
    const response = await request.post(URL, { data: dto })
    const responseBody = await response.json()

    expect.soft(response.status()).toBe(StatusCodes.OK)
    expect.soft(responseBody.riskDecision).toBe('positive')
    expect.soft(responseBody.riskLevel).toBe('Low Risk')
    expect.soft(responseBody.riskScore).toBeLessThan(40)
  })

  test('Positive decision – medium risk', async ({ request }) => {
    const dto = new LoanDecisionRequestDto(40, 1500, 0, true, 2000, 12)
    const response = await request.post(URL, { data: dto })
    const responseBody = await response.json()

    expect.soft(response.status()).toBe(StatusCodes.OK)
    expect.soft(responseBody.riskDecision).toBe('positive')
    expect.soft(responseBody.riskLevel).toBe('Medium Risk')
    expect.soft(responseBody.riskScore).toBeLessThan(40)
  })

  test('Positive decision – high risk', async ({ request }) => {
    const dto = new LoanDecisionRequestDto(40, 2000, 0, true, 6000, 6)
    const response = await request.post(URL, { data: dto })
    const responseBody = await response.json()

    expect.soft(response.status()).toBe(StatusCodes.OK)
    expect.soft(responseBody.riskDecision).toBe('positive')
    expect.soft(responseBody.riskLevel).toBe('High Risk')
    expect.soft(responseBody.riskScore).toBeGreaterThan(3)
  })

  test('Negative decision – Very high risk', async ({ request }) => {
    const dto = new LoanDecisionRequestDto(40, 2000, 5000, true, 10000, 6)
    const response = await request.post(URL, { data: dto })
    const responseBody = await response.json()

    expect.soft(response.status()).toBe(StatusCodes.OK)
    expect.soft(responseBody.riskDecision).toBe('negative')
    expect.soft(responseBody.riskLevel).toBe('Very High Risk')
    expect.soft(responseBody.riskScore).toBeGreaterThan(7)
  })
})
