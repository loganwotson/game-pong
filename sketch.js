//Variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 20;
let raio = diametro / 2;

//Variáveis movimenta bolinha
let xMovBolinha = 6;
let yMovBolinha = 6;

//Variáveis mostra pontos
let meusPontos= 0;
let pontosOponente = 0;


//Variáveis minha raquete
let xMinhaRaquete = 5;
let yMinhaRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;

//Variáveis Raquete oponente
let xRaqueteOponente = 585
let yRaqueteOponente = 150
let velocidadeYRaqueteOponente;
let chanceDeErrar = 0;

//Variáveis colisão bolinha com a raquete
let colidiu = false;

//Variáveis sons
let ponto;
let raquetada;
let trilha;



function preload(){
  trilha = loadSound("trilha.mp3");
  raquetada = loadSound("raquetada.mp3");
  ponto = loadSound("ponto.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
  
}

function draw() {
  background(0);
  Mostrabolinha();
  Movimentabolinha();
  BolaxBorda();
  mostraMinhaRaquete(xMinhaRaquete, yMinhaRaquete);
  mostraMinhaRaquete (xRaqueteOponente, yRaqueteOponente);
  movMinhaRaquete();
  colisaoBolinhaRaquete (xMinhaRaquete, yMinhaRaquete);
  colisaoBolinhaRaquete (xRaqueteOponente, yRaqueteOponente);
  movRaqueteMaquina();
  //movRaqueteMultiplayer();
  calculaChanceDeErrar();
  mostraPonto();
  marcaPonto();
  bolinhaNaoFicaPresa();
}

function Mostrabolinha() {
  circle(xBolinha, yBolinha, diametro);
}

function Movimentabolinha() {
  xBolinha += xMovBolinha;
  yBolinha += yMovBolinha;
}

function BolaxBorda() {
  if (xBolinha + raio > width || xBolinha - raio < 0) {
    xMovBolinha *= -1;
  }
  if (yBolinha + raio > height || yBolinha - raio < 0) {
    yMovBolinha *= -1;
  }
}
function mostraMinhaRaquete(x,y) {
  rect(x, y, raqueteComprimento, raqueteAltura);
}

function movMinhaRaquete() {
  if (keyIsDown(UP_ARROW)) {
    yMinhaRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yMinhaRaquete += 10;
  }
}

function movRaqueteMultiplayer(){
  if (keyIsDown(87)) {
    yRaqueteOponente -= 10;
  }
  if (keyIsDown(83)) {
    yRaqueteOponente += 10;
  }
}

//movRaqueteOponente
function movRaqueteMaquina (){
  velocidadeYRaqueteOponente = yBolinha - yRaqueteOponente - raqueteComprimento /2 - 30;
  yRaqueteOponente += velocidadeYRaqueteOponente + chanceDeErrar
  calculaChanceDeErrar();
}

function calculaChanceDeErrar() {
  if (pontosOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}

function colisaoBolinhaRaquete (x, y){
  colidiu =
   collideRectCircle(x, y,raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if (colidiu){
    xMovBolinha *= -1;
    raquetada.play();
  }
}

function mostraPonto(){
  stroke (255);
  textAlign(CENTER);
  textSize (16);
  fill(color(255, 140, 0));
  rect(150, 10, 40, 20);
  fill (255);
  text (meusPontos, 170, 26)
  fill(color(255, 140, 0));
  rect(450, 10, 40, 20);
  fill(255);
  text (pontosOponente, 470, 26);
   }


function marcaPonto(){
  if (xBolinha >590){
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 10){
    pontosOponente += 1;
    ponto.play();
}
  }

function bolinhaNaoFicaPresa(){
    if (xBolinha - raio < 0){
    xBolinha = 23
    }
}
