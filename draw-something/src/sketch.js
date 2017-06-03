export default function sketch (p){
  p.setup = function(){
    p.createCanvas(600,400)
    p.background('red')
    p.fill ('white')
    p.rect(50,50,500,300)
    p.ellipse(30,370,50,50)
    p.ellipse(570,370,50,50)
  }
  p.draw = function(){
  }
  p.mouseDragged= function(){
    p.fill('black')

    p.ellipse(p.mouseX, p.mouseY, 5,5)

  }
}
