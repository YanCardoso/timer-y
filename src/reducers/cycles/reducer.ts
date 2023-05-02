import { produce } from 'immer'
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
    case ActionTypes.CREATE_NEW_CYCLE:
      return produce(state, (draft) => {
        draft.cycles.push(action.payload.newCycle)
        draft.activityCycleId = action.payload.newCycle.id
      })
    case ActionTypes.STOPPED_CURRENT_CYCLE: {
      const currentCycleIndex = state.cycles.findIndex((cycle) => {
        return cycle.id === state.activityCycleId
      })

      if (currentCycleIndex > 0) {
        return state
      }

      return produce(state, (draft) => {
        draft.activityCycleId = null
        draft.cycles[currentCycleIndex].interruptDate = new Date()
      })
    }
    case ActionTypes.MARK_CURRENT_CYCLE_AS_COMPLETED: {
      const currentCycleIndex = state.cycles.findIndex((cycle) => {
        return cycle.id === state.activityCycleId
      })

      if (currentCycleIndex > 0) {
        return state
      }

      return produce(state, (draft) => {
        draft.activityCycleId = null
        draft.cycles[currentCycleIndex].completedDate = new Date()
      })
    }
    default:
      return state
  }
}
