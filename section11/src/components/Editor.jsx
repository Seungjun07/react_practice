import { useContext, useRef, useState } from 'react';
import './Editor.css';
import { TodoDispatchContext } from '../App';

export default function Editor() {
    const { onCreate } = useContext(TodoDispatchContext);

    let [content, setContent] = useState('');
    let contentRef = useRef();

    function onChangeContent(e) {
        setContent(e.target.value);
    };

    function onKeyDown(e) {
        if (e.keyCode === 13) {
            onSubmit();
        }
    };

    function onSubmit() {
        if (content === '') {
            contentRef.current.focus();
            return;
        }
        onCreate(content);
        setContent('');
    };

    return (
        <div className="Editor">
            <input
                ref={contentRef}
                value={content}
                onKeyDown={onKeyDown}
                onChange={onChangeContent}
                placeholder="새로운 Todo..."
            />
            <button onClick={onSubmit}>추가</button>
        </div>
    )
}