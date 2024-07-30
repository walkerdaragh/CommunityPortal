$(document).ready(function() {
    var winHeight = $(window).height();
    var height = (winHeight * 16.6666) / 100; // 1/6th of window height
    var lineHeight = height + "px";

    $("li").css("line-height", lineHeight);
    $("li").css("height", height);

    console.log("Calendar item height set to: " + height);
});
