import { useState, useMemo } from 'react';
import './List.css';
import TodoItem from './TodoItem';

export default function List({ todos, onUpdate, onDelete }) {

    let [search, setSearch] = useState('');

    function onChangeSearch(e) {
        setSearch(e.target.value);
    };

    function getFilteredData() {
        if (search === '') {
            return todos;
        }
        return todos.filter((todo) => {
            return (
                todo.content.toLowerCase().includes(search.toLowerCase())
            );
        });
    };

    const filteredTodos = getFilteredData();

    const { totalCount, doneCount, notDoneCount } = useMemo(() => {
        console.log('이거 호출')
        const totalCount = todos.length;
        const doneCount = todos.filter((todo) => todo.isDone).length;
        const notDoneCount = totalCount - doneCount;

        return {
            totalCount,
            doneCount,
            notDoneCount,
        }
    }, [todos])

    return (
        <div className="List">
            <h4>Todo List 🌱</h4>

            <div>
                <div>total: {totalCount}</div>
                <div>done: {doneCount}</div>
                <div>notDone: {notDoneCount}</div>
            </div>

            <input
                value={search}
                onChange={onChangeSearch}
                placeholder="검색어를 입력하세요"
            />
            <div className='todos_wrapper'>
                {filteredTodos.map((todo) => {
                    return (
                        <TodoItem key={todo.id} {...todo} onUpdate={onUpdate} onDelete={onDelete} />
                    )
                })}
            </div>
        </div>
    );
};