// To get Access to the .env where Pandium secrets, configs, and context can be accessed.
import * as dotenv from 'dotenv'
// Client Imports

dotenv.config()

import { Config, Secret, Context } from './lib.js'

const run = async () => {
    const abortController = new AbortController()
    const context = new Context()
    const secrets = new Secret()
    const config = new Config()

    // Pandium integrations can be run in 'init' or 'normal' mode.
    // When the integration is run on Pandium, Pandium will provide run_mode through context.
    // During local development run mode is defined in the .env as PAN_CTX_RUN_MODE
    console.error(`This run is in mode: ${context['run_mode']}`)
    console.error('------------------------CONFIG------------------------')
    console.error(config)

    console.error('------------------------SECRET------------------------')
    console.error(secrets)

    console.error('------------------------CONTEXT------------------------')
    console.error(context)

    console.error('------------------------ENV----------------------------')
    console.error(process.env)

    // Example client code:
}

// Waiting for the resolution of the run function's promise is the entry point for the whole integration.
run().then(
    // When the promise is resolved no further action needed.
    () => {},
    // When the promise is rejected a nonzero exit code will fail the run.
    () => {
        process.exitCode = 1
    }
)
