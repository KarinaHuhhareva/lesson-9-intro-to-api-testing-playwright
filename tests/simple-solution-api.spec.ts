import { expect, test } from '@playwright/test'

import { StatusCodes } from 'http-status-codes'

const BASE_URL = 'https://backend.tallinn-learning.ee/test-orders';

test('get order with correct id should receive code 200', async ({ request }) => {
  const response = await request.get(`${BASE_URL}/1`)

  expect(response.status()).toBe(200)
})

test('post order with correct data should receive code 200', async ({ request }) => {
  const requestBody = {
    status: 'OPEN',
    courierId: 0,
    customerName: 'string',
    customerPhone: 'string',
    comment: 'string',
    id: 0,
  }

  const response = await request.post(BASE_URL, {
    data: requestBody,
  })
  expect(response.status()).toBe(StatusCodes.OK)
})

test('get order with incorrect data should receive code 400', async ({ request }) => {
  const [response0, response11, responseNull, responseTest] = await Promise.all([
    request.get(`${BASE_URL}/0`),
    request.get(`${BASE_URL}/11`),
    request.get(`${BASE_URL}/null`),
    request.get(`${BASE_URL}/test`)
  ]);

  expect(response0.status()).toBe(StatusCodes.BAD_REQUEST)
  expect(response11.status()).toBe(StatusCodes.BAD_REQUEST)
  expect(responseNull.status()).toBe(StatusCodes.BAD_REQUEST)
  expect(responseTest.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('del order with incorrect header should receive code 401', async ({ request }) => {
  const response = await request.delete(`${BASE_URL}/1`, {
    headers: {
      'api_key': ''
    }
  });
  expect(response.status()).toBe(StatusCodes.UNAUTHORIZED)
})

test('del order with correct header should receive code 204', async ({ request }) => {
  const response = await request.delete(`${BASE_URL}/1`, {
    headers: {
      'api_key': '1234567890123456'
    }
  });
  expect(response.status()).toBe(StatusCodes.NO_CONTENT)
})

test('delete order with incorrect id should receive code 400', async ({ request }) => {
  const response = await request.delete(`${BASE_URL}/999`, {
    headers: {},
    data: {
      customerName: 'string',
    }
  });

  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('update order with correct header should receive code 200', async ({ request }) => {
  const response = await request.put(`${BASE_URL}/1`, {
    headers: {
      'api_key': '1234567890123456'
    },
    data: {
      customerName: 'string',
    }
  });
  expect(response.status()).toBe(StatusCodes.OK)
})

test('update order with incorrect header should receive code 401', async ({ request }) => {
  const response = await request.put(`${BASE_URL}/1`, {
    headers: {
      'api_key': ''
    },
    data: {
      customerName: 'string',
    }
  });
  expect(response.status()).toBe(StatusCodes.UNAUTHORIZED)
})

test('update order with incorrect id should receive code 400', async ({ request }) => {
  const response = await request.put(`${BASE_URL}/999`, {
    headers: {
      'api_key': '1234567890123456'
    },
    data: {
      customerName: 'string'
    }
  });
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})