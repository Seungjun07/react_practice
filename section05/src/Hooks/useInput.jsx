import { useState } from "react";

function useInput() {
    let [input, setInput] = useState('');

    function onChange(e) {
        setInput(e.target.value);
    };

    return [input, onChange];
}

export default useInput;