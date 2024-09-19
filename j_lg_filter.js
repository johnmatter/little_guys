inlets = 2;
outlets = 1;
var filter = {};

function setFilter(noteList) {
    filter = {};
    for (var i = 0; i < noteList.length; i++) {
        filter[noteList[i]] = true;
    }
    post("Filter set to: " + noteList.join(", ") + "\n");
}

function processMIDIMessage(note, velocity) {
    if (filter[note % 12]) {
        outlet(0, note, velocity);
        if (velocity > 0) {
            post("Note-on passed: " + note + " " + velocity + "\n");
        } else {
            post("Note-off passed: " + note + "\n");
        }
    } else {
        if (velocity > 0) {
            post("Note-on dropped: " + note + " " + velocity + "\n");
        } else {
            post("Note-off dropped: " + note + "\n");
        }
    }
}

function list() {
    var args = arrayfromargs(arguments);

    if (inlet === 0) {
        setFilter(args);
    } else if (inlet === 1) {
        if (args.length === 2) {
            processMIDIMessage(args[0], args[1]);
        } else {
            post("Invalid MIDI message. Expected NOTE VELOCITY.\n");
        }
    }
}

function clear() {
    if (inlet === 0) {
        filter = {};
    } else {
        post("'clear' command should be sent to left inlet.\n");
    }
}
