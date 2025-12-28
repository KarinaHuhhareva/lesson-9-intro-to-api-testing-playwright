export class LoginDto {
    username: string
    password: string

    constructor(username: string, password: string) {
        this.username = username
        this.password = password
    }

    static createCorrectLoginDto(): LoginDto {
        return new LoginDto(
            process.env.USERNAME ?? '',
            process.env.PASSWORD ?? ''
        )
    }

    static createRandomIncorrectLoginDto(): LoginDto {
        return new LoginDto(
            'test' + Math.random().toString(36).substring(2, 15),
            'test' + Math.random().toString(36).substring(2, 15)
        )
    }
}