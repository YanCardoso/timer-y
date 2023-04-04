import { Play } from 'phosphor-react'
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  Separator,
} from './styles'

export function Home() {
  return (
    <HomeContainer>
      <form action="">
        <FormContainer>
          <label htmlFor="work">Vou trabalhar em</label>
          <input type="text" id="work" />
          <label htmlFor="minutesAmount">durante</label>
          <input type="number" id="minutesAmount" />
        </FormContainer>

        <span>minutos.</span>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <button type="submit">
          <Play size={24} />
          COMEÇAR
        </button>
      </form>
    </HomeContainer>
  )
}
