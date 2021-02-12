import React, {useState} from 'react';
import '../admin/admin.css'
import axios from "axios";


const Hardware = () => {
    const [title, setTitle] = useState('')
    const [typeHardware, setTypeHardware] = useState('')
    const [idClient, setIdClient] = useState('')

    const [newTitle, setNewTitle] = useState('')
    const [newTypeHardware, setNewTypeHardware] = useState('')
    const [newIdClient, setNewIdClient] = useState('')

    const [hardwareList, setHardwareList] = useState([])
    const [searchItem, setSearchItem] = useState('')
    const getAdmin = () => {
        axios.get("http://localhost:3001/workers_hardware").then((responce) => {
            setHardwareList(responce.data)
        })
    }
    const addAdmin = () => {
        axios.post("http://localhost:3001/create_hardware", {
            title: title,
            typeHardware: typeHardware,
            idClient: idClient
        }).then(() => {
            getAdmin()
            setHardwareList([...hardwareList, {
                наименование: title,
                тип_оборудования: typeHardware,
                idклиента: idClient
            }])
        })
    }
    const updateAdminSurName = (id) => {
        axios.put("http://localhost:3001/update_hardware", {
            наименование: newTitle,
            тип_оборудования: newTypeHardware,
            idклиента: newIdClient,
            idоборудование: id
        }).then((responce) => {
            getAdmin()
            setHardwareList(hardwareList.map((val) => {
                return val.idоборудование == id ? {
                    id: val.idоборудование,
                    title: val.наименование,
                    typeHardware: val.тип_оборудования,
                    idClient: val.idклиента,
                } : val
            }))
        })

    }
    const deleteAdminByName = (id) => {
        axios.delete(`http://localhost:3001/delete_hardware/${id}`).then((responce) => {
            setHardwareList(hardwareList.filter((val) => {
                return val.idоборудование != id
            }))
        })
    }

    return (

        <div className="app">
            <div className="app_information">
                <div className="title_table">Оборудование</div>
                <label>Наименование</label>
                <input type="text" onChange={(event) => {
                    setTitle(event.target.value)
                }}/>
                <label>Тип оборудования</label>
                <input type="text" onChange={(event) => {
                    setTypeHardware(event.target.value)
                }}/>
                <label>Номер клиента</label>
                <input type="text" onChange={(event) => {
                    setIdClient(event.target.value)
                }}/>
                <button onClick={addAdmin}>Добавить</button>
                <button onClick={getAdmin}>Показать</button>
                <input type="text" placeholder="поиск.." onChange={(event) => {
                    setSearchItem(event.target.value)
                }}/>
                <div className="workers">
                    {hardwareList.filter((val) => {
                        if (searchItem == '') {
                            return val
                        } else if (val.наименование.toLowerCase().includes(searchItem.toLowerCase())) {
                            return val
                        }
                    }).map((val, key) => {
                        return <div className="worker">
                            <div className="idIdentify">№{val.idоборудование}</div>
                            <ul>
                                <li>
                                    <l>Наименование:</l>
                                    {val.наименование}</li>
                                <li>
                                    <l>Тип оборудования:</l>
                                    {val.тип_оборудования}</li>
                                <li>
                                    <l>Клиент:</l>
                                    {val.фамилия}</li>
                            </ul>
                            <div className="add">
                                <input type="text" placeholder="Наименование..." onChange={(event) => {
                                    setNewTitle(event.target.value)
                                }}/>
                                <input type="text" placeholder="Тип оборудования..." onChange={(event) => {
                                    setNewTypeHardware(event.target.value)
                                }}/>
                                <input type="text" placeholder="Номер клиента..." onChange={(event) => {
                                    setNewIdClient(event.target.value)
                                }}/>
                                <br/>
                                <button onClick={() => {
                                    updateAdminSurName(val.idоборудование)
                                }}>Изменить
                                </button>
                                <button onClick={() => {
                                    deleteAdminByName(val.idоборудование)
                                }}> Удалить
                                </button>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </div>
    );
};

export default Hardware;