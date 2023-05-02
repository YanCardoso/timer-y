import { Cycle } from './reducer'

export enum ActionTypes {
  // eslint-disable-next-line no-unused-vars
  CREATE_NEW_CYCLE = 'CREATE_NEW_CYCLE',
  // eslint-disable-next-line no-unused-vars
  STOPPED_CURRENT_CYCLE = 'STOPPED_CURRENT_CYCLE',
  // eslint-disable-next-line no-unused-vars
  MARK_CURRENT_CYCLE_AS_COMPLETED = 'MARK_CURRENT_CYCLE_AS_COMPLETE',
}

export function addNewCycleAction(newCycle: Cycle) {
  return { type: ActionTypes.CREATE_NEW_CYCLE, payload: { newCycle } }
}

export function markNewCycleAction() {
  return {
    type: ActionTypes.MARK_CURRENT_CYCLE_AS_COMPLETED,
  }
}

export function stopCurrentCycleAction() {
  return {
    type: ActionTypes.STOPPED_CURRENT_CYCLE,
  }
}
