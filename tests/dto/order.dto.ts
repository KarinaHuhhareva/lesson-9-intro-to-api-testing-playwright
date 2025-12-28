export class OrderDto {
  status: string
  courierId: number
  customerName: string
  customerPhone: string
  comment: string
  id: number

  constructor(
    status: string,
    courierId: number,
    customerName: string,
    customerPhone: string,
    comment: string,
    id: number,
  ) {
    this.status = status
    this.courierId = courierId
    this.customerName = customerName
    this.customerPhone = customerPhone
    this.comment = comment
    this.id = id
  }

  static createCorrectOrderDto(): OrderDto {
    return new OrderDto('OPEN', 0, 'string', 'string', 'string', 0)
  }

  static createRandomOrderDto(): OrderDto {
    return new OrderDto(
      'OPEN',
      Math.floor(Math.random() * 1000000),
      'string',
      'string',
      'string',
      0,
    )
  }
}
