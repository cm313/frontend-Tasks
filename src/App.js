import Header from './components/Header';
//import Forms from "./components/Forms";
import "../src/styles/App.css";
import Message from './components/Message';
import { Calendar } from 'antd';

//import LoginForm from './components/LoginForm';
//import Layouts from './components/Layouts';





function App() {
  return (
    <div className="App">
      {
        /*
        <>
      <div class="flex-container">
      <div class="forms">
      <Forms/>
      </div>
      <div class="loginform">
       <LoginForm/>
     </div>
     </div>
      <div class="forms">
      <Layouts/> 
      </div> 
     </>
     */
    <>
     <Header/>
     <Calendar/>
     <Message/>
     </>
}
    </div>
  );
}

export default App;
