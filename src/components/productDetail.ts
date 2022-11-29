import {
  Request,
  numberWithCommas,
  findIndexListElement,
  getClosestElement,
} from '../utils/index.js';

interface Option {
  id: number;
  name: string;
  productName?: string;
  price: number;
  stock: number;
  created_at: string;
  updated_at: string;
  quantity?: number;
}

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  productOptions: Option[];
}

export default class ProductDetail {
  productId: number;
  renderElement: Element;
  selectedOptions: Option[];
  product: Product;
  constructor(productId: number) {
    if (!productId) {
      alert('Can not initialize productId, need productId!');
      return;
    }
    this.productId = productId;
    this.selectedOptions = [];
    this.renderElement = ProductDetail.createRenderElement();
    this.bindEvents();
  }
  static createRenderElement() {
    const renderElement = document.createElement('div');
    renderElement.classList.add('ProductDetailPage');
    return renderElement;
  }
  saveStorage() {
    try {
      const products_cart = this.selectedOptions.map((item: Option) => ({
        imageUrl: this.product.imageUrl,
        productName: this.product.name,
        price: this.product.price + item.price,
        totalPrice: (this.product.price + item.price) * item.quantity,
        optionName: item.name,
        quantity: item.quantity,
      }));
      localStorage.setItem('products_cart', JSON.stringify(products_cart));
    } catch (e) {
      console.error(e);
    }
  }
  bindEvents() {
    this.renderElement.addEventListener('click', (e: MouseEvent) => {
      if ((e.currentTarget as HTMLElement).tagName === 'BUTTON') {
        this.saveStorage();
        location.href = '/cart';
      }
    });
    this.renderElement.addEventListener('input', e => {
      if ((e.target as HTMLElement).tagName === 'SELECT') {
        const { productOptions } = this.product;
        // 이미 선택된 상품인지 아닌지 확인한다.
        const isPossibleSelect = this.selectedOptions.find(
          item => item.id === Number((e.target as HTMLInputElement).value)
        );
        if (!isPossibleSelect) {
          const targetOption = productOptions.find(
            item => item.id === Number((e.target as HTMLInputElement).value)
          );
          targetOption.quantity = 1;
          this.selectedOptions.push(targetOption);

          const $selectedList = document.querySelector('ul');
          const $listItem = document.createElement('li');
          $selectedList.appendChild($listItem);

          let optionsText = `${this.product.name} ${targetOption.name}`;
          optionsText +=
            targetOption.price > 0
              ? `${numberWithCommas(this.product.price + targetOption.price)}원`
              : `${numberWithCommas(this.product.price)}원`;
          $listItem.textContent = optionsText;
          $selectedList.appendChild($listItem);

          const $inputWrapper = document.createElement('div');
          const $inputElement = document.createElement('input');
          $inputWrapper.appendChild($inputElement);
          $listItem.appendChild($inputWrapper);

          $inputElement.setAttribute('type', 'number');
          $inputElement.setAttribute('min', '1');
          $inputElement.setAttribute('max', targetOption.stock.toString());
          $inputElement.setAttribute('value', '1');
        }
      }
      if ((e.target as HTMLElement).tagName === 'INPUT') {
        if (Number((e.target as HTMLInputElement).value) > 0) {
          const element = getClosestElement(e.target as HTMLElement, 'li');
          const index = findIndexListElement(element);
          const productList = this.renderElement.querySelectorAll('li');
          const replaceElement = document.createElement('div');
          const targetOption = this.selectedOptions[index];
          this.selectedOptions[index].quantity = Number(
            (e.target as HTMLInputElement).value
          );
          replaceElement.textContent = `${this.product.name} ${
            targetOption.name
          } ${numberWithCommas(
            (targetOption.price + this.product.price) *
              Number((e.target as HTMLInputElement).value)
          )}원`;
          productList[index].replaceChild(
            replaceElement,
            productList[index].childNodes[0]
          );
        }
      }
      this.calcTotalPrice();
    });
  }
  calcTotalPrice() {
    const $totalPrice = document.querySelector('.ProductDetail__totalPrice');
    let total = 0;
    this.selectedOptions.forEach(item => {
      total += (this.product.price + item.price) * (item.quantity || 1);
    });
    $totalPrice.textContent = `${numberWithCommas(total)}원`;
  }
  optionToString(productName: string, productOption: Option) {
    let result = ``;
    result +=
      productOption.stock === 0
        ? `<option value=${productOption.id} disabled> (품절) ${productName} ${productOption.name}`
        : `<option value=${productOption.id}>${productName} ${productOption.name}`;
    result +=
      productOption.price > 0
        ? ` (+${numberWithCommas(productOption.price)})`
        : '';
    result += `</option>`;
    return result;
  }
  async render() {
    this.product = await Request(
      `/src/assets/products/item${this.productId}.json`
    );
    const { imageUrl, name, price, productOptions } = this.product;
    const $title = document.createElement('h1');
    $title.textContent = `${name} 상품 정보`;
    const $detail = document.createElement('div');
    $detail.classList.add('ProductDetail');
    this.renderElement.append($title, $detail);

    $detail.innerHTML = `
      <img src="${imageUrl}">
      <div class="ProductDetail__info">
        <h2>${name}</h2>
        <div class="ProductDetail__price">${numberWithCommas(price)}원</div>
        <select>
          <option>선택하세요.</option>
          ${productOptions.map(
            (productOption: Option) =>
              `${this.optionToString(name, productOption)}`
          )}
        </select>
        <div class="ProductDetail__selectedOptions">
          <h3>선택된 상품</h3>
          <ul></ul>
          <div class="ProductDetail__totalPrice">0원</div>
          <button class="OrderButton">주문하기</button>
        </div>
      </div>
    `;
    return this.renderElement;
  }
}
