function preload (){
  trilha = loadSound ("trilha.mp3");
  ponto = loadSound ("ponto.mp3");
  raquetada = loadSound ("raquetada.mp3");
}
function setup() {
  createCanvas(600, 400);
  trilha.loop();
}
let xBolinha = 300;
let yBolinha = 200;
let velocidadexBolinha = 3;
let velocidadeyBolinha = 3;
let diametro = 20;
let raio = diametro / 2;

let xRaquete = 5;
let yRaquete = 150;
let comprimentoRaquete = 10;
let alturaRaquete = 90;

let hit = false;

let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeyOponente;

let MeusPontos = 0;
let PontosOponente = 0;

let ponto;
let raquetada;
let trilha;

function draw() {
  background(0);

  Bolinha();
  MostraRaquete(xRaquete, yRaquete);
  MostraRaquete(xRaqueteOponente, yRaqueteOponente);
  MovimentoMinhaRaquete();
  MovimentoRaqueteOponente();
  Colisão(xRaquete,yRaquete);
  Colisão (xRaqueteOponente, yRaqueteOponente);
  Placar();
  MarcarPontos();

  function Bolinha() {
    circle(xBolinha, yBolinha, diametro);
    xBolinha += velocidadexBolinha;
    yBolinha += velocidadeyBolinha;

    if (yBolinha + raio > height) {
      velocidadeyBolinha *= -1;
    }
    if (yBolinha - raio < 0) {
      velocidadeyBolinha *= -1;
    }
    if (xBolinha + raio > width) {
      velocidadexBolinha *= -1;
    }
    if (xBolinha - raio < 0) {
      velocidadexBolinha *= -1;
    }
  }

  function MostraRaquete(x, y) {
    rect(x, y, comprimentoRaquete, alturaRaquete);
  }

  function MovimentoMinhaRaquete() {
    if (keyIsDown(UP_ARROW)) {
      yRaquete -= 5;
    }

    if (keyIsDown(DOWN_ARROW)) {
      yRaquete += 5;
    }
  }
  
  function MovimentoRaqueteOponente(){
    velocidadeyOponente = yBolinha - yRaqueteOponente -alturaRaquete/2 -55;
    yRaqueteOponente +=velocidadeyOponente;
    
  }
  function Colisão(x,y) {
    hit = collideRectCircle(
      x,
      y,
      comprimentoRaquete,
      alturaRaquete,
      xBolinha,
      yBolinha,
      diametro
    );
    if (hit) {
      velocidadexBolinha *= -1;
      raquetada.play();
    }
  }
  function Placar(){
    textAlign(CENTER);
    textSize (28);
    fill(color(0,0,255));
    rect(135,10,40,40);
    rect(435,10,40,40);
    fill(255);
    text (MeusPontos,150,40);
    text (PontosOponente,450,40);
  }
  function MarcarPontos(){
    if(xBolinha<10){
      PontosOponente ++;
      ponto.play();
    }
    if(xBolinha>590){
      MeusPontos ++;
      ponto.play();
    }
  }
}
