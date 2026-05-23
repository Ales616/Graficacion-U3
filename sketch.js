// Classifier Variable
  let classifier;
  // Model URL
  let imageModelURL = './my_model/';
  // Video
  let video;
  let flippedVideo;
  // To store the classification
  let label = "";
  let ryu

  // Load the model first
  function preload() {
    //lassifier = ml5.imageClassifier(imageModelURL + 'model.json');
     console.log("preload start");
    ryu = loadModel("./models/untitled.obj")
    ryuTextura = loadImage("./textures/skin_ryu_002_col.png")
  }

  function setup() {
    createCanvas(1280, 720, WEBGL);
    // Create the video
    video = createCapture(VIDEO);
    video.size(320, 240);
    video.hide();

    //flippedVideo = ml5.flipImage(video);
    // Start classifying
    //classifyVideo();
  }

  function draw() {
    background(30);
    // Draw the video
   // image(flippedVideo, 0, 0); esta linea peta todo
    fill(255);
    textSize(32);
    textAlign(CENTER, CENTER);

    text("TEST", width / 2, height / 2);

    push();
    translate(-width / 2 + 150, -height / 2 + 100);  
    texture(video);
    plane(300, 200);
    pop();

    push()
    //texture(ryuTextura) se ve bien feo mejor lo dejo asi xdddd
    ambientLight(100);
    directionalLight(255);
    normalMaterial()
    translate(0,200,0)
    rotateX(350)
    rotateZ(600)
    scale(800)
    model(ryu)
    pop()

    resetMatrix();
    translate(-width / 2, -height / 2);

    push();
    resetMatrix();
    fill(255);
    textSize(24);
    textAlign(CENTER, CENTER);
    text(label, width / 2, height - 30); // no jala
    pop();
  }

  // Get a prediction for the current video frame
  function classifyVideo() {
    flippedVideo = ml5.flipImage(video)
    classifier.classify(flippedVideo, gotResult);
    flippedVideo.remove();

  }

  // When we get a result
  function gotResult(error, results) {
    // If there is an error
    if (error) {
      console.error(error);
      return;
    }
    // The results are in an array ordered by confidence.
    // console.log(results[0]);
    label = results[0].label;
    // Classifiy again!
    classifyVideo();
  }