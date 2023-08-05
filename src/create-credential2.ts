import { agent } from './veramo/setup.js'

async function main() {
  const verifiableCredential = await agent.createVerifiableCredential({
    credential: {
      issuer: { id: 'did:quarkid:zksync:EiAvogQHF03qYe9NQfvgN-dnR7_bUwgPo1BUMJfYp15MWA' },
      credentialSubject: {
        id: 'did:web:example.com',
        you: 'Rock',
      },
    },
    proofFormat: 'jwt',
  })
  console.log(`New credential created`)
  console.log(JSON.stringify(verifiableCredential, null, 2))
}

main().catch(console.log)