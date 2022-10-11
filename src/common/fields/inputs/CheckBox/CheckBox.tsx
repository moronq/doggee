import React from 'react'

import styles from './CheckBox.module.css'

export const CheckBox: React.FC<InputProps> = ({ label, ...props }) => (
  <div>
    <label className={styles.checkbox_container}>
      <input className={styles.checkbox} {...props} type='checkbox' checked={props.checked} />
      <span className={styles.custom_checkbox} />
      <span className={styles.label}>{label}</span>
    </label>
  </div>
)
