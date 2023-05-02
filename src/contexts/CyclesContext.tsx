import { ReactNode, createContext, useReducer, useState } from 'react'
import {
  addNewCycleAction,
  markNewCycleAction,
  stopCurrentCycleAction,
} from '../reducers/cycles/actions'
import { cyclesReducer } from '../reducers/cycles/reducer'

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
  cycles: Cycle[]
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
  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activityCycleId: null,
  })

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const { cycles, activityCycleId } = cyclesState

  const activityCycle = cycles.find((cycle) => cycle.id === activityCycleId)

  function currentSetAmountSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function markCurrentCycleFinished() {
    dispatch(markNewCycleAction())
  }

  function CreateNewCyclo(data: CreateCyclesData) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      dateInitial: new Date(),
    }

    dispatch(addNewCycleAction(newCycle))
    setAmountSecondsPassed(0)
  }

  function StoppedNewCycle() {
    dispatch(stopCurrentCycleAction())

    setAmountSecondsPassed(0)
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
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
