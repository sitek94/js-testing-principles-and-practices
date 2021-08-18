const {isPasswordAllowed, userToJSON} = require('../auth')

describe('isPasswordAllowed', () => {
  const disallowedPasswords = ['', '123456', '123456789', 'abcdefghi']
  const allowedPasswords = ['abcd1234']

  disallowedPasswords.forEach((pwd) => {
    it(`"${pwd} should disallow password`, () => {
      expect(isPasswordAllowed(pwd)).toBe(false)
    })
  })

  allowedPasswords.forEach((pwd) => {
    it(`"${pwd} should allow password`, () => {
      expect(isPasswordAllowed(pwd)).toBe(true)
    })
  })
})

test('userToJSON excludes secure properties', () => {
  const safeUser = {
    id: 'some-id',
    username: 'sarah',
  }
  const user = {
    ...safeUser,
    exp: new Date(),
    iat: new Date(),
    hash: 'some really long string',
    salt: 'some shorter string',
  }
  const jsonUser = userToJSON(user)

  expect(jsonUser).toEqual(safeUser)
})

//////// Elaboration & Feedback /////////
// When you've finished with the exercises:
// 1. Copy the URL below into your browser and fill out the form
// 2. remove the `.skip` from the test below
// 3. Change submitted from `false` to `true`
// 4. And you're all done!
/*
http://ws.kcd.im/?ws=Testing&e=auth%20util&em=
*/
test.skip('I submitted my elaboration and feedback', () => {
  const submitted = true // change this when you've submitted!
  expect(submitted).toBe(true)
})
////////////////////////////////
