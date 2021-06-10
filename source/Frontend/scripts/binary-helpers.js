export function binaryHelper(string){
	return string;
}

export function imgToBinary(file) {
	return new Promise(function(resolve, reject) {
		let reader = new FileReader();
		reader.onload = function(event) {
			resolve(event.target.result);
		};
		reader.onerror = function(event) {
			reject(event);
		};
		reader.readAsBinaryString(file);
	});
}

export function binaryToImgUrl(encoded) {
	return "data:image;base64," + btoa(encoded);
}

