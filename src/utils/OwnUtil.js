export const statusChange = value => {
  let change = value === null ? 1 : value
  if (change === 1) {
    change = 0
  } else {
    change = 1
  }
  return change
}

export const getDictLabelById = (itemValue, dictItems) => {
  if (dictItems == null) {
    return ''
  }
  const dictItem = dictItems.filter(dictItem => {
    return dictItem.itemValue === itemValue
  })[0]
  if (dictItem != null) {
    return dictItem.itemLabel
  } else {
    return dictItems[0].itemLabel
  }
}
