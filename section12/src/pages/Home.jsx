import { useState, useContext } from "react";
import { DiaryStateContext } from "../App";

import Button from "../components/Button";
import DiaryList from "../components/DiaryList";
import Header from "../components/Header";
import usePageTitle from "../hooks/usePageTitle";

function getMonthlyData(pivotDate, data) {
    // 숫자값 형식 1일 0시0분0초
    const beginTime = new Date(pivotDate.getFullYear(), pivotDate.getMonth(), 1, 0, 0, 0).getTime();
    // 이전 달의 마지막 날로 설정됨
    const endTime = new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1, 0, 23, 59, 59).getTime();
    return data.filter((item) => beginTime <= item.createdDate && item.createdDate <= endTime);
}

export default function Home() {
    const data = useContext(DiaryStateContext);
    let [pivotDate, setPivotDate] = useState(new Date());
    usePageTitle('감정 일기장')

    const monthlyData = getMonthlyData(pivotDate, data);

    function onIncreaseMonth() {
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
    };
    function onDecreaseMonth() {
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
    }

    return (
        <div>
            <Header
                title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`}
                leftChild={<Button text={"<"} onClick={onDecreaseMonth} />}
                rightChild={<Button text={">"} onClick={onIncreaseMonth} />}
            />
            <DiaryList data={monthlyData}/>
        </div>
    )
}