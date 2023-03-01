let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
let int = null;


export const beginTimer = () => {
        if (int !== null) {
            clearInterval(int);
        }
        int = setInterval(displayTimer, 10);
    };

export const endTimer = () => {
        clearInterval(int);
        [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
};

export const displayTimer = () => {
    seconds++;
    if (seconds == 60) {
        seconds = 0;
        minutes++;
        if (minutes == 60) {
            minutes = 0;
            hours++;
        }
    }
    return [seconds, minutes, hours]
};
        
 