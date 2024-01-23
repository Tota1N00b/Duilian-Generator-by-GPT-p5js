async function callOpenAIAPI(userKeywords) {
    // let prompt = `Based on the keywords: '${userKeywords}', generate 7-characters-per-line Duilian in traditional Chinese. Only output the response in the formatted style as follows:[Duilian first line]\n[Duilian second line]\n[Brief explanation of the Duilian in English in one paragraph]\n. Do not include additional response or the title of each line.`;
    let prompt = `Create a 7-characters-per-line Chinese Duilian based on these keywords: '${userKeywords}'. The Duilian should be structured as follows:
First Line: [Provide the first line of the Duilian]
Second Line: [Provide the second line of the Duilian]
Explanation: [Give a brief explanation of the meaning or theme of the Duilian]`;
    console.log(prompt);

    let data = {
        model: "davinci-002",
        prompt: prompt,
        max_tokens: 150,
    };

    try {
        let response = await fetch("https://api.openai.com/v1/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer <apiKey>",
            },
            body: JSON.stringify(data),
        });

        let responseData = await response.json();
        console.log(responseData);
        return responseData.choices[0].text;
    } catch (error) {
        console.error("Error:", error);
    }
}

async function handleUserInput(userKeywords) {
    let duilianText = await callOpenAIAPI(userKeywords);
    console.log(duilianText);

    let lines = duilianText.split("\n");
    let firstLine = lines[0];
    let secondLine = lines[1];
    let explanation = lines[2];

    duilian = {
        FirstLine: firstLine,
        SecondLine: secondLine,
        Explanation: explanation,
    };
}
