import { useNavigate, useParams } from "react-router-dom"
import Header from "../components/Header";
import Editor from "../components/Editor";
import Button from "../components/Button";
import { useContext, useEffect, useState } from "react";
import { DiaryDispatchContext, DiaryStateContext } from "../App";
import useDiary from "../hooks/useDiary";
import usePageTitle from "../hooks/usePageTitle";

export default function Edit() {
    const params = useParams();
    let nav = useNavigate();
    let { onDelete, onUpdate } = useContext(DiaryDispatchContext);
    const curDiaryItem = useDiary(params.id);
    usePageTitle(`${params.id}번 일기 수정`)
   

    function onClickDelete() {
        if (window.confirm("일기를 정말 삭제할까요? 다시 복구되지 않아요!")) {
            onDelete(params.id);
            nav('/', { replace: true });
        }
    }

    function onSubmit(input) {
        if (window.confirm('일기를 정말 수정할까요?')) {
            onUpdate(params.id, input.createdDate.getTime(), input.emotionId, input.content)
            nav("/", { replace: true });
        }
    };

    return (
        <div>
            <Header title={'일기 수정하기'}
                leftChild={<Button text={'< 뒤로 가기'} onClick={() => nav(-1)} />}
                rightChild={<Button text={'삭제하기'} type={"NEGATIVE"} onClick={onClickDelete} />}
            />
            <Editor initData={curDiaryItem} onSubmit={onSubmit} />
        </div>
    )
}