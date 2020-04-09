const { ApolloServer, gql } = require('apollo-server')
const { DimoApi } = require('./lib/')
const { getProducts, getBrands } = require('./queries')

const typeDefs = gql`

  enum ProductType {
    PRODUCT
    SERVICE
    PLATE
  }

  type Product {
    id: ID
    name: String
    description: String
    type: ProductType
    outstanding: Boolean
    quantity: Int
    imageData: Image
    brand: Brand
  }

  type Image {
    original: ImageWithUrl
    thumb: ImageWithUrl
  }

  type ImageWithUrl {
    url: String
  }

  type SocialMedia {
    facebook: String
    instagram: String
    general: String
  }

  type ShippingType {
    name: String
    price: Int
  }

  type MenuItem {
    id: Int
    name: String
    order: Int
    banner: ImageWithUrl
    product: ID
  }

  type Brand {
    id: ID
    name: String
    logo: Image
    description: String
    slogan: String
    city: String
    country: String
    region: String
    score: Int
    slug: String
    customInstance: Boolean
    principalColor: String
    secondaryColor: String
    tertiaryColor: String
    principalImage: Image
    secondaryImage: Image
    promotionalBanner: Image
    navbarLogo: Image
    socialMedia: SocialMedia
    shippingTypes: [ShippingType]
    isFavorite: Boolean
    isRestaurant: Boolean
    visible: Boolean
    menu: [MenuItem]
    emailContac: String
    tags: [String]
    locations: [Location]
  }

  type Location {
    id: ID
    latitude: Float
    longitude: Float
    name: String
    description: String
    address: String
    city: String
    country: String
    region: String
    neighboorhood: String
    telephones: [String]
    cellphones: [String]
    principalEmail: String
    otherEmails: [String]
    locationType: String
    visible: Boolean
    brandId: ID
    webpage: String
  }

  # input Pagination {
  #   page: Int = 1
  # }

  type Query {
    products (page: Int = 1): [Product]
    brands (page: Int = 1): [Brand]
  }
`
const resolvers = {
  ProductType: {
    PRODUCT: 'PRODUCT',
    SERVICE: 'SERVICE',
    PLATE: 'RESTAURANT'
  },
  Query: {
    products: getProducts,
    brands: getBrands
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