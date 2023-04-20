import { ReactNode, createContext, useState } from 'react'

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  dateInitial: Date
  interruptDate?: Date
  completedDate?: Date
}

interface CreateCyclesData {
  task: string
  minutesAmount: number
}

interface CyclesContextData {
  activityCycle: Cycle | undefined
  activityCycleId: string | null
  amountSecondsPassed: number
  markCurrentCycleFinished: () => void
  currentSetAmountSecondsPassed: (seconds: number) => void
  CreateNewCyclo: (data: CreateCyclesData) => void
  StoppedNewCycle: () => void
}

interface CyclesContextChildrenProps {
  children: ReactNode
}

export const CyclesContext = createContext({} as CyclesContextData)

export function CyclesContextProvider({
  children,
}: CyclesContextChildrenProps) {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activityCycleId, setActivityCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const activityCycle = cycles.find((cycle) => cycle.id === activityCycleId)

  function currentSetAmountSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

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

  function CreateNewCyclo(data: CreateCyclesData) {
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

    // reset()
  }

  function StoppedNewCycle() {
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
    // reset()
  }

  return (
    <CyclesContext.Provider
      value={{
        activityCycle,
        activityCycleId,
        markCurrentCycleFinished,
        currentSetAmountSecondsPassed,
        amountSecondsPassed,
        CreateNewCyclo,
        StoppedNewCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
