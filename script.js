class BoxShadowGenerator {

    constructor(
        // argumentos que se recebe de cada instancia
        horizontal, 
        horizontalRef, 
        vertical, 
        verticalRef, 
        blur, 
        blurRef, 
        spread, 
        spreadRef, 
        previewBox, 
        rule, 
        webkitRule, 
        mozRule
    ) {
        // escolhe o que fazer com esses valores
        this.horizontal = horizontal   
        this.horizontalRef = horizontalRef
        this.vertical = vertical
        this.verticalRef = verticalRef 
        this.blur = blur
        this.blurRef = blurRef
        this.spread = spread
        this.spreadRef = spreadRef
        this.previewBox = previewBox
        this.rule = rule
        this.webkitRule = webkitRule 
        this.mozRule = mozRule
    }

    initialize() {
        this.horizontalRef.value = this.horizontal.value
        this.verticalRef.value = this.vertical.value
        this.spreadRef.value = this.spread.value
        this.blurRef.value = this.blur.value

        this.applyRule()
        this.showRule()
    }

    applyRule() {
        // se muda diretamente a propriedade de css de box shadow da caixa de preview
        this.previewBox.style.boxShadow = `${this.horizontalRef.value}px ${this.verticalRef.value}px ${this.blurRef.value}px ${this.spreadRef.value}px #000000`;

        // exibe a regra na generated rule section
        this.currentRule = this.previewBox.style.boxShadow;
    }

    showRule() {
        this.rule.innerText = this.currentRule;
        this.webkitRule.innerText = this.currentRule;
        this.mozRule.innerText = this.currentRule;
    }

    // altera o valor da caixa de texto
    updateValue(type, value) {
        switch(type) {
            case "horizontal":
                this.horizontalRef.value = value;
                // nao esquecer de botar os breaks pra ele nao ir vazando as regras
                break
            case "vertical":
                this.verticalRef.value = value;
                break
            case "blur":
                this.blurRef.value = value;
                break
            case "spread":
                this.spreadRef.value = value;
        }

        this.applyRule();
        this.showRule();
    }
}

// selecao de elementos
const horizontal = document.querySelector("#horizontal");
const horizontalRef = document.querySelector("#horizontal-value");
const vertical = document.querySelector("#vertical");
const verticalRef = document.querySelector("#vertical-value");
const blur = document.querySelector("#blur")
const blurRef = document.querySelector("#blur-value");
const spread = document.querySelector("#spread");
const spreadRef = document.querySelector("#spread-value");

const previewBox = document.querySelector("#box");

const rule = document.querySelector("#rule span");
const webkitRule = document.querySelector("#webkit-rule span");
const mozRule = document.querySelector("#moz-rule span");

const boxShadow = new BoxShadowGenerator(
    horizontal, 
        horizontalRef, 
        vertical, 
        verticalRef, 
        blur, 
        blurRef, 
        spread, 
        spreadRef, 
        previewBox, 
        rule, 
        webkitRule, 
        mozRule
);

boxShadow.initialize();

// eventos
// input dispara a cada alteracao do valor (precisa atualizar nos cases)
horizontal.addEventListener("input", (e) => {
    boxShadow.updateValue("horizontal", e.target.value)
})

vertical.addEventListener("input", (e) => {
    boxShadow.updateValue("vertical", e.target.value)
})

blur.addEventListener("input", (e) => {
    boxShadow.updateValue("blur", e.target.value)
})

spread.addEventListener("input", (e) => {
    boxShadow.updateValue("spread", e.target.value)
})