import { ActionTypes } from './actions'

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  dateInitial: Date
  interruptDate?: Date
  completedDate?: Date
}

interface CyclesStateProps {
  cycles: Cycle[]
  activityCycleId: string | null
}

export function cyclesReducer(state: CyclesStateProps, action: any) {
  switch (action.type) {
    case ActionTypes.CREATE_NEW_CYCLE: {
      const cycleBase = {
        ...state,
        cycles: [...state.cycles, action.payload.newCycle],
        activityCycleId: action.payload.newCycle.id,
      }
      return cycleBase
    }

    case ActionTypes.STOPPED_CURRENT_CYCLE:
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activityCycleId) {
            return { ...cycle, interruptDate: new Date() }
          } else {
            return cycle
          }
        }),
        activityCycleId: null,
      }
    case ActionTypes.MARK_CURRENT_CYCLE_AS_COMPLETED:
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activityCycleId) {
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
}
