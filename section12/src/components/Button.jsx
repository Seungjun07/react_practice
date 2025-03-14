import './Button.css'

export default function Button({ text, type, onClick }) {
    return (
        <button onClick={onClick} className={`Button Button_${type}`}>
            {text}
        </button>
    )
};