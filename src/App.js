import "./App.css";
import Header from "./components/Header";
import Hompage from "./pages/Hompage";
import CoinsPage from "./pages/CoinsPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

const App = () =>  {

  const useStyles = makeStyles(() => ({
    App : {
      background : "#14161a"  ,
      color : "white" ,
      minHeight : "100vh"
    }
  }))
  const classes = useStyles()
  return (
    <>
      <BrowserRouter>
        <div className={classes.App}>
          <Header />
          <Routes>
            <Route path="/" element={<Hompage />} exact />
            <Route path="/coins/:id" element={<CoinsPage  exact />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;