import { useEffect, useState } from "react";
import { Input, Modal, notification } from "antd";
import { createUserAPI, updateUserAPI } from "../../services/api.service";
import { use } from "react";

const UpdateUserModal = (props) => {
    const [id, setId] = useState("");
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");

    const { isModalUpdateOpen,
        setIsModalUpdateOpen,
        dataUpdate,
        setDataUpdate,
        loadUser    
    } = props;
    
    useEffect(() => {
        console.log(">>> check  dataUpdate props: ", dataUpdate)
        if (dataUpdate) {
            setId(dataUpdate._id)
            setFullName(dataUpdate.fullName)
            setPhone(dataUpdate.phone)
        }
    },[dataUpdate])
    const handleSubmitBtn = async () => {
        const res = await updateUserAPI( id, fullName, phone)
        if (res.data) { 
            notification.success({
                message: "Update user",
                description: "Cập nhật thành công"
            })
            resetAndCloseModal();
            await loadUser();
        } else {
            notification.error({
                message: "Error update user",
                description: JSON.stringify(res.message)
            })
        }
    }

    const resetAndCloseModal = () => {
        setIsModalUpdateOpen(false)
        setFullName("")
        setId("")
        setPhone("") 
        setDataUpdate(null)
    }

    return (
        <Modal
            title="Update a User"
            open={isModalUpdateOpen}
            onOk={() => handleSubmitBtn()}
            onCancel={() => resetAndCloseModal()}
            maskClosable={false}
            okText={"SAVE"}
        >
            <div style={{display: 'flex', gap: '15px', flexDirection: 'column'}}>
                <div>
                    <span>Id</span>
                    <Input
                        value={id}
                        disabled
                    />   
                </div>
                <div>
                    <span>FullName</span>
                    <Input
                        value={fullName}
                        onChange={(event)=>{setFullName(event.target.value)}}
                    />   
                </div>
                <div>
                    <span>Phone number</span>
                    <Input
                        value={phone}
                        onChange={(event)=>{setPhone(event.target.value)}}
                    />   
                </div>
            </div>
        </Modal>
    )
}

export default UpdateUserModal;