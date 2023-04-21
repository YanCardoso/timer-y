interface Cycle {
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
export enum ActionTypes {
  // eslint-disable-next-line no-unused-vars
  CREATE_NEW_CYCLE = 'CREATE_NEW_CYCLE',
  // eslint-disable-next-line no-unused-vars
  STOPPED_CURRENT_CYCLE = 'STOPPED_CURRENT_CYCLE',
  // eslint-disable-next-line no-unused-vars
  MARK_CURRENT_CYCLE_AS_COMPLETED = 'MARK_CURRENT_CYCLE_AS_COMPLETE',
}

export function cyclesReducer(state: CyclesStateProps, action: any) {
  switch (action.type) {
    case ActionTypes.CREATE_NEW_CYCLE:
      return {
        ...state,
        cycles: [...state.cycles, action.payload.newCycle],
        activityCycleId: action.payload.newCycle.id,
      }
    case ActionTypes.STOPPED_CURRENT_CYCLE:
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
    case ActionTypes.MARK_CURRENT_CYCLE_AS_COMPLETED:
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
}
