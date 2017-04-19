var main = {};
main.startNewGame = function (event) {
    event.preventDefault();
    var urls = ["//lexer.rolandoislas.com/random/2"];
    window.location = urls[Math.floor(Math.random() * (urls.length - 1))];
};

main.toggleWindow = function (id) {
    var windowGame = $(id);
    var z = windowGame.css("z-index");
    var visible = windowGame.is(":visible");
    if (visible && z !== "100")
        main.bringToFront.call(windowGame);
    else if (visible && z === "100")
        windowGame.hide();
    else if (!visible) {
        windowGame.show();
        main.bringToFront.call(windowGame);
    }
};

main.bringToFront = function (event) {
    if (typeof event !== "undefined")
        event.preventDefault();
    var element = $(this);
    $(".window").css("z-index", 1);
    element.css("z-index", 100);
};

main.timeLoop = function () {
    $(".time").html(new Date().toLocaleTimeString());
    if (main.running)
        setTimeout(main.timeLoop, 1000);
};

main.backgroundLoop = function () {
    var background = $(".game-background");
    var pos = parseInt(background.css("margin-left"));
    if (pos <= -900)
        pos = 0;
    background.css("margin-left", pos - 10);
    if (main.running)
        setTimeout(main.backgroundLoop, 1000)
};

main.startLoop = function () {
    main.running = true;
    main.timeLoop();
    main.backgroundLoop();
};

main.iframeClicked = function () {
    var iframeOverlap = $(this);
    iframeOverlap.css("z-index", -1);
};

main.iframeLeave = function () {
    var iframeOverlap = $(this);
    iframeOverlap.css("z-index", 1);
};

main.ready = function () {
    $(".game-button-new-game").click(main.startNewGame);
    $(".icon-game").click(function () {main.toggleWindow("#window-game")});
    $(".icon-music").click(function () {main.toggleWindow("#window-music")});
    $(".window").draggable({ handle: $(this).find(".window-title"), stack: ".window" })
        .on("mouseup", main.bringToFront);
    $(".iframe-overlap").click(main.iframeClicked).on("mouseleave", main.iframeLeave);
    $(window).blur(function(){main.running = false});
    $(window).focus(main.startLoop);
    main.startLoop()
};
$(document).ready(main.ready);
