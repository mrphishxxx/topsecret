/// <reference path="../../../../../typings/kbpgp/kbpgp.d.ts"/>

import Map = require('../../../../../core/src/app/utils/map');
import MessageCore = require('../../../../../core/src/app/message');
import Message = require('../message');
import Redux = require('../redux/redux');

export const Types = {
        BLUR: 'BLUR',
        KEY_DOWN: 'KEY_DOWN',
        SET_ACTIVE_MESSAGE: 'SET_ACTIVE_MESSAGE',
        SET_DRAFT_BODY: 'SET_DRAFT_BODY',
        SET_DRAFT_SUBJECT: 'SET_DRAFT_SUBJECT',
        SET_DRAFT_TO: 'SET_DRAFT_TO',
        DIPLAY_MESSAGE: 'DIPLAY_MESSAGE',

        TICK: 'TICK',
        TICK_FASTER: 'TICK_FASTER',
        TICK_SLOWER: 'TICK_SLOWER',
        ADD_TIME_OFFSET: 'ADD_TIME_OFFSET',

        START_GENERATE_KEY: 'START_GENERATE_KEY',
        GENERATED_KEY: 'GENERATED_KEY',
        SET_DRAFT_KEY_NAME: 'SET_DRAFT_KEY_NAME',
        SET_DRAFT_KEY_PASSPHRASE: 'SET_DRAFT_KEY_PASSPHRASE',
        DELETE_KEY: 'DELETE_KEY',

        SET_MODE: 'SET_MODE',
        COMPOSE_MESSAGE: 'COMPOSE_MESSAGE',
        COMPOSE_REPLY: 'COMPOSE_REPLY',
        RECEIVE_REPLY: 'RECEIVE_REPLY',
        SEND_MESSAGE: 'SEND_MESSAGE',
        SENDING_MESSAGE: 'SENDING_MESSAGE',
        DECRYPT_MESSAGE: 'DECRYPT_MESSAGE',
        DECRYPTING_MESSAGE: 'DECRYPTING_MESSAGE',
        SET_ACTIVE_FOLDER: 'SET_ACTIVE_FOLDER',
        DISPLAY_FOLDER: 'DISPLAY_FOLDER',
        EDIT_BODY: 'EDIT_BODY',
        EDIT_SUBJECT: 'EDIT_SUBJECT',
        EDIT_TO: 'EDIT_TO',

        SET_PLAYER_KEY: 'SET_PLAYER_KEY',
        SET_ACTIVE_KEY: 'SET_ACTIVE_KEY',
        IMPORT_KEYS: 'IMPORT_KEYS',
};

export interface Blur extends Redux.Action<void> {}
export interface KeyDown extends Redux.Action<KeyboardEvent> {}
export interface SetActiveMessage extends Redux.Action<string> {}
export interface SetDraftBody extends Redux.Action<string> {}
export interface SetDraftSubject extends Redux.Action<string> {}
export interface SetDraftTo extends Redux.Action<string> {}
export interface DisplayMessage extends Redux.Action<string> {}

export interface Tick extends Redux.Action<void> {}
export interface TickFaster extends Redux.Action<void> {}
export interface TickSlower extends Redux.Action<void> {}
export interface AddTimeOffset extends Redux.Action<number> {}

export interface StartGenerateKey extends Redux.Action<void> {}
export interface GeneratedKeyParams {
        id: string;
        keyManager: Kbpgp.KeyManagerInstance;
}
export interface GeneratedKey extends Redux.Action<GeneratedKeyParams> {}
export interface SetDraftKeyName extends Redux.Action<string> {}
export interface SetDraftKeyPassphrase extends Redux.Action<string> {}
export interface DeleteKey extends Redux.Action<string> {}

export interface SetMode extends Redux.Action<string> {}
export interface SetActiveFolder extends Redux.Action<string> {}
export interface EditBody extends Redux.Action<boolean> {}
export interface EditSubject extends Redux.Action<boolean> {}
export interface EditTo extends Redux.Action<boolean> {}

export interface ComposeMessageParams {
        sender: string;
}
export interface ComposeMessage extends Redux.Action<ComposeMessageParams> {}

export interface ComposeReplyParams {
        message: Message.Message;
        sender: string;
}
export interface ComposeReply extends Redux.Action<ComposeReplyParams> {}

export interface ReceiveReply extends Redux.Action<MessageCore.Reply> {}

export interface SendMessageParams {
        message: Message.Message;
        parentId: string;
}
export interface SendMessage extends Redux.Action<SendMessageParams> {}
export interface SendingMessage extends Redux.Action<boolean> {}

export interface DecryptMessageParams {
        messageId: string;
        decryptedBody: string;
}
export interface DecryptMessage extends Redux.Action<DecryptMessageParams> {}
export interface DecryptingMessage extends Redux.Action<boolean> {}

export interface DisplayFolderParams {
        folderId: string;
        messageId: string;
        folderType: string;
}
export interface DisplayFolder extends Redux.Action<DisplayFolderParams> {}

export interface SetPlayerKey extends Redux.Action<string> {}
export interface SetActiveKey extends Redux.Action<string> {}
export type ImportKeysParams = Map.Map<Kbpgp.KeyManagerInstance>;
export interface ImportKeys extends Redux.Action<ImportKeysParams> {}