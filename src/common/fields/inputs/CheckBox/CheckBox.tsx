import React from 'react'

import type { InputProps } from '../Input/Input'

import styles from './CheckBox.module.css'

type CheckBoxProps = InputProps

export const CheckBox: React.FC<CheckBoxProps> = ({ label, ...props }) => (
  <div>
    <label className={styles.checkbox_container}>
      <input className={styles.checkbox} {...props} type='checkbox' checked={props.checked} />
      <span className={styles.custom_checkbox} />
      <span className={styles.label}>{label}</span>
    </label>
  </div>
)
