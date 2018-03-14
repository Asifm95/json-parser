export const colon = str => {
  let match
  return (match = str.match(/^:/)), match ? [match, str.slice(1)] : null
}
