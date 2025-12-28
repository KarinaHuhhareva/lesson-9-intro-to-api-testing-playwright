import { expect, test } from '@playwright/test'
import { ApiClient } from '../src/api-client'

test.describe('Login API', () => {
  test('login and create order with api client', async ({ request }) => {
    const apiClient = await ApiClient.authenticate(request)
    const orderId = await apiClient.createOrderAndGetId()

    console.log(`Order created with id: ${orderId}`)
  })

  test('get orders with correct data should receive code 200', async ({ request }) => {
    const apiClient = await ApiClient.authenticate(request)
    const ordersBefore = await apiClient.getOrders()
    const orderId = await apiClient.createOrderAndGetId()

    const ordersAfter = await apiClient.getOrders()

    expect(ordersAfter.length).toBeGreaterThan(ordersBefore.length)
    expect(ordersAfter.some((order) => order.id === orderId)).toBe(true)
  })

  test('get order by correct id should receive code 200', async ({ request }) => {
    const apiClient = await ApiClient.authenticate(request)
    const orderId = await apiClient.createOrderAndGetId()

    const order = await apiClient.getOrder(orderId)
    expect(order.id).toBe(orderId)
  })

  test('delete order with correct id should receive code 204', async ({ request }) => {
    const apiClient = await ApiClient.authenticate(request)
    const orderId = await apiClient.createOrderAndGetId()

    await apiClient.deleteOrder(orderId)
    const orders = await apiClient.getOrders()
    expect(orders.some((order) => order.id === orderId)).toBe(false)
  })
})
