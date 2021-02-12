import React, { useState, useEffect } from "react"
import "./registration.css"
import axios from "axios"
import { createBrowserHistory } from "history"

const Registration = () => {
  const [usernameReg, setUsernameReg] = useState("")
  const [passwordReg, setPasswordReg] = useState("")

  const [userName, setUserName] = useState("")
  const [userPassword, setUserPassword] = useState("")

  const [loginStatus, setLoginStatus] = useState("")

  const customHistory = createBrowserHistory()
  const register = () => {
    axios
      .post("http://localhost:3001", {
        имя: usernameReg,
        пароль: passwordReg,
      })
      .then((responce) => {
        if (responce.data.sucRegistr) {
          setLoginStatus(responce.data.sucRegistr)
        }
        if (responce.data.messagelogin) {
          setLoginStatus(responce.data.messagelogin)
        }
      })
  }
  const login = (props) => {
    axios
      .post("http://localhost:3001/login", {
        имя: userName,
        пароль: userPassword,
      })
      .then((responce) => {
        if (responce.data.message) {
          setLoginStatus(responce.data.message)
        } else {
          setLoginStatus(responce.data[0].имя)
          customHistory.push("/home")
          window.location.reload()
        }
      })
  }

  return (
    <div className="registerApp">
      <div className="registration">
        <h1>Регистрация</h1>
        <label>Имя</label>
        <input
          type="text"
          onChange={(e) => {
            setUsernameReg(e.target.value)
          }}
        />
        <label>Пароль</label>
        <input
          type="text"
          onChange={(e) => {
            setPasswordReg(e.target.value)
          }}
        />
        <button onClick={register}>Зарегистрировать</button>
      </div>
      <div className="login">
        <input
          type="text"
          placeholder="Имя пользователя"
          onChange={(e) => {
            setUserName(e.target.value)
          }}
        />
        <input
          type="password"
          placeholder="Пароль"
          onChange={(e) => {
            setUserPassword(e.target.value)
          }}
        />
        <button onClick={login}>Войти</button>
      </div>
      <h1>{loginStatus}</h1>
    </div>
  )
}

export default Registration
