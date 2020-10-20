import { Handler } from "aws-lambda"
import { myLog } from "./lib/myLog"

export const handler: Handler<any, any> = (event: any, result: any) => {
  myLog(`event: ${event}`)
  myLog(`result: ${result}`)
}
