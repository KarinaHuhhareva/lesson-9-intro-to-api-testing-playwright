import { APIRequestContext, APIResponse, expect } from "@playwright/test";
import { LoginDto } from "../tests/dto/login.dto";
import { StatusCodes } from "http-status-codes";
import { OrderDto } from "../tests/dto/order.dto";

export class ApiClient {
    private request: APIRequestContext;
    private jwtToken: string;
    private static readonly BASE_URL = 'https://backend.tallinn-learning.ee';
    private static readonly LOGIN_URL = `${ApiClient.BASE_URL}/login/student`;
    private static readonly ORDER_URL = `${ApiClient.BASE_URL}/orders`;

    private constructor(request: APIRequestContext, jwtToken: string) {
        this.request = request;
        this.jwtToken = jwtToken;
    }

    private getHeaders(): Record<string, string> {
        return {
            'Authorization': `Bearer ${this.jwtToken}`
        };
    }

    static async authenticate(request: APIRequestContext): Promise<ApiClient> {
        const authResponse = await request.post(ApiClient.LOGIN_URL, {
            data: LoginDto.createCorrectLoginDto()
        });

        if (authResponse.status() !== StatusCodes.OK) {
            throw new Error('Failed to authenticate');
        }

        const jwtToken = await authResponse.text();
        return new ApiClient(request, jwtToken);
    }

    // create order
    async createOrderAndGetId(): Promise<number> {
        const response = await this.request.post(ApiClient.ORDER_URL, {
            data: OrderDto.createRandomOrderDto(),
            headers: this.getHeaders()
        });

        expect(response.status()).toBe(StatusCodes.OK);
        return response.json().then(body => body.id);
    }

    // delete order
    async deleteOrder(id: number): Promise<void> {
        const response = await this.request.delete(`${ApiClient.ORDER_URL}/${id}`, {
            headers: this.getHeaders()
        });

        expect(response.status()).toBe(StatusCodes.OK);

        return;
    }

    async getOrders(): Promise<OrderDto[]> {
        const response = await this.request.get(`${ApiClient.ORDER_URL}`, {
            headers: this.getHeaders()
        });

        expect(response.status()).toBe(StatusCodes.OK);
        const jsonBody = await response.json();
        expect(jsonBody.length).toBeGreaterThan(0);

        return jsonBody;
    }

    async getOrder(id: number): Promise<OrderDto> {
        const response = await this.request.get(`${ApiClient.ORDER_URL}/${id}`, {
            headers: this.getHeaders()
        });

        expect(response.status()).toBe(StatusCodes.OK);
        return response.json().then(body => body);
    }
}