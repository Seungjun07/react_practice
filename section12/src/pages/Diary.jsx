import { useNavigate, useParams } from "react-router-dom"
import Header from "../components/Header";
import Button from "../components/Button";
import Viewer from "../components/Viewer";
import useDiary from "../hooks/useDiary";
import { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";
import { getStringedDate } from "../util/get-stringed-date";
import usePageTitle from "../hooks/usePageTitle";

export default function Diary() {
    const params = useParams();
    let nav = useNavigate();
    const curDiaryItem = useDiary(params.id);
    usePageTitle(`${params.id}번 일기`)

    if(!curDiaryItem){
        return <div>데이터 로딩중...!</div>;
    }
    const {createdDate, emotionId, content} = curDiaryItem;
    const title = getStringedDate(new Date(createdDate));

    return (
        <div>
            <Header title={`${title} 기록`}
                leftChild={<Button text={'< 뒤로 가기'} onClick={() => nav(-1)} />}
                rightChild={<Button text={'수정하기'} onClick={() => nav(`/edit/${params.id}`)} />}
            />
            <Viewer emotionId={emotionId} content={content}/>

        </div>
    )
}