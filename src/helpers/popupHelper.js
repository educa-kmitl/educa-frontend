
export const randAlert = () => {
  const alertTitle = ['Oops!', 'Oh no!', 'Sorry..', 'Err..']
  return alertTitle[Math.floor(Math.random() * alertTitle.length)]
}
