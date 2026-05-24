import { mockUsers } from '../data/mockUsers'
import { ACCOUNT_TYPE_TO_ROLE } from '../data/roles'

const REGISTERED_USERS_KEY = 'kalitan-registered-users'

function delay(ms = 450) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms)
  })
}

function getRegisteredUsers() {
  try {
    return JSON.parse(localStorage.getItem(REGISTERED_USERS_KEY)) ?? []
  } catch {
    return []
  }
}

function saveRegisteredUsers(users) {
  localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users))
}

function sanitizeUser(user) {
  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
  }
}

function createMockToken(user) {
  return `mock-token-${user.role.toLowerCase()}-${user.id}`
}

export async function login(credentials) {
  await delay()

  const email = credentials.email.trim().toLowerCase()
  const users = [...mockUsers, ...getRegisteredUsers()]
  const user = users.find((currentUser) => currentUser.email.toLowerCase() === email)

  if (!user || user.password !== credentials.password) {
    throw new Error('Correo o contraseña incorrectos.')
  }

  return {
    token: createMockToken(user),
    user: sanitizeUser(user),
  }
}

export async function register(userData) {
  await delay()

  const registeredUsers = getRegisteredUsers()
  const users = [...mockUsers, ...registeredUsers]
  const email = userData.email.trim().toLowerCase()
  const exists = users.some((user) => user.email.toLowerCase() === email)

  if (exists) {
    throw new Error('Ya existe una cuenta con ese correo.')
  }

  const user = {
    id: Date.now(),
    fullName: userData.fullName.trim(),
    email,
    password: userData.password,
    role: ACCOUNT_TYPE_TO_ROLE[userData.accountType] ?? userData.accountType,
  }

  saveRegisteredUsers([...registeredUsers, user])

  return {
    token: createMockToken(user),
    user: sanitizeUser(user),
  }
}

export async function getMe() {
  await delay(150)
  return null
}

export async function logout() {
  await delay(150)
  return { success: true }
}
