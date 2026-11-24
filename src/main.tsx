// =============================================================================
// main.tsx: o ponto de partida
//
// 1. Pega a <div id="root"> do index.html
// 2. Manda o React desenhar o componente <App /> lá dentro
// Daqui para frente, quem cuida da tela é o React.
// =============================================================================

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import './estilo.css'

createRoot(document.getElementById('root')!).render(
  // StrictMode: só no desenvolvimento, roda algumas coisas 2 vezes para achar
  // erros cedo. Por isso um console.log pode aparecer duplicado. É normal.
  <StrictMode>
    <App />
  </StrictMode>,
)
