import React, {useState} from 'react';
import '../admin/admin.css'
import axios from "axios";

const Division = () => {
    const [title, setTitle] = useState('')
    const [workHours, setWorkHours] = useState('')
    const [newTitle, setNewTitle] = useState('')

    const [divisionList, setDivisionList] = useState([])
    const [searchItem, setSearchItem] = useState('')
    const getAdmin = () => {
        axios.get("http://localhost:3001/workers_division").then((responce) => {
            setDivisionList(responce.data)
        })
    }
    const addAdmin = () => {
        axios.post("http://localhost:3001/create_division", {
            title: title,
            workHours: workHours
        }).then(() => {
            getAdmin()
            setDivisionList([...divisionList, {
                название: title,
                время_работы: workHours
            }])
        })
    }
    const updateAdminSurName = (id) => {
        axios.put("http://localhost:3001/update_division", {
            название: newTitle,
            idподразделения: id
        }).then((responce) => {
            setDivisionList(divisionList.map((val) => {
                getAdmin()
                return val.idподразделения == id ? {
                    id: val.idподразделения,
                    title: val.название,
                    workHours: val.время_работы
                } : val
            }))
        })

    }
    const deleteAdminByName = (id) => {
        axios.delete(`http://localhost:3001/delete_division/${id}`).then((responce) => {
            setDivisionList(divisionList.filter((val) => {
                return val.idподразделения != id
            }))
        })
    }
    return (

        <div className="app">
            <div className="app_information">
                <div className="title_table">Подразделения</div>
                <label>Название</label>
                <input type="text" onChange={(event) => {
                    setTitle(event.target.value)
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
                    {divisionList.filter((val) => {
                        if (searchItem == '') {
                            return val
                        } else if (val.название.toLowerCase().includes(searchItem.toLowerCase())) {
                            return val
                        }
                    }).map((val, key) => {
                        return <div className="worker">
                            <div className="idIdentify">№{val.idподразделения}</div>
                            <ul>
                                <li>
                                    <l>Название:</l>
                                    {val.название}</li>
                                <li>
                                    <l>Время работы:</l>
                                    {val.время_работы}</li>
                            </ul>
                            <div className="add">
                                <input type="text" placeholder="Название..." onChange={(event) => {
                                    setNewTitle(event.target.value)
                                }}/>
                                <br/>
                                <button onClick={() => {
                                    updateAdminSurName(val.idподразделения)
                                }}>Изменить
                                </button>
                                <button onClick={() => {
                                    deleteAdminByName(val.idподразделения)
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

export default Division;