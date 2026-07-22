// To get Access to the .env where Pandium secrets, configs, and context can be accessed.
import * as dotenv from 'dotenv'
import GorgiasClient from '@pandium/gorgias-client'
import IterableClient from '@pandium/iterable-client'


dotenv.config()

import { Config, Secret, Context } from './lib.js'

const run = async () => {
    const abortController = new AbortController()
    const context = new Context()
    const secrets = new Secret()
    const config = new Config()

    console.error(`This run is in mode: ${context['run_mode']}`)
    console.error('------------------------CONFIG------------------------')
    console.error(config)
    console.error('------------------------SECRET------------------------')
    console.error(secrets)
    console.error('------------------------CONTEXT------------------------')
    console.error(context)
    console.error('------------------------ENV----------------------------')
    console.error(process.env)

    try {
        const gorgias = new GorgiasClient(abortController)
    
        console.error('Fetching and logging IDs for first 10 Gorgias customers ')
        let recordCounter = 0
        const records = gorgias.listCustomers()
        for await (const record of records) {
            if (recordCounter > 10) break
            console.error(record.id)
            recordCounter++
        }
    } catch (error) {
        console.error('❌ Unexpected Gorgias error.')
        console.error(error)
    }
    
    try {
        const iterable = new IterableClient(abortController)
    
        console.error('Fetching and Logging Iterable Catalog Names')
        const catalogs = await iterable.listCatalogs()
        let catalogCounter = 0
        for await (let catalog of catalogs) {
            if (catalogCounter > 10) break
            console.error(catalog.name) // Here, each iteration will yield your data whenever it's ready. No need for Promise callbacks or async/await calls here.
            catalogCounter++
        }
    } catch (error) {
        console.error('❌ Unexpected Iterable error.')
        // @ts-ignore
        console.error(error.message)
        console.error(error)
    }
    


}

run().then(
    () => {},
    (error) => {
        console.error("Unhandled error:", error);
        process.exitCode = 1
    }
)
