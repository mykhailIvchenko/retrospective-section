import ForgeUI, { render, Fragment, Macro, useState } from "@forge/ui";
import { RetrospectiveTable } from "./RetrospectiveTable";
import { RetrospectiveDialog } from "./RetrospectiveDialog";

const App = () => {
    const [isOpenModal, setOpenModal] = useState(false);

    const [isUpdating, setUpdating] = useState(false);
// eslint-disable-next-line react-hooks/rules-of-hooks
    const [selectedRow, setSelectedRow] = useState(undefined);

    return (
        <Fragment>
            <RetrospectiveTable
                isOpenModal={isOpenModal}
                setOpenModal={setOpenModal}
                setUpdating={setUpdating}
                setSelectedRow={setSelectedRow}
            />
            <RetrospectiveDialog
                isOpenModal={isOpenModal}
                setOpenModal={setOpenModal}
                isUpdating={isUpdating}
                row={selectedRow}
            />
        </Fragment>
    );
};



export const run = render(
    <Macro app={<App />} />
);