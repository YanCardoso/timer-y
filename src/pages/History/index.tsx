import { HistoryContainer, HistoryList, StatusCircle } from './styles'

export function History() {
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
            <tr>
              <td>Tarefa 1</td>
              <td>35 minutos</td>
              <td>Há 2 meses</td>
              <td>
                <StatusCircle statusColor="green">Concluído</StatusCircle>
              </td>
            </tr>
            <tr>
              <td>Tarefa 2</td>
              <td>15 minutos</td>
              <td>Há 1 meses</td>
              <td>
                <StatusCircle statusColor="red">Interrompido</StatusCircle>
              </td>
            </tr>
            <tr>
              <td>Tarefa 3</td>
              <td>55 minutos</td>
              <td>Há 4 meses</td>
              <td>
                <StatusCircle statusColor="yellow">Em Andamento</StatusCircle>
              </td>
            </tr>
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
