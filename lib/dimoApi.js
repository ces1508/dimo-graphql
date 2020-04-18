const { RESTDataSource } = require('apollo-datasource-rest')

class DimoApi extends RESTDataSource {
  constructor () {
    super()
    this.baseURL = 'https://dimo.app/api'
  }

  async getProducts (page = 1) {
    let response = await this.get('/app/products/find_all', {
      page
    })
    response = JSON.parse(response)
    return response.data
  }

  async getBrands (page = 1) {
    try {
      const response = await this.get('/app/brands', { page })
      return  JSON.parse(response).data
    } catch (e) {
      return new Error(e)
    }
  }

  async getHomePlates () {
    try {
      const response = await this.get('/app/products/new_products')
      return  JSON.parse(response).data
    } catch (e) {
      throw new Error(e)
    }
  }

  async getHomeProducts () {
    try {
      const response = await this.get('/app/products/random_products')
      return  JSON.parse(response).data
    } catch (e) {
      return new Error(e)
    }
  }
}

module.exports = DimoApi
