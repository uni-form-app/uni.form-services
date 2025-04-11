# uni.form
Este repositório contém os serviços do aplicativo uni.form, um sistema de venda de uniformes escolares com foco em sustentabilidade e economia colaborativa. A plataforma funciona como um marketplace, permitindo que usuários anunciem, vendam ou doem uniformes escolares. Para facilitar a logística, contamos com parceiros locais (como escolas e papelarias) que atuam como pontos de entrega e retirada dos produtos.

## Funcionalidades

- Autenticação de usuários.
- Criação e gerenciamento de anúncios de produtos.
- Cadastro e gestão de parceiros (pontos de retirada).
- Perfis de usuários com nome, localização (bairro/região) e histórico de compras e vendas.
- Sistema de avaliação e reputação dos usuários.
- Seleção de pontos de retirada por geolocalização.
- Integração com sistema de pagamento para controle de comissões.

## Regras de negócio
- Só usuários autenticados podem anunciar, comprar ou doar.
- Todas as transações tem uma taxa de 5% sobre o valor total.
- Vendas entre usuários devem obrigatoriamente passar pela plataforma para garantir rastreabilidade e segurança.
- Compradores têm até 3 dias úteis após a entrega para confirmar o recebimento. Após esse prazo, a transação é concluída automaticamente.
- Apenas parceiros autorizados podem ser pontos de retirada.
- Cada pedido deve ser vinculado a um ponto de retirada.
- O vendedor deve levar o produto até o ponto de retirada
- As imagens de produtos devem ser analisadas pela IA para avaliar a qualidade e adequação do produto.

## Tecnologias

## Models
User
├── id (PK)
├── username
├── email (unique)
├── password
├── addressId (FK -> Address.id)
├── createdAt
├── listings [1:N] ──────────────┐
├── orders (compras) [1:N]       │
├── sales  (vendas) [1:N]        │
├── ratingsGiven [1:N]           │
└── ratingsReceived [1:N]        │
                                 │
Address                          │
├── id (PK)                      │
├── street, number, zipCode...  │
├── latitude, longitude          │◄─────── Permite busca geográfica por parceiro
├── user [1:1 optional]          │
└── partner [1:1 optional]       │
                                 │
Partner                          │
├── id (PK)                      │
├── name                         │
├── addressId (FK -> Address.id) │
├── createdAt                    │
└── orders [1:N]                 │

Product
├── id (PK)
├── name, description, size, school
├── condition (enum: NEW, USED, etc.)
├── createdAt
└── listing [1:1 optional]

Listing
├── id (PK)
├── productId (FK -> Product.id, unique)
├── sellerId (FK -> User.id)
├── price
├── status (enum: ACTIVE, SOLD, etc.)
├── createdAt
├── images [1:N] ────────────────┐
└── orders [1:N]                 │

Image                            │
├── id (PK)                      │
├── path                         │
├── listingId (FK -> Listing.id) │
├── isMain (bool)                │◄────── Define a imagem de cover

Order
├── id (PK)
├── listingId (FK)
├── buyerId (FK -> User)
├── sellerId (FK -> User)
├── partnerId (FK -> Partner)
├── status (string: pendente, concluído, etc.)
├── createdAt
├── deliveredAt (optional)
└── confirmedAt (optional)

Rating
├── id (PK)
├── fromUserId (FK -> User)
├── toUserId (FK -> User)
├── score (1–5)
├── comment
└── createdAt
