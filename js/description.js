d3.select("#description")
    .append("div")
    .attr("id", "description-top-button-container")
    .on("click", function () {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    })
d3.select("#description-top-button-container")
    .append("img")
    .attr("src", "icons/top.svg")
    .attr("id", "description-top-button-img")
d3.select("#description-top-button-container")
    .append("div")
    .attr("id", "description-top-button-text")
    .text("top")
d3.select("#description")
    .append("div")
    .attr("id", "description-section-what")
    .attr("class", "description-sec")
    .append("h1")
    .text("什么是 Stable Diffusion?")
d3.select("#description-section-what")
    .append("p")
    .html(`Stable Diffusion是一种文生图模型，可将文本提示转换为高分辨率图像。 例如，如果您输入“a cute and adorable bunny（一只可爱的兔子）”，Stable Diffusion会在几秒钟内生成准确描绘这只可爱的兔子的高分辨率图像！ 这个强大的工具提供了一种快速、简单的方法来可视化您的想法。`)

// How does Stable Diffusion work?
d3.select("#description")
    .append("div")
    .attr("id", "description-section-how-work")
    .attr("class", "description-sec")
    .append("h1")
    .text("Stable Diffusion 如何工作?")
d3.select("#description-section-how-work")
    .append("p")
    .text('Stable Diffusion 首先生成描述文本一致的图像特征向量表示。然后将该图像表示放大为高分辨率图像。')
d3.select("#description-section-how-work")
    .append("p")
    .html('您可能想知道为什么Stable Diffusion引入图像表示，而不是直接生成高分辨率图像。原因主要是计算成本和效率。对于大部分图像表示相关的计算，以压缩后图像来表示，可以显著降低计算成本，同时也能够保持较高的图像质量。')
d3.select("#description-section-how-work")
    .append("p")
    .html('图像表示从随机噪声(random noise)开始，经过多个时间步(timesteps)的细化，最终达到文本提示的图像表示。时间步数(timesteps)是在细化之前确定的一个超参数(hyperparameter)，timesteps是一般设置为50。')
d3.select("#description-section-how-work")
    .append("p")
    .html('Stable Diffusion 的图像生成过程分为三个主要步骤：')
    .append("ol")
    .attr("id", "description-generation-main-steps-ol")
d3.select("#description-generation-main-steps-ol")
    .append("li")
    .html('<a style="font-weight: 500" href="#description-subsec-text-representation-generation">文本表示生成 Text Representation Generation</a>: Stable Diffusion 将文本提示转换为特征向量表示以指导图像生成。')
d3.select("#description-generation-main-steps-ol")
    .append("li")
    .html('<a style="font-weight: 500" href="#description-subsec-image-representation-refining">图像表征细化 Image Representation Refining</a>: 从随机噪声开始，Stable Diffusion在文本表示的指导下一点一点地细化图像表示。')
d3.select("#description-generation-main-steps-ol")
    .append("li")
    .html('<a style="font-weight: 500" href="#description-subsec-image-upscaling">图像放大 Image Upscaling</a>: Stable Diffusion将图像表示放大为高分辨率图像。')
d3.select("#description-section-how-work")
    .append("p")
    .text("现在，让我们来仔细研究一下每个流程。")

// Text Representation Generation
d3.select("#description-section-how-work")
    .append("div")
    .attr("id", "description-subsec-text-representation-generation")
    .attr("class", "description-subsec")
    .append("h2")
    .text("文本表示生成 Text Representation Generation")
d3.select("#description-subsec-text-representation-generation")
    .append("p")
    .text("文本表征生成包括标记化(tokenizing)和文本编码(text encoding)。")
// Tokenizing
d3.select("#description-subsec-text-representation-generation")
    .append("div")
    .attr("id", "description-subsubsec-tokenizing")
    .attr("class", "description-subsubsec")
d3.select("#description-subsubsec-tokenizing")
    .append("div")
    .attr("class", "description-subsubsec-title")
    .html('1. 标记化 Tokenizing')
d3.select("#description-subsubsec-tokenizing")
    .append("p")
    .html("标记化(Tokenizing)是处理文本输入的常用方法，把文本输入处理为能够被神经网络处理的标准格式。")
d3.select("#description-subsubsec-tokenizing")
    .append("div")
    .attr("class", "description-paragraph")
    .attr("id", "description-subsubsec-tokenizing-token-example-paragraph")
d3.select("#description-subsubsec-tokenizing-token-example-paragraph")
    .append("span")
    .html(`Stable Diffusion Stable Diffusion 将文本提示标记化为一系列标记符(tokens)。 
    例如，它将文字提示 `)
d3.select("#description-subsubsec-tokenizing-token-example-paragraph")
    .append("span")
    .style("color", "var(--text3)")
    .text("a cute and adorable bunny ")
d3.select("#description-subsubsec-tokenizing-token-example-paragraph")
    .append("span")
    .text("分割为")
d3.select("#description-subsubsec-tokenizing-token-example-paragraph")
    .append("span")
    .attr("class", "text-vector-generator-token description-token")
    .text("a")
d3.select("#description-subsubsec-tokenizing-token-example-paragraph")
    .append("span")
    .text(", ")
d3.select("#description-subsubsec-tokenizing-token-example-paragraph")
    .append("span")
    .attr("class", "text-vector-generator-token description-token")
    .text("cute")
d3.select("#description-subsubsec-tokenizing-token-example-paragraph")
    .append("span")
    .text(", ")
d3.select("#description-subsubsec-tokenizing-token-example-paragraph")
    .append("span")
    .attr("class", "text-vector-generator-token description-token")
    .text("and")
d3.select("#description-subsubsec-tokenizing-token-example-paragraph")
    .append("span")
    .text(", ")
d3.select("#description-subsubsec-tokenizing-token-example-paragraph")
    .append("span")
    .attr("class", "text-vector-generator-token description-token")
    .text("adorable")
d3.select("#description-subsubsec-tokenizing-token-example-paragraph")
    .append("span")
    .text(" 和 ")
d3.select("#description-subsubsec-tokenizing-token-example-paragraph")
    .append("span")
    .attr("class", "text-vector-generator-token description-token")
    .text("bunny")
d3.select("#description-subsubsec-tokenizing-token-example-paragraph")
    .append("span")
    .text("四个标记符(tokens)。 此外，为了标记提示符的开始和结束, Stable Diffusion 会在提示符的 ")
d3.select("#description-subsubsec-tokenizing-token-example-paragraph")
    .append("span")
    .attr("class", "text-vector-generator-token description-token")
    .text("<start>")
d3.select("#description-subsubsec-tokenizing-token-example-paragraph")
    .append("span")
    .text(" 和 ")
d3.select("#description-subsubsec-tokenizing-token-example-paragraph")
    .append("span")
    .attr("class", "text-vector-generator-token description-token")
    .text("<end>")
d3.select("#description-subsubsec-tokenizing-token-example-paragraph")
    .append("span")
    .text(" 处添加 和 标记符。上例中的标记序列为 ")
d3.select("#description-subsubsec-tokenizing-token-example-paragraph")
    .append("span")
    .attr("class", "text-vector-generator-token description-token")
    .text("<start>")
d3.select("#description-subsubsec-tokenizing-token-example-paragraph")
    .append("span")
    .text(", ")
d3.select("#description-subsubsec-tokenizing-token-example-paragraph")
    .append("span")
    .attr("class", "text-vector-generator-token description-token")
    .text("a")
d3.select("#description-subsubsec-tokenizing-token-example-paragraph")
    .append("span")
    .text(", ")
d3.select("#description-subsubsec-tokenizing-token-example-paragraph")
    .append("span")
    .attr("class", "text-vector-generator-token description-token")
    .text("cute")
d3.select("#description-subsubsec-tokenizing-token-example-paragraph")
    .append("span")
    .text(", ")
d3.select("#description-subsubsec-tokenizing-token-example-paragraph")
    .append("span")
    .attr("class", "text-vector-generator-token description-token")
    .text("and")
d3.select("#description-subsubsec-tokenizing-token-example-paragraph")
    .append("span")
    .text(", ")
d3.select("#description-subsubsec-tokenizing-token-example-paragraph")
    .append("span")
    .attr("class", "text-vector-generator-token description-token")
    .text("adorable")
d3.select("#description-subsubsec-tokenizing-token-example-paragraph")
    .append("span")
    .text(", ")
d3.select("#description-subsubsec-tokenizing-token-example-paragraph")
    .append("span")
    .attr("class", "text-vector-generator-token description-token")
    .text("bunny")
d3.select("#description-subsubsec-tokenizing-token-example-paragraph")
    .append("span")
    .text(", and ")
d3.select("#description-subsubsec-tokenizing-token-example-paragraph")
    .append("span")
    .attr("class", "text-vector-generator-token description-token")
    .text("<end>")
d3.select("#description-subsubsec-tokenizing-token-example-paragraph")
    .append("span")
    .text("。")

d3.select("#description-subsubsec-tokenizing")
    .append("p")
    .html('为确保所有标记序列具有相同长度，以便于计算，Stable Diffusion 会将标记序列填充或截断到正好 77 个标记。如果输入提示符少于 77 个，则在序列末尾添加 <span class="text-vector-generator-token description-token" id="description-token-end"></span> 符号，直到达到 77 个为止。如果输入提示符多于 77 个，则保留最后 77 个，其余的被截断。标记符数量的设置是为了兼顾性能和计算效率。')
d3.select("#description-token-end").text("<end>")
// Text encoding
d3.select("#description-subsec-text-representation-generation")
    .append("div")
    .attr("id", "description-subsubsec-text-encoding")
    .attr("class", "description-subsubsec")
d3.select("#description-subsubsec-text-encoding")
    .append("div")
    .attr("class", "description-subsubsec-title")
    .html('2. 文本编码 Text encoding')
d3.select("#description-subsubsec-text-encoding")
    .append("p")
    .html(`Stable Diffusion 将标记序列中的每个标记转换为包含图像相关信息的文本表示。这是通过使用名为 CLIP 的神经网络文本编码器完成的。`)
d3.select("#description-subsubsec-text-encoding")
    .append("p")
    .html("CLIP 由图像编码器(Image Encoder)和文本编码器(Image Encoder)组成，它们将图像及其文本描述编码成彼此接近的图像和文本表示形式。因此，CLIP 文本编码器计算出的文本提示的文本表示很可能包含文本提示中描述的图像信息。")

// Image Representation Refining
d3.select("#description-section-how-work")
    .append("div")
    .attr("id", "description-subsec-image-representation-refining")
    .attr("class", "description-subsec")
    .append("h2")
    .text("图像表征细化 Image Representation Refining")
d3.select("#description-subsec-image-representation-refining")
    .append("img")
    .attr("class", "description-gif")
    .attr("id", "image-refining-description-gif")
    .attr("src", "assets/gif/imagerefine.gif")
d3.select("#description-subsec-image-representation-refining")
    .append("p")
    .text("Stable Diffusion 通过在多个时间步骤中对随机初始化的噪点进行细化，生成符合文本提示的图像表示。每个细化步骤都包括预测(Predicting)和去除噪点(Removing Noise)，以逐步提高图像表示的质量。")
// Noise Prediction
d3.select("#description-subsec-image-representation-refining")
    .append("div")
    .attr("id", "description-subsubsec-noise-prediction")
    .attr("class", "description-subsubsec")
d3.select("#description-subsubsec-noise-prediction")
    .append("div")
    .attr("class", "description-subsubsec-title")
    .html('1. 噪点预测 Noise Prediction')
d3.select("#description-subsubsec-noise-prediction")
    .append("p")
    .html("在每个时间步(Timestep)，神经网络 UNet 都会预测当前时间步图像表征中的噪点。UNet 接收三个输入：")
d3.select("#description-subsubsec-noise-prediction")
    .append("ol")
    .attr("id", "description-unet-input-ol")
d3.select("#description-unet-input-ol")
    .append("li")
    .html(`当前时间步的<span style="font-weight: 500;">图像表示</span>`)
d3.select("#description-unet-input-ol")
    .append("li")
    .html(`文本提示的<span style="font-weight: 500; color: var(--text3);">文字表述(Text Representation)</span> ，用于指导应从当前图像表述中去除哪些噪声，以生成符合文本提示的图像`)
d3.select("#description-unet-input-ol")
    .append("li")
    .html(`<span style="font-weight: 500;">时间步长 Timestep</span>，以矢量形式编码，用于表示当前图像表示中剩余的噪声数量`)

d3.select("#description-subsubsec-noise-prediction")
    .append("p")
    .html(`换句话说，UNet 在文本提示的表示和时间步的指导下，预测当前图像表示中的提示条件噪声。`)
d3.select("#description-subsubsec-noise-prediction")
    .append("p")
    .html(`不过，即使我们以文本提示作为噪声预测的条件，生成的图像表征也可能与文本提示不够紧密。 
        为了提高预测噪声与文本提示的粘合度，
        Stable Diffusion 还额外预测了 <span style="color: #a0a0a0;">以空提示（" "）为条件的一般噪声(generic noise)</span>。
        最终的噪声预测结果是预测的 
        <span style="color: #a0a0a0;">一般噪声(generic noise)</span> 和
        <span style="color: var(--text3);">以提示为条件的噪声(prompt-conditioned noise)</span>
        的加权和，其权重由超参数的<span style="font-weight: 500;">引导标度(Guidance Scale)</span>控制：`)
d3.select("#description-subsubsec-noise-prediction")
    .append("p")
    .attr("class", "description-equation")
    .attr("id", "description-equation-gs")
d3.select("#description-equation-gs")
    .append("span")
    .attr("class", "description-equation-term")
    .style("background-color", "#a0a0a020")
    .text("guidance scale")
d3.select("#description-equation-gs")
    .append("span")
    .attr("class", "description-equation-op")
    .text(" x ")
d3.select("#description-equation-gs")
    .append("span")
    .style("background-color", "#a0a0a020")
    .style("color", "var(--text3)")
    .attr("class", "description-equation-term")
    .text("prompt-conditioned noise")
d3.select("#description-equation-gs")
    .append("span")
    .attr("class", "description-equation-op")
    .text(" + ")
d3.select("#description-equation-gs")
    .append("span")
    .attr("class", "description-equation-op")
    .text("(1 - ")
d3.select("#description-equation-gs")
    .append("span")
    .attr("class", "description-equation-term")
    .style("background-color", "#a0a0a020")
    .text("guidance scale")
d3.select("#description-equation-gs")
    .append("span")
    .attr("class", "description-equation-op")
    .text(") x ")
d3.select("#description-equation-gs")
    .append("span")
    .attr("class", "description-equation-term")
    .style("background-color", "#a0a0a020")
    .style("color", "#909090")
    .text("generic noise")
d3.select("#description-subsubsec-noise-prediction")
    .append("p")
    .html(`guidance scale是一个超参数，为0是表示文本提示不起作用，即均为通用噪声，1表示只有条件噪声。具体效果可以在最上方的动图里设置参数后查看。`)
// Noise Removal
d3.select("#description-subsec-image-representation-refining")
    .append("div")
    .attr("id", "description-subsubsec-noise-removal")
    .attr("class", "description-subsubsec")
d3.select("#description-subsubsec-noise-removal")
    .append("div")
    .attr("class", "description-subsubsec-title")
    .html('2. 噪声去除 Noise Removal')
d3.select("#description-subsubsec-noise-removal")
    .append("p")
    .html("Stable Diffusion 会根据 调度程序(scheduler) 决定从图像中实际去除多少预测噪声。逐步去除少量噪声有助于逐步完善图像并生成更清晰的图像。")
d3.select("#description-subsubsec-noise-removal")
    .append("p")
    .html("默认情况下，调度程序会根据时间步的总数(timesteps)做出这一决定。然后，从当前时间步(current timestep)的图像表示中减去降维噪声，得到细化表示，成为下一个时间步(next timestep)的图像表示：")
d3.select("#description-subsubsec-noise-removal")
    .append("p")
    .attr("class", "description-equation")
    .attr("id", "description-equation-denoise")
d3.select("#description-equation-denoise")
    .append("span")
    .attr("class", "description-equation-term")
    .style("background-color", "#a0a0a020")
    .html(`image representation of timestep <span style="font-style: italic;">t+1</span>`)
d3.select("#description-equation-denoise")
    .append("span")
    .attr("class", "description-equation-op")
    .html(` = `)
d3.select("#description-equation-denoise")
    .append("span")
    .attr("class", "description-equation-term")
    .style("background-color", "#a0a0a020")
    .html(`image representation of timestep <span style="font-style: italic;">t</span>`)
d3.select("#description-equation-denoise")
    .append("span")
    .attr("class", "description-equation-op")
    .html(` - `)
d3.select("#description-equation-denoise")
    .append("span")
    .attr("class", "description-equation-term")
    .style("background-color", "#a0a0a020")
    .html(`downscaled noise`)

// Image Upscaling
d3.select("#description-section-how-work")
    .append("div")
    .attr("id", "description-subsec-image-upscaling")
    .attr("class", "description-subsec")
    .append("h2")
    .text("图像放大 Image Upscaling")
d3.select("#description-subsec-image-upscaling")
    .append("img")
    .attr("class", "description-gif")
    .attr("src", "assets/gif/upscale.gif")
d3.select("#description-subsec-image-upscaling")
    .append("p")
    .text("完成所有去噪步骤后，稳定扩散会使用一个名为解码器（Decoder）的神经网络将图像表示提升为高分辨率图像。在文本表征的指导下，细化后的图像表征已完全去噪，生成的高分辨率图像应与文本提示紧密贴合。")

// What can we change
d3.select("#description")
    .append("div")
    .attr("id", "description-section-change")
    .attr("class", "description-sec")
    .append("h1")
    .text("使用方法")
d3.select("#description-section-change")
    .append("p")
    .text("您可以控制本页最上方的文本提示和超参数，更改生成的图像：")
d3.select("#description-section-change")
    .append("ul")
    .attr("id", "description-hyperparameter-ol")
d3.select("#description-hyperparameter-ol")
    .append("li")
    .html(`文本提示 Text prompt：描述要生成的图像。更详细的文本提示通常能生成质量更好的图像，本页中需要使用英文，不支持中文。`)
d3.select("#description-hyperparameter-ol")
    .append("li")
    .html(`种子 Seeds：用于在时间步骤 0 初始化图像表示的随机种子。更改种子将导致在时间步 0 处出现不同的图像表示法，从而产生不同的图像。`)
d3.select("#description-hyperparameter-ol")
    .append("li")
    .html(`指导尺度 生成的图像与文本提示的贴合程度。增大引导刻度会使生成的图像更贴近文字提示，但可能会使生成的图像过于夸张。`)
d3.select("#description-section-change")
    .append("p")
    .text("此外，本页的示例中不支持其他超参数调节，如时间步总数、图像大小和调度器类型。")