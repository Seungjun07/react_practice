import './TodoItem.css'

export default function TodoItem({ id, isDone, content, date, onUpdate, onDelete }) {

    function onChangeCheckbox() {
        onUpdate(id);
    };

    function onClickDeleteButton() {
        onDelete(id)
    };

    return (
        <div className="TodoItem">
            <input
                readOnly
                checked={isDone}
                onChange={onChangeCheckbox}
                type="checkbox"
            />
            <div className="content">{content}</div>
            <div className="date">{new Date(date).toLocaleDateString()}</div>
            <button onClick={onClickDeleteButton}>삭제</button>
        </div>
    )
};