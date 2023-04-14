import { zodResolver } from '@hookform/resolvers/zod'
import { differenceInSeconds } from 'date-fns'
import { Play } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import {
  CountdownButton,
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesInput,
  Separator,
  TaskInput,
} from './styles'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number().min(5).max(60),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  dateInitial: Date
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activityCycleId, setActivityCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  function handleCreateNewCyclo(data: NewCycleFormData) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      dateInitial: new Date(),
    }

    setCycles((state) => [...state, newCycle])
    setActivityCycleId(id)

    reset()
  }

  const activityCycle = cycles.find((cycle) => cycle.id === activityCycleId)

  useEffect(() => {
    if (activityCycle) {
      setInterval(() => {
        setAmountSecondsPassed(
          differenceInSeconds(new Date(), activityCycle.dateInitial),
        )
      }, 1000)
    }
  }, [activityCycle])

  const totalSeconds = activityCycle ? activityCycle.minutesAmount * 60 : 0
  const currentSeconds = activityCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  const task = watch('task')

  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewCyclo)}>
        <FormContainer>
          <label htmlFor="work">Vou trabalhar em</label>
          <TaskInput
            placeholder="Dê um nome para o seu projeto"
            list="task-suggestions"
            type="text"
            id="work"
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
            step={5}
            min={5}
            max={60}
            {...register('minutesAmount', { valueAsNumber: true })}
          />
          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownContainer>

        <CountdownButton disabled={!task} type="submit">
          <Play size={24} />
          COMEÇAR
        </CountdownButton>
      </form>
    </HomeContainer>
  )
}
