import React from 'react'

import { Button } from '@common/buttons'
import { DateInput, Input, Select } from '@common/fields'
import { IntlText, useIntl, useMutation, useQuery } from '@features'
import { validateIsEmpty } from '@pages'
import { changeUser, dogApi, useCache, useForm, useStore } from '@utils'
import { PetForm } from './PetForm/PetForm'

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

const petFormValidationSchema = {
  dogName: (value: string) => validateIsEmpty(value),
  dogWeight: (value: string) => validateIsEmpty(value)
}

const validatePets = (pets: Pet[]) => {
  let errors: {
    [id: string]: { [K in keyof typeof petFormValidationSchema]?: ValidationReturn }
  } = {}

  pets.forEach((pet) => {
    let petErrors: { [K in keyof typeof petFormValidationSchema]?: ValidationReturn } = {}
    Object.keys(pet).forEach((field) => {
      const error = petFormValidationSchema[field as keyof typeof petFormValidationSchema](
        pet[field as keyof typeof petFormValidationSchema]
      )
      if (!error) return

      petErrors = {
        ...petErrors,
        [field]: error
      }
    })
    if (!Object.keys.length) return
    errors = { ...errors, [pet.id]: petErrors }
  })
  return errors
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
  const [petErrors, setPetErrors] = React.useState({})

  const { mutationAsync: changeUserMutation, isLoading: changeUserLoading } = useMutation(
    'changeUser',
    (params: UsersIdReqPatchParams) => changeUser({ params })
  )

  const addPet = () => {
    setPets([
      ...pets,
      { id: pets.length + 1, dogBirthday: new Date(), breed: '', dogName: '', dogWeight: '' }
    ])
  }

  const deletePet = (id: Pet['id']) => {
    const updatedPets = [...pets.filter((pet: Pet) => pet.id !== id)]
    setSelectedPetId(updatedPets[0].id)
    setPets(updatedPets)
  }

  const selectPet = (id: Pet['id']) => {
    setSelectedPetId(id)
  }

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
          <>
            <PetForm
              onChange={(field, value) => {
                setPets([
                  ...pets.map((pet) => {
                    if (pet.id === selectedPetId) {
                      return { ...pet, [field]: value }
                    }
                    return pet
                  })
                ])
              }}
              isLoading={changeUserLoading}
              pet={pets.find((pet) => pet.id === selectedPetId)}
            />
            <Button
              type='submit'
              isLoading={changeUserLoading}
              onClick={() => {
                const petErrors = validatePets(pets)
                if (Object.keys(petErrors).length) {
                  setPetErrors(petErrors)
                  return
                }
                nextStep(pets)
              }}
            >
              <IntlText path='button.done' values={{ test: 213124 }} />
            </Button>
          </>
        )
      }}
      panel={{
        data: (
          <PetList
            pets={pets}
            errors={petErrors}
            onAdd={addPet}
            onDelete={deletePet}
            onSelect={selectPet}
            selectedPetId={selectedPetId}
          />
        ),
        footer: (
          <div role='link' tabIndex={0} aria-hidden onClick={() => nextStep(pets)}>
            <IntlText path='page.registration.iAlreadyHaveAnAccount' />
          </div>
        )
      }}
    />
  )
}
