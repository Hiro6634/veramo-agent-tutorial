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

import { KeyManager } from '@veramo/key-manager';

import { KeyManagementSystem, SecretBox } from '@veramo/kms-local';

import { CredentialPlugin } from '@veramo/credential-w3c';

import { DIDResolverPlugin } from '@veramo/did-resolver';

import { Resolver } from 'did-resolver';

import { getResolver as ethrDidResolver } from 'ethr-did-resolver';

import { getResolver as wbDidResolver } from 'web-did-resolver';

import { Entities, KeyStore, DIDStore, PrivateKeyStore, migrations } from '@veramo/data-store';

import { DataSource } from 'typeorm';
