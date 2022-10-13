import React from 'react'

import { MIN_LENGTH } from '@utils/constants'

import { PasswordRule } from './PasswordRule/PasswordRule'

interface PasswordRulesProps {
  password: string
  passwordAgain: string
  hasPasswordErrors: boolean
}

export const PasswordRules: React.FC<PasswordRulesProps> = ({
  password,
  passwordAgain,
  hasPasswordErrors
}) => {
  const rules = React.useMemo(
    () => [
      {
        title: 'page.registration.passwordRules.containNumbers',
        isCorrect: /\d/g.test(password)
      },
      {
        title: 'page.registration.passwordRules.containUppercaseLetter',
        isCorrect: /[A-Z]/g.test(password)
      },
      {
        title: 'page.registration.passwordRules.containLowercaseLetter',
        isCorrect: /[a-z]/g.test(password)
      },
      {
        title: 'page.registration.passwordRules.contain8characters',
        isCorrect: password.length >= MIN_LENGTH.PASSWORD
      }
    ],
    [password]
  )

  const isPasswordMatch = !!password && !!passwordAgain && password === passwordAgain
  return (
    <>
      <div>Password must:</div>
      {rules.map(({ isCorrect, title }, index) => (
        <PasswordRule
          key={index}
          title={title}
          isCorrect={isCorrect}
          showIcon={isCorrect || hasPasswordErrors}
        />
      ))}

      <div>
        <PasswordRule
          title='page.registration.passwordRules.passwordMustMatch'
          isCorrect={isPasswordMatch}
          showIcon={isPasswordMatch || hasPasswordErrors}
        />
      </div>
    </>
  )
}
