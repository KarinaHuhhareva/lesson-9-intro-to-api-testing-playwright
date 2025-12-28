import { expect, test } from "@playwright/test";
import { StatusCodes } from "http-status-codes";
import { LoginDto } from "./login.dto";
import { OrderDto } from "./order.dto";

test.describe.serial('Without API Client', () => {
    const BASE_URL = 'https://backend.tallinn-learning.ee';
    const ORDER_URL = `${BASE_URL}/orders`;
    const LOGIN_URL = `${BASE_URL}/login/student`;

    let jwtToken = '';
    let orderId: number;
    const jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/;

    test.beforeAll(async ({ request }) => {
        const response = await request.post(LOGIN_URL, {
            data: LoginDto.createCorrectLoginDto()
        });
        expect(response.status()).toBe(StatusCodes.OK);
        jwtToken = await response.text();
        expect(jwtToken).toMatch(jwtRegex);
    });

    test('create order with correct data should receive code 200', async ({ request }) => {
        const response = await request.post(ORDER_URL, {
            data: OrderDto.createRandomOrderDto(),
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        });
        expect(response.status()).toBe(StatusCodes.OK);
        orderId = await response.json().then(body => body.id);
    });

    test('get order with correct id should receive code 200', async ({ request }) => {
        const response = await request.get(`${ORDER_URL}/${orderId}`, {
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        });
        expect(response.status()).toBe(StatusCodes.OK);
    });

    test('delete order with correct id should receive code 200', async ({ request }) => {
        const response = await request.delete(`${ORDER_URL}/${orderId}`, {
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        });
        expect(response.status()).toBe(StatusCodes.OK);
    });

    test('get orders with correct data should receive code 200', async ({ request }) => {
        const response = await request.get(ORDER_URL, {
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        });
        expect(response.status()).toBe(StatusCodes.OK);
        const jsonBody = await response.json();
        expect(jsonBody.length).toBeGreaterThan(0);
        expect(jsonBody.some((order: any) => order.id === orderId)).toBe(false);
    });
});