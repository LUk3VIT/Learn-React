// =============================================================================
// AULA 10: SOLUÇÃO do exercício (abra só depois de tentar!)
// Compare com o que você fez: não existe uma única resposta certa, mas repare
// em cada peça e de qual aula ela veio.
// =============================================================================

import { useState, type FormEvent, type ReactNode } from 'react'
import { entrarFalso, validarCodigoFalso } from './apiFalsa'

// Aula 3 (children) + aula 7 (avisar o pai)
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
          <button className="modal-fechar" type="button" aria-label="Fechar" onClick={aoFechar}>
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

export function Aula10Solucao() {
  const [usuario, setUsuario] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [logado, setLogado] = useState<string | null>(null)

  // Passo 1 (aula 4): com valor = janela aberta; null = fechada
  const [token2fa, setToken2fa] = useState<string | null>(null)
  const [codigo, setCodigo] = useState('')
  const [erroCodigo, setErroCodigo] = useState('')

  async function aoEntrar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErro('')
    setEnviando(true)
    try {
      const resposta = await entrarFalso(usuario.trim(), senha)
      if (resposta.ok && resposta.token) {
        setLogado(resposta.nome ?? usuario)
      } else if (resposta.ok && resposta.requer2fa && resposta.token2fa) {
        // Passo 2: guardar o token = abrir a janela
        setToken2fa(resposta.token2fa)
        setSenha('')
      } else {
        setErro(resposta.mensagem ?? 'Erro ao entrar.')
      }
    } finally {
      setEnviando(false)
    }
  }

  // Passo 4
  async function aoValidar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!token2fa) return // o TypeScript precisa ter certeza de que não é null

    if (codigo.length !== 6) {
      setErroCodigo('Digite os 6 números do código.')
      return
    }

    setErroCodigo('')
    setEnviando(true)
    try {
      const resposta = await validarCodigoFalso(token2fa, codigo)
      if (resposta.ok && resposta.token) {
        cancelar() // limpa e fecha a janela
        setLogado(resposta.nome ?? 'Admin')
      } else {
        setErroCodigo(resposta.mensagem ?? 'Código inválido.')
      }
    } finally {
      setEnviando(false)
    }
  }

  // Passo 5
  function cancelar() {
    setToken2fa(null)
    setCodigo('')
    setErroCodigo('')
  }

  function sair() {
    setLogado(null)
    setUsuario('')
    setSenha('')
  }

  if (logado) {
    return (
      <section>
        <h2>Aula 10: Solução</h2>
        <p className="sucesso">Bem-vindo, {logado}! Você entrou no sistema.</p>
        <button className="btn secundario" onClick={sair}>
          Sair
        </button>
      </section>
    )
  }

  return (
    <section>
      <h2>Aula 10: Solução (login com 2FA)</h2>
      <p>Teste: ana / 123 (entra direto) · admin / admin (pede o código 123456)</p>

      <form className="caixa" onSubmit={aoEntrar}>
        <input type="text" placeholder="Usuário" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
        <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
        <button className="btn" type="submit" disabled={enviando}>
          {enviando ? 'Entrando...' : 'Entrar'}
        </button>
        {erro && <p className="erro">{erro}</p>}
      </form>

      {/* Passo 3 (aula 6 + 7): a janela só existe enquanto houver token2fa */}
      {token2fa && (
        <Modal titulo="Verificação 2FA" aoFechar={cancelar}>
          <form onSubmit={aoValidar}>
            <p>Digite o código de 6 dígitos do aplicativo:</p>
            <input
              type="text"
              className="codigo"
              placeholder="000000"
              inputMode="numeric"
              autoComplete="one-time-code"
              autoFocus
              value={codigo}
              // Aula 5, exercício 3: só números, no máximo 6
              onChange={(e) => setCodigo(e.target.value.replace(/\D/g, '').slice(0, 6))}
            />
            {erroCodigo && <p className="erro">{erroCodigo}</p>}
            <div>
              <button className="btn secundario" type="button" onClick={cancelar}>
                Cancelar
              </button>
              <button className="btn" type="submit" disabled={enviando}>
                {enviando ? 'Validando...' : 'Validar código'}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </section>
  )
}
