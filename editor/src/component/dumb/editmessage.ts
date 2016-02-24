/// <reference path="buttoninput.ts" />
/// <reference path="checkbox.ts" />
/// <reference path="inputlabel.ts" />
/// <reference path="text.ts" />
/// <reference path="messagedelay.ts" />
/// <reference path="optional.ts" />
/// <reference path="multiple.ts" />
/// <reference path="../textinputvalidated.ts" />
/// <reference path="../smart/messagecontentcontainer.ts" />
/// <reference path="../smart/replyoptionscontainer.ts" />

module Component {
        interface EditMessageInt {
                name: string,
                store: Im.Store;
                onDelete: () => void;
                onSetNameScratchpad: (newName: string) => void;
                onSetName: () => void;
                onSetSubjectName: (subjectName: string) => void;
                onSetString: (name: string, value: string) => void;
                onSetEndGame: (endGame: boolean) => void;
                onSetEncrypted: (encrypted: boolean) => void;
                onSetChildren: (delays: Im.MessageDelays) => void;
                onSetFallback: (delay: Im.MessageDelay) => void;
        };
        export type EditMessageData = Immutable.Record.IRecord<EditMessageInt>;
        export const EditMessageData = Immutable.Record<EditMessageInt>({
                name: '',
                store: Im.Store(),
                onDelete: () => {},
                onSetNameScratchpad: () => {},
                onSetName: () => {},
                onSetSubjectName: () => {},
                onSetString: () => {},
                onSetEndGame: () => {},
                onSetEncrypted: () => {},
                onSetChildren: () => {},
                onSetFallback: () => {},
        }, 'EditMessage');

        type EditMessageProps = Flux.Props<EditMessageData>;

        function render (props: EditMessageProps)
        {
                const data = props.data;
                const store = data.store;
                const narrative = Im.getActiveNarrative(store);

                const messageName = data.name;
                const scratchpadName =
                        store.nameScratchpad.get(messageName);

                const messages = narrative.messages;
                const message = messages.get(messageName);
                const profiles = narrative.profiles;
                const strings = narrative.strings;

                const name = createName(
                        messageName,
                        scratchpadName,
                        messages,
                        data.onSetNameScratchpad,
                        data.onSetName);

                const subject = createSubject(
                        message,
                        strings,
                        data.onSetSubjectName,
                        data.onSetString);

                const messageContent = createMessageContent(
                        message, strings, profiles);

                const fallback = createFallback(
                        data.onSetFallback, message, messages);

                const children = createChildren(
                        data.onSetChildren, message, messages);

                const replyOptions = createReplyOptions(
                        message, messages);

                const endGame = createEndGame(message, data.onSetEndGame);
                const encrypted = createEncrypted(message, data.onSetEncrypted);

                const deleteButton = createDeleteButton(
                        messageName, data.onDelete);
                const header = Div({ className: 'edit-mesage-header' },
                        deleteButton);

                const dataLists = createDataLists(narrative);
                return Div({ className: 'edit-message'},
                        dataLists,
                        wrapInGroup(
                                wrapInSubgroup(header),
                                wrapInSubgroup(name),
                                wrapInSubgroup(subject),
                                wrapInSubgroup(endGame, encrypted)
                        ),
                        wrapInTitleGroup('Message', messageContent),
                        wrapInTitleGroup('Fallback',
                                wrapInSubgroup(fallback)),
                        wrapInTitleGroup('Reply options', replyOptions),
                        wrapInTitleGroup('Children', children)
                );
        }

        export const EditMessage = Flux.createFactory(render, 'EditMessage');

        export function wrapInLabel<P>(
                label: string, ...components: React.ReactElement<any>[])
        {
                const props = Im.KeyValue({ name: '', value: label });
                return InputLabel(props, ...components);
        }

        export function wrapInGroup(
                ...components: React.ReactElement<any>[])
        {
                return Div({ className: 'edit-message-group' },
                        Div({ className: 'edit-message-group-content' },
                                ...components)
                );
        }

        export function wrapInSubgroup(
                ...components: React.ReactElement<any>[])
        {
                return Div({ className: 'edit-message-subgroup' }, ...components);
        }

        export function wrapInTitleGroup(
                title: string, ...components: React.ReactElement<any>[])
        {
                return Div({ className: 'edit-message-group' },
                        Div({ className: 'edit-message-group-title' }, title),
                        Div({ className: 'edit-message-group-content' },
                                ...components)
                );
        }

        function createName (
                messageName: string,
                scratchpadName: string,
                messages: Im.Messages,
                onSetNameScratchpad: (newName: string) => void,
                onSetName: () => void)
        {
                const onSet = (name: string) => onSetNameScratchpad(name);
                const displayName = scratchpadName || messageName;
                const data = TextData({
                        placeholder: 'message_name',
                        value: displayName,
                        onChange: onSet,
                        list: 'messageNames',
                });
                const name = Text(data);

                const disabled = messages.has(displayName);
                const buttonProps = ButtonData({
                        text: 'Rename',
                        disabled: disabled,
                        onClick: onSetName,
                        className: null,
                });
                const setButton = ButtonInput(buttonProps);

                return Div({}, name, setButton);
        }

        function createMessageContent (
                message: Im.Message,
                strings: Im.Strings,
                profiles: Im.Profiles)
        {
                const messageProps = MessageContentContainerData({
                        profiles: profiles,
                        strings: strings,
                        message: message.message,
                        name: message.name,
                });
                return MessageContentContainer(messageProps);
        }

        function createReplyOptions (
                message: Im.Message, messages: Im.Messages)
        {
                const replyOptionsProps = ReplyOptionsContainerData({
                        name: message.name,
                        replyOptions: message.replyOptions,
                        messages: messages,
                });
                return ReplyOptionsContainer(replyOptionsProps);
        }

        function createEndGame (
                message: Im.Message,
                onSetEndGame: (endGame: boolean) => void)
        {
                const newEndGameProps = CheckboxData({
                        checked: message.endGame,
                        onChange: onSetEndGame,
                });
                return wrapInLabel('End game', Checkbox(newEndGameProps));
        }

        function createEncrypted (
                message: Im.Message,
                onSetEncrypted: (encrypted: boolean) => void)
        {
                const newEncryptedProps = CheckboxData({
                        checked: message.encrypted,
                        onChange: onSetEncrypted,
                });
                return wrapInLabel(
                        'Encrypted', Checkbox(newEncryptedProps));
        }

        function createDeleteButton (
                name: string, onDelete: () => void)
        {
                const disabled = !name;
                const deleteProps = ButtonData({
                        text: 'Delete',
                        disabled: disabled,
                        onClick: onDelete,
                        className: null,
                });
                return ButtonInput(deleteProps);
        }

        function createSubject (
                message: Im.Message,
                strings: Im.Strings,
                onSetSubjectName: (subjectName: string) => void,
                onSetString: (name: string, value: string) => void)
        {
                const subjectName = message.threadSubject;
                const subjectValue = strings.get(subjectName);
                const messageName = message.name;

                const nameProps = TextData({
                        placeholder: 'subject_string_name',
                        value: subjectName,
                        onChange: onSetSubjectName,
                        list: 'stringNames',
                });
                const name = Text({ data: nameProps });

                const onChangeString = (value: string) =>
                        onSetString(subjectName, value);
                const subjectProps = TextData({
                        placeholder: 'subject',
                        value: subjectValue,
                        onChange: onChangeString,
                });
                const subject = Text({ data: subjectProps });

                return Div({}, name, subject);
        }

        function onSetChild (
                onSetChildren: (delays: Im.MessageDelays) => void,
                message: Im.Message,
                delay: Im.MessageDelay,
                index: number)
        {
                const children = message.children;
                const newChildren = children.set(index, delay);
                onSetChildren(newChildren);
        }

        function onAddChild (
                onSetChildren: (delays: Im.MessageDelays) => void,
                message: Im.Message)
        {
                const newChild = Im.MessageDelay();
                const children = message.children;
                const newChildren = children.push(newChild);
                onSetChildren(newChildren);
        }

        function onRemoveChild (
                onSetChildren: (delays: Im.MessageDelays) => void,
                message: Im.Message, index: number)
        {
                const children = message.children;
                const newChildren = children.delete(index);
                onSetChildren(newChildren);
        }

        function createChildren (
                onSetChildren: (delays: Im.MessageDelays) => void,
                message: Im.Message,
                messages: Im.Messages)
        {
                const onAdd = () => onAddChild(onSetChildren, message);
                const onRemove = (index: number) =>
                        onRemoveChild(onSetChildren, message, index);
                const delays = message.children;
                const children = delays.map((delay, index) => {
                        const onSet = (delay: Im.MessageDelay) =>
                                onSetChild(onSetChildren, message, delay, index);
                        const props = MessageDelayData({
                                delay: delay,
                                onChange: onSet,
                                messages: messages,
                        });
                        return MessageDelay(props);
                });
                const multipleProps = MultipleData({
                        children: children,
                        onAdd: onAdd,
                        onRemove: onRemove,
                });
                return Multiple(multipleProps);
        }

        function onAddFallback (onSetFallback: (delay: Im.MessageDelay) => void)
        {
                const newDelay = Im.MessageDelay();
                onSetFallback(newDelay);
        }

        function createFallback (
                onSetFallback: (delay: Im.MessageDelay) => void,
                message: Im.Message,
                messages: Im.Messages)
        {
                const delay = message.fallback;
                const messageName = message.name;

                const onAdd = () => onAddFallback(onSetFallback);
                const onRemove = () => onSetFallback(null);
                const fallbackProps = MessageDelayData({
                        delay: delay,
                        onChange: onSetFallback,
                        messages: messages,
                });
                const fallback = delay ?
                        MessageDelay(fallbackProps) : null;
                const optionalProps = OptionalData({
                        child: fallback,
                        onAdd: onAdd,
                        onRemove: onRemove,
                });
                return Optional(optionalProps);
        }

        function createDataLists (narrative: Im.Narrative)
        {
                const messages = narrative.messages;
                const profiles = narrative.profiles;
                const strings = narrative.strings;

                const messageNames = Im.keys(messages)
                const messageDataList = createDataList(
                        'messageNames', messageNames);

                const profileNames = Im.keys(profiles)
                const profileDataList = createDataList(
                        'profileNames', profileNames);

                const stringNames = Im.keys(strings);
                const stringDataList = createDataList(
                        'stringNames', stringNames);

                const replyOptionTypes = Im.getReplyOptionTypes();
                const replyOptionDataList = createDataList(
                        'replyOptionTypes', replyOptionTypes);

                return Div({},
                        messageDataList,
                        profileDataList,
                        stringDataList,
                        replyOptionDataList);
        }

        function createDataList (id: string, names: Immutable.List<string>)
        {
                const options = names.map(name => Option({
                        value: name,
                        key: name,
                 }));
                return DataList({ id: id }, options);
        }
}
