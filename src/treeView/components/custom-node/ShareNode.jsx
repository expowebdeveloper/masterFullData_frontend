import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Select from "react-select";
import { useDispatch, useSelector } from 'react-redux';
import SmallSpinner from '../../../components/common/atomic/SmallSpinner';



const ShareNode = ({ handleClose, handleShow, setShow, show, parent, CreateShareNode }) => {

    const [selectedOption, setSelectedOption] = useState(null);
    const [options, setOptions] = useState([]);

    const { hierarchyList, smallLoader } = useSelector((state) => state.dimensionData);

    useEffect(() => {
        console.log(smallLoader, "smallLoader")
        if (hierarchyList) {
            console.log(hierarchyList, "hierarchyList")
            let data = []
            hierarchyList.forEach((item) => {
                if (item.node.name !== parent && item.isShared === null) {
                    data.push(
                        { value: item.node.name, label: item.node.name, dimension: item.node.dimension }
                    )
                }
            })

            setOptions(data)
        }
    }, [hierarchyList])


    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Share Node For : <span className='parent_name'> {parent} </span></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Parent Node</Form.Label>
                            <Form.Control
                                type="text"
                                value={parent}
                                readOnly
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Select Existing Node</Form.Label>
                            <Select
                                defaultValue={selectedOption}
                                onChange={(e) => setSelectedOption(e)}
                                options={options}
                            />

                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    {/* <Button variant="primary" onClick={() => CreateShareNode(selectedOption)}>
                        Add Shared Node
                    </Button> */}
                    <Button variant="primary" onClick={() => {
                        if (!smallLoader) {  // Prevent multiple clicks while loading
                            CreateShareNode(selectedOption);
                        }
                    }}>
                        {smallLoader ? <SmallSpinner /> : "Add Shared Node"}
                    </Button>

                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ShareNode;

