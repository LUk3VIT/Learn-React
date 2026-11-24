// =============================================================================
// AULA 10: EXERCÍCIO FINAL: login com código 2FA (ensaio da tarefa 1)
//
// Aqui JÁ ESTÁ PRONTO (como no projeto):
//   - o formulário de usuário e senha (aula 5)
//   - o colaborador entra direto (ana / 123)
//
// VOCÊ FAZ (procure "TODO"): o admin (admin / admin) precisa do código 2FA.
//   1. Um estado token2fa (string | null). Com valor = janela aberta.
//   2. No aoEntrar: se a resposta tiver requer2fa, guarde o token2fa no estado.
//   3. Desenhe o <Modal> (copie o da aula 7) só quando token2fa tiver valor,
//      com um formulário: campo do código (6 números), Cancelar, Validar.
//   4. aoValidar: chama validarCodigoFalso(token2fa, codigo).
//        ok   → setLogado(resposta.nome) e fecha a janela
//        erro → mostra a mensagem DENTRO da janela
//   5. Cancelar / ×: volta token2fa para null (e limpa código e erro).
//
// Código certo do admin: 123456
// Só abra o Aula10_Solucao.tsx DEPOIS de tentar (ou se travar muito).
// Dica: as aulas 4, 5, 6 e 7 têm todas as peças.
// =============================================================================

import { useState, type FormEvent } from 'react'
import { entrarFalso } from './apiFalsa'
// TODO: você vai precisar também de: validarCodigoFalso (de './apiFalsa'),
//       ReactNode (de 'react') para o Modal

// TODO (passo 3): cole aqui o componente Modal da aula 7

export function Aula10() {
  const [usuario, setUsuario] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [logado, setLogado] = useState<string | null>(null) // nome de quem entrou

  // TODO (passo 1): estados token2fa, codigo e erroCodigo

  async function aoEntrar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErro('')
    setEnviando(true)
    try {
      const resposta = await entrarFalso(usuario.trim(), senha)
      if (resposta.ok && resposta.token) {
        setLogado(resposta.nome ?? usuario) // colaborador: entrou
      } else if (resposta.ok && resposta.requer2fa) {
        // TODO (passo 2): guardar o resposta.token2fa no estado (abre a janela)
        setErro('Admin: falta fazer a janela do código (é o seu exercício!)')
      } else {
        setErro(resposta.mensagem ?? 'Erro ao entrar.')
      }
    } finally {
      setEnviando(false)
    }
  }

  // TODO (passo 4): async function aoValidar(e: FormEvent<HTMLFormElement>) { ... }

  // TODO (passo 5): function cancelar() { ... }

  function sair() {
    setLogado(null)
    setUsuario('')
    setSenha('')
  }

  // Já logado: mostra a "tela de dentro"
  if (logado) {
    return (
      <section>
        <h2>Aula 10: Exercício</h2>
        <p className="sucesso">Bem-vindo, {logado}! Você entrou no sistema.</p>
        <button className="btn secundario" onClick={sair}>
          Sair
        </button>
      </section>
    )
  }

  return (
    <section>
      <h2>Aula 10: Exercício (login com 2FA)</h2>
      <p>Teste: ana / 123 (entra direto) · admin / admin (pede o código 123456)</p>

      <form className="caixa" onSubmit={aoEntrar}>
        <input type="text" placeholder="Usuário" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
        <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
        <button className="btn" type="submit" disabled={enviando}>
          {enviando ? 'Entrando...' : 'Entrar'}
        </button>
        {erro && <p className="erro">{erro}</p>}
      </form>

      {/* TODO (passo 3): {token2fa && ( <Modal ...> <form onSubmit={aoValidar}> ... </form> </Modal> )} */}
    </section>
  )
}
