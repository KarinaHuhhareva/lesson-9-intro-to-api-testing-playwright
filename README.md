# API Testing Checklist

## Order API Tests

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

## Loan Decision API Tests

Based on test cases from `tests/w10-loan-calc-decision.test.ts`

| # | Test Case | Method | Endpoint | Request Body | Expected Status Code | Expected Response | Status |
|---|-----------|--------|----------|--------------|---------------------|-------------------|--------|
| 1 | Positive decision – low risk | POST | `/api/loan-calc/decision` | `{ age: 40, income: 5000, debt: 0, employed: true, loanAmount: 3000, loanPeriod: 12 }` | 200 | `riskDecision: 'positive'`, `riskLevel: 'Low Risk'`, `riskScore < 40` | ☐ |
| 2 | Positive decision – medium risk | POST | `/api/loan-calc/decision` | `{ age: 40, income: 1500, debt: 0, employed: true, loanAmount: 2000, loanPeriod: 12 }` | 200 | `riskDecision: 'positive'`, `riskLevel: 'Medium Risk'`, `riskScore < 40` | ☐ |
| 3 | Positive decision – high risk | POST | `/api/loan-calc/decision` | `{ age: 40, income: 2000, debt: 0, employed: true, loanAmount: 6000, loanPeriod: 6 }` | 200 | `riskDecision: 'positive'`, `riskLevel: 'High Risk'`, `riskScore > 3` | ☐ |
| 4 | Negative decision – very high risk | POST | `/api/loan-calc/decision` | `{ age: 40, income: 2000, debt: 5000, employed: true, loanAmount: 10000, loanPeriod: 6 }` | 200 | `riskDecision: 'negative'`, `riskLevel: 'Very High Risk'`, `riskScore > 7` | ☐ |

## Base URLs

### Order API
`https://backend.tallinn-learning.ee/test-orders`

### Loan Decision API
`https://backend.tallinn-learning.ee/api/loan-calc/decision`

## Notes

### Order API
- All endpoints are relative to the base URL above
- The `api_key` header value `'1234567890123456'` is the correct authentication key
- Empty `api_key` header results in 401 Unauthorized
- Invalid order IDs (0, 11, 999, null, test) result in 400 Bad Request

### Loan Decision API
- Request body structure: `{ age: number, income: number, debt: number, employed: boolean, loanAmount: number, loanPeriod: number }`
- All tests expect status code 200 (OK)
- Response includes: `riskDecision`, `riskLevel`, and `riskScore` fields
- Risk levels: Low Risk, Medium Risk, High Risk, Very High Risk
- Risk decisions: positive (approved) or negative (rejected)

