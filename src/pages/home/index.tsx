import { zodResolver } from '@hookform/resolvers/zod'
import { HandPalm, Play } from 'phosphor-react'
import { useContext } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as zod from 'zod'
import { CyclesContext } from '../../contexts/CyclesContext'
import { Countdown } from './Countdown'
import { NewCycleForm } from './NewCycleForm'
import { CountdownButton, HomeContainer, StopCountdownButton } from './styles'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number().min(5).max(60),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
  const { activityCycle, CreateNewCyclo, StoppedNewCycle } =
    useContext(CyclesContext)

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { watch, handleSubmit } = newCycleForm

  const task = watch('task')

  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(CreateNewCyclo)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
          <Countdown />
        </FormProvider>

        {activityCycle ? (
          <StopCountdownButton onClick={StoppedNewCycle} type="button">
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
