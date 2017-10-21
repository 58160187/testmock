function SimpleApp(service) {
  this.service = service

  this.echo = (nickname) => {
    var n = 'xxx'
    var firstname = this.service(nickname)
    return `Hello ${firstname}!`
    //return 'Hello world!'
  }
}


function BuuAuthen(authService) {
  this.authService = authService

  this.signIn = (username,password) => {
    var obj = this.authService(username, password)
    return {
      name: obj.name,
      token: '0000000000'
    }
  }
}


test('Simple Mock', () => {
  const mockFn = jest.fn()
      .mockReturnValue('Pensupa')

  var app = new SimpleApp(mockFn)
  var nickname = 'Su'
  var result = app.echo(nickname)

  expect(mockFn).toHaveBeenCalled()
  expect(mockFn).toHaveBeenCalledWith(nickname)
  expect(result).toBe('Hello Pensupa!')
})




test ('Sign-in with facebook', () => {
  const facebookAuthMock = jest.fn()
      .mockReturnValue({
        name: 'Pensupa',
        facebookId: '1234567',
        email: 'pensupa47@gmail.com'
      })
  var auth = new BuuAuthen(facebookAuthMock)

  var username = '58160187'
  var password = 'pensupa47'
  var accountInfo = auth.signIn(username, password)

  expect(facebookAuthMock).toHaveBeenCalled()
  expect(facebookAuthMock).toHaveBeenCalledWith(username, password)
  expect(accountInfo.name).toBe('Pensupa')
  expect(accountInfo).toHaveProperty('token')
  expect(accountInfo.token).toHaveLength(10)
})
