import { isEqual } from "lodash";
import { useEffect, useRef, useState } from "react";

export function useClickOutside(callback, args) {
	const [memoArgs, setMemoArgs] = useState();
	const ref = useRef(null);

	// This is to avoid infinite loops in the useEffect as args contains nested objects
	useEffect(() => {
		if (!isEqual(memoArgs, args)) {
			setMemoArgs(args);
		}
	}, [args, memoArgs]);

	useEffect(() => {
		const element = ref.current;
		const event = memoArgs?.mouseup ? "mouseup" : "mousedown";

		function clickHandler(e) {
			try {
				if (!element) throw new Error("Ref must be assigned to an element.");
				if (memoArgs?.condition === false) return;
				if (!element.contains(e.target)) callback(element);
			} catch (error) {
				console.error(error);
				if (memoArgs?.onError) memoArgs.onError(error);
			}
		}

		document.addEventListener(event, clickHandler);

		return () => {
			document.removeEventListener(event, clickHandler);
		};
	}, [callback, memoArgs]);

	return ref;
}
