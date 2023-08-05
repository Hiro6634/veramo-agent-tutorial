import {
    createAgent,
    IDIDManager,
    IResolver,
    IDataStore,
    IDataStoreORM,
    IKeyManager,
    ICredentialPlugin
} from '@veramo/core';

import { DIDManager } from '@veramo/did-manager';

import { EthrDIDProvider } from '@veramo/did-provider-ethr';

import { WebDIDProvider } from '@veramo/did-provider-web';

import { KeyManager } from '@veramo/key-manager';

import { KeyManagementSystem, SecretBox } from '@veramo/kms-local';

import { CredentialPlugin } from '@veramo/credential-w3c';

import { DIDResolverPlugin } from '@veramo/did-resolver';

import { Resolver } from 'did-resolver';

import { getResolver as ethrDidResolver } from 'ethr-did-resolver';

import { getResolver as webDidResolver } from 'web-did-resolver';

import { Entities, KeyStore, DIDStore, PrivateKeyStore, migrations } from '@veramo/data-store';

import { DataSource } from 'typeorm';

const DATABASE_FILE = 'database.sqlite';

const INFURA_PROJECT_ID = 'e47a476ad5ff422b9aaba7fb14cd90a5';

const KMS_SECRET_KEY = 'b810ec39e4f7b603a5c2914882f909fd0ddc58aa7c5690c16c1270ad0c67686b';

const dbConnection = new DataSource({
    type: 'sqlite',
    database: DATABASE_FILE,
    synchronize: false,
    migrations,
    migrationsRun: true,
    logging: ['error', 'info', 'warn'],
    entities: Entities
}).initialize();

export const agent = createAgent<
    IDIDManager & IKeyManager & IDataStore & IDataStoreORM & IResolver & ICredentialPlugin>({
        plugins: [
            new KeyManager({
                store: new KeyStore(dbConnection),
                kms: {
                    local: new KeyManagementSystem( new PrivateKeyStore(dbConnection, new SecretBox(KMS_SECRET_KEY))),
                },
            }),
            new DIDManager({
                store: new DIDStore(dbConnection),
                defaultProvider: 'did:ethr:goerli',
                providers: {
                    'did:ethr:goerli': new EthrDIDProvider({
                        defaultKms: 'local',
                        network: 'goerli',
                        rpcUrl: 'https:://goerli.infura.io/v3/' + INFURA_PROJECT_ID,
                    }),
                    'did:web': new WebDIDProvider({
                        defaultKms: 'local'
                    }) 
                },
            }),
            new DIDResolverPlugin({
                resolver: new Resolver({
                    ...ethrDidResolver({infuraProjectId: INFURA_PROJECT_ID}),
                    ...webDidResolver,
                }),
            }),
            new CredentialPlugin(),
        ],
    });

