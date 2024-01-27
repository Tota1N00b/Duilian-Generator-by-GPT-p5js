//  Define the image prompt for the DALL-E API, detailing the specific artistic requirements for the background image, including color gradients and traditional motifs.
let imgPrompt =
    "Create an image of a refined and sophisticated background that subtly blends the luxurious warmth of red gradient hues with the traditional elegance of Chinese artistic motifs. Begin with a gradient that transitions smoothly from a deep, rich burgundy at the top to a softer, warm crimson at the bottom. Throughout this gradient, scatter a dusting of small, shimmering gold flecks and traditional Chinese Motifs for the Chinese New Year, suggesting a touch of opulence and a celebratory ambiance.";

// Asynchronously fetches the image from DALL-E API. It retrieves the API key, invokes the image generation function, and loads the image using Base64 encoding to address cross-origin resource sharing (CORS) issues.
async function fetchImage() {
    apiKey = apiKeyInput.value();
    let imageData = await generateDalleImage();
    bkg = loadImage("data:image/png;base64," + imageData);
}

// Due to the CORS, p5.js cannot use loadImage to access the url for the image from the DALL-E API. Therefore,response formate is set as Base64 data.
// Asynchronously generates an image based on the specified prompt by making a POST request to the DALL-E API. It handles the response and error scenarios, and returns the Base64 encoded image data.
async function generateDalleImage() {
    console.log("Generating background image...");

    // Setup and send the POST request with the image prompt and configuration.
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

        // Process the response, extract the Base64 encoded image data, and return it.
        let responseData = await response.json();
        // console.log(responseData);
        console.log(responseData.data[0].b64_json);
        return responseData.data[0].b64_json;
    } catch (error) {
        // Error handling for the API request.
        console.error("Error:", error);
    }
}
