import { useEffect, useState } from "react";
import { VscDebugRestart } from "react-icons/vsc";


function Timer() {
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(true);
    useEffect(() => {
        var interval; 
        if (running) {
            interval = setInterval(() => {
                setTime((prev) => prev + 1);
            }, 1000);
        }
        return () => {
            clearInterval(interval);
        };
    }, [running]);
    
    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="flex cursor-pointer">
            <h1 className="px-1" onClick={()=>setRunning(!running)}>{formatTime(time)}</h1>
            <VscDebugRestart className="mt-1" onClick={()=>{setTime(0);setRunning(false)}}/>
        </div>
    );
}

export default Timer;
