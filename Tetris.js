
////////////////////////////////////////////////////////////////////////
const gameBoard = document.getElementById('game-board');
let lastRenderTime = 0;
var speed = 2.2;

{const top=0,parent=c=>(c+1>>>1)-1,left=c=>(c<<1)+1,right=c=>c+1<<1;class PriorityQueue{constructor(c=(d,e)=>d>e){this._heap=[],this._comparator=c}size(){return this._heap.length}isEmpty(){return 0==this.size()}peek(){return this._heap[top]}push(...c){return c.forEach(d=>{this._heap.push(d),this._siftUp()}),this.size()}pop(){const c=this.peek(),d=this.size()-1;return d>top&&this._swap(top,d),this._heap.pop(),this._siftDown(),c}replace(c){const d=this.peek();return this._heap[top]=c,this._siftDown(),d}_greater(c,d){return this._comparator(this._heap[c],this._heap[d])}_swap(c,d){[this._heap[c],this._heap[d]]=[this._heap[d],this._heap[c]]}_siftUp(){for(let c=this.size()-1;c>top&&this._greater(c,parent(c));)this._swap(c,parent(c)),c=parent(c)}_siftDown(){for(let d,c=top;left(c)<this.size()&&this._greater(left(c),c)||right(c)<this.size()&&this._greater(right(c),c);)d=right(c)<this.size()&&this._greater(right(c),left(c))?right(c):left(c),this._swap(c,d),c=d}}window.PriorityQueue=PriorityQueue}
const clearQueue = new PriorityQueue();

var nextType = Math.floor(Math.random() * 7) + 1;
var firstTime = 1;
const pieces = [];
var blockType = Math.floor(Math.random() * 7) + 1;
var previousType = 1;;
var onex = 0;
var oney = 0;
var twox = 0;
var twoy = 0;
var threex = 0;
var threey = 0;
var centrex = 6;
var centrey = 0;
var placeSignal = 0;
var block = [
    {x: centrex, y: centrey},
    {x: centrex - 1, y: centrey},
    {x: centrex + 1, y: centrey},
    {x: centrex, y: centrey + 1},
];
var shadowBlock = [
    {x: centrex, y: centrey},
    {x: centrex - 1, y: centrey},
    {x: centrex + 1, y: centrey},
    {x: centrex, y: centrey + 1},
];
var clear = new Array(25);
for (var i = 1; i < 20; i++) {
    clear[i] = 0;
}
for (var i = 1; i < 21; i++) {
    clear[i] = 0;
}

var occupied = new Array(30);

for (var i = 0; i < 30; i++) {
    occupied[i] = new Array(30);
}

for (let i = 1; i <= 10; i++) { 
    for (let j = 1; j <= 20; j++) {
        occupied[i][j] = 0;
    }
}
for (let i = 1; i <= 10; i++) {
    occupied[i][21] = 1;
}
for (let i = 1; i <= 20; i++) {
    occupied[0][i] = 1;
    occupied[11][i] = 1;
}
for (let i = 1; i <= 10; i++) {
    occupied[i][0] = 1;
}
var lines = 0;
var level = 0;
var lvlInc = 0;
var score = 0;
var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth / 2.5;
canvas.height = window.innerHeight * 0.95;
var unit = canvas.height/100;
var c = canvas.getContext('2d');
var fontSize = window.innerHeight / 23;
c.font = (fontSize|0) + "px Sans";
////////////////////////////////////////////////////////////////////////

//main game
function main(currentTime) {
    window.requestAnimationFrame(main);
    const delay = (currentTime - lastRenderTime) / 1000;
    c.fillStyle = 'black'; 
    c.fillRect(0, 0, canvas.width, canvas.height);
    c.fillStyle = 'rgb(255, 235, 234)'; 
    c.fillText('Lines: '+ lines, 32*unit, 10*unit);
    c.fillText('Level: ' + level, 32*unit, 15*unit , 400);
    c.fillText('Score: ' + score, 32*unit, 20*unit , 400);
    c.fillText('Next: ', canvas.width/15, 10*unit , 400);
    var img = new Image();
    if (nextType == 1) {
        img.src = 'les_Images/Purple.jpg';
        c.drawImage(img, 3*unit, 11*unit, 20*unit, 13.5*unit);
    }
    else if (nextType == 2) {
        img.src = 'les_Images/Cyan.jpg';
        c.drawImage(img, 3*unit, 11*unit, 22*unit, 9*unit);
    }
    else if (nextType == 3) {
        img.src = 'les_Images/Yellow.jpg';
        c.drawImage(img, 3*unit, 11*unit, 13.75*unit, 13.5*unit);
    }
    else if (nextType == 4) {
        img.src = 'les_Images/Green.jpg';
        c.drawImage(img, 3*unit, 11*unit, 20*unit, 13.5*unit);
    }
    else if (nextType == 5) {
        img.src = 'les_Images/Red.jpg';
        c.drawImage(img, 3*unit, 11*unit, 20*unit, 13.5*unit);
    }
    else if (nextType == 6) {
        img.src = 'les_Images/Blue.jpg';
        c.drawImage(img, 3*unit, 11*unit, 20*unit, 13.5*unit);
    }
    else if (nextType == 7) {
        img.src = 'les_Images/Orange.jpg';
        c.drawImage(img, 3*unit, 11*unit, 20*unit, 13.5*unit);
    }

    var animeImg = new Image();
    if (level == 0) {
        animeImg.src = 'les_Images/Gon.jpg';
        c.drawImage(animeImg, 3*unit, 33*unit, 40*unit, 40*unit);
        c.fillText('Whoops should have told you how to play. XD its a, d, s to move ', 3*unit, 80*unit , 70*unit);
        c.fillText('and w for rotate. Space Bar for hard Drop. ', 3*unit, 85*unit , 70*unit);
        c.fillText('Qualification does not matter. The ones who are not ', 3*unit, 90*unit , 70*unit);
        c.fillText('okay with their success train until they are. - Gon', 3*unit, 95*unit , 70*unit);
    }
    else if (level == 1) {
        animeImg.src = 'les_Images/Bakugo.jpg';
        c.drawImage(animeImg, 3*unit, 42*unit, 74.2*unit, 40*unit);
        c.fillText('I will beat you with an indisputable Difference - Bakugo ', 3*unit, 95*unit , 70*unit);
    }
    else if (level == 2) {
        animeImg.src = 'les_Images/Shikamaru.jpg';
        c.drawImage(animeImg, 3*unit, 35*unit, 51*unit, 51*unit);
        c.fillText('What a drag. Can I just stop here. Course not! - Shikamaru ', 3*unit, 95*unit , 70*unit);
    }
    else if (level == 3) {
        animeImg.src = 'les_Images/Itadori.png';
        c.drawImage(animeImg, 3*unit, 35*unit, 32.5125*unit, 51*unit);
        c.fillText('Would this be a proper death. This death is not acceptable - Itadori', 3*unit, 95*unit , 70*unit);
    }
    else if (level == 4) {
        animeImg.src = 'les_Images/Killua.jpg';
        c.drawImage(animeImg, 3*unit, 35*unit, 35.6643*unit, 51*unit);
        c.fillText('When I say it does not hurt me, that means I can bear it. - Killua', 3*unit, 95*unit , 70*unit);
    }
    else if (level == 5) {
        animeImg.src = 'les_Images/Light.jpg';
        c.drawImage(animeImg, 3*unit, 35*unit, 51*unit, 51*unit);
        c.fillText('I am ridding the world of Evil and Creating a Utopia - Light', 3*unit, 95*unit , 70*unit);
    }
    else if (level == 6)  {
        animeImg.src = 'les_Images/Sanji.jpg';
        c.drawImage(animeImg, 3*unit, 35*unit, 28.6875*unit, 51*unit);
        c.fillText('Spices are a Gift from the Devil. A little too Spicy for you? - Sanji', 3*unit, 95*unit , 70*unit);
    }
    else if (level == 7) {
        animeImg.src = 'les_Images/L.jpg';
        c.drawImage(animeImg, 3*unit, 35*unit, 41.2*unit, 51*unit);
        c.fillText('Lying monsters are a real nuisance. If I encountered one Id be Eaten. - L', 3*unit, 95*unit , 70*unit);
    }
    else if (level == 8) {
        animeImg.src = 'les_Images/Ichigo.jpg';
        c.drawImage(animeImg, 3*unit, 35*unit, 34*unit, 51*unit);
        c.fillText('What is the difference between a king and its horse. INSTINCT. - Zangetsu', 3*unit, 95*unit , 70*unit);
    }
    else if (level == 9) {
        animeImg.src = 'les_Images/Itatchi.jpg';
        c.drawImage(animeImg, 3*unit, 42*unit, 64*unit, 40*unit);
        c.fillText('Any technique is worthless before my eyes - Itatchi', 3*unit, 95*unit , 70*unit);
    }
    else if (level == 10) {
        animeImg.src = 'les_Images/Spike.jpg';
        c.drawImage(animeImg, 3*unit, 42*unit, 71.1*unit, 40*unit);
        c.fillText('Whatever Happens, Happens. - Spike', 3*unit, 95*unit , 70*unit);
    }
    else if (level == 11) {
        animeImg.src = 'les_Images/Kakashi.jpg';
        c.drawImage(animeImg, 3*unit, 42*unit, 71.1*unit, 40*unit);
        c.fillText('Hello students, today I got lost on the road of life. - Kakashi', 3*unit, 95*unit , 70*unit);
    }
    else if (level == 12) {
        animeImg.src = 'les_Images/Megumi.jpg';
        c.drawImage(animeImg, 3*unit, 35*unit, 26.1*unit, 51*unit);
        c.fillText('A version of myself whose surpassed my limits. Ill do it! - Megumi', 3*unit, 95*unit , 70*unit);
    }
    else if (level == 13) {
        animeImg.src = 'les_Images/Saitama.jpg';
        c.drawImage(animeImg, 3*unit, 35*unit, 28.333*unit, 51*unit);
        c.fillText('Speed Intensifies. "Ok" - Saitama.', 3*unit, 95*unit , 70*unit);
    }
    else if (level == 14) {
        animeImg.src = 'les_Images/GOD_Usopp.jpg';
        c.drawImage(animeImg, 3*unit, 35*unit, 63.5*unit, 51*unit);
        c.fillText('There comes a time when a man has to stand and fight - GOD Usopp', 3*unit, 95*unit , 70*unit);
    }
    else if (level == 15) {
        animeImg.src = 'les_Images/Naruto.jpg';
        c.drawImage(animeImg, 3*unit, 42*unit, 56*unit, 40*unit);
        c.fillText('I dont quit. I dont run. I never go back on my word. BELIEVE IT!', 3*unit, 95*unit , 70*unit);
    }
    else if (level == 16) {
        animeImg.src = 'les_Images/Maki.jpg';
        c.drawImage(animeImg, 3*unit, 35*unit, 28.692*unit, 51*unit);
        c.fillText('"IMPOST- "  Sorry, Say That Again Would you. - Maki', 3*unit, 95*unit , 70*unit);
    }
    else if (level == 17) {
        animeImg.src = 'les_Images/Erwin.jpg';
        c.drawImage(animeImg, 3*unit, 35*unit, 35.19*unit, 51*unit);
        c.fillText('MY SOLDIERS CHARGE! MY SOLDIERS SCREAM! MY SOLDIERS RAGE!', 3*unit, 95*unit , 70*unit);
    }
    else if (level == 18) {
        animeImg.src = 'les_Images/Hisoka.jpg';
        c.drawImage(animeImg, 3*unit, 35*unit, 28.6875*unit, 51*unit);
        c.fillText('A true magician never runs out of tricks - Hisoka', 3*unit, 95*unit , 70*unit);
    }
    else if (level == 19) {
        animeImg.src = 'les_Images/Zeke.jpg';
        c.drawImage(animeImg, 3*unit, 35*unit, 51*unit, 51*unit);
        c.fillText('What a Beautiful Day it is. If only I realized earlier - Zeke', 3*unit, 95*unit , 70*unit);
    }
    else if (level == 20) {
        animeImg.src = 'les_Images/Sasuke.jpg';
        c.drawImage(animeImg, 3*unit, 35*unit, 38.25*unit, 51*unit);
        c.fillText('I have long since closed my eyes. My only goal is in the Darkness.', 3*unit, 95*unit , 70*unit);
    }
    else if (level == 21) {
        animeImg.src = 'les_Images/Zoro.jpg';
        c.drawImage(animeImg, 3*unit, 35*unit, 28.6875*unit, 51*unit);
        c.fillText('Bring on hardship. Its preferred in a path of carnage. - Zoro', 3*unit, 95*unit , 70*unit);
    }
    else if (level == 22) {
        animeImg.src = 'les_Images/Levi.jpg';
        c.drawImage(animeImg, 3*unit, 42*unit, 71.1111*unit, 40*unit);
        c.fillText('No Casualties, Dont You Dare Die. - Levi', 3*unit, 95*unit , 70*unit);
    }
    else if (level == 23) {
        animeImg.src = 'les_Images/Kento.jpg';
        c.drawImage(animeImg, 3*unit, 35*unit, 28.73*unit, 51*unit);
        c.fillText('Im going into overtime now. - Kento', 3*unit, 95*unit , 70*unit);
    }
    else if (level == 24) {
        animeImg.src = 'les_Images/Luffy.jpg';
        c.drawImage(animeImg, 3*unit, 42*unit, 71.06888*unit, 40*unit);
        c.fillText('Do I know how to throw a punch, you ask? - Luffy', 3*unit, 95*unit , 70*unit);
    }
    if (level == 25) {
        animeImg.src = 'les_Images/Gojo.jpg';
        c.drawImage(animeImg, 3*unit, 35*unit, 51*unit, 51*unit);
        c.fillText('Dont Worry. Im the strongest.', 3*unit, 95*unit , 70*unit);
    }
    if (delay < 1/speed) return;
    lastRenderTime = currentTime;
    updateDown();
    drawBlock();
}

function drawBlock() {
    block.forEach (segment => {
        const blockElement = document.createElement('div');
        blockElement.style.gridRowStart = segment.y;
        blockElement.style.gridColumnStart = segment.x;
        if (blockType == 1) blockElement.classList.add('tblock');
        else if (blockType == 2) blockElement.classList.add('line');
        else if (blockType == 3) blockElement.classList.add('square');
        else if (blockType == 4) blockElement.classList.add('sblock');
        else if (blockType == 5) blockElement.classList.add('zblock');
        else if (blockType == 6) blockElement.classList.add('jblock');
        else if (blockType == 7) blockElement.classList.add('lblock');
        gameBoard.appendChild(blockElement);
    })
}

function drawShadow() {
    shadowBlock.forEach (segment => {
        const blockElement = document.createElement('div');
        blockElement.style.gridRowStart = segment.y;
        blockElement.style.gridColumnStart = segment.x;
        blockElement.classList.add('shadow');
        gameBoard.appendChild(blockElement);
    })
}

function updateShadow() {
    var filler = 0;
    var validate = 0;
    while (validate == 0) {
        filler++;
        for (let i = 3; i >= 0; i--) {
            if (occupied[block[i].x][block[i].y + filler] == 1) {
                validate = 1;
            }
        }
    }
    filler--;
    for (let i = 3; i >= 0; i--) {
        shadowBlock[i].y = block[i].y + filler;
        shadowBlock[i].x = block[i].x;
    }
}

function clearShadow() {
    for (let i = 3; i >= 0; i--) {
        clearPiece(shadowBlock[i].x, shadowBlock[i].y);
    }
}

function clearBlock() {
    block.forEach (segment => {
        const blankElement = document.createElement('div');
        blankElement.style.gridRowStart = segment.y;
        blankElement.style.gridColumnStart = segment.x;
        blankElement.classList.add('blank');
        gameBoard.appendChild(blankElement);
    })
}

function drawPiece(x, y, t) {
    const blockElement = document.createElement('div');
    blockElement.style.gridRowStart = y;
    blockElement.style.gridColumnStart = x;
    if (t == 1) blockElement.classList.add('tblock');
    else if (t == 2) blockElement.classList.add('line');
    else if (t == 3) blockElement.classList.add('square');
    else if (t == 4) blockElement.classList.add('sblock');
    else if (t == 5) blockElement.classList.add('zblock');
    else if (t == 6) blockElement.classList.add('jblock');
    else if (t == 7) blockElement.classList.add('lblock');
    gameBoard.appendChild(blockElement);
}

function clearPiece(x, y) {
    const blockElement = document.createElement('div');
    blockElement.style.gridRowStart = y;
    blockElement.style.gridColumnStart = x;
    blockElement.classList.add('blank');
    gameBoard.appendChild(blockElement);
}


function updateDown() {
    var validate = 0;
    for (let i = 3; i >= 0; i--) {
        if (occupied[block[i].x][block[i].y + 1] == 1) validate = 1;
    }
    if (validate == 0) placeSignal = 0;
    if (placeSignal == 1) {
        for (let i = 3; i >= 0; i--) {
            occupied[block[i].x][block[i].y] = 1;
            clear[block[i].y] += 1;
            if (clear[block[i].y] == 10) {
                clearQueue.push(21 - block[i].y);
            }
            pieces.push({x: block[i].x, y: block[i].y, t: blockType});
        }
        var scoreCheck = 0;
        while (!clearQueue.isEmpty()) {
            scoreCheck++;
            var clearLine = 21 - clearQueue.peek();
            clearQueue.pop();
            for (var i = clearLine; i > 1; i--) {
                clear[i] = clear[i - 1];
            }
            clear[1] = 0;
            for (var i = 1; i <= 10; i++) {
                occupied[i][clearLine] = 0;
                occupied[i][1] = 0;
            }
            for (var i = 0; i < 10; i++) {
                var fillerValidate = 0;
                var j = 0;
                while (fillerValidate == 0) {
                    if (pieces[j].y == clearLine) {
                        pieces.splice(j, 1);
                        fillerValidate = 1;
                    }
                    j++;
                }
            }
            for (var i = 0; i < pieces.length; i++) {
                if (pieces[i].y < clearLine) {
                    occupied[pieces[i].x][pieces[i].y] = 0;
                    pieces[i].y++;
                }
            }
            for (var i = 0; i < pieces.length; i++) {
                var t = pieces[i].t;
                var x = pieces[i].x;
                var y = pieces[i].y;
                if (y <= clearLine) occupied[x][y] = 1;
            }
            gameBoard.innerHTML = "";
            for (var i = 0; i < pieces.length; i++) {
                var t = pieces[i].t;
                var x = pieces[i].x;
                var y = pieces[i].y;
                drawPiece(x, y, t);
            }
            lines++;
            lvlInc++;
            if (lvlInc == 10) {
                lvlInc = 0;
                if (level < 25) {
                    level++;
                    speed += 0.552;  
                }
            }
            
        }

        if (scoreCheck == 1) score += 40 * (level + 1);
        else if (scoreCheck == 2) score += 100 * (level + 1);
        else if (scoreCheck == 3) score += 300 * (level + 1);
        else if (scoreCheck == 4) score += 1200 * (level + 1);
        //////////////////////////////////////////////////////////////////////////////////
        var fillerPrevious = nextType;
        blockType = nextType;
        nextType = Math.floor(Math.random() * 7) + 1;
        if (nextType == previousType) nextType = Math.floor(Math.random() * 7) + 1;
        previousType = fillerPrevious;

        if (blockType == 1) {
            block = [
                {x: centrex, y: 1},
                {x: centrex - 1, y: 1},
                {x: centrex + 1, y: 1},
                {x: centrex, y: 1 + 1},
            ];
        }
        else if (blockType == 2) {
            block = [
                {x: centrex, y: 1},
                {x: centrex - 1, y: 1},
                {x: centrex - 2, y: 1},
                {x: centrex + 1, y: 1 },
            ];
        }
        else if (blockType == 3) {
            block = [
                {x: centrex, y: 1},
                {x: centrex + 1, y: 1},
                {x: centrex + 1, y: 2},
                {x: centrex, y: 1 + 1},
            ];
        }
        else if (blockType == 4) {
            block = [
                {x: centrex, y: 1},
                {x: centrex, y: 2},
                {x: centrex + 1, y: 1},
                {x: centrex - 1, y: 2},
            ];
        }
        else if (blockType == 5) {
            block = [
                {x: centrex, y: 1},
                {x: centrex - 1, y: 1},
                {x: centrex, y: 2},
                {x: centrex + 1, y: 2},
            ];
        }
        else if (blockType == 6) {
            block = [
                {x: centrex, y: 1},
                {x: centrex - 1, y: 1},
                {x: centrex + 1, y: 1},
                {x: centrex + 1, y: 2},
            ];
        }
        else if (blockType == 7) {
            block = [
                {x: centrex, y: 1},
                {x: centrex - 1, y: 1},
                {x: centrex + 1, y: 1},
                {x: centrex - 1, y: 1 + 1},
            ];
        }
        for (let i = 3; i >= 0; i--) {
            if (occupied[block[i].x][block[i].y] == 1) {
                for (let i = 3; i >= 0; i--) {
                    block[i].x = 1;
                    block[i].y = 1;
                }
                if (level >= 25) {
                    if (confirm('Well. I guess you are the strongest after all. But lets see if you can do better')) {
                        location.reload();
                    }
                }
                else {
                    if (confirm('How tragic seems your skills are not Gojo level yet. How abt you click ok to try again.')) {
                        location.reload();
                    }
                }
            }
        }
        //////////////////////////////////////////////////////////////////////////////////
        placeSignal = 0;
        //clearShadow();
        updateShadow();
        drawShadow();
        //drawBlock();
    }
    else {
        clearBlock();
        var validate = 0;
        for (let i = 3; i >= 0; i--) {
            if (occupied[block[i].x][block[i].y + 1] == 1) validate = 1;
        }
        
        if (validate == 1) {placeSignal++;}
        else {
            for (let i = 3; i >= 0; i--) {
                block[i].y++;
            }
        }
    }
}

window.addEventListener('keydown', function(event) {
    if (firstTime == 1) {
        const music = new Audio('Tetris_Theme_Revamped.mp3');
        music.volume = 0.1;
        music.play();
        music.loop = true;
        firstTime++;
    }
    if (event.key == 's') {
        if (placeSignal != 1) {
            clearBlock();
            var validate = 0;
            for (let i = 3; i >= 0; i--) {
                if (occupied[block[i].x][block[i].y + 1] == 1) validate = 1;
            }
            if (validate == 0) {
                for (let i = 3; i >= 0; i--) {
                    block[i].y++;
                }
            }
            drawBlock();
        }
    }

    else if (event.key == 'a') {
        if (placeSignal != 1) {
            clearBlock();
            var validate = 0;
            for (let i = 3; i >= 0; i--) {
                if (occupied[block[i].x - 1][block[i].y] == 1) validate = 1;
            }
            if (validate == 0) {
                for (let i = 3; i >= 0; i--) {
                    block[i].x--;
                }
            }
            drawBlock();
            clearShadow();
            updateShadow();
            drawShadow();
            drawBlock();
        }
    }

    else if (event.key == 'd') {
        clearBlock();
        var validate = 0;
        for (let i = 3; i >= 0; i--) {
            if (occupied[block[i].x + 1][block[i].y] == 1) validate = 1;
        }
        if (validate == 0) {
            for (let i = 3; i >= 0; i--) {
                block[i].x++;
            }
        }
        drawBlock();
        clearShadow();
        updateShadow();
        drawShadow();
        drawBlock();
    }

    else if (event.key == 'w') {
        clearBlock();
        fillerx = block[0].x;
        fillery = block[0].y;
        onex = block[1].x - fillerx;
        oney = block[1].y - fillery;
        twox = block[2].x - fillerx;
        twoy = block[2].y - fillery;
        threex = block[3].x - fillerx;
        threey = block[3].y - fillery;

        var filler = 0;
        filler = oney;
        oney = 0 - onex;
        onex = filler;

        filler = twoy;
        twoy = 0 - twox;
        twox = filler;

        filler = threey;
        threey = 0 - threex;
        threex = filler;

        onex += fillerx;
        oney += fillery;
        twox += fillerx;
        twoy += fillery;
        threex += fillerx;
        threey += fillery;

        var validate = 0;
        if (occupied[onex][oney] == 1) validate = 1;
        if (occupied[twox][twoy] == 1) validate = 1;
        if (occupied[threex][threey] == 1) validate = 1;

        if (validate == 0) {
            block[1].x = onex;
            block[1].y = oney;
            block[2].x = twox;
            block[2].y = twoy;
            block[3].x = threex;
            block[3].y = threey;
        }
        drawBlock();
        clearShadow();
        updateShadow();
        drawShadow();
        drawBlock();
    }

    else if (event.code === 'Space') {
        while(block[0].y != 1) {
            updateDown();
            drawBlock();
        }
    }
    
})

if (blockType == 1) {
    block = [
        {x: centrex, y: 1},
        {x: centrex - 1, y: 1},
        {x: centrex + 1, y: 1},
        {x: centrex, y: 1 + 1},
    ];
}
else if (blockType == 2) {
    block = [
        {x: centrex, y: 1},
        {x: centrex - 1, y: 1},
        {x: centrex - 2, y: 1},
        {x: centrex + 1, y: 1 },
    ];
}
else if (blockType == 3) {
    block = [
        {x: centrex, y: 1},
        {x: centrex + 1, y: 1},
        {x: centrex + 1, y: 2},
        {x: centrex, y: 1 + 1},
    ];
}
else if (blockType == 4) {
    block = [
        {x: centrex, y: 1},
        {x: centrex, y: 2},
        {x: centrex + 1, y: 1},
        {x: centrex - 1, y: 2},
    ];
}
else if (blockType == 5) {
    block = [
        {x: centrex, y: 1},
        {x: centrex - 1, y: 1},
        {x: centrex, y: 2},
        {x: centrex + 1, y: 2},
    ];
}
else if (blockType == 6) {
    block = [
        {x: centrex, y: 1},
        {x: centrex - 1, y: 1},
        {x: centrex + 1, y: 1},
        {x: centrex + 1, y: 2},
    ];
}
else if (blockType == 7) {
    block = [
        {x: centrex, y: 1},
        {x: centrex - 1, y: 1},
        {x: centrex + 1, y: 1},
        {x: centrex - 1, y: 1 + 1},
    ];
}

updateShadow();
drawShadow();

main();
