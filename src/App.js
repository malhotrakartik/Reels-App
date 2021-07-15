import logo from './logo.svg';
import './App.css';
import SignUp  from './Components/SignUp';
import AuthProvider from './Context/AuthProvider';

function App() {
  return (
  <>
  <AuthProvider>
    <SignUp></SignUp>
  </AuthProvider>
  </>
  );
}

export default App;
