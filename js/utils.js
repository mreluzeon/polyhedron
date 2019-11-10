function getRandomHue() {
	return Math.floor(Math.random() * 360);
}

function getAudioAnalyser(audio) {
	const contextClass = (window.AudioContext || 
		window.webkitAudioContext || 
		window.mozAudioContext || 
		window.oAudioContext || 
		window.msAudioContext);
	if (contextClass) {
		var audioCTX = new contextClass();
	} else {
		alert("Web Audio API is not supported on your device and/or browser.");
	}

	const source = audioCTX.createMediaElementSource(audio);
	const analyser = audioCTX.createAnalyser();

	source.connect(analyser);
	source.connect(audioCTX.destination);

	return analyser;
}

function getBeatValue(analyser) {
	let data = new Uint8Array(analyser.frequencyBinCount);
	analyser.getByteFrequencyData(data);

	let all = [];
	for (let i = 0; i < data.length; ++i) {
		all.push(data[i]);
	}

	let beat = (all.reduce((a, b) => a + b) / all.length).toFixed(1);

	return beat;
}

function getRandomCode(score) {
	codeLength = Math.floor(score * 0.2) + 3;
	code = [];

	for (let i = 0; i < codeLength; ++i) {
		code.push("ABCDEF".split("")[Math.floor(Math.random() * 6)]);
	}

	return code;
}
