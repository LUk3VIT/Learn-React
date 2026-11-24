// =============================================================================
// AULA 1: Componente e JSX
// Leitura: https://pt-br.react.dev/learn/your-first-component
//          https://pt-br.react.dev/learn/writing-markup-with-jsx
//          https://pt-br.react.dev/learn/javascript-in-jsx-with-curly-braces
//
// IDEIA PRINCIPAL
// Um COMPONENTE é só uma FUNÇÃO que DEVOLVE o que deve aparecer na tela.
// O "HTML" que ela devolve se chama JSX (é HTML escrito dentro do TypeScript).
//
// COMPARANDO COM O JS PURO (o que você fazia no public/)
//   JS puro:   const p = document.createElement('p')
//              p.textContent = 'Olá, ' + nome
//              document.getElementById('area').appendChild(p)
//   React:     return <p>Olá, {nome}</p>
// Você não "manda" o navegador criar e pendurar elementos.
// Você DESCREVE como a tela deve ficar, e o React faz o trabalho.
//
// REGRAS DO JSX
//   1. Nome do componente começa com MAIÚSCULA: <Saudacao />, não <saudacao />
//      (minúscula = tag HTML, maiúscula = componente seu)
//   2. Devolve UM elemento "pai" só (aqui é o <section>). Para não criar uma
//      div à toa, dá para usar <> ... </> (um "fragmento").
//   3. Toda tag fecha: <img />, <input />, <br />
//   4. class vira className;  for vira htmlFor
//   5. { } = "aqui dentro é TypeScript": variáveis, contas, chamadas de função
// =============================================================================

// Um componente bem pequeno. Não recebe nada e sempre mostra a mesma coisa.
function Saudacao() {
  return <p>👋 Olá! Eu sou o componente Saudacao.</p>
}

function Rodape() {
  return <p>Sistema BrasEq - 2026</p>
}

// "export" = outro arquivo pode usar (o App.tsx importa este)
export function Aula01() {
  // Código normal de TypeScript pode vir ANTES do return
  const vagas = 4
  const nome = 'Lucas'
  const hora = new Date().getHours()
  const periodo = hora < 12 ? 'bom dia' : hora < 18 ? 'boa tarde' : 'boa noite'

  return (
    <section>
      <h2>Aula 1: Componente e JSX</h2>

      {/* Comentário dentro do JSX é assim, entre chaves */}

      <h3>1. Chaves {'{ }'} mostram valores do TypeScript</h3>
      <p>
        Olá, {nome}, {periodo}! Agora são {hora} horas.
      </p>
      <p>Conta: 2 + 2 = {2 + 2}</p>
      <p>Nome em maiúsculas: {nome.toUpperCase()}</p>

      <h3>2. Um componente usado dentro de outro (e reaproveitado)</h3>
      <Saudacao />
      <Saudacao />
      <Saudacao />

      <h3>3. className em vez de class</h3>
      <div className="caixa">Esta div usa className=&quot;caixa&quot; (classe do estilo.css).</div>

      <p className="dica">
        Abra este arquivo (src/aulas/Aula01_Componente.tsx), mude o texto de algum
        &lt;p&gt; e salve: a tela atualiza sozinha.
      </p>

      <h3>4. Exercio</h3>
      <p>Esta div usa className=&quot;caixa&quot; (classe do estilo.css).</p>

      <p>Restam {vagas} vagas</p>
      <Rodape />
    </section>
  )
}

// =============================================================================
// EXERCÍCIOS (faça aqui mesmo, salve e veja na tela)
//   1. Crie um componente Rodape() que mostra "Sistema BrasEq - 2026" e use-o
//      no fim da Aula01.
//   2. Crie uma constante "vagas = 4" e mostre "Restam 4 vagas" usando { }.
//   3. Tente escrever class="caixa" em vez de className: veja o aviso no
//      console do navegador (F12). Depois volte para className.
//   4. Apague o <section> e deixe dois <p> soltos no return: veja o erro
//      (o JSX exige UM pai). Resolva com <> ... </>.
// =============================================================================
