export const getTable = async (table) => {
  const res = await fetch(`https://cinema-rest.nodehill.se/${table}`)
  const data = await res.json()
  return data
}

export const getItem = async (table, id) => {
  const res = await fetch(`https://cinema-rest.nodehill.se/${table}/:${id}`)
  const data = await res.json()
  return data
}

