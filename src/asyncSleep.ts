export default (delay: number)=>{
    return new Promise(function (resolve) {
      setTimeout(resolve, delay)
    })
  }
