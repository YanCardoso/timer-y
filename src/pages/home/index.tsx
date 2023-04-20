import { zodResolver } from '@hookform/resolvers/zod'
import { HandPalm, Play } from 'phosphor-react'
import { createContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { Countdown } from './Countdown'
import { NewCycleForm } from './NewCycleForm'
import { CountdownButton, HomeContainer, StopCountdownButton } from './styles'

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
  interruptDate?: Date
  completedDate?: Date
}

interface CyclesContextData {
  activityCycle: Cycle | undefined
  activityCycleId: string | null
  markCurrentCycleFinished: () => void
}
export const CyclesContext = createContext({} as CyclesContextData)

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activityCycleId, setActivityCycleId] = useState<string | null>(null)

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  function markCurrentCycleFinished() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activityCycleId) {
          return { ...cycle, completedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
  }

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
    setAmountSecondsPassed(0)

    reset()
  }

  function handleStoppedNewCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activityCycleId) {
          return { ...cycle, interruptDate: new Date() }
        } else {
          return cycle
        }
      }),
    )

    setActivityCycleId(null)
    setAmountSecondsPassed(0)
    reset()
  }

  const activityCycle = cycles.find((cycle) => cycle.id === activityCycleId)

  const task = watch('task')

  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewCyclo)}>
        <CyclesContext.Provider
          value={{ activityCycle, activityCycleId, markCurrentCycleFinished }}
        >
          <NewCycleForm />
          <Countdown />
        </CyclesContext.Provider>

        {activityCycle ? (
          <StopCountdownButton onClick={handleStoppedNewCycle} type="button">
            <HandPalm size={24} />
            PAUSAR
          </StopCountdownButton>
        ) : (
          <CountdownButton disabled={!task} type="submit">
            <Play size={24} />
            COMEÇAR
          </CountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
