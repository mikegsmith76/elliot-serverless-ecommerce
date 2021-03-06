const { readFileSync, writeFileSync } = require("fs");
const { resolve } = require("path");
const glob = require("glob");

const defaultMessages = glob
	.sync("./src/lang/.messages/**/*.json")
	.map(filename => readFileSync(filename, "utf8"))
	.map(file => JSON.parse(file))
	.reduce((messages, descriptors) => {
		descriptors.forEach(({ id, defaultMessage }) => {
			// if (Object.prototype.hasOwnProperty.call(messages, id)) {
			// 	throw new Error(`Duplicate message id: ${id}`);
			// }
			messages[id] = defaultMessage;
		});
		return messages;
	}, {});

const strings = readFileSync("./src/lang/en.json", "utf8");
const messages = {
	...JSON.parse(strings),
	...defaultMessages
};

writeFileSync("./src/lang/en.json", JSON.stringify(messages, null, 2));
console.log(`> Wrote default messages to: "${resolve("./src/lang/en.json")}"`);
