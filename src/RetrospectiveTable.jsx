import ForgeUI, {
    Fragment,
    Text,
    Table,
    Head,
    Row,
    Cell,
    Button,
    ButtonSet,
    useState,
    useEffect,
    Heading
} from "@forge/ui";
import { storage, startsWith } from "@forge/api";

export const RetrospectiveTable = ({
                               isOpenModal,
                               setOpenModal,
                               setUpdating,
                               setSelectedRow,
                           }) => {
    const [rows, setRows] = useState([]);

    useEffect(async () => {
        await storage
            .query()
            .where("key", startsWith("row_"))
            .getMany()
            .then((res) => setRows(res.results));
    }, [isOpenModal]);

    return (
        <Fragment>
            <Heading size="large">Retrospective section</Heading>
            <Button
                text="Add Row"
                icon="add-circle"
                onClick={() => {
                    setOpenModal(true);
                    setUpdating(false);
                }}
            />
            <Table>
                <Head>
                    <Cell>
                        <Text>What went well</Text>
                    </Cell>
                    <Cell>
                        <Text>What can be improved</Text>
                    </Cell>
                    <Cell>
                        <Text>Actions</Text>
                    </Cell>
                </Head>
                {rows.map((row) => (
                    <Row>
                        <Cell>
                            <Text>{row.value.wentWell}</Text>
                        </Cell>
                        <Cell>
                            <Text>{row.value.canBeImproved}</Text>
                        </Cell>
                        <Cell>
                            <ButtonSet>
                                <Button
                                    text="Edit"
                                    icon="edit"
                                    onClick={() => {
                                        setSelectedRow(row);
                                        setUpdating(true);
                                        setOpenModal(true);
                                    }}
                                />
                                <Button
                                    appearance="danger"
                                    icon="trash"
                                    onClick={async () => {
                                        await storage.delete(row.key);
                                        await storage
                                            .query()
                                            .where("key", startsWith("row_"))
                                            .getMany()
                                            .then((res) => setRows(res.results));
                                    }}
                                />
                            </ButtonSet>
                        </Cell>
                    </Row>
                ))}
            </Table>
        </Fragment>
    );
};