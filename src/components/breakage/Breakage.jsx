import React, {useState} from 'react';
import '../admin/admin.css'
import axios from "axios";

const Breakage = () => {
    const [idHardware, setIdHardware] = useState('')
    const [idAdmin, setIdAdmin] = useState('')
    const [typeBreakage, setTypeBreakage] = useState('')
    const [typeWork, setTypeWork] = useState('')
    const [dateBreakage, setDateBreakage] = useState('')

    const [newIdHardware, setNewIdHardware] = useState('')
    const [newIdAdmin, setNewIdAdmin] = useState('')
    const [newTypeBreakage, setNewTypeBreakage] = useState('')
    const [newTypeWork, setNewTypeWork] = useState('')
    const [newDateBreakage, setNewDateBreakage] = useState('')

    const [breakageList, setBreakageList] = useState([])
    const [searchItem, setSearchItem] = useState('')
    const getAdmin = () => {
        axios.get("http://localhost:3001/workers_breakage").then((responce) => {
            setBreakageList(responce.data)
        })
    }
    const addAdmin = () => {
        axios.post("http://localhost:3001/create_breakage", {
            idHardware: idHardware,
            idAdmin: idAdmin,
            typeBreakage: typeBreakage,
            typeWork: typeWork,
            dateBreakage: dateBreakage
        }).then(() => {
            getAdmin()
            setBreakageList([...breakageList, {
                id_оборудования: idHardware,
                id_администратора: idAdmin,
                тип_поломки: typeBreakage,
                тип_работы: typeWork,
                дата_поломки: dateBreakage
            }])
        })
    }
    const updateAdminSurName = (id) => {
        axios.put("http://localhost:3001/update_breakage", {
            id_оборудования: newIdHardware,
            id_администратора: newIdAdmin,
            тип_поломки: newTypeBreakage,
            тип_работы: newTypeWork,
            дата_поломки: newDateBreakage,
            id_поломки: id
        }).then((responce) => {
            getAdmin()
            window.location.reload()
            alert("Изменения выполнены успешно!")
            setBreakageList(breakageList.map((val) => {
                return val.id_поломки == id ? {
                    id: val.id_поломки,
                    idHardware: val.id_оборудования,
                    idAdmin: val.id_администратора,
                    typeBreakage: val.тип_поломки,
                    typeWork: val.тип_работы,
                    dateBreakage: val.дата_поломки
                } : val
            }))
        })

    }
    const deleteAdminByName = (id) => {
        axios.delete(`http://localhost:3001/delete_breakage/${id}`).then((responce) => {
            setBreakageList(breakageList.filter((val) => {
                return val.id_поломки != id
            }))
        })
    }
    return (

        <div className="app">
            <div className="app_information">
                <div className="title_table">Поломка</div>
                <label>Номер оборудования</label>
                <input type="text" onChange={(event) => {
                    setIdHardware(event.target.value)

                }}/>
                <label>Номер администратора</label>
                <input type="text" onChange={(event) => {
                    setIdAdmin(event.target.value)
                }}/>
                <label>Тип поломки</label>
                <input type="text" onChange={(event) => {
                    setTypeBreakage(event.target.value)
                }}/>
                <label>Тип работы</label>
                <input type="text" onChange={(event) => {
                    setTypeWork(event.target.value)
                }}/>
                <label>Дата поломки</label>
                <input type="text" onChange={(event) => {
                    setDateBreakage(event.target.value)
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
                        } else if (val.дата_поломки.toLowerCase().includes(searchItem.toLowerCase())) {
                            return val
                        }
                    }).map((val, key) => {
                        return <div className="worker">
                            <div className="idIdentify">№{val.id_поломки}</div>
                            <ul>
                                <li>
                                    <l>Оборудование:</l>
                                    {val.оборуд_наим}</li>
                                <li>
                                    <l>Администратор:</l>
                                    {val.фамилия}</li>
                                <li>
                                    <l>Тип поломки:</l>
                                    {val.наименование}</li>
                                <li>
                                    <l>Тип работы:</l>
                                    {val.Наименование}</li>
                                <li>
                                    <l>Дата поломки:</l>
                                    {val.дата_поломки.slice(0, 10)}</li>
                            </ul>
                            <div className="add">
                                <input type="text" placeholder="Номер оборудования..." onChange={(event) => {
                                    setNewIdHardware(event.target.value)
                                }}/>
                                <input type="text" placeholder="Номер администратора..." onChange={(event) => {
                                    setNewIdAdmin(event.target.value)
                                }}/>
                                <input type="text" placeholder="Тип поломки..." onChange={(event) => {
                                    setNewTypeBreakage(event.target.value)
                                }}/>
                                <input type="text" placeholder="Тип работы..." onChange={(event) => {
                                    setNewTypeWork(event.target.value)
                                }}/>
                                <input type="text" placeholder="Дата поломки..." onChange={(event) => {
                                    setNewDateBreakage(event.target.value)
                                }}/>
                                <br/>
                                <button onClick={() => {
                                    updateAdminSurName(val.id_поломки)
                                }}>Изменить
                                </button>
                                <button onClick={() => {
                                    deleteAdminByName(val.id_поломки)
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

export default Breakage;