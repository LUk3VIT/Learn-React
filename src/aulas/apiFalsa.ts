// =============================================================================
// apiFalsa.ts: imita a API do sistema (/login e /validar-2fa), sem servidor.
// Usada na aula 10. Espera meio segundo para parecer uma chamada de verdade.
//
// Usuários de teste:
//   ana   / 123     → colaborador: entra direto (recebe token)
//   admin / admin   → admin: pede o código 2FA (código certo: 123456)
// =============================================================================

export type RespostaLogin = {
  ok: boolean
  mensagem?: string
  token?: string
  nome?: string
  requer2fa?: boolean
  token2fa?: string
}

function esperar(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function entrarFalso(usuario: string, senha: string): Promise<RespostaLogin> {
  await esperar(500)
  if (usuario === 'ana' && senha === '123') {
    return { ok: true, token: 'token-da-ana', nome: 'Ana' }
  }
  if (usuario === 'admin' && senha === 'admin') {
    return { ok: true, requer2fa: true, token2fa: 'temporario-do-admin' }
  }
  return { ok: false, mensagem: 'Usuário ou senha incorretos.' }
}

export async function validarCodigoFalso(token2fa: string, codigo: string): Promise<RespostaLogin> {
  await esperar(500)
  if (token2fa !== 'temporario-do-admin') {
    return { ok: false, mensagem: 'Token temporário inválido. Faça o login de novo.' }
  }
  if (codigo !== '123456') {
    return { ok: false, mensagem: 'Código inválido.' }
  }
  return { ok: true, token: 'token-do-admin', nome: 'Admin' }
}
