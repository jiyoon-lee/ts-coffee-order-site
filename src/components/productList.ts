import { Request } from '../utils/index.js';
interface Product {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
}
export default class ProductList {
  renderElement: Element;
  constructor() {
    this.renderElement = ProductList.createRenderElement();
  }
  static createRenderElement() {
    const renderElement = document.createElement('div');
    renderElement.classList.add('ProductListPage');
    return renderElement;
  }
  async render() {
    const products = await Request('/src/assets/productsList.json');
    const $title = document.createElement('h1');
    $title.textContent = '상품목록';

    const $list = document.createElement('ul');
    $list.innerHTML = `
      ${products
        .map((product: Product) => {
          return `
            <li class="Product">
                <a href="/${product.id}">
                    <img src="${product.imageUrl}">
                    <div class="Product__info">
                    <div>${product.name}</div>
                    <div>${product.price}</div>
                    </div>
                </a>
            </li>
        `;
        })
        .join('')}
    `;
    this.renderElement.append($title, $list);
    return this.renderElement;
  }
}
