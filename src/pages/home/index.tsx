import { Play } from 'phosphor-react'
import {
  CountdownButton,
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesInput,
  Separator,
  TaskInput,
} from './styles'

export function Home() {
  return (
    <HomeContainer>
      <form action="">
        <FormContainer>
          <label htmlFor="work">Vou trabalhar em</label>
          <TaskInput
            placeholder="Dê um nome para o seu projeto"
            list="task-suggestions"
            type="text"
            id="work"
          />
          <datalist id="task-suggestions">
            <option value="Estudar programação" />
          </datalist>
          <label htmlFor="minutesAmount">durante</label>
          <MinutesInput
            type="number"
            placeholder="00"
            id="minutesAmount"
            step={5}
            min={5}
            max={60}
          />
          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <CountdownButton type="submit">
          <Play size={24} />
          COMEÇAR
        </CountdownButton>
      </form>
    </HomeContainer>
  )
}
