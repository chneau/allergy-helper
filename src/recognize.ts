import {
	type ImageLike,
	OEM,
	PSM,
	createScheduler,
	createWorker,
} from "tesseract.js";

const scheduler = createScheduler();
const workerAdded = createWorker("eng", OEM.DEFAULT, {
	logger: (m) => m.progress === 1 && console.log(m),
}).then((x) => {
	x.setParameters({ tessedit_pageseg_mode: PSM.AUTO });
	return scheduler.addWorker(x);
});

export const recognize = async (url: ImageLike) => {
	await workerAdded;
	return await scheduler.addJob("recognize", url, { rotateAuto: true });
};
