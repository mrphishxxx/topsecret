/// <reference path="../smart/editmessagecontainer.ts" />

module Component {
        interface EditPanelInt {
                store: Im.Store;
                onClick: (e: MouseEvent) => void;
        };
        export type EditPanelData = Immutable.Record.IRecord<EditPanelInt>;
        export const EditPanelData = Immutable.Record<EditPanelInt>({
                store: Im.Store(),
                onClick: () => {},
        }, 'EditPanel');

        type EditPanelProps = Flux.Props<EditPanelData>;

        function render (props: EditPanelProps)
        {
                const data = props.data;
                const store = data.store;
                const narrative = Im.getActiveNarrative(store);

                const editMessageData = EditMessageContainerData({
                        name: store.activeMessage,
                        store: store,
                });
                const editMessage = EditMessageContainer(editMessageData);

                const panelProps = {
                        className: 'edit-panel',
                        onClick: data.onClick,
                };

                const contentProps = {
                        className: 'edit-panel-content',
                        onClick: onClick,
                };

                return Div(panelProps,
                        Div(contentProps, editMessage)
                );
        }

        export const EditPanel = Flux.createFactory(render, 'EditPanel');

        function onClick (e: MouseEvent)
        {
                e.stopPropagation();
        }
}