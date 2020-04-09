const { ApolloServer, gql } = require('apollo-server')
const { DimoApi } = require('./lib/')
const { getProducts } = require('./queries')

const typeDefs = gql`

  enum ProductType {
    PRODUCT
    SERVICE
    PLATE
  }

  type Product {
    name: String!
    description: String
    type: ProductType
    outstanding: Boolean
    quantity: Int,
    imageData: Image
  }

  type Image {
    original: ImageWithUrl
    thumb: ImageWithUrl
  }

  type ImageWithUrl {
    url: String
  }

  type Query {
    products (page: Int = 1): [Product]
  }
`
const resolvers = {
  ProductType: {
    PRODUCT: 'PRODUCT',
    SERVICE: 'SERVICE',
    PLATE: 'RESTAURANT'
  },
  Query: {
    products: getProducts
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      dimoApi: new DimoApi()
    }
  },
  tracing: true,
  playground: true,
  tracing: true
})

server.listen()
.then(({ url }) => {
  console.log(`server running at ${url}`)
})
.catch (e => {
  console.log(`error starting server ${e.message}`)
})