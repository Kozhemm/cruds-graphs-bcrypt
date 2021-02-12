import React, {useState} from 'react';
import '../admin/admin.css'
import axios from "axios";

const ResultOfWork = () => {
    const [status, setStatus] = useState('')
    const [idBreakage, setIdBreakage] = useState(0)

    const [newStatus, setNewStatus] = useState('')
    const [newIdBreakage, setNewIdBreakage] = useState(0)

    const [resultsWorkList, setResultsWorkList] = useState([])
    const [searchItem, setSearchItem] = useState('')
    const getAdmin = () => {
        axios.get("http://localhost:3001/workers_result").then((responce) => {
            setResultsWorkList(responce.data)
        })
    }
    const addAdmin = () => {
        axios.post("http://localhost:3001/create_result", {
            idBreakage: idBreakage,
            status: status,
        }).then((responce) => {
            if (responce.data.messageResult) {
                alert("Заполните поля!")
            } else {
                getAdmin()
                setResultsWorkList([...resultsWorkList, {
                    id_поломки: idBreakage,
                    статус: status,
                }])
            }
        })
        /*ВОЗМОЖНЫ ОШИБКИ*/
    }
    const updateAdminSurName = (id) => {
        axios.put("http://localhost:3001/update_result", {
            статус: newStatus,
            idрезультат: id,
            id_поломки: newIdBreakage
        }).then((responce) => {
            setResultsWorkList(resultsWorkList.map((val) => {
                getAdmin()
                return val.idрезультат == id ? {
                    id: val.idрезультат,
                    idBreakage: val.id_поломки,
                    status: val.статус
                } : val
            }))
        })

    }
    const deleteAdminByName = (id) => {
        axios.delete(`http://localhost:3001/delete_result/${id}`).then((responce) => {
            setResultsWorkList(resultsWorkList.filter((val) => {
                return val.idрезультат != id
            }))
        })
    }
    return (

        <div className="app">
            <div className="app_information">
                <div className="title_table">Результат работы</div>
                <label>Номер поломки</label>
                <input type="text" onChange={(event) => {
                    setIdBreakage(event.target.value)
                }}/>
                <label>Статус</label>
                <input type="text" onChange={(event) => {
                    setStatus(event.target.value)
                }}/>
                <button onClick={addAdmin}>Добавить</button>
                <button onClick={getAdmin}>Показать</button>
                <input type="text" placeholder="поиск.." onChange={(event) => {
                    setSearchItem(event.target.value)
                }}/>
                <div className="workers">
                    {resultsWorkList.filter((val) => {
                        if (searchItem == '') {
                            return val
                        } else if (val.статус.toLowerCase().includes(searchItem.toLowerCase())) {
                            return val
                        }
                    }).map((val, key) => {
                        return <div className="worker">
                            <div className="idIdentify">№{val.idрезультат}</div>
                            <ul>
                                <li>
                                    <l>Номер поломки:</l>
                                    {val.id_поломки}</li>
                                <li>
                                    <l>Статус:</l>
                                    {val.статус}</li>
                            </ul>
                            <div className="add">
                                <input type="text" placeholder="Номер поломки..." onChange={(event) => {
                                    setNewIdBreakage(event.target.value)
                                }}/>
                                <input type="text" placeholder="Статус..." onChange={(event) => {
                                    setNewStatus(event.target.value)
                                }}/>
                                <br/>
                                <button onClick={() => {
                                    updateAdminSurName(val.idрезультат)
                                }}>Изменить
                                </button>
                                <button onClick={() => {
                                    deleteAdminByName(val.idрезультат)
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

export default ResultOfWork;