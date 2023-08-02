type CodeMsg = {
  code: string,
  message: string,
}

class AppError extends Error {
  code: string
  
  constructor (codeMsg: CodeMsg) {
    super(codeMsg.code)
    this.code = codeMsg.code
    this.message = codeMsg.message
  }
}

export default AppError
