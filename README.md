  # uni.form
  Este repositório contém os serviços do aplicativo uni.form, um sistema de venda de uniformes escolares com foco em sustentabilidade e economia colaborativa. A plataforma funciona como um marketplace, permitindo que usuários anunciem, vendam ou doem uniformes escolares. Para facilitar a logística, contamos com parceiros locais (como escolas e papelarias) que atuam como pontos de entrega e retirada dos produtos.

  ## Regras de negócio
  - Só usuários autenticados podem anunciar, comprar ou doar.
  - Todas as transações tem uma taxa de 5% sobre o valor total.
  - Vendas entre usuários devem obrigatoriamente passar pela plataforma para garantir rastreabilidade e segurança.
  - Compradores têm até 3 dias úteis após a entrega para confirmar o recebimento. Após esse prazo, a transação é concluída automaticamente.
  - Apenas parceiros autorizados podem ser pontos de retirada.
  - Cada pedido deve ser vinculado a um ponto de retirada.
  - O vendedor deve levar o produto até o ponto de retirada
  - As imagens de produtos devem ser analisadas pela IA para avaliar a qualidade e adequação do produto.

  ## Funcionalidades

  ### Usuários
  - **Autenticação de usuários**:
    - Login e registro de usuários.
    - Apenas usuários autenticados podem anunciar, comprar ou doar.

  ### Produtos
  - **Criação de anúncios de produtos**:
    - Campos necessários: `nome`, `descrição`, `preço`, `imagens`, `categoria`.
    - As imagens de produtos são analisadas por IA para avaliar a qualidade e adequação.
  - **Atualização de anúncios de produtos**:
    - Campos atualizáveis: `nome`, `descrição`, `preço`, `imagens`, `categoria`.
  - **Gerenciamento de anúncios**:
    - Listagem, edição e exclusão de anúncios.

  ### Pedidos
  - **Criação de pedidos**:
    - Campos necessários: `produtoId`, `quantidade`, `pontoDeRetiradaId`.
    - Cada pedido deve ser vinculado a um ponto de retirada.
  - **Consulta de pedidos**:
    - Listagem de pedidos vinculados ao usuário autenticado.
  - **Confirmação de entrega**:
    - Compradores têm até 3 dias úteis após a entrega para confirmar o recebimento. Após esse prazo, a transação é concluída automaticamente.

  ### Parceiros (Pontos de Retirada)
  - **Cadastro de parceiros**:
    - Campos necessários: `nome`, `endereço`, `latitude`, `longitude`, `cidade`.
    - Apenas parceiros autorizados podem ser pontos de retirada.
  - **Atualização de parceiros**:
    - Campos atualizáveis: `nome`, `endereço`, `latitude`, `longitude`, `cidade`.
  - **Seleção de pontos de retirada por geolocalização**:
    - Filtragem de parceiros com base em `latitude`, `longitude` e `raio`.

  ### Pagamentos
  - **Processamento de pagamentos**:
    - Mockup: pagamentos são sempre aceitos após um tempo configurado.
  - **Histórico de pagamentos**:
    - Registro de todas as transações realizadas.
  - **Gestão de saldo do usuário**:
    - Criação e atualização do saldo do usuário.
    - Desconto de uma taxa de 5% sobre o valor total da transação (configurável).

  ### Regras de Negócio
  - Todas as transações têm uma taxa de 5% sobre o valor total.
  - Vendas entre usuários devem obrigatoriamente passar pela plataforma para garantir rastreabilidade e segurança.
  - O vendedor deve levar o produto até o ponto de retirada.