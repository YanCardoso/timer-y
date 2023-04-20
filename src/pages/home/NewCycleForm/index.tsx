import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import { CyclesContext } from '../../../contexts/CyclesContext'
import { FormContainer, MinutesInput, TaskInput } from './styles'

export function NewCycleForm() {
  const { activityCycle } = useContext(CyclesContext)
  const { register } = useFormContext()

  return (
    <FormContainer>
      <label htmlFor="work">Vou trabalhar em</label>
      <TaskInput
        placeholder="Dê um nome para o seu projeto"
        list="task-suggestions"
        type="text"
        id="work"
        disabled={!!activityCycle}
        {...register('task')}
      />
      <datalist id="task-suggestions">
        <option value="Estudar programação" />
      </datalist>
      <label htmlFor="minutesAmount">durante</label>
      <MinutesInput
        type="number"
        placeholder="00"
        id="minutesAmount"
        disabled={!!activityCycle}
        step={5}
        min={5}
        max={60}
        {...register('minutesAmount', { valueAsNumber: true })}
      />
      <span>minutos.</span>
    </FormContainer>
  )
}
