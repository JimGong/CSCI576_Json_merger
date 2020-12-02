const fs = require('fs');
const path = require('path');

const currentJSONFolderPath = "current_json";
const replacementPath = 'replacement_part';
const outputPath = "output_json"

const REPLACEMENT = {};

function readFullJson(replacePartName) {
	const files = fs.readdirSync(currentJSONFolderPath);
	files.forEach(file => {
		if (file.endsWith(".json")) {
			const cur = readJSONFile(path.join(currentJSONFolderPath, file))
			if (REPLACEMENT[cur.video_name]) {
				cur[replacePartName] = REPLACEMENT[cur.video_name];
				writeToOutput(path.join(outputPath, file), cur)
			}
		}
	})
}

function readReplacement() {
	const files = fs.readdirSync(replacementPath);
	files.forEach(file => {
		if (file.endsWith(".json")) {
			const cur = readJSONFile(path.join(replacementPath, file))
			const filename = file.split(".")[0];
			REPLACEMENT[filename] = cur;
		}
	})
}

function readJSONFile(filePath) {
	return JSON.parse(fs.readFileSync(filePath));
}

function writeToOutput(filePath, jsonObject) {
	fs.writeFileSync(filePath, JSON.stringify(jsonObject, null, 2));
}


readReplacement();
readFullJson('color');

console.log("replacement", Object.keys(REPLACEMENT).length)
