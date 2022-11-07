import React from 'react'

import { Button } from '@common/buttons'
import { DateInput, Input, Select } from '@common/fields'
import { IntlText, useIntl, useMutation, useQuery } from '@features'
import { validateIsEmpty } from '@pages'
import { changeUser, dogApi, useCache, useForm, useStore } from '@utils'

import { RegistrationWizardContainer } from '../../RegistrationWizardContainer/RegistrationWizardContainer'
import { PetList } from './PetList/PetList'

import styles from '../FillProfileDataStep/FillProfileDataStep.module.css'

interface PetFormValues {
  dogName: string
  dogWeight: string
  breed: $TSFixMe
  dogBirthday: Date
}

interface Breed {
  weight: {
    imperial: string
    metric: string
  }
  height: {
    imperial: string
    metric: string
  }
  id: number
  name: string
  bred_for: string
  breed_group: string
  life_span: string
  temperament: string
  origin: string
  reference_image_id: string
  image: {
    id: string
    width: number
    height: number
    url: string
  }
}

interface AddYourPetsStepProps {
  initialData: $TSFixMe
  nextStep: (addPetsData: PetFormValues[]) => void
  backStep: (addPetsData: PetFormValues[]) => void
}

const profileFormValidateSchema = {
  dogName: (value: string) => validateIsEmpty(value),
  dogWeight: (value: string) => validateIsEmpty(value),
  breed: (value: string) => validateIsEmpty(value),
  dogBirthday: (value: string) => validateIsEmpty(value)
}

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

export const AddYourPetsStep: React.FC<AddYourPetsStepProps> = ({
  nextStep,
  initialData,
  backStep
}) => {
  const { setStore, user } = useStore()
  const { translateMessage } = useIntl()

  // const { cache, setCache } = useCache()

  // const [currentField, setCurrentField] = React.useState<Steps>(null)

  const [pets, setPets] = React.useState(initialData)
  const [selectedPetId, setSelectedPetId] = React.useState(pets[0].id)

  const { data: breedsData, isLoading: breedsLoading } = useQuery<Breed[]>('breeds', () =>
    dogApi.get('breeds')
  )

  const { mutationAsync: changeUserMutation, isLoading: changeUserLoading } = useMutation(
    'changeUser',
    (params: UsersIdReqPatchParams) => changeUser({ params })
  )

  const { values, errors, setFieldValues, handleSubmit } = useForm<PetFormValues>({
    initialValues: pets[0],
    // validateSchema: profileFormValidateSchema,
    validateOnChange: false,
    onSubmit: async (values) => {
      // const response = await profileMutation(values)
      // if (!response?.success) return
      // setStore({ user: response.data })
      nextStep(pets)
    }
  })

  return (
    <RegistrationWizardContainer
      activeStep={2}
      form={{
        title: <IntlText path='page.registration.fillYourLoginData' />,
        backButton: (
          <div aria-hidden onClick={() => backStep(pets)}>
            <IntlText path='go back' />
          </div>
        ),
        content: (
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <div className={styles.input_container}>
              <Input
                // disabled={profileLoading}
                value={values.dogName}
                label={translateMessage('field.input.dogName.label')}
                // onFocus={() => setCurrentField('dogName')}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const dogName = e.target.value
                  setFieldValues('dogName', dogName)
                }}
                {...(!!errors &&
                  !!errors.dogName && { isError: !!errors.dogName, helperText: errors.dogName })}
              />
            </div>
            <div className={styles.input_container}>
              <Select
                value={values.breed}
                label={translateMessage('field.input.breed.label')}
                options={
                  breedsData?.map((breed) => ({
                    label: breed.name,
                    id: breed.id,
                    value: breed
                  })) ?? []
                }
                onChange={(option) => {
                  setFieldValues('breed', option)
                }}
              />
            </div>
            <div className={styles.input_container}>
              <DateInput
                // disabled={profileLoading}
                label={translateMessage('field.input.dogBirthday.label')}
                value={values.dogBirthday}
                onChange={(date) => {
                  setFieldValues('dogBirthday', date)
                }}
                {...(!!errors &&
                  !!errors.dogBirthday && {
                    isError: !!errors.dogBirthday,
                    helperText: errors.dogBirthday
                  })}
              />
            </div>
            <div className={styles.input_container}>
              <Input
                // disabled={profileLoading}
                value={values.dogWeight}
                label={translateMessage('field.input.dogWeight.label')}
                // onFocus={() => setCurrentField('dogName')}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const dogWeight = e.target.value
                  setFieldValues('dogWeight', dogWeight)
                }}
                {...(!!errors &&
                  !!errors.dogWeight && {
                    isError: !!errors.dogWeight,
                    helperText: errors.dogWeight
                  })}
              />
            </div>

            <Button
              type='submit'
              // isLoading={profileLoading}
            >
              <IntlText path='button.done' values={{ test: 213124 }} />
            </Button>
          </form>
        )
      }}
      panel={{
        data: <PetList />,
        footer: (
          <div role='link' tabIndex={0} aria-hidden onClick={() => nextStep(pets)}>
            <IntlText path='page.registration.iAlreadyHaveAnAccount' />
          </div>
        )
      }}
    />
  )
}
