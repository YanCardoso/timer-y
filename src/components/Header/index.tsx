import { ListChecks, Timer } from 'phosphor-react'
import { NavLink } from 'react-router-dom'
import LogoIg from '../../assets/logo-ig.svg'
import { HeaderContainer } from './styles'
export function Header() {
  return (
    <HeaderContainer>
      <img src={LogoIg} alt="" />
      <nav>
        <NavLink to="/" title="timer">
          <Timer size={24} />
        </NavLink>

        <NavLink to="/history" title="histórico">
          <ListChecks size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}
