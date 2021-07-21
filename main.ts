control.onEvent(EventBusSource.MICROBIT_ID_IO_P2, EventBusValue.MICROBIT_BUTTON_EVT_DOWN, function () {
    keyPress("a")
})
function keyUp (key: string) {
    serial.writeLine("#ku-" + key)
}
control.onEvent(EventBusSource.MICROBIT_ID_IO_P0, EventBusValue.MICROBIT_BUTTON_EVT_DOWN, function () {
    keyPress("b")
})
function keyPress (key: string) {
    serial.writeLine("#kp-" + key)
}
function keyDown (key: string) {
    serial.writeLine("#kd-" + key)
}
pins.setEvents(DigitalPin.P2, PinEventType.Touch)
pins.setEvents(DigitalPin.P0, PinEventType.Touch)
let prev1 = 0
let dif1 = 0
let pot1 = 0
serial.setBaudRate(BaudRate.BaudRate115200)
serial.redirectToUSB()
basic.forever(function () {
    pot1 = Math.round(pins.analogReadPin(AnalogPin.P1) / 20)
    dif1 = (prev1 - pot1) > 0 ? 1 : (prev1 - pot1) < 0 ? -1 : 0;
if (dif1 > 0) {
        keyPress("up")
    }
    if (dif1 < 0) {
        keyPress("down")
    }
    prev1 = pot1
    basic.pause(30)
})
