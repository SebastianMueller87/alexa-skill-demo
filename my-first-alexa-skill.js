exports.handler = (event, context, callback) => {
    try {
        if (event.session.new) {
          // New Session
          console.log('New Session')
        }

        switch (event.request.type) {
            case 'LaunchRequest':
                console.log('LaunchRequest')
                break;

            case 'IntentRequest':
                context.succeed({
                  version: "1.0",
                  sessionAttributes: {},
                  response: {
                    outputSpeech: {
                      type: 'PlainText',
                      text: 'Hello from my first alexa skill'
                    },
                    shouldEndSession: true
                  }
                })
                break;

            case 'SessionEndedRequest':
                console.log('LaunchRequest')
                break;

            default:
                context.fail(`INVALID REQUEST TYPE ${event.target.type}`)
        }
    } catch (error) {
        console.log('Got an error: ', error)
        context.fail(`got an error: ${error}`)
    }
}
