export const covnertDateToString = (date: string) => {
  return new Intl.DateTimeFormat('sr-RS').format(new Date(date))
}
