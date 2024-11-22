import { useEffect } from "react"

export default function Even() {

    useEffect(() => {
        return () => {
            console.log('unmount')
         };
    }, [])

    return (
        <div>even</div>
    )
};