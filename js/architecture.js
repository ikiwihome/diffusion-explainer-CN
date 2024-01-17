import { promptChanged, gsChanged, seedChanged, expandTextVectorGeneratorL2, expandLatentDenoiserL2, compareButtonClicked, drawUmap } from "./function.js"

document.addEventListener("mouseup", (e) => {
    if (window.promptDropdownExpanded) {
        window.promptDropdownExpanded = false;
        let dropdownBox = document.getElementById("prompt-selector-dropdown").getBoundingClientRect()
        let left = dropdownBox.x
        let right = dropdownBox.x + dropdownBox.width
        let top = dropdownBox.y
        let bottom = dropdownBox.y + dropdownBox.height
        if (e.clientX > left && e.clientX < right && e.clientY > top && e.clientY < bottom) { }
        else {
            d3.select("#prompt-selector-dropdown").style("display", "none");
            d3.select("#compare-button-container").style("z-index", "")
        }
    }
    else if (window.gsDropdownExpanded) {
        if (document.querySelector("#gs-dropdown-box:hover") != null) return
        if (document.querySelector("#gs-dropdown-desc:hover") != null) return

        window.gsDropdownExpanded = false;
        let dropdownBox = document.getElementById("gs-dropdown-options-container").getBoundingClientRect()
        let left = dropdownBox.x
        let right = dropdownBox.x + dropdownBox.width
        let top = dropdownBox.y
        let bottom = dropdownBox.y + dropdownBox.height
        let dropdownDescBox = document.getElementById("gs-dropdown-desc").getBoundingClientRect()
        let descleft = dropdownDescBox.x
        let descright = dropdownDescBox.x + dropdownDescBox.width
        let desctop = dropdownDescBox.y
        let descbottom = dropdownDescBox.y + dropdownDescBox.height
        if (e.clientX > left && e.clientX < right && e.clientY > top && e.clientY < bottom) { }
        else if (e.clientX > descleft && e.clientX < descright && e.clientY > desctop && e.clientY < descbottom) { }
        else {
            d3.select("#gs-dropdown-options-container").style("display", "none");
        }
    }
    else if (window.seedDropdownExpanded) {
        if (document.querySelector("#seed-dropdown-box:hover") != null) return
        if (document.querySelector("#seed-dropdown-desc:hover") != null) return

        window.seedDropdownExpanded = false;
        let dropdownBox = document.getElementById("seed-dropdown-options-container").getBoundingClientRect()
        let left = dropdownBox.x
        let right = dropdownBox.x + dropdownBox.width
        let top = dropdownBox.y
        let bottom = dropdownBox.y + dropdownBox.height
        let dropdownDescBox = document.getElementById("seed-dropdown-desc").getBoundingClientRect()
        let descleft = dropdownDescBox.x
        let descright = dropdownDescBox.x + dropdownDescBox.width
        let desctop = dropdownDescBox.y
        let descbottom = dropdownDescBox.y + dropdownDescBox.height
        if (e.clientX > left && e.clientX < right && e.clientY > top && e.clientY < bottom) { }
        else if (e.clientX > descleft && e.clientX < descright && e.clientY > desctop && e.clientY < descbottom) { }
        else {
            d3.select("#seed-dropdown-options-container").style("display", "none");
        }
    }
})

document.addEventListener("scroll", (e) => {
    if (innerHeight < 768) return
    let headerHeight = +(getComputedStyle(document.getElementById("header"))["height"].slice(0, -2))
    if (window.showVisualization) {
        d3.select("#architecture-container-hide-button-container").style("display", scrollY >= headerHeight ? "block" : "none").style("opacity", scrollY >= headerHeight ? "1" : "0")
        d3.select("#architecture-container-show-button-container").style("display", "none").style("opacity", "0")
    }
    else {
        d3.select("#architecture-container-hide-button-container").style("display", "none").style("opacity", "0")
        d3.select("#architecture-container-show-button-container").style("display", scrollY >= headerHeight ? "block" : "none").style("opacity", scrollY >= headerHeight ? "1" : "0")
    }
})

window.addEventListener("resize", (e) => {
    if (innerHeight < 768) {
        window.showVisualization = false
        d3.select("#main").style("top", "0").style("position", "relative")
        d3.select("#architecture-container-hide-button-container").style("display", "none")
        d3.select("#architecture-container-show-button-container").style("display", "none")

        d3.select("#description-subsec-image-representation-refining")
            .style("padding-top", "5px")
            .style("margin-top", "-5px")
        d3.select("#description-subsec-text-representation-generation")
            .style("padding-top", "5px")
            .style("margin-top", "-5px")
        d3.select("#description-subsec-image-upscaling")
            .style("padding-top", "5px")
            .style("margin-top", "-5px")
    }
    else {
        let headerHeight = +(getComputedStyle(document.getElementById("header"))["height"].slice(0, -2))
        if (d3.select("#main").style("position") == "relative") { window.showVisualization = true }

        d3.select("#main").style("position", "sticky")
        if (window.showVisualization) {
            d3.select("#main").style("top", "0")
            d3.select("#architecture-container-hide-button-container").style("display", scrollY >= headerHeight ? "block" : "none").style("opacity", scrollY >= headerHeight ? "1" : "0")
            d3.select("#architecture-container-show-button-container").style("display", "none").style("opacity", "0")

            let mainHeight = +(getComputedStyle(document.getElementById("main"))["height"].slice(0, -2))
            d3.select("#description-subsec-image-representation-refining")
                .style("padding-top", `${mainHeight + 1}px`)
                .style("margin-top", `${-mainHeight - 1}px`)
            d3.select("#description-subsec-text-representation-generation")
                .style("padding-top", `${mainHeight + 1}px`)
                .style("margin-top", `${-mainHeight - 1}px`)
            d3.select("#description-subsec-image-upscaling")
                .style("padding-top", `${mainHeight + 1}px`)
                .style("margin-top", `${-mainHeight - 1}px`)
        }
        else {
            d3.select("#architecture-container-show-button-container").style("display", scrollY >= headerHeight ? "block" : "none").style("opacity", scrollY >= headerHeight ? "1" : "0")
            d3.select("#architecture-container-hide-button-container").style("display", "none").style("opacity", "0")
        }
    }
})

let architectureLineWidth = 2;
let architectureTextLineColor = "#7fbc41"
let architectureImgLineColor = "#de77ae"
let architectureCompLineColor = "#92c5de"

window.textVectorGeneratorL2Expanded = false;
window.textVectorGeneratorL3Expanded = false;
window.latentDenoiserL2Expanded = false;
window.latentDenoiserL3Expanded = false;

d3.select("#architecture-container")
    .append("svg")
    .attr("height", 0)
    .attr("width", 0)
    .append("defs")
    .attr("id", "architecture-defs")
d3.select("#architecture-defs")
    .append("marker")
    .attr("id", "architecture-arrow-text-head")
    .attr("markerWidth", "10")
    .attr("markerHeight", "4")
    .attr("refX", "0")
    .attr("refY", "2")
    .attr("orient", "auto")
    .append("polygon")
    .attr("points", "0 0, 4 2, 0 4")
    .attr("fill", architectureTextLineColor)
d3.select("#architecture-defs")
    .append("marker")
    .attr("id", "architecture-arrow-img-head")
    .attr("markerWidth", "10")
    .attr("markerHeight", "4")
    .attr("refX", "0")
    .attr("refY", "2")
    .attr("orient", "auto")
    .append("polygon")
    .attr("points", "0 0, 4 2, 0 4")
    .attr("fill", architectureImgLineColor)
d3.select("#architecture-defs")
    .append("marker")
    .attr("id", "architecture-arrow-comp-head")
    .attr("markerWidth", "10")
    .attr("markerHeight", "4")
    .attr("refX", "0")
    .attr("refY", "2")
    .attr("orient", "auto")
    .append("polygon")
    .attr("points", "0 0, 4 2, 0 4")
    .attr("fill", architectureCompLineColor)

d3.select("#architecture-container")
    .append("div")
    .attr("id", "your-text-prompt")

d3.select("#your-text-prompt")
    .append("div")
    .attr("id", "prompt-selector-dropdown-container")
    .append("div")
    .attr("id", "prompt-selector-dropdown-box-container")
    .append("div")
    .attr("id", "prompt-selector-dropdown-box-text")
    .html(window.selectedPromptHtmlCode)
d3.select("#your-text-prompt")
    .append("div")
    .attr("id", "dropdown-button-container")
    .on("mouseover", () => {
        d3.select("#dropdown-button-container").style("color", "var(--gray)")
        d3.select("#dropdown-button-triangle").style("background-color", "var(--light)")
    })
    .on("mouseout", () => {
        d3.select("#dropdown-button-container").style("color", "var(--lightgray)")
        d3.select("#dropdown-button-triangle").style("background-color", "#d8d8d8")
    })
    .on("click", () => {
        if (window.promptDropdownExpanded) {
            window.promptDropdownExpanded = false;
            d3.select("#prompt-selector-dropdown").style("display", "none")
            d3.select("#compare-button-container").style("z-index", "")
        }
        else {
            window.promptDropdownExpanded = true
            d3.select("#prompt-selector-dropdown").style("display", "block")
            d3.select("#compare-button-container").style("z-index", "-1")
        }
    })

let h = +getComputedStyle(document.getElementById("prompt-selector-dropdown-container")).height.slice(0, -2)
d3.select("#your-text-prompt").style("top", `${38.5 - h / 2}px`)
d3.select("#compare-button-container").style("top", `${h - 3}px`)

d3.select("#prompt-selector-dropdown-box-container")
    .append("svg")
    .attr("id", "prompt-selector-dropdown-box-arrow-svg")
    .append("g")
    .attr("id", "prompt-selector-dropdown-box-arrow-g")
    .append("path")
    .attr("d", "M0 0 l 4.5 7 q 2 5 4 0 l 4.5 -7")
d3.select("#prompt-selector-dropdown-container")
    .append("div")
    .attr("id", "prompt-selector-dropdown")
    .selectAll("p")
    .data(window.prompts)
    .enter()
    .append("p")
    .attr("class", "prompt-selector-dropdown-options")
    .attr("id", (d, i) => `prompt-selector-dropdown-option-${i}`)
    .html((d, i) => window.promptsHtmlCode[i][0])
    .on("mouseover", function () {
        window.promptHovered = true;
        let groupIdx = +(this.id.split("-")[4])
        let p = d3.select(`#${this.id}`).text()
        let p2 = window.prompts[groupIdx][1]
        let pCode1 = window.promptsHtmlCode[groupIdx][0]
        let pCode2 = window.promptsHtmlCode[groupIdx][1]
        window.hoveredPrompt = p
        window.hoveredPrompt2 = p2
        d3.select("#improved-latent-img").attr("src", `./assets/latent_viz/${p}/${window.seed}_${window.gs}_${window.timestep}.jpg`)
        d3.select("#generated-image").attr("src", `./assets/img/${p}/${window.seed}_${window.gs}_${window.timestep}.jpg`)
        d3.select("#improved-latent-img-2").attr("src", `./assets/latent_viz/${p2}/${window.seed}_${window.gs}_${window.timestep}.jpg`)
        d3.select("#generated-image-2").attr("src", `./assets/img/${p2}/${window.seed}_${window.gs}_${window.timestep}.jpg`)
        drawUmap(p, p2)
    })
    .on("mouseout", () => {
        window.promptHovered = false;
        window.hoveredPrompt = "";
        d3.select("#improved-latent-img").attr("src", `./assets/latent_viz/${window.selectedPrompt}/${window.seed}_${window.gs}_${window.timestep}.jpg`)
        d3.select("#generated-image").attr("src", `./assets/img/${window.selectedPrompt}/${window.seed}_${window.gs}_${window.timestep}.jpg`)
        d3.select("#improved-latent-img-2").attr("src", `./assets/latent_viz/${window.selectedPrompt2}/${window.seed}_${window.gs}_${window.timestep}.jpg`)
        d3.select("#generated-image-2").attr("src", `./assets/img/${window.selectedPrompt2}/${window.seed}_${window.gs}_${window.timestep}.jpg`)
        drawUmap()
    })
    .on("click", promptChanged)
d3.select(`#prompt-selector-dropdown-option-${selectedPromptGroupIdx}`).style("display", "none")

d3.select("#your-text-prompt")
    .append("div")
    .attr("id", "prompt-keyword-popup-container")
    .text("点击查看如何修改该短语以改变生成的图像")
d3.selectAll("#prompt-selector-dropdown-box-container .prompt-keyword")
    .style("cursor", window.compare ? "" : "pointer")
    .style("font-weight", window.compare ? "700" : "700")
    .style("text-decoration", window.compare ? "none" : "underline")
    .on("mouseover", (e) => {
        if (window.compare) return
        d3.selectAll("#prompt-selector-dropdown-box-container .prompt-keyword").style("font-weight", "700")
        d3.select("#prompt-keyword-popup-container")
            .style("display", "block")
            .style("left", `${e.offsetX + 10}px`)
            .style("top", `${e.offsetY + 12}px`)
    })
    .on("mouseout", (e) => {
        if (window.compare) return
        d3.selectAll("#prompt-selector-dropdown-box-container .prompt-keyword").style("font-weight", "700")
        d3.select("#prompt-keyword-popup-container").style("display", "none")
    })
    .on("click", () => {
        if (window.compare) return
        d3.select("#prompt-keyword-popup-container").style("display", "none")
        compareButtonClicked();
    })

d3.select("#architecture-container")
    .append("div")
    .attr("id", "prompt-text-vector-generator-container")
    .attr("class", "architecture-component-container architecture-arrow-container")
    .append("svg")
    .attr("id", "prompt-text-vector-generator-svg")
    .append("g")
    .append("line")
    .attr("id", "prompt-text-vector-generator-arrow")
    .attr("class", "architecture-arrow-text")
    .attr("x1", "0")
    .attr("y1", "10")
    .attr("x2", "30")
    .attr("y2", "10")
    .attr("marker-end", "url(#architecture-arrow-text-head)")

d3.select("#architecture-container")
    .append("div")
    .attr("id", "text-vector-generator-container")
    .attr("class", "architecture-rectangle architecture-component-container denoise-latent-expand-move-to-left")
    .text("Text Representation Generator")
    .on("mouseover", (e) => {
        if (!window.compare && !window.textVectorGeneratorL2Expanded) d3.select("#text-vector-generator-container").style("background-color", "var(--text0)")
        else if (window.compare) {
            d3.select("#text-representation-generator-alert-window-container")
                .style("display", "block")
                .style("left", `${e.offsetX + 295}px`)
                .style("top", `${e.offsetY + 101}px`)
        }
    })
    .on("mouseout", () => {
        if (!window.compare) d3.select("#text-vector-generator-container").style("background-color", "var(--text00)")
        else { d3.select("#text-representation-generator-alert-window-container").style("display", "none") }
    })
    .on("click", () => {
        if (!window.compare) expandTextVectorGeneratorL2()
    })


d3.select("#architecture-container")
    .append("div")
    .attr("id", "text-vector-generator-latent-denoiser-container")
    .attr("class", "architecture-component-container architecture-arrow-container")
    .append("svg")
    .attr("id", "text-vector-generator-latent-denoiser-svg")
    .attr("class", "architecture-svg")
    .append("g")
    .append("path")
    .attr("id", "text-vector-generator-latent-denoiser-arrow")
    .attr("class", "architecture-arrow-text")
    // .attr("d", "M 0 10 L 30 10 C 42,10 55,10 67,10 L 95 10")
    .attr("d", "M 0 10 L 123 10")
    .attr("marker-end", "url(#architecture-arrow-text-head)")
d3.select("#text-vector-generator-latent-denoiser-container")
    .append("div")
    .attr("id", "text-vector-generator-latent-denoiser-text")
d3.select("#text-vector-generator-latent-denoiser-text")
    .append("div")
    .attr("id", "text-vector-generator-latent-denoiser-text-1")
    .append("div")
    .attr("id", "text-vector-generator-latent-denoiser-text-1-text")
    .text("Guidance scale")
d3.select("#text-vector-generator-latent-denoiser-text-1")
    .append("div")
    .attr("id", "gs-dropdown-container")
    .append("div")
    .attr("id", "gs-dropdown-deco")
d3.select("#gs-dropdown-container")
    .append("div")
    .attr("id", "gs-dropdown-box")
    .on("mouseover", () => {
        if (window.compare) {
            d3.select("#gs-dropdown-box").style("color", "#404040")
            d3.select("#gs-dropdown-box g").style("stroke", "#404040")
            d3.select("#gs-dropdown-deco").style("opacity", "0.9")
        }
        else {
            d3.select("#gs-dropdown-box").style("color", "var(--text4)")
            d3.select("#gs-dropdown-box g").style("stroke", "var(--text4)")
            d3.select("#gs-dropdown-deco").style("opacity", "0.9")
        }
    })
    .on("mouseout", () => {
        if (window.compare) {
            d3.select("#gs-dropdown-box").style("color", "#808080")
            d3.select("#gs-dropdown-box g").style("stroke", "#808080")
            d3.select("#gs-dropdown-deco").style("opacity", "0.5")
        }
        else {
            d3.select("#gs-dropdown-box").style("color", "var(--text3)")
            d3.select("#gs-dropdown-box g").style("stroke", "var(--text3)")
            d3.select("#gs-dropdown-deco").style("opacity", "0.5")
        }
    })
    .on("click", () => {
        if (window.gsDropdownExpanded) {
            window.gsDropdownExpanded = false;
            d3.select("#gs-dropdown-options-container").style("display", "none")
        }
        else {
            window.gsDropdownExpanded = true;
            d3.select("#gs-dropdown-options-container").style("display", "block")
        }
    })
    .append("div")
    .attr("id", "gs-dropdown-box-text")
    .text(Math.round(window.gs))

d3.select("#gs-dropdown-box")
    .append("svg")
    .attr("id", "gs-dropdown-arrow-svg")
    .append("g")
    .attr("id", "gs-dropdown-arrow-g")
    .append("path")
    .attr("d", "M2 3 l 4.5 5 l 4.5 -5")
d3.select("#gs-dropdown-container")
    .append("div")
    .attr("id", "gs-dropdown-options-container")
    .append("div")
    .attr("id", "gs-dropdown-desc")
d3.select("#gs-dropdown-desc")
    .append("div")
    .attr("id", "gs-dropdown-desc-1")
    .text("数值越高，")
d3.select("#gs-dropdown-desc")
    .append("div")
    .attr("id", "gs-dropdown-desc-2")
d3.select("#gs-dropdown-desc-2")
    .append("div")
    .attr("id", "gs-dropdown-desc-2-1")
    .text("图像")
d3.select("#gs-dropdown-desc-2")
    .append("div")
    .attr("id", "gs-dropdown-desc-2-2")
    .text("图像对")
d3.select("#gs-dropdown-desc-2")
    .append("div")
    .attr("id", "gs-dropdown-desc-2-3")
    .text("测试提示")
d3.select("#gs-dropdown-desc")
    .append("div")
    .attr("id", "gs-dropdown-desc-3")
    .text("的依从性越强，但可能会导致夸张")

d3.select("#gs-dropdown-options-container")
    .selectAll("p")
    .data([0, 1, 7, 20])
    .enter()
    .append("p")
    .attr("class", "gs-dropdown-options")
    .attr("id", d => `gs-dropdown-option-${d}`)
    .text(d => d)
    .on("mouseover", function () {
        window.gsHovered = true;
        window.hoveredGs = d3.select(`#${this.id}`).text() + ".0"
        d3.select("#improved-latent-img").attr("src", `./assets/latent_viz/${window.selectedPrompt}/${window.seed}_${window.hoveredGs}_${window.timestep}.jpg`)
        d3.select("#generated-image").attr("src", `./assets/img/${window.selectedPrompt}/${window.seed}_${window.hoveredGs}_${window.timestep}.jpg`)
        d3.select("#improved-latent-img-2").attr("src", `./assets/latent_viz/${window.selectedPrompt2}/${window.seed}_${window.hoveredGs}_${window.timestep}.jpg`)
        d3.select("#generated-image-2").attr("src", `./assets/img/${window.selectedPrompt2}/${window.seed}_${window.hoveredGs}_${window.timestep}.jpg`)
        drawUmap()
    })
    .on("mouseout", function () {
        window.gsHovered = false;
        window.hoveredGs = -1;
        d3.select("#improved-latent-img").attr("src", `./assets/latent_viz/${window.selectedPrompt}/${window.seed}_${window.gs}_${window.timestep}.jpg`)
        d3.select("#generated-image").attr("src", `./assets/img/${window.selectedPrompt}/${window.seed}_${window.gs}_${window.timestep}.jpg`)
        d3.select("#improved-latent-img-2").attr("src", `./assets/latent_viz/${window.selectedPrompt2}/${window.seed}_${window.gs}_${window.timestep}.jpg`)
        d3.select("#generated-image-2").attr("src", `./assets/img/${window.selectedPrompt2}/${window.seed}_${window.gs}_${window.timestep}.jpg`)
        drawUmap()
    })
    .on("click", gsChanged)
d3.select("#text-vector-generator-latent-denoiser-text")
    .append("div")
    .attr("id", "text-vector-generator-latent-denoiser-text-2")
// .text("for image generation")


// latent denoiser
d3.select("#architecture-container")
    .append("div")
    .attr("id", "latent-denoiser-container")
    .attr("class", "architecture-rectangle architecture-component-container denoise-latent-expand-move-to-left")
    .text("Image Representation Refiner")
    .on("mouseover", (e) => {
        if (!window.compare && !window.latentDenoiserL2Expanded) {
            d3.select("#latent-denoiser-container").style("background-color", "var(--img0)")
        }
        else if (window.compare) {
            d3.select("#text-representation-generator-alert-window-container")
                .style("display", "block")
                .style("left", `${e.offsetX + 555}px`)
                .style("top", `${e.offsetY + 10}px`)
        }
    })
    .on("mouseout", () => {
        if (!window.compare) d3.select("#latent-denoiser-container").style("background-color", "var(--img00)")
        else d3.select("#text-representation-generator-alert-window-container").style("display", "none")
    })
    .on("click", function (e) {
        if (!window.compare && !latentDenoiserL2Expanded) expandLatentDenoiserL2(e);
    })

// cycle
d3.select("#architecture-container")
    .append("div")
    .attr("id", "latent-denoiser-cycle-container")
    .attr("class", "architecture-component-container")
    .append("svg")
    .attr("id", "latent-denoiser-cycle-svg")
    .attr("class", "architecture-svg")
    .append("g")
    .append("path")
    .attr("id", "latent-denoiser-cycle")
    .attr("class", "architecture-dashed")
    .attr("stroke-width", architectureLineWidth)
    .attr("stroke", architectureImgLineColor)
    .attr("marker-end", "url(#architecture-arrow-img-head)")
    .attr("fill", "none")
    .attr("d", "M 230 10 l 43,0 l0 -53 a5,5 0 0 0 -5,-5 l-213,0 a5,5 0 0 0 -5,5 l0,34 a5,5 0 0 0 5,5 l20,0")
    .style("animation-name", "latent-denoiser-cycle-animation")
    .style("animation-play-state", "paused")

// improved latent
d3.select("#architecture-container")
    .append("div")
    .attr("id", "improved-latent-container")
    .attr("class", "architecture-component-container")
    .append("img")
    .attr("id", "improved-latent-img")
    .attr("src", `./assets/latent_viz/${window.selectedPrompt}/${window.seed}_${window.gs}_${timestep}.jpg`)
d3.select("#improved-latent-container")
    .append("div")
    .attr("id", "improved-latent-timestep")
    .text(window.timestep)
d3.select("#improved-latent-container")
    .append("div")
    .attr("id", "improved-latent-expl-container")
d3.select("#improved-latent-expl-container").append("div").attr("id", "denoise-latent-out-noise-expl-text-1").text("Refined")
d3.select("#improved-latent-expl-container").append("div").attr("id", "denoise-latent-out-noise-expl-text-2").text("Representation")

// Improved latent - Generated image arrow
d3.select("#architecture-container")
    .append("div")
    .attr("id", "improved-latent-generated-image-container")
    .attr("class", "architecture-component-container architecture-arrow-container")
    .append("svg")
    .attr("id", "improved-latent-generated-image-svg")
    .append("g")
    .append("line")
    .attr("id", "improved-latent-generated-image-arrow")
    .attr("x1", "0")
    .attr("y1", "10")
    .attr("x2", "48")
    .attr("y2", "10")
    .attr("marker-end", "url(#architecture-arrow-img-head)")
d3.select("#improved-latent-generated-image-container")
    .append("div")
    .attr("id", "improved-latent-generated-image-text")
    .text("Upscale")

// Generated image
d3.select("#architecture-container")
    .append("div")
    .attr("id", "generated-image-container")
    .attr("class", "architecture-component-container text-vector-generator-expand-move-to-right  denoise-latent-expand-move-to-right")
    .append("img")
    .attr("id", "generated-image")
    .attr("src", `./assets/img/${window.selectedPrompt}/${window.seed}_${window.gs}_${window.timestep}.jpg`)

// noise control container
d3.select("#architecture-container")
    .append("div")
    .attr("id", "timestep-0-random-noise-container")
d3.select("#timestep-0-random-noise-container")
    .append("svg")
    .attr("id", "timestep-0-random-noise-svg")
    .append("g")
    .append("path")
    .attr("id", "timestep-0-random-noise-line")
    .attr("d", "M0 5 a5,5 0 0 0 -5,-5 l-5 0")
    .attr("stroke-width", architectureLineWidth)
    .attr("stroke", architectureImgLineColor)
    .attr("fill", "none")
d3.select("#timestep-0-random-noise-container")
    .append("div")
    .attr("id", "timestep-0-random-noise-expl")
d3.select("#timestep-0-random-noise-expl")
    .append("div")
    .attr("id", "timestep-0-random-noise-expl-1-1")
    .text("Random noise")
    .on("mouseover", function () {
        // d3.select("#timestep-0-random-noise-expl-1-1").style("color", window.compare?"#67001f":"#8e0152")
    })
    .on("mouseout", function () {
        // d3.select("#timestep-0-random-noise-expl-1-1").style("color", window.compare?"#d6604d":"#c51b7d")
    })
    .on("click", function () {
        return
        if (window.seedControlDisplayed) {
            window.seedControlDisplayed = false;
            d3.select("#seed-control-container")
                .transition()
                .duration(500)
                .style("opacity", "0")
                .transition()
                .style("display", "none")
                .on("interrupt", function () {
                    d3.select(this).style("display", "block")
                })
            d3.select("#seed-control-container")
                .transition("left")
                .duration(1000)
                .style("left", `${437}px`)
        }
        else {
            window.seedControlDisplayed = true;
            d3.select("#seed-control-container")
                .transition()
                .style("display", "block")
                .transition()
                .duration(500)
                .style("opacity", "1")
            d3.select("#seed-control-container")
                .transition("left")
                .duration(1000)
                .style("left", `${437}px`)
        }
    })
d3.select("#timestep-0-random-noise-expl")
    .append("div")
    .attr("id", "timestep-0-random-noise-expl-2")
    .text("at timestep 0")

// Seed selector
d3.select("#architecture-container")
    .append("div")
    .attr("id", "seed-control-container")
    .attr("class", "hyperparameter")
d3.select("#seed-control-container")
    .append("div")
    .attr("id", "seed-control-text")
    .text("Seed")
d3.select("#seed-control-container")
    .append("div")
    .attr("id", "seed-control-dropdown-container")
    .attr("class", "custom-select hyperparameter-dropdown-container")
    .append("div")
    .attr("id", "seed-dropdown-deco")
d3.select("#seed-control-dropdown-container")
    .append("div")
    .attr("id", "seed-dropdown-box")
    .on("mouseover", () => {
        if (window.compare) {
            d3.select("#seed-dropdown-box").style("color", "#404040")
            d3.select("#seed-dropdown-box g").style("stroke", "#404040")
            d3.select("#seed-dropdown-deco").style("opacity", "0.9")
        }
        else {
            d3.select("#seed-dropdown-box").style("color", "#c51b7d")
            d3.select("#seed-dropdown-box g").style("stroke", "#c51b7d")
            d3.select("#seed-dropdown-deco").style("opacity", "0.9")
        }
    })
    .on("mouseout", () => {
        if (window.compare) {
            d3.select("#seed-dropdown-box").style("color", "#808080")
            d3.select("#seed-dropdown-box g").style("stroke", "#808080")
            d3.select("#seed-dropdown-deco").style("opacity", "0.5")
        }
        else {
            d3.select("#seed-dropdown-box").style("color", "#de77ae")
            d3.select("#seed-dropdown-box g").style("stroke", "#de77ae")
            d3.select("#seed-dropdown-deco").style("opacity", "0.5")
        }
    })
    .on("click", () => {
        if (window.seedDropdownExpanded) {
            window.seedDropdownExpanded = false;
            d3.select("#seed-dropdown-options-container").style("display", "none")
        }
        else {
            window.seedDropdownExpanded = true;
            d3.select("#seed-dropdown-options-container").style("display", "block")
        }
    })
    .append("div")
    .attr("id", "seed-dropdown-box-text")
    .text(window.seed)
d3.select("#seed-dropdown-box")
    .append("svg")
    .attr("id", "seed-dropdown-arrow-svg")
    .append("g")
    .attr("id", "seed-dropdown-arrow-g")
    .append("path")
    .attr("d", "M2 3 l 4.5 5 l 4.5 -5")
d3.select("#seed-control-dropdown-container")
    .append("div")
    .attr("id", "seed-dropdown-options-container")
    .append("div")
    .attr("id", "seed-dropdown-desc")
d3.select("#seed-dropdown-options-container")
    .selectAll("p")
    .data([1, 2, 3])
    .enter()
    .append("p")
    .attr("class", "seed-dropdown-options")
    .attr("id", d => `seed-dropdown-option-${d}`)
    .text(d => d)
    .on("mouseover", function () {
        window.seedHovered = true;
        window.hoveredSeed = d3.select(`#${this.id}`).text()
        d3.select("#improved-latent-img").attr("src", `./assets/latent_viz/${window.selectedPrompt}/${window.hoveredSeed}_${window.gs}_${window.timestep}.jpg`)
        d3.select("#generated-image").attr("src", `./assets/img/${window.selectedPrompt}/${window.hoveredSeed}_${window.gs}_${window.timestep}.jpg`)
        d3.select("#improved-latent-img-2").attr("src", `./assets/latent_viz/${window.selectedPrompt2}/${window.hoveredSeed}_${window.gs}_${window.timestep}.jpg`)
        d3.select("#generated-image-2").attr("src", `./assets/img/${window.selectedPrompt2}/${window.hoveredSeed}_${window.gs}_${window.timestep}.jpg`)
        drawUmap()
    })
    .on("mouseout", function () {
        window.seedHovered = false;
        window.hoveredSeed = -1;
        d3.select("#improved-latent-img").attr("src", `./assets/latent_viz/${window.selectedPrompt}/${window.seed}_${window.gs}_${window.timestep}.jpg`)
        d3.select("#generated-image").attr("src", `./assets/img/${window.selectedPrompt}/${window.seed}_${window.gs}_${window.timestep}.jpg`)
        d3.select("#improved-latent-img-2").attr("src", `./assets/latent_viz/${window.selectedPrompt2}/${window.seed}_${window.gs}_${window.timestep}.jpg`)
        d3.select("#generated-image-2").attr("src", `./assets/img/${window.selectedPrompt2}/${window.seed}_${window.gs}_${window.timestep}.jpg`)
        drawUmap()
    })
    .on("click", seedChanged)



// Hide button
let animationDuration = 500;
d3.select("#architecture-container-hide-button-container")
    .style("display", () => {
        // TODO: display "block" if scrolled and shown, "none" if not
        if (innerHeight < 768) return "none"
        let headerHeight = +(getComputedStyle(document.getElementById("header"))["height"].slice(0, -2))
        return scrollY >= headerHeight ? "block" : "none"
    })
    .on("mouseover", () => { d3.select("#architecture-container-hide-button-container").style("background-color", "#e0e0e0") })
    .on("mouseout", () => { d3.select("#architecture-container-hide-button-container").style("background-color", "#f0f0f0") })
    .on("click", () => {
        d3.select("#architecture-container-hide-button-container").style("background-color", "#f0f0f0")
        let mainHeight = +getComputedStyle(document.getElementById("main"))["height"].slice(0, -2)
        d3.select("#main")
            .transition()
            .duration(animationDuration)
            .style("top", `-${mainHeight}px`)
        d3.select("#architecture-container-show-button-container")
            .transition()
            .style("display", "block")
            .transition()
            .duration(animationDuration)
            .style("opacity", `1`)
        d3.select("#architecture-container-hide-button-container")
            .transition()
            .duration(animationDuration)
            .style("opacity", `0`)
            .transition()
            .style("display", "none")
        d3.select("#description-subsec-text-representation-generation")
            .style("padding-top", "5px")
            .style("margin-top", "-5px")
        d3.select("#description-subsec-image-representation-refining")
            .style("padding-top", "5px")
            .style("margin-top", "-5px")
        d3.select("#description-subsec-image-upscaling")
            .style("padding-top", "5px")
            .style("margin-top", "-5px")
        window.showVisualization = false;
    })
    .append("svg")
    .style("width", "30px")
    .style("height", "15px")
    .attr("id", "architecture-container-hide-button-container-svg")
    .append("g")
    .attr("id", "architecture-container-hide-button-container-svg-g")
d3.select("#architecture-container-hide-button-container-svg-g")
    .append("line")
    .attr("x1", "15")
    .attr("y1", "0")
    .attr("x2", "0")
    .attr("y2", "15")
d3.select("#architecture-container-hide-button-container-svg-g")
    .append("line")
    .attr("x1", "15")
    .attr("y1", "0")
    .attr("x2", "30")
    .attr("y2", "15")


d3.select("#architecture-container-show-button-container")
    .style("display", () => {
        if (innerHeight < 768) return "none"
        if (window.showVisualization) return "none"
        let headerHeight = +(getComputedStyle(document.getElementById("header"))["height"].slice(0, -2))
        if (scrollY >= headerHeight) return "block"
        else return "none"
        // TODO: display "display" if scrolled and not shown under sticky setting, "none" if not
    })
    .on("mouseover", () => { d3.select("#architecture-container-show-button-container").style("background-color", "#eaeaea") })
    .on("mouseout", () => { d3.select("#architecture-container-show-button-container").style("background-color", "var(--white)") })
    .on("click", () => {
        d3.select("#architecture-container-show-button-container").style("background-color", "var(--white)")
        let mainHeight = +getComputedStyle(document.getElementById("main"))["height"].slice(0, -2)
        d3.select("#main")
            .transition()
            .duration(animationDuration)
            .style("top", `0px`)
        d3.select("#architecture-container-show-button-container")
            .transition()
            .duration(animationDuration)
            .style("opacity", `0`)
            .transition()
            .style("display", "none")
        d3.select("#architecture-container-hide-button-container")
            .transition()
            .style("display", "block")
            .transition()
            .duration(animationDuration)
            .style("opacity", `1`)
        d3.select("#description-subsec-text-representation-generation")
            .style("padding-top", `${mainHeight + 20}px`)
            .style("margin-top", `-${mainHeight + 20}px`)
        d3.select("#description-subsec-image-representation-refining")
            .style("padding-top", `${mainHeight + 20}px`)
            .style("margin-top", `-${mainHeight + 20}px`)
        d3.select("#description-subsec-image-upscaling")
            .style("padding-top", `${mainHeight + 20}px`)
            .style("margin-top", `-${mainHeight + 20}px`)
        window.showVisualization = true;
    })
    .append("svg")
    .style("width", "30px")
    .style("height", "15px")
    .attr("id", "architecture-container-show-button-container-svg")
    .append("g")
    .attr("id", "architecture-container-show-button-container-svg-g")

d3.select("#architecture-container-show-button-container-svg-g")
    .append("line")
    .attr("x1", "0")
    .attr("y1", "0")
    .attr("x2", "15")
    .attr("y2", "15")
d3.select("#architecture-container-show-button-container-svg-g")
    .append("line")
    .attr("x1", "30")
    .attr("y1", "0")
    .attr("x2", "15")
    .attr("y2", "15")