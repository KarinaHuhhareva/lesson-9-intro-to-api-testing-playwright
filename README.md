# API Testing Checklist

Based on test cases from `tests/w9-api.test.ts`

## Test Cases

| # | Test Case | Method | Endpoint | Headers | Request Body | Expected Status Code | Status |
|---|-----------|--------|----------|---------|--------------|---------------------|--------|
| 1 | Get order with correct id | GET | `/1` | - | - | 200 | ☐ |
| 2 | Post order with correct data | POST | `/` | - | `{ status: 'OPEN', courierId: 0, customerName: 'string', customerPhone: 'string', comment: 'string', id: 0 }` | 200 | ☐ |
| 3 | Get order with incorrect id (0) | GET | `/0` | - | - | 400 | ☐ |
| 4 | Get order with incorrect id (11) | GET | `/11` | - | - | 400 | ☐ |
| 5 | Get order with incorrect id (null) | GET | `/null` | - | - | 400 | ☐ |
| 6 | Get order with incorrect id (test) | GET | `/test` | - | - | 400 | ☐ |
| 7 | Delete order with incorrect header | DELETE | `/1` | `api_key: ''` | - | 401 | ☐ |
| 8 | Delete order with correct header | DELETE | `/1` | `api_key: '1234567890123456'` | - | 204 | ☐ |
| 9 | Delete order with incorrect id | DELETE | `/999` | - | `{ customerName: 'string' }` | 400 | ☐ |
| 10 | Update order with correct header | PUT | `/1` | `api_key: '1234567890123456'` | `{ customerName: 'string' }` | 200 | ☐ |
| 11 | Update order with incorrect header | PUT | `/1` | `api_key: ''` | `{ customerName: 'string' }` | 401 | ☐ |
| 12 | Update order with incorrect id | PUT | `/999` | `api_key: '1234567890123456'` | `{ customerName: 'string' }` | 400 | ☐ |

## Base URL
`https://backend.tallinn-learning.ee/test-orders`

## Notes
- All endpoints are relative to the base URL above
- The `api_key` header value `'1234567890123456'` is the correct authentication key
- Empty `api_key` header results in 401 Unauthorized
- Invalid order IDs (0, 11, 999, null, test) result in 400 Bad Request

