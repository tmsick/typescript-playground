import axios from "axios"
import AWS from "aws-sdk"
import { Handler } from "aws-lambda"

const AWS_REGION = "ap-northeast-1"
const AWS_SECRET_ID = "lambda/myFunction"
const AWS_SECRET_KEY_SLACK_INCOMING_WEBHOOK_URL = "SLACK_INCOMING_WEBHOOK_URL"

export const handler: Handler<any, any> = () => {
  const client = new AWS.SecretsManager({ region: AWS_REGION })
  client.getSecretValue({ SecretId: AWS_SECRET_ID }, (err, data) => {
    if (err) {
      if (err.code === "DecryptionFailureException")
        // Secrets Manager can't decrypt the protected secret text using the provided KMS key.
        // Deal with the exception here, and/or rethrow at your discretion.
        throw err
      else if (err.code === "InternalServiceErrorException")
        // An error occurred on the server side.
        // Deal with the exception here, and/or rethrow at your discretion.
        throw err
      else if (err.code === "InvalidParameterException")
        // You provided an invalid value for a parameter.
        // Deal with the exception here, and/or rethrow at your discretion.
        throw err
      else if (err.code === "InvalidRequestException")
        // You provided a parameter value that is not valid for the current state of the resource.
        // Deal with the exception here, and/or rethrow at your discretion.
        throw err
      else if (err.code === "ResourceNotFoundException")
        // We can't find the resource that you asked for.
        // Deal with the exception here, and/or rethrow at your discretion.
        throw err
    }

    if (data && AWS_SECRET_KEY_SLACK_INCOMING_WEBHOOK_URL in data) {
      const slackIncomingWebhookURL: string =
        data[AWS_SECRET_KEY_SLACK_INCOMING_WEBHOOK_URL]
      axios.post(
        slackIncomingWebhookURL,
        JSON.stringify({
          text: "hello, world",
        })
      )
    } else {
      console.log(`data: ${data}`)
      for (const key in data) {
        console.log(`\t${key}: ${data[key]}`)
      }
    }
  })
}
