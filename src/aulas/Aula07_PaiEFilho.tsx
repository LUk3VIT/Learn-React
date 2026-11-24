// =============================================================================
// AULA 7: Pai e filho conversando (e o MODAL da tarefa 1)
// Leitura: https://pt-br.react.dev/learn/sharing-state-between-components
//          https://pt-br.react.dev/learn/responding-to-events#passing-event-handlers-as-props
//
// IDEIA PRINCIPAL
//   DADOS DESCEM pelas props        (pai → filho)
//   AVISOS SOBEM por funções        (filho → pai)
//
// O filho não muda o estado do pai diretamente. O pai passa uma FUNÇÃO como
// prop, e o filho CHAMA essa função quando algo acontece ("me clicaram!").
// Quem decide o que fazer é o pai, que é o dono do estado.
//
//      Pai (dono do estado: aberto)
//        │  <Modal aoFechar={() => setAberto(false)}>
//        ▼
//      Modal ── botão × ── onClick={aoFechar}  ──► roda o setAberto(false) do PAI
//                                                   → o pai redesenha
//                                                   → {aberto && <Modal/>} é falso
//                                                   → o Modal some
//
// Por convenção, props que são funções-aviso começam com "ao" (aoFechar,
// aoSalvar, aoEscolher) ou "on" (onClose...). O tipo é algo como:
//      aoFechar: () => void                (não recebe nada, não devolve nada)
//      aoEscolher: (id: number) => void    (manda um número para o pai)
// =============================================================================

import { useState, type ReactNode } from 'react'

// ---------------------------------------------------------------------------
// 1. Um exemplo pequeno: botões que avisam o pai
// ---------------------------------------------------------------------------
type BotaoVotoProps = {
  opcao: string
  aoVotar: (opcao: string) => void // função que o PAI vai passar
}

function BotaoVoto({ opcao, aoVotar }: BotaoVotoProps) {
  // O botão não sabe contar votos. Só avisa: "votaram em mim".
  return (
    <button className="btn" onClick={() => aoVotar(opcao)}>
      {opcao}
    </button>
  )
}

function Votacao() {
  // O PAI guarda o estado...
  const [votos, setVotos] = useState<Record<string, number>>({ Pizza: 0, Lasanha: 0 })

  // ...e decide o que fazer quando um filho avisa
  function registrarVoto(opcao: string) {
    // Objeto NOVO (nunca altere o estado direto): copia o antigo e troca um campo
    setVotos({ ...votos, [opcao]: votos[opcao] + 1 })
  }

  return (
    <div className="caixa">
      <p>Almoço de sexta:</p>
      <BotaoVoto opcao="Pizza" aoVotar={registrarVoto} />
      <BotaoVoto opcao="Lasanha" aoVotar={registrarVoto} />
      <p>
        Pizza: {votos.Pizza} · Lasanha: {votos.Lasanha}
      </p>
    </div>
  )
}

// ---------------------------------------------------------------------------
// 2. O MODAL: children (aula 3) + aviso para o pai (esta aula)
//    É o componente do PASSO 1 da tarefa 1, em versão simples.
// ---------------------------------------------------------------------------
type ModalProps = {
  titulo: string
  aoFechar: () => void
  children: ReactNode
}

function Modal({ titulo, aoFechar, children }: ModalProps) {
  return (
    <div className="modal-fundo">
      <div className="modal-cartao">
        <div className="modal-topo">
          <h3>{titulo}</h3>
          {/* O Modal não fecha sozinho: só AVISA o pai */}
          <button className="modal-fechar" type="button" aria-label="Fechar" onClick={aoFechar}>
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

export function Aula07() {
  // O dono do estado "janela aberta?" é este componente (o pai)
  const [aberto, setAberto] = useState(false)
  const [confirmacoes, setConfirmacoes] = useState(0)

  return (
    <section>
      <h2>Aula 7: Pai e filho conversando</h2>

      <h3>1. Filhos avisando o pai</h3>
      <Votacao />

      <h3>2. Um Modal (janela) controlado pelo pai</h3>
      <button className="btn" onClick={() => setAberto(true)}>
        Abrir janela
      </button>
      <p>Confirmações: {confirmacoes}</p>

      {/* A janela só EXISTE enquanto aberto for true */}
      {aberto && (
        <Modal titulo="Confirmar horário" aoFechar={() => setAberto(false)}>
          {/* Tudo isto é o "children" do Modal */}
          <p>Deseja marcar o horário 11:30 - 11:45?</p>
          <button className="btn secundario" onClick={() => setAberto(false)}>
            Cancelar
          </button>
          <button
            className="btn"
            onClick={() => {
              setConfirmacoes(confirmacoes + 1)
              setAberto(false)
            }}
          >
            Confirmar
          </button>
        </Modal>
      )}

      <p className="dica">
        Na tarefa 1 é igual: o &quot;aberto&quot; vira o token do 2FA. Quando a API pede o
        código, você faz setToken2fa(dados.token_2fa) e a janela aparece. O × e o Cancelar
        fazem setToken2fa(null) e a janela some.
      </p>
    </section>
  )
}

// =============================================================================
// EXERCÍCIOS
//   1. Acrescente "Feijoada" na Votacao (só no pai: no estado e um BotaoVoto).
//   2. Faça o Modal fechar ao clicar no fundo escuro também. Dica: onClick no
//      <div className="modal-fundo"> chamando aoFechar, mas só se
//      e.target === e.currentTarget (senão fecha ao clicar dentro do cartão).
//   3. Abra um segundo modal diferente ("Tirar horário?") reaproveitando o
//      mesmo componente Modal, com outro estado (const [aberto2, setAberto2]).
// =============================================================================
