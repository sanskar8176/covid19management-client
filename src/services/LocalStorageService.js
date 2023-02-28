

//  token
const storeToken = (value) => {
  localStorage.setItem('token', value)
}

const getToken = () => {
  let token = localStorage.getItem('token')?localStorage.getItem('token'):null;
  return token
}

const removeToken = (value) => {
  localStorage.removeItem(value)
}

// user 
const storeUser = (value) => {
  localStorage.setItem('user', value)
}

const getUser = () => {
  let token = localStorage.getItem('user')?localStorage.getItem('user'):null;
  return token
}

const removeUser = (value) => {
  localStorage.removeItem(value)
}


export { storeToken, getToken, removeToken, storeUser, getUser, removeUser}
