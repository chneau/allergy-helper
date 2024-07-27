import { type ImageLike, createScheduler, createWorker } from "tesseract.js";

const scheduler = createScheduler();
createWorker("eng").then((x) => scheduler.addWorker(x));

export const recognize = async (url: ImageLike) => {
	const result = await scheduler.addJob("recognize", url);
	return result.data.text;
};
