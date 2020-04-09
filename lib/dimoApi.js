const { RESTDataSource } = require('apollo-datasource-rest')

class DimoApi extends RESTDataSource {
  constructor () {
    super()
    this.baseURL = 'https://staging.dimo.app/api'
  }

  async getProducts (page = 1) {
    let response = await  this.get('/app/products/find_all', {
      page
    })
    response = JSON.parse(response)
    return response.data
  }
}

module.exports = DimoApi
