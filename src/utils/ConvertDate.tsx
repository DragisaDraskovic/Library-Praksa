export const convertDateToString = (date: string) => {
  return new Intl.DateTimeFormat('sr-RS').format(new Date(date))
}
