import { removeChildNode } from './index.js';

export default class Router {
  routes: object;
  constructor(routes: object) {
    if (!routes) {
      alert('Can not initialize routes, need routes!');
      return;
    }
    this.routes = routes;
    this.bindEvents();
  }
  init(rootElementId: string) {
    this.rootElement = document.querySelector(rootElementId);
    this.routing(location.pathname);
  }
  bindEvents() {
    window.addEventListener('click', e => {
      e.preventDefault();
      if (e.target.closest('a')) {
        this.routePush(e.target.closest('a').href);
      }
    });
    window.onpopstate = () => this.routing(location.pathname);
  }
  routePush(origin: string) {
    window.history.pushState({}, null, origin);
    this.routing(location.pathname);
  }
  routing(pathname: string) {
    let page = '';
    if (this.routes[pathname]) {
      page = new this.routes[pathname]();
    } else {
      const [_, num] = pathname;
      if (typeof +num === 'number') {
        page = new this.routes['/:id'](parseInt(num));
      }
    }
    if (page) {
      this.render(page);
    }
  }
  async render(page) {
    removeChildNode(this.rootElement);
    this.rootElement.append(await page.render());
  }
}
