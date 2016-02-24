import Message = require('../../message');
import React = require('react');

import Core = require('../core');
import Div = Core.Div;
import Span = Core.Span;

interface FooterIndexProps extends React.Props<any> {
        folderName: string;
        messages: Message.Message[];
}

function renderFooterIndex(props: FooterIndexProps)
{
        const folderName = props.folderName.toUpperCase();

        const messages = props.messages;
        const numMessages = messages.length;
        const numOldMessages = messages.filter(Message.isRead).length;
        const numNewMessages = numMessages - numOldMessages;

        return Div({},
                `-*-NSA Mail: =${folderName}`,
                Span({ className: 'infobar-major' }),
                `[Msgs: ${numMessages}`,
                Span({ className: 'infobar-minor' }),
                `New: ${numNewMessages}`,
                Span({ className: 'infobar-minor' }),
                `Old: ${numOldMessages}]`);
}

const FooterIndex = React.createFactory(renderFooterIndex);

export = FooterIndex;