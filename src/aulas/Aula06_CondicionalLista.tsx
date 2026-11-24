// =============================================================================
// AULA 6: Mostrar/esconder (condicional) e listas (map + key)
// Leitura: https://pt-br.react.dev/learn/conditional-rendering
//          https://pt-br.react.dev/learn/rendering-lists
//
// IDEIA PRINCIPAL
// Não existe "hidden = true" nem "element.remove()". Você escreve no JSX
// QUANDO algo deve aparecer, e o React põe ou tira da tela.
//
//   {condicao && <p>...</p>}          só aparece se a condição for verdadeira
//   {condicao ? <A /> : <B />}        um OU outro
//   if (...) return null              o componente inteiro não aparece
//
// LISTAS: transforme um array de DADOS num array de JSX com .map():
//   {horarios.map((h) => <li key={h.id}>{h.inicio}</li>)}
//   key: um valor ÚNICO e estável de cada item (normalmente o id do banco).
//   O React usa a key para saber qual item é qual quando a lista muda.
//   Sem key aparece aviso no console. Evite usar a posição (index) como key.
// =============================================================================

import { useState } from 'react'

// Um "tipo" para os dados, como viria da API do sistema
type Horario = {
  id: number
  inicio: string
  fim: string
  colaboradores: string[]
}

const HORARIOS: Horario[] = [
  { id: 1, inicio: '11:30', fim: '11:45', colaboradores: ['Ana', 'Bruno', 'Carla'] },
  { id: 2, inicio: '11:45', fim: '12:00', colaboradores: ['Davi', 'Eva', 'Fábio', 'Gil'] },
  { id: 3, inicio: '12:00', fim: '12:15', colaboradores: [] },
  { id: 4, inicio: '12:15', fim: '12:30', colaboradores: ['Lucas'] },
]

const LIMITE = 4

// Um bloco de horário que abre e fecha (cada um com seu próprio estado)
function BlocoHorario({ horario, meuNome }: { horario: Horario; meuNome: string }) {
  const [aberto, setAberto] = useState(false)

  const ocupados = horario.colaboradores.length
  const cheio = ocupados >= LIMITE
  const souEu = horario.colaboradores.includes(meuNome)

  return (
    <li>
      <div>
        <strong>
          {horario.inicio} - {horario.fim}
        </strong>{' '}
        {/* ternário: um OU outro */}
        {cheio ? (
          <span className="cheio">cheio</span>
        ) : (
          <span className="livre">{LIMITE - ocupados} vaga(s)</span>
        )}
        {/* &&: só aparece se for verdade */}
        {souEu && <span className="selo"> SEU HORÁRIO</span>}

        {aberto && (
          <div>
            {ocupados === 0 ? (
              <p>Ninguém marcou ainda.</p>
            ) : (
              <ul>
                {horario.colaboradores.map((nome) => (
                  <li key={nome}>{nome}</li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
      <button className="btn secundario" onClick={() => setAberto(!aberto)}>
        {aberto ? 'Fechar' : 'Ver quem marcou'}
      </button>
    </li>
  )
}

export function Aula06() {
  const [soComVaga, setSoComVaga] = useState(false)
  const meuNome = 'Lucas'

  // Dado DERIVADO: calculado a partir de outros, sem precisar de estado próprio
  const visiveis = soComVaga
    ? HORARIOS.filter((h) => h.colaboradores.length < LIMITE)
    : HORARIOS

  return (
    <section>
      <h2>Aula 6: Condicional e listas</h2>

      <label>
        <input type="checkbox" checked={soComVaga} onChange={(e) => setSoComVaga(e.target.checked)} />{' '}
        Mostrar só horários com vaga
      </label>

      <ul className="lista">
        {visiveis.map((h) => (
          <BlocoHorario key={h.id} horario={h} meuNome={meuNome} />
        ))}
      </ul>

      {visiveis.length === 0 && <p className="erro">Nenhum horário com vaga.</p>}

      <p className="dica">
        Isto é praticamente a tarefa 2 (agenda): os dados viriam do GET /horarios em vez da
        constante HORARIOS, e o botão marcaria o horário na API.
      </p>
    </section>
  )
}

// =============================================================================
// EXERCÍCIOS
//   1. Acrescente um campo de busca (campo controlado, aula 5) que filtra os
//      horários pelo nome de quem marcou. Isso é a "busca" do painel novo!
//   2. Mostre no topo: "Total de pessoas marcadas: X" (dica: some os
//      colaboradores.length de todos com reduce ou com um for).
//   3. Troque key={h.id} por key={0} em todos e veja o aviso no console (F12).
// =============================================================================
