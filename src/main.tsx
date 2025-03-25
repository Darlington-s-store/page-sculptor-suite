
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import '@/services/db'; // Import database services to initialize them

createRoot(document.getElementById("root")!).render(<App />);
