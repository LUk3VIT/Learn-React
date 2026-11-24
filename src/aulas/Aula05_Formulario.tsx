// =============================================================================
// AULA 5: Eventos e formulários ("campo controlado")
// Leitura: https://pt-br.react.dev/learn/responding-to-events
//          https://pt-br.react.dev/learn/reacting-to-input-with-state
//          https://pt-br.react.dev/reference/react-dom/components/input
//
// IDEIA PRINCIPAL
// EVENTOS: em vez de addEventListener, você passa a FUNÇÃO direto na tag:
//      JS puro:  botao.addEventListener('click', salvar)
//      React:    <button onClick={salvar}>
//   Cuidado: onClick={salvar} (passa a função)  ✅
//            onClick={salvar()} (chama na hora!) ❌
//   Se precisar passar algo: onClick={() => remover(nome)}
//
// CAMPO CONTROLADO: o valor do <input> vem do ESTADO, e cada tecla atualiza
// o estado. Assim o estado é sempre "a verdade" sobre o que está no campo.
//      <input value={nome} onChange={(e) => setNome(e.target.value)} />
//   Sem o onChange, o campo fica "travado" (o React volta sempre ao estado).
//
// FORMULÁRIO: onSubmit no <form> + e.preventDefault() para o navegador
// não recarregar a página (igual ao que você fazia no JS puro).
//
// LISTAS NO ESTADO: nunca altere a lista com push. Crie uma lista NOVA:
//      setNomes([...nomes, novo])        ← "..." copia os itens antigos
//   O React só redesenha se receber um valor NOVO.
// =============================================================================

import { useState, type FormEvent } from 'react'

export function Aula05() {
  const [nome, setNome] = useState('')
  const [erro, setErro] = useState('')
  const [nomes, setNomes] = useState<string[]>([]) // <string[]>: lista de textos

  // FormEvent<HTMLFormElement>: o tipo do evento de envio de um <form>
  function aoEnviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const limpo = nome.trim()
    if (!limpo) {
      setErro('Digite um nome.')
      return
    }
    if (nomes.includes(limpo)) {
      setErro(`${limpo} já está na lista (1 horário por pessoa!).`)
      return
    }

    setNomes([...nomes, limpo]) // lista nova = antigos + o novo
    setNome('') // limpa o campo (porque o campo mostra o estado)
    setErro('')
  }

  function remover(quem: string) {
    // filter também cria uma lista NOVA (sem o "quem")
    setNomes(nomes.filter((n) => n !== quem))
  }

  return (
    <section>
      <h2>Aula 5: Eventos e formulários</h2>

      <h3>Campo controlado (veja o texto mudando a cada tecla)</h3>
      <form onSubmit={aoEnviar}>
        <input
          type="text"
          placeholder="Nome do colaborador"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <button className="btn" type="submit">
          Marcar horário
        </button>
      </form>
      <p>
        Você está digitando: <strong>{nome || '(nada ainda)'}</strong> ({nome.length} letras)
      </p>

      {erro && <p className="erro">{erro}</p>}

      <h3>Quem marcou ({nomes.length}/4)</h3>
      <ul className="lista">
        {nomes.map((n) => (
          <li key={n}>
            {n}
            <button className="btn secundario" onClick={() => remover(n)}>
              Tirar
            </button>
          </li>
        ))}
      </ul>

      <p className="dica">
        É o mesmo padrão do LoginPage do projeto: nome e senha são campos controlados, o
        onSubmit chama o aoEnviar, e a mensagem de erro é um estado.
      </p>
    </section>
  )
}

// =============================================================================
// EXERCÍCIOS
//   1. Desabilite o botão quando a lista tiver 4 nomes
//      (dica: <button disabled={nomes.length >= 4}>) e mostre "Bloco cheio".
//   2. Acrescente um segundo campo controlado "senha" (type="password") e só
//      aceite o envio se a senha tiver 6 letras ou mais.
//   3. Faça o campo do código de 2FA: aceite só números e no máximo 6
//      (dica: no onChange, setCodigo(e.target.value.replace(/\D/g, '').slice(0, 6)))
// =============================================================================
