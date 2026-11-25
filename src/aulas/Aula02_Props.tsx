// =============================================================================
// AULA 2: Props (as "configurações" de um componente)
// Leitura: https://pt-br.react.dev/learn/passing-props-to-a-component
//          https://pt-br.react.dev/learn/typescript
//
// IDEIA PRINCIPAL
// Props são os PARÂMETROS do componente. Quem usa passa como atributos:
//      <CartaoUsuario nome="Ana" cargo="colaborador" />
// e o componente recebe tudo num objeto só: { nome: 'Ana', cargo: 'colaborador' }
//
// Com TypeScript, você descreve o FORMATO desse objeto num "type".
// Se alguém esquecer uma prop obrigatória ou passar o tipo errado,
// o VS Code sublinha em vermelho ANTES de rodar.
//
// Props são SÓ DE LEITURA: o componente nunca altera as próprias props.
// =============================================================================

// 1. O formato das props
type CartaoUsuarioProps = {
  nome: string
  cargo: 'colaborador' | 'admin' // só aceita estes dois textos
  ativo?: boolean // o "?" quer dizer: opcional (pode não ser passada)
  email?: string // opcional, só para o exercício
}

// 2. O componente recebe as props e "desmonta" o objeto direto nos parênteses.
//    ativo = true: valor padrão quando ninguém passar "ativo".
function CartaoUsuario({ nome, cargo, ativo = true, email }: CartaoUsuarioProps) {
  return (
    // className também pode ser montada com { }: aqui junta "cartao" + "inativo"
    <div className={ativo ? 'cartao' : 'cartao inativo'}>
      <strong>{nome}</strong>
      <p>Cargo: {cargo}</p>
      {/* && : só desenha o selo se for admin (mais sobre isso na aula 6) */}
      {cargo === 'admin' && <span className="selo">ADMIN</span>}
      {!ativo && <p>(conta desativada)</p>}
      {email && <p>E-mail: {email}</p>}
    </div>
  )
}

// 3. Outro exemplo: props de tipos diferentes (número e função ficam para depois)
type HorarioProps = {
  inicio: string
  fim: string
  ocupados: number
  limite: number
}

function Horario({ inicio, fim, ocupados, limite }: HorarioProps) {
  const vagas = limite - ocupados
  return (
    <div className="caixa">
      <strong>
        {inicio} - {fim}
      </strong>{' '}
      — {ocupados}/{limite} ocupados, {vagas === 0 ? <span className="cheio">cheio</span> : <span className="livre">{vagas} vaga(s)</span>}
    </div>
  )
}

export function Aula02() {
  return (
    <section>
      <h2>Aula 2: Props</h2>

      <h3>O mesmo componente, com props diferentes</h3>
      <CartaoUsuario nome="Lucas" cargo="admin" email="lucs@gmail.com" />
      <CartaoUsuario nome="Ana" cargo="colaborador" email="ana@gmail.com"/>
      <CartaoUsuario nome="Bruno" cargo="colaborador" email="bruno@gmail.com" ativo={false} />

      {/* Texto vai entre aspas. Qualquer outra coisa (número, booleano,
          variável) vai entre chaves: ativo={false}, ocupados={3} */}

      <h3>Parecido com a agenda</h3>
      <Horario inicio="11:30" fim="11:45" ocupados={3} limite={4} />
      <Horario inicio="11:45" fim="12:00" ocupados={4} limite={4} />
      <Horario inicio="12:00" fim="12:15" ocupados={0} limite={4} />

      <p className="dica">
        Teste o TypeScript: escreva &lt;CartaoUsuario nome=&quot;Zé&quot; cargo=&quot;gerente&quot; /&gt;
        e veja o VS Code reclamar (cargo só aceita &quot;colaborador&quot; ou &quot;admin&quot;).
        Depois tente tirar o nome. Isso é o TypeScript te protegendo.
      </p>
    </section>
  )
}

// =============================================================================
// EXERCÍCIOS
//   1. Acrescente a prop opcional "email?: string" no CartaoUsuario e mostre
//      o e-mail só quando ele vier (dica: {email && <p>{email}</p>}).
//   2. Use o <Horario> para mostrar um terceiro bloco: 12:00 - 12:15, 0 ocupados.
//   3. No Horario, mostre "cheio" em vermelho usando className="cheio" e
//      "vaga(s)" em verde com className="livre" (classes do estilo.css).
//   4. Pergunta: por que o CartaoUsuario não pode fazer "nome = 'outro'" lá
//      dentro? (resposta: props são só de leitura; quem manda nelas é o pai)
// =============================================================================
