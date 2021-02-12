const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const session = require('express-session')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')

PORT = 3001
const saltRounds = 4;

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "sailormoon1",
    database: "testdb",

})
/*ПОДКЛЮЧЕНИЕ К БД ВЫШЕ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/
const app = express()
app.use(express.json())
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use
{
    session({
        key: "idПользователя",
        secret: "subscribe",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60 * 60 * 24,
        },
    })
}
/*app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
        credentials: true,
    })
);*/
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*")
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    next()
})
app.post('/create_admin', (req, res) => {
    const surname = req.body.surname
    const name = req.body.name
    const middleName = req.body.middleName
    const workHours = req.body.workHours
    db.query('INSERT INTO администратор(фамилия,имя,отчество,время_работы) VALUES (?,?,?,?)',
        [surname, name, middleName, workHours], (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send("okay")
            }
        })
})
app.get('/workers_admin', (req, res) => {
    db.query('SELECT * FROM администратор', (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})
app.put('/update_admin', (req, res) => {
    const id = req.body.idадминистратор
    const surname = req.body.фамилия
    const name = req.body.имя
    const middlename = req.body.отчество
    db.query('UPDATE администратор SET  фамилия = ? , имя = ? , отчество = ? where idадминистратор =?', [surname, name, middlename, id], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})
app.delete('/delete_admin/:id', (req, res) => {
    const id = req.params.id
    db.query("DELETE FROM администратор WHERE idадминистратор = ?", id, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})
app.put('/filter_admin', (req, res) => {
    const surname = req.body.фамилия
    db.query("SELECT * FROM администратор WHERE фамилия = ? ", surname, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})
/*ЗАПРОСЫ К АДМИНУ ВСЕ С АДМИНОМ ВЫШЕ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/
app.post('/create_division', (req, res) => {
    const title = req.body.title
    const workHours = req.body.workHours
    db.query("INSERT INTO подразделения(название,время_работы) VALUES (?,?)", [title, workHours], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})
app.get('/workers_division', (req, res) => {
    db.query("SELECT * FROM подразделения", (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})
app.put('/update_division', (req, res) => {
    const id = req.body.idподразделения
    const title = req.body.название
    const workHours = req.body.время_работы
    db.query('UPDATE подразделения SET  название = ?   where idподразделения =?', [title, id], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})
app.delete('/delete_division/:id', (req, res) => {
    const id = req.params.id
    db.query("DELETE FROM подразделения WHERE idподразделения = ?", id, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})
/*ЗАПРОСЫ К ПОДРАЗДЕЛЕНИЯМ ВСЕ С ПОДРАЗДЕЛЕНИЯМИ ВЫШЕ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/
app.post('/create_client', (req, res) => {

    const surname = req.body.surname
    const name = req.body.name
    const middleName = req.body.middleName
    const id_division = req.body.id_Division
    db.query('INSERT INTO клиент(фамилия,имя,отчество,id_подразделения) VALUES (?,?,?,?)',
        [surname, name, middleName, id_division], (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send("okay")
            }
        })
})
app.get('/workers_client', (req, res) => {
    db.query('\n' +
        'select idклиент,фамилия,имя,отчество,название  from клиент inner join подразделения on клиент.id_подразделения = подразделения.idподразделения', (err, result) => {
            /*select * from клиенты*/
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        })
})
app.put('/update_client', (req, res) => {
    const id = req.body.idклиент
    const surname = req.body.фамилия
    const name = req.body.имя
    const middlename = req.body.отчество
    const id_division = req.body.id_подразделения
    db.query('UPDATE клиент SET  фамилия = ? , имя = ? , отчество = ?, id_подразделения = ? where idклиент =?', [surname, name, middlename, id_division, id], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})
app.delete('/delete_client/:id', (req, res) => {
    const id = req.params.id
    db.query("DELETE FROM клиент WHERE idклиент = ?", id, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})
/*ЗАПРОСЫ К КЛИЕНТАМ ВСЕ С КЛИЕНТАМ ВЫШЕ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/
app.post('/create_typeofwork', (req, res) => {
    const title = req.body.title
    db.query("INSERT INTO тип_работы(Наименование) VALUES (?)", title, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})
app.get('/workers_typeofwork', (req, res) => {
    db.query("SELECT * FROM тип_работы", (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})
app.put('/update_typeofwork', (req, res) => {
    const id = req.body.idтип_работы
    const title = req.body.Наименование
    db.query('UPDATE тип_работы SET  Наименование = ?   where idтип_работы =?', [title, id], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})
app.delete('/delete_typeofwork/:id', (req, res) => {
    const id = req.params.id
    db.query("DELETE FROM тип_работы WHERE idтип_работы = ?", id, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})
/*ЗАПРОСЫ К ТИПАМ РАБОТ ВСЕ С ТИПАМИ РАБОТ ВЫШЕ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/
app.post('/create_typeofbreakage', (req, res) => {
    const title = req.body.title
    const description = req.body.description
    db.query('INSERT INTO тип_поломки(наименование,Описание) VALUES (?,?)',
        [title, description], (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send("okay")
            }
        })
})
app.get('/workers_typeofbreakage', (req, res) => {
    db.query('SELECT * FROM тип_поломки', (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})
app.put('/update_typeofbreakage', (req, res) => {
    const id = req.body.idТип_поломки
    const title = req.body.наименование
    const description = req.body.Описание
    db.query('UPDATE тип_поломки SET  наименование = ? , Описание = ? where idТип_поломки =?', [title, description, id], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})
app.delete('/delete_typeofbreakage/:id', (req, res) => {
    const id = req.params.id
    db.query("DELETE FROM тип_поломки WHERE idТип_поломки = ?", id, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})
/*ЗАПРОСЫ К ТИПАМ ПОЛОМОК  ВСЕ С ТИПАМИ ПОЛОМОК ВЫШЕ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/
app.post('/create_hardware', (req, res) => {

    const title = req.body.title
    const typeHardware = req.body.typeHardware
    const idClient = req.body.idClient
    db.query('INSERT INTO оборудование(наименование,тип_оборудования,idклиента) VALUES (?,?,?)',
        [title, typeHardware, idClient], (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send("okay")
            }
        })
})
app.get('/workers_hardware', (req, res) => {
    db.query('select idоборудование,наименование,тип_оборудования,idклиента,фамилия from оборудование inner join клиент on оборудование.idклиента = клиент.idклиент', (err, result) => {
        /*
select фамилия,имя,отчество,название  from клиент inner join подразделения on клиент.id_подразделения = подразделения.idподразделения*/
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})
app.put('/update_hardware', (req, res) => {
    const id = req.body.idоборудование
    const title = req.body.наименование
    const typeHardware = req.body.тип_оборудования
    const idClient = req.body.idклиента
    db.query('UPDATE оборудование SET  наименование = ? , тип_оборудования = ? , idклиента = ? where idоборудование =?', [title, typeHardware, idClient, id], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})
app.delete('/delete_hardware/:id', (req, res) => {
    const id = req.params.id
    db.query("DELETE FROM оборудование WHERE idоборудование = ?", id, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})
/*ЗАПРОСЫ К ОБОРУДОВАНИЮ  ВСЕ С ОБОРУДОВАНИЕМ ВЫШЕ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/
app.post('/create_breakage', (req, res) => {

    const idHardware = req.body.idHardware
    const idAdmin = req.body.idAdmin
    const typeBreakage = req.body.typeBreakage
    const typeWork = req.body.typeWork
    const dateBreakage = req.body.dateBreakage
    db.query('INSERT INTO поломка(id_оборудования,id_администратора,тип_поломки,тип_работы,дата_поломки) VALUES (?,?,?,?,?)',
        [idHardware, idAdmin, typeBreakage, typeWork, dateBreakage], (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send("okay")
            }
        })
})
app.get('/workers_breakage', (req, res) => {
    db.query('select поломка.id_поломки,поломка.дата_поломки, оборудование.наименование as оборуд_наим,оборудование.idоборудование,тип_работы.idтип_работы,тип_работы.Наименование,тип_поломки.наименование,тип_поломки.idТип_поломки,администратор.idадминистратор,администратор.фамилия\n' +
        'from поломка\n' +
        'inner join оборудование on оборудование.idоборудование = поломка.id_оборудования\n' +
        'inner join тип_работы on тип_работы.idтип_работы = поломка.тип_работы\n' +
        'inner join тип_поломки on тип_поломки.idТип_поломки = поломка.тип_поломки\n' +
        'inner join администратор on администратор.idадминистратор = поломка.id_администратора', (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        })
})
app.put('/update_breakage', (req, res) => {
    const id = req.body.id_поломки
    const idHardware = req.body.id_оборудования
    const idAdmin = req.body.id_администратора
    const typeBreakage = req.body.тип_поломки
    const typeWork = req.body.тип_работы
    const dateBreakage = req.body.дата_поломки
    db.query('UPDATE поломка SET  id_оборудования = ? , id_администратора = ? , тип_поломки = ?,тип_работы = ?,дата_поломки = ? where id_поломки =?', [idHardware, idAdmin, typeBreakage, typeWork, dateBreakage, id], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})
app.delete('/delete_breakage/:id', (req, res) => {
    const id = req.params.id
    db.query("DELETE FROM поломка WHERE id_поломки = ?", id, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})
/*ЗАПРОСЫ К ПОЛОМКЕ  ВСЕ С ПОЛОМКОЙ  ВЫШЕ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/
app.post('/create_result', (req, res) => {

    const status = req.body.status
    const idBreakage = req.body.idBreakage
    db.query('INSERT INTO результат_работы(статус,id_поломки) VALUES (?,?)',
        [status, idBreakage], (err, result) => {
            if (status == "" & idBreakage == "") {
                res.send({ messageResult: "Заполните все поля!" });
            }
            if (err) {
                console.log(err)
            } else {
                res.send("okay")
            }
        })
    /*ВОЗМОЖНЫ ОШИБКИ*/
})
app.get('/workers_result', (req, res) => {
    db.query('select * from поломка inner join результат_работы on поломка.id_поломки = результат_работы.id_поломки', (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})
app.put('/update_result', (req, res) => {
    const status = req.body.статус
    const idBreakage = req.body.id_поломки
    const idResult = req.body.idрезультат
    db.query('UPDATE результат_работы SET  статус = ? , id_поломки = ?  where idрезультат =?', [status, idBreakage, idResult], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})
app.delete('/delete_result/:id', (req, res) => {
    const id = req.params.id
    db.query("DELETE FROM результат_работы WHERE idрезультат = ?", id, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})
/*ЗАПРОСЫ К РЕЗУЛЬТАТУ РАБОТЫ  ВСЕ С РЕЗУЛЬТАТОМ РАБОТЫ   ВЫШЕ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/

app.post('/', (req, res) => {
    const username = req.body.имя
    const password = req.body.пароль
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            console.log(err);
        }
        if (username == "" & password == "") {
            res.send({ messagelogin: "Заполните логин и пароль!" });

        } else {
            db.query(
                "INSERT INTO пользователь (имя, пароль) VALUES (?,?)",
                [username, hash],
                (err, result) => {
                    res.send({ sucRegistr: "Пользователь успешно добавлен!" })
                    console.log(err);
                }
            );
        }
    });

});

app.post('/login', (req, res, next) => {

    const username = req.body.имя
    const password = req.body.пароль
    db.query(
        "SELECT * FROM пользователь WHERE имя = ?;",
        username,
        (err, result) => {
            if (err) {
                res.send({ err: err });
            }
            if (result.length > 0) {
                bcrypt.compare(password, result[0].пароль, (error, response) => {
                    if (response) {
                        res.send(result)
                    } else {
                        res.send({ message: "Проверьте логин или пароль!" });
                    }
                });
            } else {
                res.send({ message: "Пользователя не существует!" });
            }
        }
    );
})
/*ЗАПРОСЫ К РЕГИСТРАЦИИИ РАБОТЫ  ВСЕ С РЕГИСТРАЦИИЕЙ   ВЫШЕ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/
app.get('/listqhardware', (req, res) => {
    db.query('select \tадминистратор.фамилия,оборудование.наименование\n' +
        'from поломка\n' +
        ' inner join оборудование on поломка.id_оборудования = оборудование.idоборудование\n' +
        ' inner join  администратор on поломка.id_администратора = администратор.idадминистратор\n' +
        '  ', (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        })
})

/*список оборудования поломк и админинов ^*/
app.get('/hardwarenotfixed', (req, res) => {
    db.query('select результат_работы.статус,результат_работы.id_поломки,тип_работы.Наименование as Наименование_Работы,тип_поломки.Описание as Описание_Поломки,тип_поломки.наименование as Наименование_Поломки   from  результат_работы,поломка inner join \n' +
        'тип_работы on поломка.тип_работы = тип_работы.idтип_работы\n' +
        'inner join тип_поломки on поломка.тип_поломки = тип_поломки.idТип_поломки\n' +
        ' where   результат_работы.id_поломки =поломка.id_поломки AND результат_работы.статус = \'не исправлено\'', (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        })
})
/*список неисправного оборудования ^*/
app.get('/urgentrepairs', (req, res) => {
    db.query('select  дата_поломки, администратор.фамилия,оборудование.наименование,результат_работы.статус\n' +
        'from поломка\n' +
        'inner join оборудование on поломка.id_оборудования = оборудование.idоборудование\n' +
        'inner join  администратор on поломка.id_администратора = администратор.idадминистратор\n' +
        'inner join результат_работы on поломка.id_поломки = результат_работы.id_поломки\n' +
        'where date_add(дата_поломки,interval 5 day) > current_date() and результат_работы.статус = \'не исправлено\'', (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        })
})
/*список оборудования которое нуждается в срочном ремонте  ^*/

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
})