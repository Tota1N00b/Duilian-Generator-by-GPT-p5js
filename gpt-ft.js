async function callOpenAIAPI(userKeywords) {
    console.log(
        `Keywords: '${userKeywords}', generating Duilian and their explanation...`
    );

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

    let data = {
        model: "ft:gpt-3.5-turbo-1106:personal::8icWt9iI",
        messages: messages,
    };

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
        console.log(responseData);
        return responseData.choices[0].message.content;
    } catch (error) {
        console.error("Error:", error);
    }
}

async function handleUserInput(userKeywords) {
    let duilianText = await callOpenAIAPI(userKeywords);
    console.log(duilianText);

    let lines = duilianText.split("\n");
    let firstLine = keepCharacters(lines[0]);
    let secondLine = keepCharacters(lines[1]);
    let explanation = "";
    for (let i = 2; i < lines.length; i++) {
        explanation += lines[i];
    }

    duilian = {
        FirstLine: firstLine,
        SecondLine: secondLine,
        Explanation: explanation,
    };
}

function keepCharacters(line) {
    return line.replace(/[^\u4e00-\u9fa5]/g, "");
}
