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
        color,
        colorRef,
        opacity,
        opacityRef,
        inset,
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
        this.color = color
        this.colorRef = colorRef
        this.opacity = opacity
        this.opacityRef = opacityRef
        this.inset = inset
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
        this.colorRef.value = this.color.value
        this.opacityRef.value = this.opacity.value

        this.applyRule()
        this.showRule()
    }

    applyRule() {
        const rgbValue = this.hexToRgb(this.colorRef.value);

        // transformando de hexadecimal para rgb e fazendo aparecer na caixa de texto
        const shadowRule = `${this.insetRef ? "inset" : ""} ${this.horizontalRef.value}px ${this.verticalRef.value}px ${this.blurRef.value}px ${this.spreadRef.value}px rgba(${rgbValue},${this.opacityRef.value})`;

        // se muda diretamente a propriedade de css de box shadow da caixa de preview
        this.previewBox.style.boxShadow = shadowRule;

        // exibe a regra na generated rule section
        this.currentRule = shadowRule;
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
                break
            case "color":
                this.colorRef.value = value;
                break
            case "opacity":
                this.opacityRef.value = value;
                break
            case "inset":
                this.insetRef = value;
                break
        }

        this.applyRule();
        this.showRule();
    }

    // funcao para alterar a cor de hexadecimal para rgb
    hexToRgb(hex) {
        // Remove o # se existir
        hex = hex.replace('#', '');
        
        // Converte para RGB
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        
        return `${r}, ${g}, ${b}`;
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
//novos recursos
const color = document.querySelector("#color");
const colorRef = document.querySelector("#color-value");
const opacity = document.querySelector("#opacity");
const opacityRef = document.querySelector("#opacity-value");
const inset = document.querySelector("#inset");

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
        color,
        colorRef,
        opacity,
        opacityRef,
        inset, 
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

color.addEventListener("input", (e) => {
    boxShadow.updateValue("color", e.target.value)
})

opacity.addEventListener("input", (e) => {
    boxShadow.updateValue("opacity", e.target.value)
})

inset.addEventListener("input", (e) => {
    boxShadow.updateValue("inset", e.target.checked)
})

//copiar regra
const rulesArea = document.querySelector("#rules-area");
const copyInstructions = document.querySelector("#copy-instructions");

rulesArea.addEventListener("click", () => {
    const rules = rulesArea.innerText.replace(/^\s*\n/gm, "");

    navigator.clipboard.writeText(rules).then(() => {
        copyInstructions.innerText = "Regra copiada com sucesso!";

        setTimeout(() => {
            copyInstructions.innerText = "Clique no quadro acima para copiar as regras"
        }, 2000);
    })
})