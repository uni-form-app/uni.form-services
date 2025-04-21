# uni.form
Este repositório contém os serviços do aplicativo uni.form, um sistema de venda de uniformes escolares com foco em sustentabilidade e economia colaborativa. A plataforma funciona como um marketplace, permitindo que usuários anunciem, vendam ou doem uniformes escolares. Para facilitar a logística, contamos com parceiros locais (como escolas e papelarias) que atuam como pontos de entrega e retirada dos produtos.

## Tecnologias
- **TypeScript**
- **Node.js**
- **Express**
- **Prisma**
- **PostgreSQL**
- **Docker**

## Funcionalidades

- [X] Autenticação de usuários.
- [X] Criação e gerenciamento de anúncios de produtos.
- [X] Cadastro e gestão de parceiros (pontos de retirada).
- [] Seleção de pontos de retirada por geolocalização.
- [X] Integração com sistema de pagamento para controle de comissões.
  - [] Implementação de taxa de 5% sobre
## Regras de negócio
- Só usuários autenticados podem anunciar, comprar ou doar.
- Todas as transações tem uma taxa de 5% sobre o valor total.
- Vendas entre usuários devem obrigatoriamente passar pela plataforma para garantir rastreabilidade e segurança.
- Compradores têm até 3 dias úteis após a entrega para confirmar o recebimento. Após esse prazo, a transação é concluída automaticamente.
- Apenas parceiros autorizados podem ser pontos de retirada.
- Cada pedido deve ser vinculado a um ponto de retirada.
- O vendedor deve levar o produto até o ponto de retirada
- As imagens de produtos devem ser analisadas pela IA para avaliar a qualidade e adequação do produto.