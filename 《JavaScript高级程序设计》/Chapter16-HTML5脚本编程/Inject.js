

//var IframeOnClick = {
//resolution: 200,
//iframes: [],
//interval: null,
//Iframe: function() {
//    this.element = arguments[0];
//    this.cb = arguments[1];
//    this.hasTracked = false;
//},
//track: function(element, cb) {
//    this.iframes.push(new this.Iframe(element, cb));
//    if(!this.interval) {
//        var _this = this;
//        this.interval = setInterval(function() {
//            _this.checkClick();
//        }, this.resolution);
//    }
//},
//checkClick: function() {
//    if (document.activeElement) {
//        var activeElement = document.activeElement;
//        for (var i in this.iframes) {
//
//            if (activeElement === this.iframes[i].element) { // user is in this Iframe
//                if(this.iframes[i].hasTracked == false) {
//                    this.iframes[i].cb.apply(window, []);
//                    this.iframes[i].hasTracked = true;
//                }
//            } else {
//                this.iframes[i].hasTracked = false;
//            }
//        }
//    }
//}
//};

var timer = null;
var stopTime = false;

function videoEvent(video) {
    var scheme = "videohandler://";
    var url = video.src;
    video.setAttribute('preload', 'none');
    video.setAttribute('playsinline', true);
    video.setAttribute('webkit-playsinline', true);
    video.setAttribute('controls','');
    video.setAttribute('autoplay', false);
    video.autoplay = false;
    video.playsinline = true;
        
    ///重置
    function resetEventPlay() {
        video.playbackRate = 0;
        video.preload = "none";
        video.currentTime = 0;
        video.pause();
        video.setAttribute('preload', 'none');
        video.setAttribute('playsinline', true);
        video.setAttribute('webkit-playsinline', true);
        video.setAttribute('controls','');
        
        window.location = scheme + 'video-play-event';
        setTimeout(function () {
            video.src = "";
            video.src = url;
        }, 200);
    }
    
    //播放开始
    video.addEventListener("play", function () {
        window.webkit.messageHandlers.InjectHTML.postMessage({
            id : "video_play_start",
            videoUrl : url,
            message :"",
            href: window.location.href
        });
        resetEventPlay();
        window.location = scheme + 'video-play';
    });
    
    video.addEventListener("webkitbeginfullscreen", function () {
        window.webkit.messageHandlers.InjectHTML.postMessage({
            id : "video_play_webkitbeginfullscreen",
            videoUrl : url,
            href: window.location.href,
            message :""
        });
        resetEventPlay();
    });
    
    video.addEventListener("loadstart", function () {
//        window.webkit.messageHandlers.InjectHTML.postMessage({
//            id : "video_loadstart",
//            videoUrl : url,
//            href: window.location.href,
//            message :""
//        });
//        resetEventPlay();
//        window.location = scheme + 'video-play';
    });
    
    video.addEventListener("progress", function () {
        window.webkit.messageHandlers.InjectHTML.postMessage({
            id : "video_progress",
            videoUrl : url,
            href: window.location.href,
            message :""
        });
    });
    
    //播放开始
    video.addEventListener("webkitendfullscreen", function () {
        window.webkit.messageHandlers.InjectHTML.postMessage({
            id : "video_play_webkitendfullscreen",
            videoUrl : url,
            href: window.location.href,
            message :""
        });
        resetEventPlay();
    });
    
    //播放中
    video.addEventListener("playing", function () {
        window.webkit.messageHandlers.InjectHTML.postMessage({
        id: "video_playing",
        videoUrl: url,
        href: window.location.href,
        message :""
        });
        resetEventPlay();
    });
    
    //waiting
    video.addEventListener("waiting", function () {
        window.webkit.messageHandlers.InjectHTML.postMessage({
        id: "video_waiting",
        videoUrl: url,
        href: window.location.href,
        message :""
        });
        resetEventPlay();
    });
    
    //pause
    video.addEventListener("pause", function () {
        window.webkit.messageHandlers.InjectHTML.postMessage({
        id: "video_pause",
        videoUrl: url,
        href: window.location.href,
        message :""
        });
    });
    
    //ended
    video.addEventListener("ended", function () {
        window.webkit.messageHandlers.InjectHTML.postMessage({
        id: "video_ended",
        videoUrl: url,
        href: window.location.href,
        message :""
        });
    });
}

///监听视频
function listenVideo() {
    var videos = document.getElementsByTagName("video");
    for (var i = 0; i < videos.length; i++) {
        var video = videos[i];
        window.webkit.messageHandlers.InjectHTML.postMessage({
            id : "video_url",
            url : video.src,
            href: window.location.href
        });
        
        video.controlslist = "nodownload";
        video.preload = "none";
        videoEvent(video);
        stopTime = true;
    }
}

///停止视频
function stopVideo() {
    var videos = document.getElementsByTagName("video");
    for (var i = 0; i < videos.length; i++) {
        var video = videos[i];
        video.playbackRate = 0;
        video.preload = "none";
        video.currentTime = 0;
        video.pause();
        
        window.location = scheme + 'video-play-event';
        setTimeout(function () {
            video.src = "";
            video.src = url;
        }, 200);
    }
}

function reloadIframe() {
    var scheme = "videohandler://";
    window.location = scheme + 'video_iframe';
    var iframes = document.getElementsByTagName("iframe");
    window.webkit.messageHandlers.InjectHTML.postMessage({
        id : "reload_iframe",
        message: iframes.length
    });
    
    window.location.reload();
    for (var i = 0; i < iframes.length; i++) {
        var iframe = iframes[i];
        var src = iframe.src;
        iframe.src = "";
        iframe.src = src + "?ignoreMe=";
    }
}


//监听irame
function listenIFrame() {
    var iframes = document.getElementsByTagName("iframe");
    for (var i = 0; i < iframes.length; i++) {
        var iframe = iframes[i];
        
        function listenClick(obj) {
            
            var src = obj.src;
            obj.contentWindow.document.body.onclick = function() {
                var ifr_document = obj.contentWindow.document;
                var ifr_videos = ifr_document.getElementsByTagName("video");
                var count = ifr_videos.length;
                window.webkit.messageHandlers.InjectHTML.postMessage({
                    id : "iframe_click",
                    url : src,
                    href: window.location.href,
                    message : count
                });
            }
            
            var ifr_document = obj.contentWindow.document;
            var ifr_videos = ifr_document.getElementsByTagName("video");
            for (var i = 0; i < ifr_videos.length; i++) {
                var ifr_video = ifr_videos[i];
                videoEvent(ifr_video);
            }
        }
        
        
        listenClick(iframe);
        iframe.onload = function() {
            
            //ifram加载完成
            var src = iframe.src;
            window.webkit.messageHandlers.InjectHTML.postMessage({
                id : "iframe_onload",
                url: src,
                href: window.location.href,
                message :""
            });
            
            listenClick(iframe);
        };

    }
}
    
function listen() {
    listenVideo();
    listenIFrame();
}

document.onreadystatechange = function() {
    if (doucument.readyState == 'complete') {
        window.webkit.messageHandlers.InjectHTML.postMessage({
            id : "listen_start_complete",
            href: window.location.href
        });
        listen();
    }
}

if('addEventListener' in document){
    document.addEventListener('DOMContentLoaded', function(){
        window.webkit.messageHandlers.InjectHTML.postMessage({
            id : "listen_start_DOM",
            href: window.location.href
        });
              
        listen();
        setTimeout(function () {
            listen();
        }, 500);
        
       var timer = setInterval(function () {
           if (stopTime) {
               clearInterval(timer);
           } else {
               listen();
           }
       }, 1000);
        
        setTimeout(function () {
            clearInterval(timer);
        }, 20000);

    }, false)
}
