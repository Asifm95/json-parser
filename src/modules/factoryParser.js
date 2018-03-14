export const factoryParser = p => {
  return text => {
    if (text === null) return null
    let out
    const keys = Object.keys(p)
    for (let i = 0; i < keys.length; i++) {
      try {
        out = p[keys[i]](text)
      } catch (error) {
        console.log(error)
      }
      if (out != null) {
        return out
      }
    }
    return null
  }
}
