let duilianData, dataSize;
let duilian;
let charSize;

function preload() {
    duilianData = loadJSON("assets/chinese_new_year_duilian.json");
}

function setup() {
    console.log(duilianData);
    dataSize = Object.keys(duilianData).length;
    duilian = int(random(dataSize));
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    background(255);
    drawDuilian(duilianData[duilian]);
    showExplaination(duilianData[duilian]);
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
        duilian.FirstLine.length * charSize * 1.25
    );
    rect(
        width - charSize * 3,
        charSize / 2,
        charSize * 1.5,
        duilian.FirstLine.length * charSize * 1.25
    );
    fill(0);
    rectMode(CENTER);
    text(duilian.FirstLine, charSize * 2, charSize / 2, charSize * 1.5);
    text(
        duilian.SecondLine,
        width - charSize * 2,
        charSize / 2,
        charSize * 1.5
    );
    pop();
}

function showExplaination(duilian) {
    push();
    let explainationSize = charSize / 10;
    rectMode(CENTER);
    textAlign(CENTER);
    textSize(explainationSize);
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
}

function mousePressed() {
    duilian = int(random(dataSize));
}
