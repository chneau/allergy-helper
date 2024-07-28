import { useState } from "react";
import { recognize } from "./recognize";

export const App = () => {
	const [text, setText] = useState("");
	return (
		<div>
			<button
				type="button"
				onClick={() =>
					document.querySelector<HTMLInputElement>("#loadPicture")?.click()
				}
			>
				Take picture
				<form onSubmit={() => false} hidden>
					<input
						id="loadPicture"
						type="file"
						accept="image/*"
						// @ts-expect-error
						capture="camera"
						onChange={(e) => {
							const file = e.target.files?.[0];
							if (!file) return;
							setText("Loading...");
							recognize(file)
								.then((x) => setText(x.data.text))
								.finally(() => {
									e.target.value = "";
								});
						}}
					/>
				</form>
			</button>
			<pre>{text}</pre>
		</div>
	);
};
