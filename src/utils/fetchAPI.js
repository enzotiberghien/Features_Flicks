export const getTable = async (table) => {
  const res = await fetch(`/api/${table}`)
  const data = await res.json()
  return data
}

export const getItem = async (table, id) => {
  const res = await fetch(`/api/${table}/:${id}`)
  const data = await res.json()
  return data
}

