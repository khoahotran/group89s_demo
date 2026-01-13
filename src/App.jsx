import { useEffect, useState } from 'react';
import demoData from '../data/demo.json';
import Dashboard from './components/Dashboard';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Simulate loading
    setData(demoData);
  }, []);

  if (!data) return <div className="flex h-screen items-center justify-center font-mono">Loading System Data...</div>;

  return (
    <div className="min-h-screen bg-background font-sans text-foreground antialiased selection:bg-black selection:text-white">
      <Dashboard data={data} />
    </div>
  );
}

export default App;
