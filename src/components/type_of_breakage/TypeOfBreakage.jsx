import React, {useState} from 'react';
import '../admin/admin.css'
import axios from "axios";

const TypeOfBreakage = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const [newTitle, setNewTitle] = useState('')
    const [newDescription, setNewDescription] = useState('')

    const [breakageList, setBreakageList] = useState([])
    const [searchItem, setSearchItem] = useState('')
    const getAdmin = () => {
        axios.get("http://localhost:3001/workers_typeofbreakage").then((responce) => {
            setBreakageList(responce.data)
        })
    }
    const addAdmin = () => {
        axios.post("http://localhost:3001/create_typeofbreakage", {
            title: title,
            description: description
        }).then(() => {
            getAdmin()
            setBreakageList([...breakageList, {
                Описание: description,
                наименование: title

            }])
        })
    }
    const updateAdminSurName = (id) => {
        axios.put("http://localhost:3001/update_typeofbreakage", {
            наименование: newTitle,
            Описание: newDescription,
            idТип_поломки: id
        }).then((responce) => {
            getAdmin()
            setBreakageList(breakageList.map((val) => {
                return val.idТип_поломки == id ? {
                    id: val.idТип_поломки,
                    title: val.наименование,
                    description: val.Описание
                } : val
            }))
        })

    }
    const deleteAdminByName = (id) => {
        axios.delete(`http://localhost:3001/delete_typeofbreakage/${id}`).then((responce) => {
            setBreakageList(breakageList.filter((val) => {
                return val.idТип_поломки != id
            }))
        })
    }
    return (

        <div className="app">
            <div className="app_information">
                <div className="title_table">Типы поломок</div>
                <label>Наименование</label>
                <input type="text" onChange={(event) => {
                    setTitle(event.target.value)
                }}/>
                <label>Описание</label>
                <input type="text" onChange={(event) => {
                    setDescription(event.target.value)
                }}/>
                <button onClick={addAdmin}>Добавить</button>
                <button onClick={getAdmin}>Показать</button>
                <input type="text" placeholder="поиск.." onChange={(event) => {
                    setSearchItem(event.target.value)
                }}/>
                <div className="workers">
                    {breakageList.filter((val) => {
                        if (searchItem == '') {
                            return val
                        } else if (val.наименование.toLowerCase().includes(searchItem.toLowerCase())) {
                            return val
                        }
                    }).map((val, key) => {
                        return <div className="worker">
                            <div className="idIdentify">№{val.idТип_поломки}</div>
                            <ul>
                                <li>
                                    <l>Наименование:</l>
                                    {val.наименование}</li>
                                <li>
                                    <l>Описание:</l>
                                    {val.Описание}</li>
                            </ul>
                            <div className="add">
                                <input type="text" placeholder="Наименование..." onChange={(event) => {
                                    setNewTitle(event.target.value)
                                }}/>
                                <input type="text" placeholder="Описание..." onChange={(event) => {
                                    setNewDescription(event.target.value)
                                }}/>
                                <br/>
                                <button onClick={() => {
                                    updateAdminSurName(val.idТип_поломки)
                                }}>Изменить
                                </button>
                                <button onClick={() => {
                                    deleteAdminByName(val.idТип_поломки)
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

export default TypeOfBreakage;