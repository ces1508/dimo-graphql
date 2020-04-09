const getProducts = async (parent, args, context, info) => {
  try {
    const response = await context.dataSources.dimoApi.getProducts(args.page)
    let products = response.filter(i => i.type === 'products')
    products = products.map(product => ({
      id: product.id,
      type: product.attributes['product-type'].toUpperCase(),
      imageData: product.attributes['image-data'],
      ...product.attributes
    }))
    return products
  } catch (e) {
    return new Error(e)
  }
}

module.exports = {
  getProducts
}
