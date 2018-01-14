/**
 * 错误信息，可以将可能发生的错误进行提示，并打印描述和调用栈
 */

const consoleError = (...errorHintArr) => {
    let error = "";
    errorHintArr.forEach((errorHint) => {
        error += " " + errorHint;
    })
    console.error(error);
    throw new Error(error);
}
const alertError = (errorHint) => {
    alert(errorHint);
    throw new Error(errorHint);
}

export default consoleError;