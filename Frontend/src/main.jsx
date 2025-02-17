import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";
import './index.css'
import {AuthProvider} from './contexts/AuthContext.jsx';
import MyRoutes from './router/MyRoutes.jsx';

createRoot(document.getElementById('root')).render(
<AuthProvider>
    <BrowserRouter>
        <MyRoutes/>
    </BrowserRouter>
</AuthProvider>
)
