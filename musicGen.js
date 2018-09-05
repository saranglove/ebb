var audioCtx = new (window.AudioContext || window.webkitAudioContext || window.audioContext);

function beep(duration, frequency, type, tail_note) {
    const DEFAULT_DURATION = 250;
    var oscillator = audioCtx.createOscillator();
    var gainNode = audioCtx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    if (frequency){oscillator.frequency.value = frequency;}
    if (type){oscillator.type = type;}

    oscillator.start();

    setTimeout(function(){gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + tail_note);},
        (duration ? duration : DEFAULT_DURATION));
};


function randomZenMelody() {
    function genNote() {
        const ALL_NOTES = notes.length + 1;
        return Math.floor(Math.random() * ALL_NOTES);
    };

    function genTime() {
        return (Math.floor((Math.random() * 128) + 1) * 300)
    };

    function genRhythm() {
        return Math.floor(((Math.random() * 6) + 1) * 200) + 1000
    };

    beep(200, notes[genNote()], "sine", 4);

    for (var i = 0; i < 100; i++) {
      setTimeout(function() {beep(genRhythm(), notes[genNote()], "sine", 4)}, genTime());
    };
};

var notes = [
    130.8,
    130.8,
    196.0,
    261.6,
    261.6,
    293.7,
    329.6,
    392.0,
    440.0,
    523.3,
    587.3,
    659.3,
    784.0,
    880.0,
    1047
  ];