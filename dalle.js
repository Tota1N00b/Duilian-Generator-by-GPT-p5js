// let imgPrompt =
//     "Design a sophisticated background with a smooth red gradient from deep burgundy to soft crimson, adorned with subtle gold flecks for a luxurious feel. Include faint traditional Chinese motifs like red lanterns, golden koi fish, fluffy auspicious clouds, shiny gold sycee, intricate Chinese knot, splum blossoms, or bamboo on the edges to frame the Duilian. The design should be elegant, with the gradient and gold specks creating a festive yet understated backdrop that complements the text without overshadowing it.";
let imgPrompt =
    "Create an image of a refined and sophisticated background that subtly blends the luxurious warmth of red gradient hues with the traditional elegance of Chinese artistic motifs. Begin with a gradient that transitions smoothly from a deep, rich burgundy at the top to a softer, warm crimson at the bottom. Throughout this gradient, scatter a dusting of small, shimmering gold flecks and traditional Chinese Motifs for the Chinese New Year, suggesting a touch of opulence and a celebratory ambiance.";

async function fetchImage() {
    apiKey = apiKeyInput.value();
    let imageData = await generateDalleImage();
    bkg = loadImage("data:image/png;base64," + imageData);
}

//Due to the CORS, p5.js cannot use loadImage to access the url for the image from the DALL-E API. Therefore,response formate is set as Base64 data.
async function generateDalleImage() {
    console.log("Generating background image...");

    try {
        let response = await fetch(
            "https://api.openai.com/v1/images/generations",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${apiKey}`,
                },
                body: JSON.stringify({
                    prompt: `${imgPrompt}`,
                    n: 1,
                    size: "256x256",
                    response_format: "b64_json",
                }),
            }
        );

        let responseData = await response.json();
        console.log(responseData);
        console.log(responseData.data[0]);
        console.log(responseData.data[0].b64_json);
        return responseData.data[0].b64_json;
    } catch (error) {
        console.error("Error:", error);
    }
}
