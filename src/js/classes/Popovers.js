export default class Popovers {
  constructor(parentElement, title = '', text = '') {
    this.parentElement = parentElement;
    this.title = title;
    this.text = text;
    this.elementPopup = document.createElement('div');
  }

  get htmlElement() {
    return `
        <p class="title-popup">${this.title}</p>
        <p class="text-popup">${this.text}</p>
        `;
  }

  bindToDOM() {
    this.elementPopup.id = 'popup';
    this.elementPopup.className = 'popup hidden';
    this.elementPopup.innerHTML = this.htmlElement;
    this.parentElement.append(this.elementPopup);
  }

  popupPosition(element) {
    const popup = document.querySelector('#popup');
    popup.classList.remove('hidden');
    popup.style.bottom = `${element.offsetTop + 10}px`;
    popup.style.left = `${element.offsetLeft - ((popup.offsetWidth - element.offsetWidth) / 2)}px`;
  }
}
