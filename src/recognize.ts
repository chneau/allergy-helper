import {
	type ImageLike,
	OEM,
	createScheduler,
	createWorker,
} from "tesseract.js";

const scheduler = createScheduler();
createWorker("eng", OEM.TESSERACT_LSTM_COMBINED, {
	logger: (m) => m.progress === 1 && console.log(m),
}).then((x) => scheduler.addWorker(x));

export const recognize = async (url: ImageLike) =>
	await scheduler.addJob("recognize", url, { rotateAuto: true });
