import { useState, useEffect } from "react";

// Simple useLocalStorage hook
export default function useLocalStorage(key, initialValue) {
	const [state, setState] = useState(() => {
		try {
			const value = window.localStorage.getItem(key);
			return value ? JSON.parse(value) : initialValue;
		} catch (e) {
			console.error("useLocalStorage read error:", e);
			return initialValue;
		}
	});

	useEffect(() => {
		try {
			window.localStorage.setItem(key, JSON.stringify(state));
		} catch (e) {
			console.error("useLocalStorage write error:", e);
		}
	}, [key, state]);

	return [state, setState];
}