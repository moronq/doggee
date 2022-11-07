interface Option {
  label: string
  value: any
  id: string | number
}

interface FilterOptionFunc {
  (option: Option, inputValue: string): boolean
}
