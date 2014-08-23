var five = require("johnny-five"),
    keypress = require("keypress");


five.Board().on("ready", function() {

    // Initialize the RGB LED
    var led = new five.Led.RGB({
        pins: {
            red: 6,
            green: 5,
            blue: 3
        },
        isAnode: true
    });

    // RGB LED alternate constructor
    // This will normalize an array of pins in [r, g, b]
    // order to an object (like above) that's shaped like:
    // {
    //   red: r,
    //   green: g,
    //   blue: b
    // }
    //var led = new five.Led.RGB([3,5,6]);

    // Add led to REPL (optional)
    this.repl.inject({
        led: led
    });

    // Turn it on and set the initial color
    led.on();
    led.color("#FF0000");

    // Listen for user input to change the RGB color
    process.stdin.resume();
    process.stdin.setEncoding("utf8");
    process.stdin.setRawMode(true);

    var keymap = {
        r: "#FF69B4", // red
        g: "#00FF00", // green
        b: "#0000FF", // blue
        w: "#F0F0F0", // white
        q: "#9400D3"
    };

    process.stdin.on("keypress", function(ch, key) {

        if (!key) {
            return;
        }

        if (keymap[key.name]) {
            led.color(keymap[key.name]);
        } else {
            led.off();
        }

    });

});