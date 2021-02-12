import React, {useState} from 'react';
import './admin.css'
import axios from "axios";

const Admin = () => {
    const [surname, setSurname] = useState('')
    const [name, setName] = useState('')
    const [middleName, setMiddleName] = useState('')
    const [workHours, setWorkHours] = useState('')

    const [newSurName, setNewSurName] = useState('')
    const [newName, setNewName] = useState('')
    const [newMiddleName, setNewMiddleName] = useState('')

    const [adminList, setAdminList] = useState([])
    const [searchItem, setSearchItem] = useState('')
    const getAdmin = () => {
        axios.get("http://localhost:3001/workers_admin").then((responce) => {
            setAdminList(responce.data)
        })
    }
    const addAdmin = () => {
        axios.post("http://localhost:3001/create_admin", {
            surname: surname,
            name: name,
            middleName: middleName,
            workHours: workHours
        }).then(() => {
            getAdmin()
            setAdminList([...adminList, {
                фамилия: surname,
                имя: name,
                отчество: middleName,
                время_работы: workHours
            }])
        })
    }
    const updateAdminSurName = (id) => {
        axios.put("http://localhost:3001/update_admin", {
            фамилия: newSurName,
            имя: newName,
            отчество: newMiddleName,
            idадминистратор: id
        }).then((responce) => {
            getAdmin()
            setAdminList(adminList.map((val) => {
                return val.idадминистратор == id ? {
                    id: val.idадминистратор,
                    surname: val.фамилия,
                    name: val.имя,
                    middleName: val.отчество,
                    workHours: val.время_работы
                } : val
            }))
        })

    }
    const deleteAdminByName = (id) => {
        axios.delete(`http://localhost:3001/delete_admin/${id}`).then((responce) => {
            setAdminList(adminList.filter((val) => {
                return val.idадминистратор != id
            }))
        })
    }
    return (

        <div className="app">
            <div className="app_information">
                <div className="title_table">Администраторы</div>
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
                <label>Время работы</label>
                <input type="text" onChange={(event) => {
                    setWorkHours(event.target.value)
                }}/>

                <button onClick={addAdmin}>Добавить</button>
                <button onClick={getAdmin}>Показать</button>
                <input type="text" placeholder="поиск.." onChange={(event) => {
                    setSearchItem(event.target.value)
                }}/>
                <div className="workers">
                    {adminList.filter((val) => {
                        if (searchItem == '') {
                            return val
                        } else if (val.фамилия.toLowerCase().includes(searchItem.toLowerCase())) {
                            return val
                        }
                    }).map((val, key) => {
                        return <div className="worker">
                            <div className="idIdentify">№{val.idадминистратор}</div>
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
                                    <l>Время работы:</l>
                                    {val.время_работы}</li>
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
                                <br/>
                                <button onClick={() => {
                                    updateAdminSurName(val.idадминистратор)

                                }}>Изменить
                                </button>
                                <button onClick={() => {
                                    deleteAdminByName(val.idадминистратор)
                                }}> Удалить
                                </button>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </div>
    )
        ;
};

export default Admin;