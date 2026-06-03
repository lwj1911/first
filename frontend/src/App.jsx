import './App.css'
import useTodos from './hooks/useTodos.js'
import useWitch from './hooks/useWitch.js'
import useLogin from './hooks/useLogin.js'
import useLove from './hooks/useLove.js'
import useTest from './hooks/useTest.js' 
import Hello from './components/Hello.jsx'
import LoveAlert from './components/LoveAlert.jsx'
import WitchAlert from './components/WitchAlert.jsx'
import LoginForm from './components/LoginForm.jsx'
import TodoSwitcher from './components/TodoSwitcher.jsx'
import TodoInput from './components/TodoInput.jsx'
import TodoFilter from './components/TodoFilter.jsx'
import TodoList from './components/TodoList.jsx'
import Test from './components/Test.jsx'


function App() {
  const todo = useTodos()
  const witch = useWitch()
  const login = useLogin()
  const love = useLove()
  const test = useTest()


  return (
    <div className={witch.witchDead ? 'witch-curse' : ''}>
      <h1>我的TodosList</h1>
      <button onClick={() => alert('你点击了按钮！！')}>Click me!</button>
      <WitchAlert
        witchText={witch.witchText}
        witchDead={witch.witchDead}
        showAlert={witch.showAlert}
        alertMsg={witch.alertMsg}
        btText={witch.btText}
        onWitch={witch.onWitch}
        closeAlert={witch.closeAlert}
        witchForgive={witch.witchForgive}
      />
      <a href="https://www.baidu.com">look me</a>
      <br />
      <LoginForm
        username={login.username}
        password={login.password}
        onUsernameChange={login.setUsername}
        onPasswordChange={login.setPassword}
        onLogin={login.login}
        onRegister={login.register}
      />
      <TodoSwitcher activeList={todo.activeList} onSwitch={todo.switchList} />
      <TodoInput value={todo.renderText} onChange={todo.handleInputChange} onAdd={todo.addTodo} />
      <TodoFilter current={todo.filter} onChange={todo.changeFilter} />
      <br />
      <TodoList
        items={todo.showTodos}
        onToggle={todo.toggleDone}
        onDelete={todo.deleteTodo}
        onEdit={todo.editTodo}
      />
  <Hello onLoveChange={love.onLoveChange} />

      <LoveAlert
        showAlert={love.showAlert}
        alertMsg={love.alertMsg}
        onClose={love.closeLoveAlert}
      />

      <Test testText={test.testText} setTestText={test.setTestText} onTest={test.onTest} />
    </div>
    
  )
}
export default App
