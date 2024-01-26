let duilianData, dataSize;
let fonts = ["fzfangsong-gb18030"];
let textColors = ["black", "#F7E498", "gradient"];
let duilianColors = ["red", "#E80212", "#D7040F", "#F02A22", "#D03026"];
let textColor, duilianColor, font, horizonScroll;
let duilian;
let charSize;
let inputField, submitButton, randomButton, styleButton, apiKeyInput, imgButton;
let apiKey;
let bkg, blurBkg;

function preload() {
    duilianData = loadJSON("assets/chinese_new_year_duilian.json");
    fonts.push(loadFont("assets/li.ttf"));
    fonts.push(loadFont("assets/crane.ttf"));
    fonts.push(loadFont("assets/yan.ttf"));
    fonts.push(loadFont("assets/MasaFont-Medium.ttf"));
    fonts.push(loadFont("assets/qiji.ttf"));
    bkg = loadImage("assets/DefaultBkg.png");
}

function setup() {
    dataSize = Object.keys(duilianData).length;
    duilian = duilianData[int(random(dataSize))];
    createCanvas(windowWidth, windowHeight);
    blurBkg = createGraphics(width, height);

    inputField = createInput();
    submitButton = createButton("Generate Duilian");
    randomButton = createButton("Shuffle");
    imgButton = createButton("Generate Background");
    styleButton = createButton("Change Style");
    apiKeyInput = createInput("", "password");
    positionElements();

    submitButton.style("white-space", "nowrap");
    randomButton.style("white-space", "nowrap");
    styleButton.style("white-space", "nowrap");
    imgButton.style("white-space", "nowrap");
    inputField.attribute("placeholder", "Keywords");
    apiKeyInput.attribute("placeholder", "API key");

    submitButton.mousePressed(generateDuilian);
    randomButton.mousePressed(() => {
        duilian = duilianData[int(random(dataSize))];
        duilianSetup();
    });
    styleButton.mousePressed(() => {
        duilianSetup();
    });
    imgButton.mousePressed(fetchImage);
    duilianSetup();
}

function generateDuilian() {
    let userKeywords = inputField.value();
    apiKey = apiKeyInput.value();
    duilianSetup();
    handleUserInput(userKeywords);
}

function draw() {
    // background(255);
    drawBkg();
    drawDuilian(duilian);
    drawFu();
    showExplaination(duilian);
    if (width >= 1220) drawHorizonScroll();
}

function drawBkg() {
    blurBkg.image(bkg, 0, 0, width, height);
    blurBkg.filter(BLUR, 20);
    image(blurBkg, 0, 0);
}

function duilianSetup() {
    textColor = textColors[int(random(0, 3))];
    duilianColor = duilianColors[int(random(0, duilianColors.length))];
    font = fonts[int(random(0, fonts.length))];
    horizonScroll = horizonScrolls[int(random(0, horizonScrolls.length))];
}

function drawOneChar(char, x, y, size) {
    push();
    rectMode(CENTER);
    fill(duilianColor);
    stroke(duilianColor);
    rect(x, y, size * 1.2);

    textFont(font);
    textAlign(CENTER, CENTER);
    textSize(size);
    if (textColor != "gradient") {
        fill(textColor);
    } else {
        fill(0);
        setGradientFill(x - size * 0.6, y, x + size * 0.6, y);
    }
    text(char, x, y);
    pop();
}

function drawALine(string, x, y, size) {
    for (let i = 0; i < string.length; i++) {
        if (i == string.length - 1) {
            push();
            rectMode(CENTER);
            fill(duilianColor);
            stroke(duilianColor);
            rect(
                x,
                y + string.length * size * 1.2 - size * 0.6,
                size * 1.2,
                size * 0.6
            );
            pop();
        }
        drawOneChar(string[i], x, y + i * size * 1.2, size);
    }
}

function drawDuilian(duilian) {
    push();
    charSize = height / 10;
    if (charSize * 8 > width) {
        charSize = width / 8;
    }
    drawALine(duilian.SecondLine, charSize * 2, charSize, charSize);
    drawALine(duilian.FirstLine, width - charSize * 2, charSize, charSize);
    pop();
}

function showExplaination(duilian) {
    push();
    let explainationSize = charSize / 10;
    rectMode(CENTER);
    textAlign(CENTER);
    textSize(explainationSize);
    textFont("Helvetica");
    fill(255);
    text(
        duilian.Explanation,
        width / 2,
        height - explainationSize * 4,
        (width / 5) * 3
    );
    pop();
}

function drawFu() {
    push();
    translate(width / 2, (charSize * 1.2 * 7) / 2);
    rectMode(CENTER);
    rotate(PI / 4);
    stroke(duilianColor);
    fill(duilianColor);
    rect(0, 0, charSize * 1.5);
    noFill();
    stroke("#F7E498");
    strokeWeight(charSize / 30);
    rect(0, 0, charSize * 1.4);
    pop();

    push();
    let xt = width / 2 - charSize * 0.04,
        yt = (charSize * 1.2 * 6.8) / 2;
    translate(width / 2 - charSize * 0.04, (charSize * 1.2 * 6.8) / 2);

    textFont(font);
    textSize(charSize);
    textAlign(CENTER, CENTER);
    if (textColor != "gradient") {
        fill(textColor);
        text("福", 0, 0);
    } else {
        fill(0);
        setGradientFill(
            -charSize * 0.5,
            -charSize * 0.5,
            charSize * 0.5,
            charSize * 0.5
        );
    }
    text("福", 0, 0);
    pop();
}

function setGradientFill(x1, y1, x2, y2) {
    let gradient = drawingContext.createLinearGradient(x1, y1, x2, y2);
    gradient.addColorStop(0, "gold");
    gradient.addColorStop(1, "orange");
    drawingContext.fillStyle = gradient;
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    blurBkg.resizeCanvas(windowWidth, windowHeight);
    positionElements();
}

function positionElements() {
    inputField.position(width / 2 - inputField.width / 2, (height / 5) * 4);
    submitButton.position(
        width / 2 - submitButton.width / 2,
        (height / 5) * 4 + 30
    );
    randomButton.position(
        width / 2 - randomButton.width / 2,
        (height / 5) * 4 + 60
    );
    apiKeyInput.position(
        width / 2 - apiKeyInput.width / 2,
        (height / 5) * 4 + 120
    );
    imgButton.position(4, height - imgButton.height - 4);
    styleButton.position(
        width - styleButton.width - 4,
        height - styleButton.height - 4
    );
}
