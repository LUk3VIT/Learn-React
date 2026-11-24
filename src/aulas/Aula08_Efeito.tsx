// =============================================================================
// AULA 8: useEffect: fazer algo DEPOIS que o componente aparece
// Leitura: https://pt-br.react.dev/learn/synchronizing-with-effects
//          https://pt-br.react.dev/learn/you-might-not-need-an-effect
//
// IDEIA PRINCIPAL
// A função do componente deve só CALCULAR o JSX. Coisas "de fora" (buscar
// dados na API, ligar um relógio, mexer no <body>, desenhar num canvas) vão
// num useEffect, que roda DEPOIS que o React desenhou a tela.
//
//      useEffect(() => {
//        // 1. o que fazer
//        return () => {
//          // 2. (opcional) LIMPEZA: roda quando o componente sai da tela
//        }
//      }, [dependencias])
//         └─ []        → roda uma vez, quando o componente aparece
//         └─ [x, y]    → roda quando aparece E toda vez que x ou y mudar
//         └─ (sem nada)→ roda em TODO desenho (quase nunca é o que você quer)
//
// No StrictMode (desenvolvimento) o React monta, desmonta e monta de novo
// para testar a sua limpeza. Por isso o efeito pode rodar 2 vezes. Normal.
// =============================================================================

import { useEffect, useState } from 'react'

// ---------------------------------------------------------------------------
// 1. Um relógio: liga um setInterval e DESLIGA na limpeza
// ---------------------------------------------------------------------------
function Relogio() {
  const [agora, setAgora] = useState(() => new Date())

  useEffect(() => {
    console.log('Relógio ligado')
    const id = setInterval(() => setAgora(new Date()), 1000)

    // Sem esta limpeza, o intervalo continuaria rodando depois que o
    // relógio sumisse da tela (vazamento).
    return () => {
      console.log('Relógio desligado')
      clearInterval(id)
    }
  }, []) // [] = liga uma vez só

  return <p>🕒 {agora.toLocaleTimeString('pt-BR')}</p>
}

// ---------------------------------------------------------------------------
// 2. "Buscar dados" (como o GET /horarios), com carregando e erro
//    Aqui a API é FALSA (espera 1 segundo), para não depender do XAMPP.
// ---------------------------------------------------------------------------
type Horario = { id: number; inicio: string; fim: string }

function buscarHorariosFalsos(falhar: boolean): Promise<Horario[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (falhar) reject(new Error('Servidor fora do ar'))
      else
        resolve([
          { id: 1, inicio: '11:30', fim: '11:45' },
          { id: 2, inicio: '11:45', fim: '12:00' },
        ])
    }, 1000)
  })
}

function ListaDaApi() {
  const [horarios, setHorarios] = useState<Horario[]>([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')
  const [falhar, setFalhar] = useState(false)
  const [tentativa, setTentativa] = useState(0) // mudar = buscar de novo

  useEffect(() => {
    // "ativo": se a resposta chegar depois que o componente sumiu (ou depois
    // de uma busca mais nova), ignora. É o mesmo truque do SessaoProvider.
    let ativo = true
    setCarregando(true)
    setErro('')

    buscarHorariosFalsos(falhar)
      .then((dados) => {
        if (ativo) setHorarios(dados)
      })
      .catch((err: Error) => {
        if (ativo) setErro(err.message)
      })
      .finally(() => {
        if (ativo) setCarregando(false)
      })

    return () => {
      ativo = false
    }
  }, [tentativa, falhar]) // busca de novo quando "tentativa" ou "falhar" mudar

  return (
    <div className="caixa">
      <label>
        <input type="checkbox" checked={falhar} onChange={(e) => setFalhar(e.target.checked)} />{' '}
        Simular servidor fora do ar
      </label>
      <br />
      <button className="btn" onClick={() => setTentativa(tentativa + 1)}>
        Recarregar
      </button>

      {carregando && <p>Carregando...</p>}
      {erro && <p className="erro">Erro: {erro}</p>}
      {!carregando && !erro && (
        <ul className="lista">
          {horarios.map((h) => (
            <li key={h.id}>
              {h.inicio} - {h.fim}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export function Aula08() {
  const [mostrarRelogio, setMostrarRelogio] = useState(true)

  return (
    <section>
      <h2>Aula 8: useEffect</h2>

      <h3>1. Relógio (liga ao aparecer, desliga ao sumir)</h3>
      <button className="btn secundario" onClick={() => setMostrarRelogio(!mostrarRelogio)}>
        {mostrarRelogio ? 'Esconder relógio' : 'Mostrar relógio'}
      </button>
      {mostrarRelogio && <Relogio />}
      <p>Abra o console (F12) e esconda/mostre: veja &quot;ligado&quot; e &quot;desligado&quot;.</p>

      <h3>2. Buscar dados (carregando / erro / lista)</h3>
      <ListaDaApi />

      <p className="dica">
        No projeto: o SessaoProvider usa useEffect para perguntar ao servidor quem está
        logado, e o useClasseNoBody para pôr a classe no &lt;body&gt;. Na tarefa 2 (agenda),
        você vai buscar o /horarios num useEffect igual ao ListaDaApi.
      </p>
    </section>
  )
}

// =============================================================================
// EXERCÍCIOS
//   1. Tire o "return () => clearInterval(id)" do Relogio, esconda e mostre
//      várias vezes: veja no console que os intervalos se acumulam. Volte.
//   2. Mude a dependência do ListaDaApi para [] e veja que "Recarregar" para
//      de funcionar. Por quê? (o efeito não sabe que "tentativa" mudou)
//   3. Mostre "Última atualização: HH:MM:SS" depois que a lista carregar.
// =============================================================================
