import React from 'react'

import { classnames } from '@utils'

import styles from './PetItem.module.css'

interface PetItemProps {
  pet: Pet
  onDelete?: (id: Pet['id']) => void
  onSelect: (id: Pet['id']) => void
  selected: boolean
}

export const PetItem: React.FC<PetItemProps> = ({ pet, onDelete, selected, onSelect }) => {
  const petYears = new Date().getFullYear() - pet.dogBirthday.getFullYear()

  const content = !pet.dogName
    ? '🐕 woof'
    : `${pet.dogName} - ${pet.breed}, ${petYears} y.o., ${pet.dogWeight} kg`

  return (
    <div
      aria-hidden
      onClick={() => onSelect(pet.id)}
      className={classnames(styles.pet_container, { [styles.selected_pet_container]: selected })}
    >
      <div>{content}</div>

      {onDelete && <div aria-hidden onClick={() => onDelete(pet.id)} className={styles.cross} />}
    </div>
  )
}
