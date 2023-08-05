import { agent } from "./veramo/setup.js";

async function main(){
    const result = await agent.verifyCredential({
        credential: {
            credentialSubject:  {
                you: 'Rock',
                id: 'did:web:example.com',
            },
            issuer: {
                id:  'did:ethr:goerli:0x03fbaa70d66547b38cf277d74e53f5afe7f604298c7318b768eca4eb88c2c16c3c',
            },
            type: ['VerifiableCredential'],
            '@context': ['https://www.w3.org/2018/credentials/v1'],
            issuanceDate: '2023-08-03T17:55:50.000Z',
            proof: {
                type: 'JwtProof2020',
                jwt: 'eyJhbGciOiJFUzI1NksiLCJ0eXAiOiJKV1QifQ.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIl0sImNyZWRlbnRpYWxTdWJqZWN0Ijp7InlvdSI6IlJvY2sifX0sInN1YiI6ImRpZDp3ZWI6ZXhhbXBsZS5jb20iLCJuYmYiOjE2OTEwODUzNTAsImlzcyI6ImRpZDpldGhyOmdvZXJsaToweDAzZmJhYTcwZDY2NTQ3YjM4Y2YyNzdkNzRlNTNmNWFmZTdmNjA0Mjk4YzczMThiNzY4ZWNhNGViODhjMmMxNmMzYyJ9.u7EwPPKGWz8ZJU6Gd6k4AUOpghuZohUjQu8QS54AEkF1a3--DtlxxVu6sgbUCfiekANXu_s5ZVDOxg8IcKLTxw',
            },
        },
    });
    console.log(`Credential verified`, result.verified);

}

main().catch(console.log);