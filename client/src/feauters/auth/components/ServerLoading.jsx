// Frontend mein
const [serverLoading, setServerLoading] = useState(true);

useEffect(() => {
  const timer = setTimeout(() => setServerLoading(false), 8000);
  return () => clearTimeout(timer);
}, []);

if (serverLoading) return (
  <div className="fixed inset-0 flex flex-col items-center justify-center bg-neutral-900">
    <h1 className="text-white text-xl mb-3">PromptIQ</h1>
    <p className="text-neutral-400 text-sm">Server starting up, please wait...</p>
  </div>
);