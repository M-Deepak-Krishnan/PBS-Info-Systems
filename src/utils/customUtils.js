export function  CapsFirstLetter(txt) {
  return txt && `${txt.charAt(0).toUpperCase()}${txt.slice(1).toLowerCase()}`
}