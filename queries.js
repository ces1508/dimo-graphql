const getProducts = async (parent, args, context, info) => {
  try {
    const response = await context.dataSources.dimoApi.getProducts(args.page)
    let products = response.filter(i => i.type === 'products')
    products = products.map(product => ({
      id: product.id,
      type: product.attributes['product-type'].toUpperCase(),
      imageData: product.attributes['image-data'],
      brand: {
        ...parseBrand(product.attributes.brand)
      },
      ...product.attributes
    }))
    return products
  } catch (e) {
    return new Error(e)
  }
}

const getBrands = async (parent, args, context, inf) => {
  let brands = await context.dataSources.dimoApi.getBrands(args.page)
  brands = brands.map(brand => parseBrand({
    id: brand.id,
    ...brand.attributes
  }))
  console.log(brands[0].location)
  return brands
}

function parseBrand (brand) {
  let menu = brand['brand-menus'] || brand.brand_menus
  return {
    id: brand.id,
    name: brand.name,
    description: brand.description,
    slogan: brand.slogan,
    logo:  brand.logo,
    city: brand.city,
    country: brand.country,
    visible: brand.visible,
    score: brand['reviews-score'] || brand.reviews_score,
    favoritesCount: brand['favorites-count'] || brand.favorites_count,
    customInstance: brand['custom-intance'] || brand.custom_instance,
    principalColor: brand['principal-color'] || brand.principal_color,
    secondaryColor: brand['secondary-color'] || brand.secondary_color,
    tertiaryColor: brand['tertiary-color'] || brand.tertiary_color,
    principalImage: brand['principal-image'] || brand.principal_image,
    secondaryImage: brand['secondary-image'] || brand.secondary_image,
    promotionalBanner: brand['promotional-banner'] || brand.promotional_banner,
    navbarLogo: brand['navbar-logo'] || brand.navbar_logo,
    socialMedia: brand['social-media'] || brand.social_media,
    slug: brand.slug,
    tags: brand.tags,
    shippingTypes: brand['shipping-type'] || brand.shipping_type,
    menu: menu.map(menu => parseMenu(menu)),
    locations: brand.locations.map(location => parseLocation(location))
  }
}

const parseMenu = menu => ({
  id: menu.id,
  name: menu['custom-name'] || menu.custom_name,
  order: menu.order,
  banner: menu['banner-img'] || menu.banner_img,
  product: menu['banner-product-id'] || menu.banner_product_id
})

const parseLocation = location => ({
  id: location.id,
  latitude: location.latitude,
  longitude: location.longitude,
  name: location.name,
  description: location.description,
  address: location.address,
  city: location.city.city,
  region: location.region,
  country: location.country,
  neighboorhood: location.neighboorhood,
  telephones: location.telephones,
  cellphones: location.cellphones,
  principalEmail: location['prinicipal-email'] || location.principal_email,
  otherEmails: location['other-emails'] || location.other_emails,
  type: location['location-type'] || location.location_type,
  webpage: location.webpage,
  visible: location.visible
})

module.exports = {
  getProducts,
  getBrands
}
