const {isPasswordAllowed, userToJSON} = require('../auth')

test('isPasswordAllowed only allows some passwords', () => {
  // Empty string
  expect(isPasswordAllowed('')).toBe(false)

  // Too short
  expect(isPasswordAllowed('123456')).toBe(false)

  // Missing alphabetical character
  expect(isPasswordAllowed('123456789')).toBe(false)

  // Missing numeric character
  expect(isPasswordAllowed('abcdefghi')).toBe(false)

  // Correct
  expect(isPasswordAllowed('abcd1234')).toBe(true)
})

test('userToJSON excludes secure properties', () => {
  const user = {
    id: 'some-id',
    username: 'sarah',
    exp: new Date(),
    iat: new Date(),
    hash: 'some really long string',
    salt: 'some shorter string',
  }
  const jsonUser = userToJSON(user)

  expect(jsonUser).toEqual({
    id: 'some-id',
    username: 'sarah',
  })
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
  const submitted = false // change this when you've submitted!
  expect(submitted).toBe(true)
})
////////////////////////////////
