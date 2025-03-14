import { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";
import { useNavigate, useParams } from "react-router-dom";

const useDiary = ({ id }) => {
    const data = useContext(DiaryStateContext);
    const params = useParams();
    const [curDiaryItem, setCurDiaryItem] = useState();
    const nav = useNavigate();
    
    useEffect(() => {
        const currentDiaryItem = data.find(
            (item) => String(item.id) === String(params.id)
        );

        if (!currentDiaryItem) {
            window.alert('존재하지 않는 일기입니다.');
            nav('/', { replace: true });
        }

        setCurDiaryItem(currentDiaryItem);
    }, [params.id, data]);

    return curDiaryItem;
};

export default useDiary;