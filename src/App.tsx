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
				<form
					onSubmit={(e) => {
						e.preventDefault();
						return false;
					}}
					hidden
				>
					<input
						id="loadPicture"
						type="file"
						accept="image/*"
						// @ts-expect-error
						capture="camera"
						onChange={async (e) => {
							const file = e.target.files?.[0];
							if (!file) return;
							setText("Loading...");
							const result = await recognize(file).finally(() => {
								e.target.value = "";
							});
							setText(
								`${result.data.text}\n\nconfidence: ${result.data.confidence} - rotateRadians: ${result.data.rotateRadians}`,
							);
						}}
					/>
				</form>
			</button>
			<pre style={{ textWrap: "wrap" }}>{text}</pre>
		</div>
	);
};
