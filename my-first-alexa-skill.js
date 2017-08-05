exports.handler = (event, context, callback) => {
    if (event.session.new) {
      // New Session
      console.log('New Session')
    }

    switch (event.request.type) {
        case 'LaunchRequest':
            console.log('LaunchRequest')
            break;

        case 'IntentRequest':
            console.log('IntentRequest')
            break;

        case 'SessionEndedRequest':
            console.log('LaunchRequest')
            break;

        default:
            context.fail(`INVALID REQUEST TYPE ${event.target.type}`)
    }
}
