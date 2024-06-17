class List extends HTMLElement {
    constructor() {
        super();

        let shadow = this.attachShadow({ mode: 'open' })

        this.divHeader = document.createElement('div')
        shadow.appendChild(this.divHeader)

        this.divContent = document.createElement("div")
        shadow.appendChild(this.divContent)
    }

    async connectedCallback() {
        this.divHeader.innerHTML = this.getAttribute("data-title") || ""

        let url = this.getAttribute("data-url")
        let field = this.getAttribute("data-field")

        if (!url || !field) {
            return
        }

        const isPicture = this.hasAttribute("modePicture")

        const response = await fetch(url)
        const elements = await response.json()

        for (let element of elements) {
            this.divContent.innerHTML += isPicture ? `<img src='${element[field]}'>` : `<div>- ${element[field]}</div>`
        }
    }
}

customElements.define("app-list", List)