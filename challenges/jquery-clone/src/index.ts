import fetch from "node-fetch";

class SelectorResult {
  #element: NodeListOf<Element>
  constructor(elements: NodeListOf<Element>) {
    this.#element = elements
  }

  html(content: string) {
    this.#element.forEach(element => {
      element.innerHTML = content
    })
  }

  show() {
    this.#element.forEach(element => {
      (element as HTMLElement).style.visibility = 'visible'
    })
  }

  on<K extends keyof ElementEventMap>(type: K, callback: (event: ElementEventMap[K]) => void) {
    this.#element.forEach(element => {
      element.addEventListener(type, callback)
    })
  }

  hide() {
    this.#element.forEach(element => {
      (element as HTMLElement).style.visibility = 'hidden'
    })
  }
}

function $(selector: string) {
  return new  SelectorResult(document.querySelectorAll(selector))
}

namespace $ {
  export function ajax({ url, success }: { url: string, success: (data: any) => void}): any {
    fetch(url)
      .then(response => response.json())
      .then(success)
  }
}

export default $;

// const hiddenBox = $("#banner-message")
// $("#button-container button").on("click", (event) => {
//   hiddenBox.show()
// })