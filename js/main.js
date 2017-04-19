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
    setTimeout(main.timeLoop, 1000);
};

main.ready = function () {
    $(".game-button").click(main.startNewGame);
    $(".icon-game").click(function () {main.toggleWindow("#window-game")});
    $(".icon-music").click(function () {main.toggleWindow("#window-music")});
    $(".window").draggable({ handle: $(this).find(".window-title"), stack: ".window" })
        .on("mouseup", main.bringToFront);
    main.timeLoop();
};
$(document).ready(main.ready);
