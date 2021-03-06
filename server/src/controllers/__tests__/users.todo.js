import {omit} from 'lodash'
import * as usersController from '../users.todo'
import {generate, initDb} from '../../../test/til-server-test-utils'
import db from '../../utils/db'
import {setup} from '../../utils/setup'

// Remove properties from user object that are not needed
const safeUser = (u) => omit(u, ['salt', 'hash'])

beforeEach(() => initDb())

test('getUsers returns all users in the database', async () => {
  const req = {}
  const res = {
    json: jest.fn(),
  }

  await usersController.getUsers(req, res)

  expect(res.json).toHaveBeenCalledTimes(1)

  const firstCall = res.json.mock.calls[0]
  const firstArg = firstCall[0]
  const {users} = firstArg

  expect(users.length).toBeGreaterThan(0)

  // Get actual users from the DB, to compare with the users that we received
  // by calling `getUsers`
  const actualUsers = await db.getUsers()
  expect(users).toEqual(actualUsers.map(safeUser))
})

test('deleteUser will 403 if not requested by a user', async () => {
  const {req, res} = setup()
  const testUser = await db.insertUser(generate.userData())
  req.params = {id: testUser.id}
  req.user = {id: generate.id()}

  await usersController.deleteUser(req, res)
  expect(res.status).toHaveBeenCalledTimes(1)
  expect(res.status).toHaveBeenCalledWith(403)
  expect(res.send).toHaveBeenCalledTimes(1)
})

test('deleteUser will 404 if user does not exist', async () => {
  const {req, res} = setup()
  req.params = {id: generate.id()}
  req.user = {id: generate.id()}

  await usersController.deleteUser(req, res)
  expect(res.status).toHaveBeenCalledTimes(1)
  expect(res.status).toHaveBeenCalledWith(404)
  expect(res.send).toHaveBeenCalledTimes(1)
})

test('deleteUser will delete the user if properly requested', async () => {
  const {req, res} = setup()
  const testUser = await db.insertUser(generate.userData())
  req.params = {id: testUser.id}
  req.user = {id: testUser.id}

  await usersController.deleteUser(req, res)
  expect(res.status).toHaveBeenCalledTimes(1)
  expect(res.status).toHaveBeenCalledWith(204)
  expect(res.send).toHaveBeenCalledTimes(1)
})

//////// Elaboration & Feedback /////////
// When you've finished with the exercises:
// 1. Copy the URL below into your browser and fill out the form
// 2. remove the `.skip` from the test below
// 3. Change submitted from `false` to `true`
// 4. And you're all done!
/*
http://ws.kcd.im/?ws=Testing&e=users%20test$20object%20factories&em=
*/
test('I submitted my elaboration and feedback', () => {
  const submitted = true // change this when you've submitted!
  expect(submitted).toBe(true)
})
////////////////////////////////
