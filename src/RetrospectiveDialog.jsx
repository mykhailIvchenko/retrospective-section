import ForgeUI, { ModalDialog, Form, TextField } from "@forge/ui";
import { storage } from "@forge/api";
import uuid from "uuid-random";

export const RetrospectiveDialog = ({
                               isOpenModal,
                               setOpenModal,
                               isUpdating,
                               row,
                           }) => {
    const onSubmit = async (formData) => {
        let rowId;

        if (isUpdating) {
            rowId = row.key;
        } else {
            rowId = "row_" + uuid();
        }

        await storage.set(rowId, formData);
        setOpenModal(false);
    };

    return (
        isOpenModal && (
            <ModalDialog
                header={isUpdating ? "Update Row" : "Add Row"}
                onClose={() => setOpenModal(false)}
            >
                <Form onSubmit={onSubmit}>
                    <TextField
                        name="wentWell"
                        label="What went well"
                        defaultValue={isUpdating ? row.value.wentWell : ""}
                    />
                    <TextField
                        name="canBeImproved"
                        label="What can be improved"
                        defaultValue={isUpdating ? row.value.canBeImproved : ""}
                    />
                </Form>
            </ModalDialog>
        )
    );
};
