import React from 'react'

import { IntlText } from '@features'

import styles from './PasswordRule.module.css'

interface PasswordRuleProps {
  title: string
  showIcon: boolean
  isCorrect: boolean
}

export const PasswordRule: React.FC<PasswordRuleProps> = ({ title, isCorrect, showIcon }) => {
  const ruleClassName = isCorrect ? styles.password_rule_correct : styles.password_rule_incorrect
  const iconClassName = isCorrect
    ? styles.password_rule_correct_icon
    : styles.password_rule_incorrect_icon
  return (
    <div className={styles.password_rule_container}>
      {showIcon && (
        <div className={styles.password_rule_icon_container}>
          <div className={iconClassName} />
        </div>
      )}
      <IntlText
        path={title}
        values={{
          rule: (text) => <span className={`${styles.password_rule} ${ruleClassName}`}>{text}</span>
        }}
      />
    </div>
  )
}
