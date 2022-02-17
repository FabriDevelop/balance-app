export const isNumber = (s: string) => {
  return /^[0-9]+([,][0-9]+)?$/.test(s) || s === ''
}

export const currencyFormat = (num: number | undefined) => {
  return '$ ' + num?.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
