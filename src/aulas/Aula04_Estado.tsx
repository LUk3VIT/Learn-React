// =============================================================================
// AULA 4: Estado (useState): a "memória" do componente
// Leitura: https://pt-br.react.dev/learn/state-a-components-memory
//          https://pt-br.react.dev/learn/render-and-commit
//
// IDEIA PRINCIPAL
// Props vêm de fora. ESTADO é um valor que o próprio componente guarda e que,
// quando MUDA, faz o React REDESENHAR o componente.
//
//      const [contador, setContador] = useState(0)
//              │           │                   └─ valor inicial
//              │           └─ função para MUDAR o valor (e redesenhar)
//              └─ o valor atual
//
// COMO O REACT "PENSA"
//   1. Chama a função do componente → ela devolve o JSX → aparece na tela
//   2. Você chama setContador(1)
//   3. O React chama a função DE NOVO, agora com contador = 1, e atualiza
//      só o que mudou na tela.
//   Cada chamada da função é um "desenho" (render).
//
// POR QUE NÃO UMA VARIÁVEL COMUM (let)?
//   Veja o ContadorQueNaoFunciona abaixo: a variável até muda, mas
//   (a) o React não fica sabendo, então não redesenha;
//   (b) a cada desenho a função roda de novo e o "let" volta para 0.
//   useState resolve os dois: guarda o valor ENTRE os desenhos e avisa o React.
//
// REGRA DOS HOOKS: funções que começam com "use" (useState, useEffect...)
// só podem ser chamadas no TOPO do componente. Nunca dentro de if, for, ou
// de outra função.
// =============================================================================

import { useState } from 'react'

function ContadorQueNaoFunciona() {
  let contador = 0

  function somar() {
    contador = contador + 1
    console.log('A variável mudou para', contador, '... mas a tela não muda!')
  }

  return (
    <div className="caixa">
      <p>❌ Com let: {contador}</p>
      <button className="btn" onClick={somar}>
        +1
      </button>
      <span> (abra o console, F12, e clique)</span>
    </div>
  )
}

function Contador() {
  const [contador, setContador] = useState(0)

  console.log('Desenhando o Contador com valor', contador)

  return (
    <div className={contador === 4 ? 'caixa cheio' : 'caixa'}>
        <p>✅ Com useState: {contador}</p>
      <button className="btn" onClick={() => setContador(contador + 1)}>
        +1
      </button>
      <button className="btn secundario" onClick={() => setContador(0)}>
        Zerar
      </button>
      <button className="btn secundario" onClick={() => setContador(contador - 1)}>
        -1
      </button>
    </div>
  )
}

// Estado do tipo verdadeiro/falso: abrir e fechar alguma coisa
function Interruptor() {
  const [ligado, setLigado] = useState(false)

  return (
    <div className="caixa">
      <p>A luz está {ligado ? '💡 LIGADA' : '🌑 desligada'}</p>
      {/* !ligado = o contrário do valor atual */}
      <button className="btn" onClick={() => setLigado(!ligado)}>
        {ligado ? 'Desligar' : 'Ligar'}
      </button>
    </div>
  )
}

function AgendaStatus() {
  const [ mensagem, setMensagem ] = useState('Agenda liberada')

  return (
    <div className="caixa">
      <p>{mensagem}</p>
      <button className="btn" onClick={() => setMensagem('Agenda liberada')}>
        Liberar
      </button>
      <button className="btn" onClick={() => setMensagem('Agenda bloqueada')}>
        Bloquear
      </button>
    </div>
  )
}

export function Aula04() {
  return (
    <section>
      <h2>Aula 4: Estado (useState)</h2>

      <h3>Variável comum x estado</h3>
      <ContadorQueNaoFunciona />
      <Contador />

      <h3>Cada componente tem o seu próprio estado</h3>
      <p>Clique nos dois: um não mexe no outro.</p>
      <Contador />

      <h3>Estado booleano (abrir/fechar, ligar/desligar)</h3>
      <Interruptor />

      <h3>Estado com texto (mensagem)</h3>
      <AgendaStatus />

      <p className="dica">
        No sistema: o login usa estado para o texto dos campos, para a mensagem de erro e
        para &quot;Entrando...&quot; no botão. Na tarefa 1, o token do 2FA fica num estado: quando
        ele tem valor, a janela aparece; quando volta a null, some.
      </p>
    </section>
  )
}

// =============================================================================
// EXERCÍCIOS
//   1. No Contador, acrescente um botão "-1" que não deixa passar de 0
//      (dica: setContador(Math.max(0, contador - 1))).
//   2. Faça o Contador ficar vermelho (className="cheio") quando chegar a 4,
//      com o texto "Bloco cheio!".
//   3. Crie um estado com texto: const [mensagem, setMensagem] = useState('')
//      e dois botões que trocam a mensagem ("Agenda liberada" / "Agenda bloqueada").
//   4. Tente colocar o useState dentro de um if e veja o aviso. Depois desfaça.
// =============================================================================
