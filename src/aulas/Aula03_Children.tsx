// =============================================================================
// AULA 3: children (o conteúdo que vem "de dentro" da tag)
// Leitura: https://pt-br.react.dev/learn/passing-props-to-a-component#passing-jsx-as-children
//
// IDEIA PRINCIPAL
// Existe uma prop especial chamada children: é tudo o que você coloca ENTRE
// a tag de abertura e a de fechamento do componente.
//
//      <Caixa titulo="Aviso">
//        <p>Isto aqui inteiro chega na Caixa como "children"</p>
//      </Caixa>
//
// Serve para criar MOLDURAS: a parte de fora é sempre igual (borda, título,
// botão de fechar...) e o miolo muda a cada uso. É exatamente o que o <Modal>
// da tarefa 1 faz: a janela é sempre igual, o conteúdo (código 2FA, QR Code,
// editar usuário...) muda.
//
// TIPO: ReactNode = "qualquer coisa que o React sabe desenhar"
//       (texto, número, tags, outros componentes, uma lista disso tudo).
// =============================================================================

import type { ReactNode } from 'react'

type CaixaProps = {
  titulo: string
  children: ReactNode
}

// A moldura: título + linha + o conteúdo que veio de fora
function Caixa({ titulo, children }: CaixaProps) {
  return (
    <div className="caixa">
      <strong>{titulo}</strong>
      <hr style={{ margin: '8px 0', border: 'none', borderTop: '1px solid #eee' }} />
      {/* Aqui o React coloca o que foi escrito entre <Caixa> e </Caixa> */}
      {children}
    </div>
  )
}

export function Aula03() {
  return (
    <section>
      <h2>Aula 3: children</h2>

      <h3>A mesma moldura, com conteúdos diferentes</h3>

      <Caixa titulo="Só um texto">
        <p>Um parágrafo simples.</p>
      </Caixa>

      <Caixa titulo="Uma lista">
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
        </ul>
      </Caixa>

      <Caixa titulo="Um formulário">
        <input type="text" placeholder="Digite algo" />
        <button className="btn">Enviar</button>
      </Caixa>

      {/* Dá para colocar uma Caixa dentro de outra */}
      <Caixa titulo="Caixa de fora">
        <Caixa titulo="Caixa de dentro">
          <p>Componentes se encaixam como peças de Lego.</p>
        </Caixa>
      </Caixa>

      <p className="dica">
        Repare no Caixa: ele não sabe e nem quer saber o que vem dentro. Só desenha a
        moldura e coloca o {'{children}'} no lugar certo. Na aula 7 isso vira um Modal.
      </p>
    </section>
  )
}

// =============================================================================
// EXERCÍCIOS
//   1. Acrescente a prop opcional "rodape?: string" no Caixa e mostre o rodapé
//      embaixo do children (só se vier).
//   2. Crie um componente Alerta({ children }) que mostra o conteúdo com a
//      classe "erro" do estilo.css. Use: <Alerta>Senha errada!</Alerta>
//   3. Observação: o style={{ ... }} do <hr> é estilo direto no elemento
//      (repare: chaves duplas = um objeto dentro das chaves do JSX, e os
//      nomes em camelCase: borderTop, não border-top). Funciona, mas no
//      projeto de verdade a regra é deixar tudo nos arquivos .css.
// =============================================================================
