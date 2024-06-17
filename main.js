class List extends HTMLElement{
    constructor(){
        super();

        let shadow = this.attachShadow({mode:'open'})

        this.divHeader = document.createElement('div')
        this.divContent = document.createElement("div")

        shadow.appendChild(this.divHeader)
        shadow.appendChild(this.divContent)
    }

    connectedCallback(){ 
        this.divHeader.innerHTML = this.getAttribute("data-title") || ""
        
        let url = this.getAttribute("data-url")
        let field = this.getAttribute("data-field")

        if (!url || !field){
            return
        }

        const isPicture = this.hasAttribute("modePicture")

        fetch(url)
        .then(response => response.json())
        .then(users => users.forEach(element => {
            this.divContent.innerHTML += isPicture ? `<img src='${element[field]}'>` : `<div>${element[field]}</div>` 
        }));
    }
}

customElements.define("app-list",List)