

function startWatch(elements,stopWatch) {
    
    //exact timing for each hands
    let curTime = new Date()
    let miliSec = parseInt(curTime.getMilliseconds() / 1000 * 10)
    let sec = parseInt(curTime.getSeconds() / 60 * 10)
    let min = parseInt(curTime.getMinutes() / 60 * 10)

    //all hands property and timing calculation
    let hands = {
        hand_sec: {
            element: elements[2],
            time: parseInt(String(curTime.getSeconds()).concat('.' + miliSec) * 6),
            duration: 1000 * 60
        },
        hand_min: {
            element: elements[1],
            time: parseInt(String(curTime.getMinutes()).concat('.' + sec) * 6),
            duration: 1000 * 60 * 60
        },
        hand_hour: {
            element: elements[0],
            time: parseInt(String(curTime.getHours()).concat('.' + min) * 30),
            duration: 1000 * 60 * 60 * 12
        }
    }
    //animation class
    class Animations {
        //animations for each hands
        analogAnimation(hand) {
            this.animation = hand.element.animate([
                {
                    transform: 'rotate(' + hand.time + 'deg)'
                },
                {
                    transform: 'rotate(' + eval(360 + hand.time) + 'deg)'
                }
            ], {
                duration: hand.duration,
                iterations: Infinity,
                easing: 'linear'
            })
        }
        //stop at particular position or given time
        stopAt(curTime, stopTime) {
            if (stopTime !== undefined)
                this.time = stopTime
            if (curTime == this.time)
                return true
            return false
        }
    }
    //calling one by one
    let handSec = new Animations()
    let handMin = new Animations()
    let handHour = new Animations()

    handSec.analogAnimation(hands.hand_sec)
    handMin.analogAnimation(hands.hand_min)
    handHour.analogAnimation(hands.hand_hour)

    //stop at function for all hands
    function stopAt(frames, hrs, min, sec) {
        let hours = handHour.stopAt(new Date().getHours(), hrs)
        let minutes = handMin.stopAt(new Date().getMinutes(), min)
        let seconds = handSec.stopAt(new Date().getSeconds(), sec)
        if (hours && minutes && seconds) {
            if(stopWatch[4])
            {
                handSec.animation.pause()
                handMin.animation.pause()
                handHour.animation.pause()
            }
            if(typeof stopWatch[3]=='object')
            {
                Alarm.play()
            }
            cancelAnimationFrame(stopAt)
        }
        else
            requestAnimationFrame(stopAt)
    }
    //calling stopAt function
    if(typeof stopWatch == 'object' && stopWatch!==undefined)
    stopAt(0, stopWatch[0], stopWatch[1], stopWatch[2])
}
