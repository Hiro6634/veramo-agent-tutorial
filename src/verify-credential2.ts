import { agent } from "./veramo/setup.js";

async function main(){
    const result = await agent.verifyCredential({
        credential: {
            credentialSubject:  {
                you: 'Rock',
                id: 'did:web:example.com',
            },
            issuer: {
                id:  'did:web:johnweb2',
            },
            type: ['VerifiableCredential'],
            '@context': ['https://www.w3.org/2018/credentials/v1'],
            issuanceDate: '2023-08-03T18:36:00.000Z',
            proof: {
                type: 'JwtProof2020',
                jwt: 'eyJhbGciOiJFUzI1NksiLCJ0eXAiOiJKV1QifQ.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIl0sImNyZWRlbnRpYWxTdWJqZWN0Ijp7InlvdSI6IlJvY2sifX0sInN1YiI6ImRpZDp3ZWI6ZXhhbXBsZS5jb20iLCJuYmYiOjE2OTEwODc3NjAsImlzcyI6ImRpZDp3ZWI6am9obndlYjIifQ.ZwdsWRVTMHvn850iUJXhaFlw0b6rXDlOYQ8KUn-hahMCPq_IDCoi20lr4NtYu7Q93c_v4WegfzxT4NhBXxUFdQ',
            },
        },
    });
    console.log(`Credential verified`, result.verified);

}

main().catch(console.log);