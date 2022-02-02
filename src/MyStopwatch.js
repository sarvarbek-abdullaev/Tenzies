import React from "react";
export default function MyStopwatch(props) {
    function handlingZeroes(a) {
        if (a < 10) {
            return "0" + a;
        } else {
            return a;
        }
    }

    return (
        <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "5rem" }}>
                <span>{handlingZeroes(props.minutes)}</span>:
                <span>{handlingZeroes(props.seconds)}</span>
            </div>
        </div>
    );
}
