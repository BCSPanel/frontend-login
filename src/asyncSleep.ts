/** 等待多少毫秒，用于异步函数 */
export default (ms: number) => new Promise((resolve) => {
  setTimeout(resolve, ms)
})
