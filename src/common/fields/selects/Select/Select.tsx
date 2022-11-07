import React from 'react'

import { useSelect } from './hooks/useSelect'

import styles from './Select.module.css'

interface SelectProps extends Omit<FieldProps, 'value' | 'onChange'> {
  options: Option[]
  value: Option | null
  onChange: (option: Option) => void
  filterOption?: FilterOptionFunc
  components?: {
    NoOptionsMessage?: React.ComponentType
    Option?: React.ComponentType<{ option: Option }>
    SelectedValue?: React.ComponentType<{ option: Option }>
  }
}

const defaultFilterOption: FilterOptionFunc = (option, inputValue) =>
  option.label.toLowerCase().includes(inputValue.toLowerCase())

export const Select: React.FC<SelectProps> = ({
  options,
  disabled,
  value,
  filterOption = defaultFilterOption,
  components,
  loading,
  onChange,
  isError = false,
  helperText,
  ...props
}) => {
  const { functions, refs, state } = useSelect({
    options,
    filterOption,
    value,
    onChange
  })

  const showValidationMessage = !state.showOptions && isError && !!helperText
  const showOption = !!value

  const optionItems = state.filteredOptions.map((option) => {
    const isSelected = state.searchSelectedOption.id === option.id
    return (
      <li key={option.id}>
        {components?.Option ? <components.Option option={option} /> : option.label}
      </li>
    )
  })

  const SelectIcon = React.useCallback(
    () => (
      <div aria-hidden role='button'>
        <div
          className={styles.select_icon}
          style={{ transform: !state.showOptions ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </div>
    ),
    [state.showOptions]
  )

  return (
    <div
      aria-hidden
      className={styles.date_input_container}
      ref={refs.selectRef}
      onKeyDown={functions.onSelectKeyDown}
    >
      <div className={styles.field_container}>
        <div
          aria-hidden='true'
          aria-disabled={disabled}
          className={`${styles.input_container} ${isError ? styles.input_error : ''}`}
          onClick={() => {
            if (disabled || loading) return
            functions.onSelectClick()
          }}
        >
          <div className={styles.input_indicator}>
            <SelectIcon />
          </div>
          {state.showOptions && (
            <input
              className={styles.input}
              autoComplete='off'
              type='text'
              disabled={disabled}
              ref={refs.inputRef}
              value={state.inputValue}
              onChange={functions.searchInputHandler}
            />
          )}

          <label htmlFor={props.id} className={`${styles.input_label}`}>
            {props.label}
          </label>
        </div>
      </div>

      {state.showOptions && (
        <ul ref={refs.ulRef} className={styles.options_container}>
          {!state.filteredOptions.length && (
            <div>
              {components?.NoOptionsMessage ? <components.NoOptionsMessage /> : 'no option'}
            </div>
          )}
          {optionItems}
        </ul>
      )}
      {showValidationMessage && <div>{helperText}</div>}
    </div>
  )
}
