import { ListChecks, Timer } from 'phosphor-react'
import LogoIg from '../../assets/logo-ig.svg'
import { HeaderConteiner } from './styles'
export function Header() {
  return (
    <HeaderConteiner>
      <img src={LogoIg} alt="" />
      <nav>
        <a href="#">
          <Timer size={24} />
        </a>

        <a href="#">
          <ListChecks size={24} />
        </a>
      </nav>
    </HeaderConteiner>
  )
}
