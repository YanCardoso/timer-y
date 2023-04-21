import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useContext } from 'react'
import { CyclesContext } from '../../contexts/CyclesContext'
import { HistoryContainer, HistoryList, StatusCircle } from './styles'

export function History() {
  const { cycles } = useContext(CyclesContext)

  return (
    <HistoryContainer>
      <h1>MEU HISTÓRICO</h1>
      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefas</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map((cycle) => {
              return (
                <tr key={`${cycle.id}${String(cycle.dateInitial)}`}>
                  <td>{cycle.task}</td>
                  <td>{cycle.minutesAmount}</td>
                  <td>
                    {formatDistanceToNow(cycle.dateInitial, {
                      addSuffix: true,
                      locale: ptBR,
                    })}
                  </td>
                  <td>
                    {cycle.interruptDate && (
                      <StatusCircle statusColor="red">
                        Ciclo Interrompido
                      </StatusCircle>
                    )}
                    {cycle.completedDate && (
                      <StatusCircle statusColor="green">
                        Finalizado
                      </StatusCircle>
                    )}
                    {!cycle.completedDate && !cycle.interruptDate && (
                      <StatusCircle statusColor="yellow">
                        Em Andamento
                      </StatusCircle>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
