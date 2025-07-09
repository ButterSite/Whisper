import React, {useEffect, useRef} from 'react';
import Header from './Header';
import Welcome from './Welcome';
import PanelsContainer from './PanelsContainer';
import { panelsDataFirst, panelsDataSecond } from './data/panelsData';
import {LoginAndRegisterSection } from './LoginAndRegister';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router';
import { ChatSection } from './ChatSection';




function App() {
  const panelsRefsFirst = useRef([]);
  const panelsRefsSecond = useRef([]);
  const location = useLocation()


  const PrivateRoute = ({children}) => {
      const isAuthenticated = !!localStorage.getItem(`jwtToken`);
      return isAuthenticated ? children: <Navigate to={'/'}></Navigate>
  }

  const animatePanels = () => {
    const basedTimeOut = 400;
    const allPanels = [
      ...panelsRefsFirst.current,
      ...panelsRefsSecond.current, 
    ];

    allPanels.forEach((panel, index) => {
      const timeOut = basedTimeOut * (index + 1);
      setTimeout(() => {
        if (panel) panel.classList.add('showUp');
      }, timeOut);
    });
  }

  useEffect(() => {
      if(location.pathname === '/') {
        animatePanels()
      }
      }, [location.pathname]);




  return (
      <div>
        
        <Routes>
              <Route
              path='/'
              element={
                <>
                <Header />
                <Welcome />
                <PanelsContainer panels={panelsDataFirst} panelRefs={panelsRefsFirst} />
                <PanelsContainer panels={panelsDataSecond} panelRefs={panelsRefsSecond} />
                <LoginAndRegisterSection />
                </>
              }
              >
              </Route>
              <Route
                  path="/chat"
                  element={<PrivateRoute><ChatSection /></PrivateRoute>}
                />

        </Routes>



      </div>
  );
}


export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  )
}
