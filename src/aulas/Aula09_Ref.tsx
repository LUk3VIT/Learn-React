// =============================================================================
// AULA 9: useRef: "segurar" um elemento da tela (input, canvas...)
// Leitura: https://pt-br.react.dev/learn/referencing-values-with-refs
//          https://pt-br.react.dev/learn/manipulating-the-dom-with-refs
//
// IDEIA PRINCIPAL
// Às vezes você PRECISA mexer direto num elemento do navegador:
//   - pôr o cursor num campo (focus)
//   - desenhar num <canvas> (o QR Code do 2FA é desenhado num canvas!)
// No JS puro era document.getElementById('x'). No React é useRef:
//
//      const campoRef = useRef<HTMLInputElement>(null)   ← "uma caixinha vazia"
//      <input ref={campoRef} />                          ← o React guarda o input nela
//      campoRef.current?.focus()                         ← use o elemento
//
//   .current começa null e o React preenche DEPOIS de desenhar.
//   Por isso, para usar logo que aparece, use dentro de um useEffect.
//   O "?." = "se não for null, chama"; protege contra o null.
//
// DIFERENÇA PARA O ESTADO: mudar um ref NÃO redesenha a tela.
// Use ref para "segurar coisas"; use estado para o que aparece na tela.
// =============================================================================

import { useEffect, useRef, useState } from 'react'

// ---------------------------------------------------------------------------
// 1. Pôr o cursor num campo
// ---------------------------------------------------------------------------
function FocarCampo() {
  const campoRef = useRef<HTMLInputElement>(null)

  return (
    <div className="caixa">
      <input ref={campoRef} type="text" placeholder="Código de 6 dígitos" />
      <button className="btn" onClick={() => campoRef.current?.focus()}>
        Pôr o cursor no campo
      </button>
    </div>
  )
}

// ---------------------------------------------------------------------------
// 2. Desenhar num <canvas> (é assim que o QR Code vai ser desenhado)
//    O desenho depende de "cor" e "tamanho": o efeito redesenha quando mudam.
// ---------------------------------------------------------------------------
function Desenho() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [cor, setCor] = useState('#000000')
  const [tamanho, setTamanho] = useState(10)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Limpa e desenha um "tabuleiro" (parece um QR Code de mentira)
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = cor
    for (let y = 0; y < canvas.height; y += tamanho) {
      for (let x = 0; x < canvas.width; x += tamanho) {
        if ((x / tamanho + y / tamanho) % 2 === 0) ctx.fillRect(x, y, tamanho, tamanho)
      }
    }
  }, [cor, tamanho]) // redesenha quando a cor ou o tamanho mudarem

  return (
    <div className="caixa">
      <button className="btn" onClick={() => setCor('#000000')}>
        Preto
      </button>
      <button className="btn" onClick={() => setCor('#4a9e86')}>
        Verde
      </button>
      <button className="btn secundario" onClick={() => setTamanho(tamanho === 10 ? 20 : 10)}>
        Trocar tamanho
      </button>
      <br />
      <canvas ref={canvasRef} width={200} height={200} />
    </div>
  )
}

export function Aula09() {
  return (
    <section>
      <h2>Aula 9: useRef</h2>

      <h3>1. Segurar um campo para pôr o cursor nele</h3>
      <FocarCampo />

      <h3>2. Desenhar num canvas (base do QR Code)</h3>
      <Desenho />

      <p className="dica">
        No passo 5 da tarefa 1 (QR Code), a biblioteca &quot;qrcode&quot; desenha no canvas
        com QRCode.toCanvas(canvasRef.current, texto). É este mesmo padrão: useRef no
        &lt;canvas&gt; + useEffect que desenha quando o texto muda.
      </p>
    </section>
  )
}

// =============================================================================
// EXERCÍCIOS
//   1. No FocarCampo, faça o cursor ir para o campo SOZINHO quando a aula abre
//      (dica: useEffect(() => { campoRef.current?.focus() }, [])).
//      Obs.: para isso existe também o atalho <input autoFocus />.
//   2. No Desenho, acrescente uma terceira cor (vermelho #e76e56).
//   3. Tente usar canvasRef.current fora do useEffect, direto no corpo da
//      função, com console.log: no primeiro desenho ele é null. Por quê?
// =============================================================================
