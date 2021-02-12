import React, {useState} from 'react';
import '../admin/admin.css'
import axios from "axios";

const TypeOfWork = () => {
    const [title, setTitle] = useState('')
    const [newTitle, setNewTitle] = useState('')
    const [workList, setWorkList] = useState([])
    const [searchItem, setSearchItem] = useState('')
    const getAdmin = () => {
        axios.get("http://localhost:3001/workers_typeofwork").then((responce) => {
            setWorkList(responce.data)
        })
    }
    const addAdmin = () => {
        axios.post("http://localhost:3001/create_typeofwork", {
            title: title,
        }).then(() => {
            getAdmin()
            setWorkList([...workList, {
                Наименование: title,
            }])
        })
    }
    const updateAdminSurName = (id) => {
        axios.put("http://localhost:3001/update_typeofwork", {
            Наименование: newTitle,
            idтип_работы: id
        }).then((responce) => {
            getAdmin()
            setWorkList(workList.map((val) => {
                return val.idтип_работы == id ? {
                    id: val.idтип_работы,
                    title: val.Наименование,
                } : val
            }))
        })

    }
    const deleteAdminByName = (id) => {
        axios.delete(`http://localhost:3001/delete_typeofwork/${id}`).then((responce) => {
            setWorkList(workList.filter((val) => {
                return val.idтип_работы != id
            }))
        })
    }
    return (

        <div className="app">
            <div className="app_information">
                <div className="title_table">Типы работ</div>
                <label>Название</label>
                <input type="text" onChange={(event) => {
                    setTitle(event.target.value)
                }}/>
                <button onClick={addAdmin}>Добавить</button>
                <button onClick={getAdmin}>Показать</button>
                <input type="text" placeholder="поиск.." onChange={(event) => {
                    setSearchItem(event.target.value)
                }}/>
                <div className="workers">
                    {workList.filter((val) => {
                        if (searchItem == '') {
                            return val
                        } else if (val.Наименование.toLowerCase().includes(searchItem.toLowerCase())) {
                            return val
                        }
                    }).map((val, key) => {
                        return <div className="worker">
                            <div className="idIdentify">№{val.idтип_работы}</div>
                            <ul>
                                <li>
                                    <l>Наименование:</l>
                                    {val.Наименование}</li>
                            </ul>
                            <div className="add">
                                <input type="text" placeholder="Название..." onChange={(event) => {
                                    setNewTitle(event.target.value)
                                }}/>
                                <br/>
                                <button onClick={() => {
                                    updateAdminSurName(val.idтип_работы)
                                }}>Изменить
                                </button>
                                <button onClick={() => {
                                    deleteAdminByName(val.idтип_работы)
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

export default TypeOfWork;