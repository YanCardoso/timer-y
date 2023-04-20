import { differenceInSeconds } from 'date-fns'
import { useContext, useEffect, useState } from 'react'
import { CyclesContext } from '..'
import { CountdownContainer, Separator } from './styles'

export function Countdown() {
  const { activityCycle, activityCycleId, markCurrentCycleFinished } =
    useContext(CyclesContext)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const totalSeconds = activityCycle ? activityCycle.minutesAmount * 60 : 0
  const currentSeconds = activityCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    let interval: number

    if (activityCycle) {
      interval = setInterval(() => {
        const difference = differenceInSeconds(
          new Date(),
          activityCycle.dateInitial,
        )

        if (difference >= totalSeconds) {
          markCurrentCycleFinished()
          setAmountSecondsPassed(totalSeconds)
          clearInterval(interval)
        } else {
          setAmountSecondsPassed(difference)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [activityCycle, totalSeconds, activityCycleId, markCurrentCycleFinished])

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}
