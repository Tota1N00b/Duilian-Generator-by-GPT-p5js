let duilianData, dataSize;
let duilian;
let charSize;
let inputField, submitButton, apiKeyInput;
let apiKey;

function preload() {
    duilianData = loadJSON("assets/chinese_new_year_duilian.json");
}

function setup() {
    dataSize = Object.keys(duilianData).length;
    duilian = duilianData[int(random(dataSize))];
    createCanvas(windowWidth, windowHeight);

    inputField = createInput();
    submitButton = createButton("Generate Duilian");
    apiKeyInput = createInput("", "password");
    positionElements();

    inputField.attribute("placeholder", "Keywords");
    apiKeyInput.attribute("placeholder", "API key");

    submitButton.mousePressed(generateDuilian);
}

function generateDuilian() {
    let userKeywords = inputField.value();
    apiKey = apiKeyInput.value();
    handleUserInput(userKeywords);
}

function draw() {
    background(255);
    drawDuilian(duilian);
    showExplaination(duilian);
}

function drawDuilian(duilian) {
    push();
    charSize = height / 10;
    if (charSize * 6 > width) {
        charSize = width / 8;
    }
    textSize(charSize);
    textWrap(CHAR);
    textFont("fzfangsong-gb18030");
    fill("red");
    noStroke();
    rect(
        charSize,
        charSize / 2,
        charSize * 1.5,
        duilian.SecondLine.length * charSize * 1.25
    );
    rect(
        width - charSize * 3,
        charSize / 2,
        charSize * 1.5,
        duilian.FirstLine.length * charSize * 1.25
    );
    fill(0);
    rectMode(CENTER);
    text(duilian.SecondLine, charSize * 2, charSize / 2, charSize * 1.5);
    text(duilian.FirstLine, width - charSize * 2, charSize / 2, charSize * 1.5);
    pop();
}

function showExplaination(duilian) {
    push();
    let explainationSize = charSize / 10;
    rectMode(CENTER);
    textAlign(CENTER);
    textSize(explainationSize);
    textFont("Helvetica");
    text(
        duilian.Explanation,
        width / 2,
        height - explainationSize * 4,
        (width / 5) * 3
    );
    pop();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    positionElements();
}

function positionElements() {
    inputField.position(width / 2 - inputField.width / 2, (height / 5) * 4);
    submitButton.position(
        width / 2 - submitButton.width / 2,
        (height / 5) * 4 + 30
    );
    apiKeyInput.position(
        width / 2 - apiKeyInput.width / 2,
        (height / 5) * 4 + 120
    );
}

// function mousePressed() {
//     duilian = duilianData[int(random(dataSize))];
// }
