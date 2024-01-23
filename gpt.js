async function callOpenAIAPI(userKeywords) {
    console.log(
        `Keywords: '${userKeywords}', generating Duilian and their explanation...`
    );

    let messages = [
        {
            role: "system",
            content:
                "You are a helpful assistant who is skilled in creating traditional Chinese Duilian in Traditional Chinese and explain it in English.",
        },
        {
            role: "user",
            content: `Based on the keywords: '${userKeywords}', generate one Duilian with two lines in traditional Chinese, and the explaination in English. Only output the response in the formatted 3-line style as follows:\n[Chinese Duilian first line]\n[Chinese Duilian second line]\n[Brief English explanation of the Duilian in one paragraph. Make sure its written in English.]\n. The response should be 3 lines. Do not include additional response or the title of each line.`,
        },
    ];

    let data = {
        model: "gpt-3.5-turbo",
        messages: messages,
    };

    try {
        let response = await fetch(
            "https://api.openai.com/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer '${apiKey}'`,
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
