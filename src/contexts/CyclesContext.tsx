import { ReactNode, createContext, useReducer, useState } from 'react'

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

interface CyclesStateProps {
  cycles: Cycle[]
  activityCycleId: string | null
}

export const CyclesContext = createContext({} as CyclesContextData)

export function CyclesContextProvider({
  children,
}: CyclesContextChildrenProps) {
  const [cyclesState, dispatch] = useReducer(
    (state: CyclesStateProps, action: any) => {
      switch (action.type) {
        case 'CREATE_NEW_CYCLE':
          return {
            ...state,
            cycles: [...state.cycles, action.payload.newCycle],
            activityCycleId: action.payload.newCycle.id,
          }
        case 'STOPPED_CURRENT_CYCLE':
          return {
            ...state,
            cycles: state.cycles.map((cycle) => {
              if (cycle.id === action.payload.activityCycleId) {
                return { ...cycle, interruptDate: new Date() }
              } else {
                return cycle
              }
            }),
            activityCycleId: null,
          }
        case 'MARK_CURRENT_CYCLE_AS_COMPLETED':
          return {
            ...state,
            cycles: state.cycles.map((cycle) => {
              if (cycle.id === action.payload.activityCycleId) {
                return { ...cycle, completedDate: new Date() }
              } else {
                return cycle
              }
            }),
            activityCycleId: null,
          }
        default:
          return state
      }
    },
    { cycles: [], activityCycleId: null },
  )

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const { cycles, activityCycleId } = cyclesState

  const activityCycle = cycles.find((cycle) => cycle.id === activityCycleId)

  function currentSetAmountSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function markCurrentCycleFinished() {
    dispatch({
      type: 'MARK_CURRENT_CYCLE_AS_COMPLETED',
      payload: activityCycleId,
    })
  }

  function CreateNewCyclo(data: CreateCyclesData) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      dateInitial: new Date(),
    }

    dispatch({ type: 'CREATE_NEW_CYCLE', payload: { newCycle } })
    setAmountSecondsPassed(0)
  }

  function StoppedNewCycle() {
    dispatch({ type: 'STOPPED_CURRENT_CYCLE', payload: { activityCycleId } })

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
