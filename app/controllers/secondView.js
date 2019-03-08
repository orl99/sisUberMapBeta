var mainView1 = $.mainView;
  

  var matrixAni = Ti.UI.create2DMatrix();
  matrixAni = matrixAni.translate(100, 0);
  var carAnimation = Ti.UI.createAnimation({
    transform: matrixAni,
    duration: 2000
  });

  var autoImage = Ti.UI.createImageView({
    image: '//images/sisUberCarBeta2.png',
    width: 100,
    height: Ti.UI.SIZE,
  });

  mainView1.add(autoImage);
  
  mainView1.animate(carAnimation);

  $.secondView.open();