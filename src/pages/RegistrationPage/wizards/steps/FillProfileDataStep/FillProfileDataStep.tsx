import React from 'react'
import { Link } from 'react-router-dom'

import { Button } from '@common/buttons'
import { DateInput, Input } from '@common/fields'
import { IntlText, useIntl } from '@features'
import { useMutation } from '@features/api'
// import { validateIsEmpty } from '@pages'
import { changeUser, useForm, useStore } from '@utils'

import { RegistrationWizardContainer } from '../../RegistrationWizardContainer/RegistrationWizardContainer'

import styles from './FillProfileDataStep.module.css'

interface ProfileFormValues {
  name: string
  registrationAddress: string
  birthDate: Date
}

interface FillProfileDataStepProps {
  initialData: ProfileFormValues
  nextStep: (fillProfileData: ProfileFormValues) => void
}

// const profileFormValidateSchema = {
//   name: (value: string) => validateIsEmpty(value),
//   registrationAddress: (value: string) => validateIsEmpty(value),
//   birthDate: (value: string) => validateIsEmpty(value)
// }

type Steps = 'name' | 'registrationAddress' | 'birthDate' | 'test' | null

interface FillProfilePanelDataProps {
  focusedField: Steps
}

const FillProfilePanelData: React.FC<FillProfilePanelDataProps> = ({ focusedField }) => {
  if (!focusedField) return null
  return (
    <div>
      {focusedField === 'registrationAddress' && (
        <div>
          We want to know your address so that we can suggest good places for walks with your pet,
          the nearest veterinary clinics, etc.
        </div>
      )}
      {focusedField === 'birthDate' && <div>birthDate</div>}
      {focusedField === 'name' && <div>name</div>}
      {focusedField === 'test' && <div>test</div>}
    </div>
  )
}

export const FillProfileDataStep: React.FC<FillProfileDataStepProps> = ({
  nextStep,
  initialData
}) => {
  const { setStore, user } = useStore()
  const [currentField, setCurrentField] = React.useState<Steps>(null)

  const { mutationAsync: changeUserMutation, isLoading: profileLoading } = useMutation(
    'changeUser',
    (params: UsersIdReqPatchParams) => changeUser({ params })
  )

  const { values, errors, setFieldValues, handleSubmit } = useForm<ProfileFormValues>({
    initialValues: initialData,
    // validateSchema: profileFormValidateSchema,
    validateOnChange: false,
    onSubmit: async (values) => {
      if (!user?.id) return
      const changeUserMutationParams: UsersIdReqPatchParams = {
        ...values,
        id: user.id,
        birthDate: values.birthDate.getTime()
      }
      const response = await changeUserMutation(changeUserMutationParams)
      if (!response?.success) return
      setStore({ user: response.data })
      nextStep(values)
    }
  })
  const { translateMessage } = useIntl()

  return (
    <RegistrationWizardContainer
      activeStep={1}
      form={{
        title: <IntlText path='page.registration.fillYourLoginData' />,
        content: (
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <div className={styles.input_container}>
              <Input
                disabled={profileLoading}
                value={values.name}
                label={translateMessage('field.input.name.label')}
                onFocus={() => setCurrentField('name')}
                // onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                //   const username = e.target.value
                //   setFieldValues('username', username)
                // }}
              />
            </div>
            <div className={styles.input_container}>
              <Input
                disabled={profileLoading}
                value={values.name}
                label={translateMessage('field.input.registrationAddress.label')}
                onFocus={() => setCurrentField('registrationAddress')}
                // onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                //   const username = e.target.value
                //   setFieldValues('username', username)
                // }}
              />
            </div>
            <div className={styles.input_container}>
              <DateInput
                disabled={profileLoading}
                label={translateMessage('field.input.birthDay.label')}
                value={values.birthDate}
                onChange={(date) => {
                  setFieldValues('birthDate', date)
                }}
                {...(!!errors &&
                  !!errors.birthDate && {
                    isError: !!errors.birthDate,
                    helperText: errors.birthDate
                  })}
              />
            </div>
            <div className={styles.input_container}>
              {/* <Select
                disabled={profileLoading}
                label='data'
                option={{ label: values.test, option: values.test, value: values.test }}
                onChange={(option) => {
                  setFieldValues('test', option)
                }}
                {...(!!errors &&
                  !!errors.birthDate && {
                    isError: !!errors.birthDate,
                    helperText: errors.birthDate
                  })}
              /> */}
            </div>
            <Button type='submit' isLoading={profileLoading}>
              <IntlText path='button.done' values={{ test: 213124 }} />
            </Button>
          </form>
        )
      }}
      panel={{
        data: <FillProfilePanelData focusedField={currentField} />,
        footer: (
          <div role='link' tabIndex={0} aria-hidden onClick={() => nextStep(values)}>
            <IntlText path='page.registration.iAlreadyHaveAnAccount' />
          </div>
        )
      }}
    />
  )
}
