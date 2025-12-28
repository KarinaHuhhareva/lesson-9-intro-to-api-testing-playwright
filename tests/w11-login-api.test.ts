import { expect, test } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'
import { LoginDto } from './dto/login.dto'

test.describe('Login API', () => {
  const URL = 'https://backend.tallinn-learning.ee/login/student'
  let jwtToken = ''
  const jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/

  test('login with incorrect credentials should receive code 401', async ({ request }) => {
    const dto = LoginDto.createRandomIncorrectLoginDto()
    const response = await request.post(URL, {
      data: dto,
    })
    expect(response.status()).toBe(StatusCodes.UNAUTHORIZED)
  })

  test('login with correct credentials should receive code 200', async ({ request }) => {
    const dto = LoginDto.createCorrectLoginDto()
    const response = await request.post(URL, {
      data: {
        username: dto.username,
        password: dto.password,
      },
    })

    expect(response.status()).toBe(StatusCodes.OK)
    const responseBody = await response.text()
    jwtToken = responseBody
    expect(jwtToken).toMatch(jwtRegex)
  })

  test('login api with incorrect method should receive code 405', async ({ request }) => {
    const response = await request.delete(URL)
    expect(response.status()).toBe(StatusCodes.METHOD_NOT_ALLOWED)
  })

  test('login with incorrect data should receive code 401', async ({ request }) => {
    const response = await request.post(URL, {
      data: {
        username: 'incorrect',
        pwd: 'incorrect',
      },
    })
    expect(response.status()).toBe(StatusCodes.UNAUTHORIZED)
  })
})
