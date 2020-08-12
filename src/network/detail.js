import {request} from "./request"

export function GetDetail(iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}
export class Goods {
  constructor(itemInfo, columns, services)
  {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.price = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.discountDesc = itemInfo.discountDesc
    this.lowNowPrice = itemInfo.lowNowPrice
    this.columns = columns
    this.services = services
  }
}

export class Shop {
  constructor(shopInfo)
  {
    this.logo = shopInfo.shopLogo
    this.sells = shopInfo.cSells
    this.score = shopInfo.score
    this.name = shopInfo.name
    this.goodsCount = shopInfo.cGoods
    this.cFans = shopInfo.cFans
  }
}

export class GoodsParam {
  constructor(info, rule) {
    // 注: images可能没有值(某些商品有值, 某些没有值)
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}

export function GetRconmmend() {
  return request ({
    url: '/recommend'
  })
}