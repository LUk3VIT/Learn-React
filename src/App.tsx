// =============================================================================
// App.tsx: o menu das aulas
//
// Este arquivo já é um exemplo de React: o número da aula aberta é um ESTADO
// (aula 4). Clicar num botão do menu muda o estado, e o React redesenha
// mostrando a aula escolhida. Nada de recarregar a página.
// =============================================================================

import { useState, type ComponentType } from 'react'
import { Aula01 } from './aulas/Aula01_Componente'
import { Aula02 } from './aulas/Aula02_Props'
import { Aula03 } from './aulas/Aula03_Children'
import { Aula04 } from './aulas/Aula04_Estado'
import { Aula05 } from './aulas/Aula05_Formulario'
import { Aula06 } from './aulas/Aula06_CondicionalLista'
import { Aula07 } from './aulas/Aula07_PaiEFilho'
import { Aula08 } from './aulas/Aula08_Efeito'
import { Aula09 } from './aulas/Aula09_Ref'
import { Aula10 } from './aulas/Aula10_Exercicio'
import { Aula10Solucao } from './aulas/Aula10_Solucao'

type Aula = {
  id: string
  titulo: string
  componente: ComponentType // "um componente qualquer"
}

const AULAS: Aula[] = [
  { id: '1', titulo: '1. Componente e JSX', componente: Aula01 },
  { id: '2', titulo: '2. Props', componente: Aula02 },
  { id: '3', titulo: '3. children', componente: Aula03 },
  { id: '4', titulo: '4. Estado (useState)', componente: Aula04 },
  { id: '5', titulo: '5. Eventos e formulários', componente: Aula05 },
  { id: '6', titulo: '6. Condicional e listas', componente: Aula06 },
  { id: '7', titulo: '7. Pai e filho (Modal)', componente: Aula07 },
  { id: '8', titulo: '8. useEffect', componente: Aula08 },
  { id: '9', titulo: '9. useRef', componente: Aula09 },
  { id: '10', titulo: '10. Exercício: login com 2FA', componente: Aula10 },
  { id: '10s', titulo: '10. Solução (depois de tentar!)', componente: Aula10Solucao },
]

export function App() {
  const [aulaAtual, setAulaAtual] = useState('1')

  const aula = AULAS.find((a) => a.id === aulaAtual) ?? AULAS[0]
  // Para usar um componente guardado numa variável, o nome precisa começar
  // com maiúscula (regra da aula 1)
  const Componente = aula.componente

  return (
    <div className="layout">
      <nav className="menu">
        <h1>Aprendendo React</h1>
        {AULAS.map((a) => (
          <button key={a.id} className={a.id === aulaAtual ? 'ativo' : ''} onClick={() => setAulaAtual(a.id)}>
            {a.titulo}
          </button>
        ))}
      </nav>

      <main className="conteudo">
        {/* key: ao trocar de aula, o React começa a aula do zero (estado limpo) */}
        <Componente key={aula.id} />
      </main>
    </div>
  )
}
