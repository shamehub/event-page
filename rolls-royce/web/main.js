var dtSrc = "";
var u = navigator.userAgent;
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU./); //ios终端

var queue = new createjs.LoadQueue();
//SoundJS默认用的是复杂的Web Audio接口，这会导致加载音频变慢，所以显示注册使用html的audio即可
// createjs.Sound.registerPlugins([createjs.HTMLAudioPlugin]);

// 音频
queue.installPlugin(createjs.Sound);
// 背景和动图
queue.on("complete", handleComplete, this);
queue.on("progress", handleProgress, this);

function check_webp_feature(feature, callback) {
  var kTestImages = {
    lossy: "UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",
    lossless: "UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==",
    alpha: "UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==",
    animation: "UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA"
  };
  var img = new Image();
  img.onload = function () {
    var result = (img.width > 0) && (img.height > 0);
    callback(feature, result);
  };
  img.onerror = function () {
    callback(feature, false);
  };
  img.src = "data:image/webp;base64," + kTestImages[feature];
}

check_webp_feature('animation', function(feature,result){
  if (result) {                             
    dtSrc = "./img/out3.webp";
  } else {                               
    dtSrc = "./img/out2.png";
  }
  queue.loadManifest([
    { id: "bj", src: './img/RRMC-Poster-10-copy.jpg' },
    { id: "sound", src: "./music/test.mp3" },
    { id: "dt", src: dtSrc }
  ])
});

// 设置并发数
// queue.setMaxConnections(5);
// queue.maintainScriptOrder = true;
// queue.loadManifest(loadManifest);

function handleComplete() {
  if (isiOS) {     //iOS设备用户点击播放
    document.getElementById('num').style.display = "none";
    document.getElementById('play').style.display = "inline";
    document.getElementById('play').onclick = function () {
      document.getElementById('loading').style.display = "none"
      playAnimation();
    }
  } else {     //非iOS设备直接播放
    document.getElementById('loading').style.display = "none"
    playAnimation();
  }
}

function handleProgress() {
  var persent = Math.floor(queue.progress * 100) + "%";
  console.log("Progress:", persent);
  document.getElementById('num').innerHTML = "资源加载中（" + persent + "）";
}

function playAnimation() {
  var audio = createjs.Sound.play("sound");
  setTimeout(function () {
    audio.stop();
    audio.destroy();
  }, 6000);
  var image1 = queue.getResult("bj");
  image1.setAttribute("id", "bj")
  var image2 = queue.getResult("dt");
  image2.setAttribute("id", "dt")
  var Rr = document.getElementById('rr');
  Rr.appendChild(image1);
  Rr.appendChild(image2);
}