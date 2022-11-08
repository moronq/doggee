import React from 'react'

import { PetItem } from './PetItem/PetItem'

import styles from './PetList.module.css'

interface PetListProps {
  pets: Pet[]
  onAdd: () => void
  onSelect: (id: Pet['id']) => void
  onDelete: (id: Pet['id']) => void
  selectedPetId: Pet['id']
}

export const PetList: React.FC<PetListProps> = ({
  pets,
  onAdd,
  onDelete,
  selectedPetId,
  onSelect
}) => (
  <div className={styles.pets_container}>
    <div className={styles.title}>Your pets</div>
    {pets.map((pet) => (
      <div key={pet.id}>
        <PetItem
          pet={pet}
          {...(pets.length > 1 && { onDelete })}
          selected={selectedPetId === pet.id}
          onSelect={onSelect}
        />
      </div>
    ))}
    <div className={styles.line} />
    <div onClick={onAdd} aria-hidden className={styles.add_pet}>
      Add another pet
    </div>
  </div>
)
