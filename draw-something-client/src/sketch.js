const sketch = function (p){
  p.setup = function(){
    p.createCanvas(500,300)
    p.background('white')
  }
  p.draw = function(){
  }
  p.mouseDragged= function(){
    p.fill('black')
    p.ellipse(p.mouseX, p.mouseY, 5,5)
  }
  // p.mousePressed = function(){
  //   p.clear()
  // }
}

export default sketch
