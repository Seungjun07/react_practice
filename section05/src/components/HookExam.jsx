import useInput from "../Hooks/useInput";

export default function HookExam() {

    let [input, onChange] = useInput();
    let [input2, onChange2] = useInput();


    return (
        <div>
            <input value={input} onChange={onChange} />
            {input}
            <input value={input2} onChange={onChange2} />
            {input2}
        </div>
    )
}