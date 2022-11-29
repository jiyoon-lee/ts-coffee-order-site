import { numberWithCommas } from '../utils/index.js';
interface Product {
  imageUrl: string;
  productName: string;
  price: number;
  totalPrice: number;
  optionName: string;
  quantity: number;
}
export default class Cart {
  totalPrice: 0;
  renderElement: Element;
  cartItems: Product[];
  constructor() {
    this.totalPrice = 0;
    this.renderElement = Cart.createRenderElement();
    this.bindEvents();
    this.loadStorage();
  }
  static createRenderElement() {
    const renderElement = document.createElement('div');
    renderElement.classList.add('CartPage');
    return renderElement;
  }
  loadStorage() {
    const data = localStorage.getItem('products_cart');
    try {
      this.cartItems = JSON.parse(data);
      if (Array.isArray(this.cartItems) && this.cartItems.length > 0) {
        this.cartItems.forEach(element => {
          this.totalPrice += element.totalPrice;
        });
      } else {
        alert('장바구니가 비어있습니다.');
        location.href = '/';
      }
    } catch (e) {
      console.error(e);
    }
  }
  bindEvents() {
    this.renderElement.addEventListener('click', e => {
      if ((e.target as HTMLElement).tagName === 'BUTTON') {
        alert('주문되었습니다');
        localStorage.removeItem('products_cart');
        location.href = '/';
      }
    });
  }
  render() {
    this.renderElement.innerHTML = `
      <h1>장바구니</h1>
      <div class="Cart">
          <ul>
            ${this.cartItems
              .map(item => {
                return `
                <li class="Cart__item">
                  <img src="${item.imageUrl}">
                  <div class="Cart__itemDesription">
                    <div>${item.productName} ${
                  item.optionName
                } ${numberWithCommas(item.price)}원 ${item.quantity}개</div>
                    <div>${numberWithCommas(item.totalPrice)}원</div>
                  </div>
                </li>
              `;
              })
              .join('')}
          </ul>
          <div class="Cart__totalPrice">
              총 상품가격 ${numberWithCommas(this.totalPrice)}원
          </div>
          <button class="OrderButton">주문하기</button>
      </div>
    `;
    return this.renderElement;
  }
}
