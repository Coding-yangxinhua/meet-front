export const statusChange = value => {
  let change = value === null ? 1 : value
  if (change === 1) {
    change = 0
  } else {
    change = 1
  }
  return change
}

export const getPosition = () => {
  const href = window.location.href
  const current = href.split('#')[1]
  if (current.includes('home')) {
    return 0
  } else if (current.includes('wish')) {
    return 1
  } else if (current.includes('me')) {
    return 2
  }
}
