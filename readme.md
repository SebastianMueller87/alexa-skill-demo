# Alexa-Skill demo

## Usefull links
* Alexa control panel: https://alexa.amazon.de/
* Amazon developer: https://developer.amazon.com
* AWS management console: https://aws.amazon.com/de/console/

## Requirements:

* Amazon developer account
* AWS account

## Create a skill:

* Log in to your amazon developer account
* Click on the alexa tab and press “Get started“ on the Alexa Skills Kit card
### 1. Add a new skill
* Use the `Custom Interaction Model` skill type
* Choose your prefered language
* Fill in the skill name (f.e. first-demo-skill)
* Fill in the invocation name (f.e. my first demo)
  * Will be used for interacting with your skill (f.e. Ask {invocation name} ...)

* Do not use any of the directives for this example
### 2. Configure the Interaction Model
* Click on the `Interaction Model` tab
* Define the Intent Schema [(example)](https://github.com/SebastianMueller87/alexa-skill-demo/blob/017ad91ff1eac0089dfb912ad748912e506beb09/intents.json)
  * Intents, which are invoked by utterances and send to your Code to interact with
  * The intent schema is an array, which contains an array of intents.

    ```
    {
        "intents": [
            {
              "intent": "SayHello"
            }
            ...
        ]
    }

* Do not define any [Custom Slot Types](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/alexa-skills-kit-interaction-model-reference#custom-slot-syntax) for this example
* Define Sample Utterances [(utterances.txt)](https://github.com/SebastianMueller87/alexa-skill-demo/blob/f6fc34f73c4841b726f782ba7fe37b1546f17fba/utterances.txt)
  * Schema: `INTENT UTTERANCE`
  * Examples:
      * `SayHello to say hello`
          * Will be invoked by “Ask first demo skill “to say hello“
      * `SayHello hello`
          * Will be also invoked by “Ask first demo skill “to say hello“
          * But also by “Ask first demo skill hello“

**Now we could configure our new Skill, but we need a any skill functionallity before we can do that.**

## Create a lambda function:
* Log in to your aws account
* Search for `lambda` and click on the result `lambda - Create Code without thinking about Servers`

### 1. Create a new lambda function
* you can choose any blueprint (use an `blank function` in this case)

### 2. Configure a trigger:
  *  click on the empty icon and choose alexa skills kit.
     * If it is not available you need to change the location (f.e. to Ireland)
     * (on the top right - next to your account name)

### 3. Configure your function
  * Type in a function name (f.e. my-first-alexa-skill) and a description
  * Choose nodejs 6.10 or higher (or use any other runtime you like)
  * Now you can start coding:
      * A lambda function needs an handler, which handles the incoming events
      * There are four (important) events in the lifecycle of an alexa-skill
        * New Session - called when you say “Ask invocation-name“ for example (event.session.new)
        * Launch Request - your skill launches (event.request.type)
        * Intent Request - your skil receives an intent (event.request.type)
        * Session Ended Request - your skill receives an end session request (event.request.type)
      * You can switch on the different event types. Look at [this](https://github.com/SebastianMueller87/alexa-skill-demo/blob/0385fea8a0b5a6ccea4c3f7cb2f889da8cb8e81f/my-first-alexa-skill.js)
      * Create an answer and call that after receiving *any* IntentRequest
        ```
        context.succeed({
          version: "1.0",
          sessionAttributes: {},
          response: {
            outputSpeech: {
              type: 'PlainText',
              text: 'Hello from my first demo skill'
            },
            shouldEndSession: true
          }
        })

  Now your function code should look like [this](https://github.com/SebastianMueller87/alexa-skill-demo/blob/d06e67f98ec90a1b60920525c3ff00734345eed2/my-first-alexa-skill.js)

  Add a try-catch around everything to avoid service crashes. [(Code)](https://github.com/SebastianMueller87/alexa-skill-demo/blob/87e88d43c6cbed99bebd669c7a27c0ad78e0c56b/my-first-alexa-skill.js)

  * Choose an Lambda function handler and role
    * Use the lambda_basic_execution role (may be you need to create that first)
  * Hit “next“ and then “Create function“

## Link your skill to the lambda function
### 1.
  * Copy the ARN (top right of your function overview screen)
    * Everything right from `ARN - `
  * Go back to your skill (developer account) and click on “Configuration“
  * Choose `AWS Lambda ARN (Amazon Resource Name)`
  * Choose an region, paste the ARN-Code into the text field and click next

### 2. Test
  * Choose the `Service Simulator` and type in any utterance you defined and press `Ask first-demo-skill`
    * Example: `to say hello`
  * Listen to the service response

### 3. Test with echo/echo dot
  * Log into your alexa control panel
  * Click on “Skills“ and then on “your skill“ (top right)
  * You should see your skill in the list of skills
    * You are the only one, who can see your skill at this time (you have not published it yet)
  * Click the skill to checkout details
  * You can ask alexa: “alexa, ask my first demo skill to say hello“

Every changes (code, intents, utterances...) are instantly available, so you can use your alexa for check out the functionality of your skill.
You can also test your lambda function by creating a test event (AWS Lambda function -> action) or using the Service Simulator of your skill.

## Switch on different intents
  * You can switch on different intents by switching on the intent name (event.request.intent.name)

### 1. Add second intent
  * Developer console: Go to your skill and open the `Interaction Model`
  * Add a new intent (f.e. [SayGoodbye](https://github.com/SebastianMueller87/alexa-skill-demo/blob/4996bc295fa9dfa26fd04afbd55268dcf9ddaed3/intents.json))
  * Add new utterances ([example](https://github.com/SebastianMueller87/alexa-skill-demo/blob/afff0accfe284074d801b65c2b552b0ae41bd2ce/utterances.txt))
  * Add switch on intents ([example](https://github.com/SebastianMueller87/alexa-skill-demo/blob/1639396d2c832792047481800b3572fbe14d5a8d/my-first-alexa-skill.js))


