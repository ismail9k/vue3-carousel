export function i18nFormatter(string = '', values = {}) {
  return Object.entries(values).reduce(
    (acc, [key, value]) => acc.replace(`{${key}}`, String(value)),
    string
  )
}
