import React, {useState} from 'react';
import '../admin/admin.css'
import axios from "axios";


const Client = () => {
    const [surname, setSurname] = useState('')
    const [name, setName] = useState('')
    const [middleName, setMiddleName] = useState('')
    const [id_Division, set_id_Division] = useState('')

    const [newSurName, setNewSurName] = useState('')
    const [newName, setNewName] = useState('')
    const [newMiddleName, setNewMiddleName] = useState('')
    const [newIdDivision, setNewIdDivision] = useState('')

    const [clientList, setClientList] = useState([])
    const [searchItem, setSearchItem] = useState('')

    const [titleDivision, setTitleDivision] = useState('')
    const getAdmin = () => {
        axios.get("http://localhost:3001/workers_client").then((responce) => {
            setClientList(responce.data)
        })
    }
    const addAdmin = () => {
        axios.post("http://localhost:3001/create_client", {
            surname: surname,
            name: name,
            middleName: middleName,
            id_Division: id_Division
        }).then(() => {
            getAdmin()
            setClientList([...clientList, {
                фамилия: surname,
                имя: name,
                отчество: middleName,
                id_подразделения: id_Division
            }])
        })
    }
    const updateAdminSurName = (id) => {
        axios.put("http://localhost:3001/update_client", {
            фамилия: newSurName,
            имя: newName,
            отчество: newMiddleName,
            id_подразделения: newIdDivision,
            idклиент: id
        }).then((responce) => {
            getAdmin()
            setClientList(clientList.map((val) => {
                return val.idклиент == id ? {
                    id: val.idклиент,
                    surname: val.фамилия,
                    name: val.имя,
                    middleName: val.отчество,
                } : val
            }))
        })

    }
    const deleteAdminByName = (id) => {
        axios.delete(`http://localhost:3001/delete_client/${id}`).then((responce) => {
            setClientList(clientList.filter((val) => {
                return val.idклиент != id
            }))
        })
    }
    return (

        <div className="app">
            <div className="app_information">
                <div className="title_table">Клиенты</div>
                <label>Фамилия</label>
                <input type="text" onChange={(event) => {
                    setSurname(event.target.value)
                }}/>
                <label>Имя</label>
                <input type="text" onChange={(event) => {
                    setName(event.target.value)
                }}/>
                <label>Отчество</label>
                <input type="text" onChange={(event) => {
                    setMiddleName(event.target.value)
                }}/>
                <label>Номер <br/> подразделения</label>
                <input type="text" onChange={(event) => {
                    set_id_Division(event.target.value)
                }}/>
                <button onClick={addAdmin}>Добавить</button>
                <button onClick={getAdmin} >Показать</button>
                <input type="text" placeholder="поиск.." onChange={(event) => {
                    setSearchItem(event.target.value)
                }}/>
                <div className="workers">
                    {clientList.filter((val) => {
                        if (searchItem == '') {
                            return val
                        } else if (val.фамилия.toLowerCase().includes(searchItem.toLowerCase())) {
                            return val
                        }
                    }).map((val, key) => {
                        return <div className="worker">
                            <div className="idIdentify">№{val.idклиент}</div>
                            <ul>
                                <li>
                                    <l>Фамилия:</l>
                                    {val.фамилия}</li>
                                <li>
                                    <l>Имя:</l>
                                    {val.имя}</li>
                                <li>
                                    <l>Отчество:</l>
                                    {val.отчество}</li>
                                <li>
                                    <l>Подразделение:</l>
                                    {val.название}</li>
                            </ul>
                            <div className="add">
                                <input type="text" placeholder="Фамилия..." onChange={(event) => {
                                    setNewSurName(event.target.value)
                                }}/>
                                <input type="text" placeholder="Имя..." onChange={(event) => {
                                    setNewName(event.target.value)
                                }}/>
                                <input type="text" placeholder="Отчество..." onChange={(event) => {
                                    setNewMiddleName(event.target.value)
                                }}/>
                                <input type="text" placeholder="Номер подразделения..." onChange={(event) => {
                                    setNewIdDivision(event.target.value)
                                }}/>
                                <br/>
                                <button onClick={() => {
                                    updateAdminSurName(val.idклиент)
                                }}>Изменить
                                </button>
                                <button onClick={() => {
                                    deleteAdminByName(val.idклиент)
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

export default Client;