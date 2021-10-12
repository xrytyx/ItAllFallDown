const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Mouse = Matter.Mouse;
const MouseConstraint = Matter.MouseConstraint;
const Constraint = Matter.Constraint;

const drawMouse = Helpers.drawMouse;
const drawBody = Helpers.drawBody;
const drawConstraint = Helpers.drawConstraint;

let engine;

let ground;
let leftWall;
let rightWall;


// JavaScript Objects for 1 honeycomb module

// Triangle01: Bottom Big Triangle
let bigTriangleBottom01 = {
  colorR: 245,
  colorG: 238,
  colorB: 128,
  x1: 60,
  y1: 440,
  x2: 300,
  y2: 580,
  x3: 300,
  y3: 300
}

// Triangle02: Right Big Triangle
let bigTriangleBottom02 = {
  colorR: 221,
  colorG: 167,
  colorB: 79,
  x1: 300,
  y1: 580,
  x2: 540,
  y2: 440,
  x3: 300,
  y3: 300
}

// Triangle03: Right big triangle
let bigTriangleBottom03 = {
  colorR: 184,
  colorG: 108,
  colorB: 44,
  x1: 540,
  y1: 440,
  x2: 540,
  y2: 160,
  x3: 300,
  y3: 300
}

// Triangle04: top big triangle
let bigTriangleBottom04 = {
  colorR: 221,
  colorG: 167,
  colorB: 79,
  x1: 540,
  y1: 160,
  x2: 300,
  y2: 20,
  x3: 300,
  y3: 300
}

// Triangle05: left big triangle
let bigTriangleBottom05 = {
  colorR: 221,
  colorG: 167,
  colorB: 79,
  x1: 300,
  y1: 20,
  x2: 60,
  y2: 160,
  x3: 300,
  y3: 300
}

// Triangle06: left big triangle
let bigTriangleBottom06 = {
  colorR: 221,
  colorG: 167,
  colorB: 79,
  x1: 60,
  y1: 160,
  x2: 60,
  y2: 440,
  x3: 300,
  y3: 300
}

// TriangleS01 bottom small triangle
let smallTriangle01 = {
  colorR: 245,
  colorG: 238,
  colorB: 128,
  x1: 180,
  y1: 370,
  x2: 300,
  y2: 440,
  x3: 300,
  y3: 300
}

// TriangleS02 bottom small triangle
let smallTriangle02 = {
  colorR: 245,
  colorG: 238,
  colorB: 128,
  x1: 300,
  y1: 440,
  x2: 420,
  y2: 370,
  x3: 300,
  y3: 300
}

// TriangleS03 bottom small triangle
let smallTriangle03 = {
  colorR: 245,
  colorG: 238,
  colorB: 128,
  x1: 420,
  y1: 370,
  x2: 420,
  y2: 230,
  x3: 300,
  y3: 300

}

// TriangleS04 bottom small triangle
let smallTriangle04 = {
  colorR: 245,
  colorG: 238,
  colorB: 128,
  x1: 420,
  y1: 230,
  x2: 300,
  y2: 160,
  x3: 300,
  y3: 300

}

// TriangleS05 bottom small triangle
let smallTriangle05 = {
  colorR: 245,
  colorG: 238,
  colorB: 128,
  x1: 300,
  y1: 160,
  x2: 180,
  y2: 230,
  x3: 300,
  y3: 300

}

// TriangleS06 bottom small triangle
let smallTriangle06 = {
  colorR: 245,
  colorG: 238,
  colorB: 128,
  x1: 180,
  y1: 230,
  x2: 180,
  y2: 370,
  x3: 300,
  y3: 300

}

// i need a list of javscript objects - put into an array
let triangleArray = [bigTriangleBottom01, bigTriangleBottom02, bigTriangleBottom03, bigTriangleBottom04, bigTriangleBottom05, bigTriangleBottom06, smallTriangle01, smallTriangle02, smallTriangle03, smallTriangle04, smallTriangle05, smallTriangle06];
let triangleVertices = [];
let triangleBodies = [];

function setup() {
  const canvas = createCanvas(800, 800);

  // create an engine
  engine = Engine.create();

  // add stiff global constraint
  poly1 = Bodies.polygon(300, 200, 5, 40);
  constraint1 = Constraint.create({
    pointA: { x: 150, y: 50 },
    bodyB: poly1,
    pointB: { x: -10, y: -20 }
  });


  // make for loop
    // for loop will go through each jso to get the vertices for the triangles
  for (i = 0; i < triangleArray.length; i++) {
    triangleVertices[i] = [
      {x: triangleArray[i].x1, y: triangleArray[i].y1},
      {x: triangleArray[i].x2, y: triangleArray[i].y2},
      {x: triangleArray[i].x3, y: triangleArray[i].y3}
    ];
      // lastly, we will create triangles
      triangleBodies[i] = Bodies.fromVertices(100, 200, triangleVertices[i]);
      // add triangles to world
      World.add(engine.world, triangleBodies[i]);
  }



  // World.add(engine.world, [bigTriangleBottom01_matter, bigTriangleBottom02_matter, bigTriangleBottom03_matter,
  //    bigTriangleBottom04_matter, bigTriangleBottom05_matter, bigTriangleBottom06_matter, smallTriangle01_matter,
  //    smallTriangle02_matter, smallTriangle03_matter, smallTriangle04_matter, smallTriangle05_matter, smallTriangle06_matter, poly1, constraint1]);


  ground = Bodies.rectangle(400, 800, 810, 10, {
    isStatic: true, angle: Math.PI * 0.0
  });
  leftWall = Bodies.rectangle(-50, 800, 100, 2000, {
    isStatic: true, angle: Math.PI * 0.0
  });
  rightWall = Bodies.rectangle(850, 800, 100, 2000, {
    isStatic: true, angle: Math.PI * 0.0
  });

  // add all of the bodies to the world
  World.add(engine.world, [ground, leftWall, rightWall]);

  // setup mouse
  let mouse = Mouse.create(canvas.elt);
  let mouseParams = {
    mouse: mouse,
    constraint: { stiffness: 0.05, angularStiffness: 0 }
  }
  mouseConstraint = MouseConstraint.create(engine, mouseParams);
  mouseConstraint.mouse.pixelRatio = pixelDensity();
  World.add(engine.world, mouseConstraint);

  // run the engine
  Engine.run(engine);
}

function draw() {
  background(0);

  for (i = 0; i < triangleArray.length; i++) {
    // fill(221,167,79);
    fill(triangleArray[i].colorR, triangleArray[i].colorG, triangleArray[i].colorB)
    drawBody(triangleBodies[i]);
  }

  fill(200);
  drawBody(ground);
  drawBody(leftWall);
  drawBody(rightWall);


    // drawMouse(mouseConstraint);
}
