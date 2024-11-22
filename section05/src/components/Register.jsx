//간단한 회원가입 폼
// 1. 이름
// 2. 생년월일
// 3. 국적
// 4. 자기소개

import { useState, useRef } from "react"

export default function Register() {

    let [input, setInput] = useState({
        name: '',
        birth: '',
        country: '',
        bio: '',
    });

    let countRef = useRef(0);
    let inputRef = useRef();

    function onChange(e) {
        countRef.current++;
        console.log(countRef.current);
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    };

    function onSubmit() {
        if (input.name === '') {
            // 이름을 입력하는 DOM 요소에 포커스
            inputRef.current.focus();
        }
    }

    return (
        <div>
            <div>
                <input
                    ref={inputRef}
                    name="name"
                    value={input.name}
                    onChange={onChange}
                    placeholder="이름"
                />
            </div>

            <div>
                <input
                    name="birth"
                    type="date"
                    value={input.birth}
                    onChange={onChange}
                />
            </div>

            <div>
                <select
                    name='country'
                    value={input.country} onChange={onChange}>
                    <option></option>
                    <option value='kr'>한국</option>
                    <option value={'uk'}>영국</option>
                    <option value={'us'}>미국</option>
                </select>
                {input.country}
            </div>

            <div>
                <textarea name='bio' value={input.bio} onChange={onChange} />
                {input.bio}
            </div>

            <button onClick={onSubmit}>제출</button>
        </div>
    )
}