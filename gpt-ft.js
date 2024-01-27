// This asynchronous function interacts with the OpenAI API to generate Duilian based on user-provided keywords. It constructs the API request, sends it, and handles the response.
async function callOpenAIAPI(userKeywords) {
    console.log(
        `Keywords: '${userKeywords}', generating Duilian and their explanation...`
    );

    // Setting up the messages that define the task for the AI model, instructing it to generate Duilian and their English explanations based on the given keywords.
    let messages = [
        {
            role: "system",
            content:
                "You are a helpful assistant who is skilled in creating traditional chinese duilian in traditional chinese and explain it in English",
        },
        {
            role: "user",
            content: `Based on the keywords: '${userKeywords}', generate a duilian in traditional chinese and explain it in English`,
        },
    ];

    // Configuring the request data with the model details and messages.
    let data = {
        model: "ft:gpt-3.5-turbo-1106:personal::8icWt9iI",
        messages: messages,
    };

    // Sending the request to OpenAI's API and handling the response or any errors that might occur.
    try {
        let response = await fetch(
            "https://api.openai.com/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${apiKey}`,
                },
                body: JSON.stringify(data),
            }
        );

        let responseData = await response.json();
        // console.log(responseData);
        return responseData.choices[0].message.content;
    } catch (error) {
        console.error("Error:", error);
    }
}

// This function processes the user's input, invokes callOpenAIAPI to get the Duilian, and then extracts the Duilian text and its explanation from the response.
async function handleUserInput(userKeywords) {
    // Get the Duilian text.
    let duilianText = await callOpenAIAPI(userKeywords);
    console.log(duilianText);

    // Splits the response into individual lines and separates the Duilian from the explanation.
    let lines = duilianText.split("\n");
    let firstLine = keepCharacters(lines[0]);
    let secondLine = keepCharacters(lines[1]);
    let explanation = "";
    for (let i = 2; i < lines.length; i++) {
        explanation += lines[i];
    }

    // Validates the length of the Duilian lines and regenerates if they don't meet the criteria.
    if (firstLine.length != 7 || secondLine.length != 7) {
        generateDuilian();
        return;
    }

    // Stores the Duilian and its explanation in a structured format.
    duilian = {
        FirstLine: firstLine,
        SecondLine: secondLine,
        Explanation: explanation,
    };
}

// A utility function to remove non-Chinese characters from a string, used to clean the Duilian lines.
function keepCharacters(line) {
    return line.replace(/[^\u4e00-\u9fa5]/g, "");
}
