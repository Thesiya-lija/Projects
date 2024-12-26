// router.js
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import CheckEmailPage from "../pages/CheckEmail";
import CheckPasswordPage from "../pages/CheckPwd";
import Home from "../pages/Home";
import MessagePage from "../components/MessagePage";
import AuthLayouts from "../layout";
import UserRegister from "../pages/UserRegister";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "register",
        element: <AuthLayouts><UserRegister /></AuthLayouts> // Update here
      },
      {
        path: 'email',
        element: <AuthLayouts><CheckEmailPage /></AuthLayouts>
      },
      {
        path: 'password',
        element: <AuthLayouts><CheckPasswordPage /></AuthLayouts>
      },
      {
        path: "",
        element: <Home/>,
        children: [
          {
            path: ':userId',
            element: <MessagePage />
          }
        ]
      }
    ]
  }
]);

export default router;
