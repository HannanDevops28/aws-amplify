'use client';

import { useEffect, useState } from 'react';

interface Post {
  id: number;
  title: string;
  body: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [assistantResponse, setAssistantResponse] = useState('');
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      });
  }, []);

  // Fake AI typing animation
  const handleSend = () => {
    if (!inputValue.trim()) return;
    setAssistantResponse('');
    const text = `🤖 This is your AI Assistant speaking... "${inputValue}" sounds interesting!`;
    let i = 0;
    const typing = setInterval(() => {
      setAssistantResponse(text.slice(0, i + 1));
      i++;
      if (i === text.length) clearInterval(typing);
    }, 30);
    setInputValue('');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white font-sans p-6 relative overflow-hidden">
      {/* ANIMATED BACKGROUND PARTICLES */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute animate-pulse top-1/4 left-1/3 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute animate-pulse delay-1000 bottom-1/3 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px]" />
        <div className="absolute animate-spin-slow top-0 left-0 w-[300px] h-[300px] border-4 border-cyan-500/20 rounded-full"></div>
      </div>

      {/* HEADER */}
      <header className="mb-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <h1 className="text-4xl font-extrabold tracking-wider bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
          🚀 Quantum AI CRM
        </h1>
        <nav className="flex gap-6 text-gray-300 text-sm">
          {['Dashboard', 'Analytics', 'Posts', 'Settings'].map((item) => (
            <a
              key={item}
              href="#"
              className="hover:text-cyan-400 transition relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
            </a>
          ))}
        </nav>
      </header>

      {/* ANALYTICS CARDS */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {[
          { label: 'Active Users', value: '1,245', color: 'from-cyan-400 to-blue-500' },
          { label: 'Monthly Revenue', value: '$8,540', color: 'from-green-400 to-emerald-500' },
          { label: 'Server Uptime', value: '99.98%', color: 'from-pink-400 to-purple-500' },
          { label: 'AI Predictions', value: '87%', color: 'from-yellow-400 to-orange-500' }
        ].map((stat, i) => (
          <div
            key={i}
            className={`p-6 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg shadow-black/40 hover:scale-[1.03] transition backdrop-blur-lg border border-white/10`}
          >
            <p className="text-sm text-gray-900 font-semibold">{stat.label}</p>
            <h2 className="text-3xl font-bold">{stat.value}</h2>
          </div>
        ))}
      </section>

      {/* MAIN CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Latest Posts */}
        <section className="lg:col-span-2 bg-gray-900/50 p-6 rounded-xl border border-gray-700 shadow-lg backdrop-blur-md">
          <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Latest Posts
          </h2>
          {loading ? (
            <p className="text-gray-400 animate-pulse">Loading posts...</p>
          ) : (
            <ul className="space-y-5">
              {posts.map(post => (
                <li
                  key={post.id}
                  className="group border-b border-gray-700 pb-4 hover:border-cyan-400 transition"
                >
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-cyan-400 transition">
                    {post.title}
                  </h3>
                  <p className="text-gray-300">{post.body}</p>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Notifications */}
        <aside className="bg-gray-900/50 p-6 rounded-xl border border-gray-700 shadow-lg backdrop-blur-md">
          <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Notifications
          </h2>
          <ul className="space-y-4 text-gray-300 text-sm">
            <li className="flex items-center gap-3 hover:text-cyan-400 transition">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              New payment from Alice
            </li>
            <li className="flex items-center gap-3 hover:text-cyan-400 transition">
              <span className="w-2 h-2 rounded-full bg-green-400"></span>
              Server update completed
            </li>
            <li className="flex items-center gap-3 hover:text-cyan-400 transition">
              <span className="w-2 h-2 rounded-full bg-purple-400"></span>
              New AI model deployed
            </li>
            <li className="flex items-center gap-3 hover:text-cyan-400 transition">
              <span className="w-2 h-2 rounded-full bg-pink-400"></span>
              User feedback received
            </li>
          </ul>
        </aside>
      </div>

      {/* TEAM MEMBERS */}
      <section className="mt-12 bg-gray-900/50 p-6 rounded-xl border border-gray-700 shadow-lg backdrop-blur-md">
        <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-green-400 to-teal-500 bg-clip-text text-transparent">
          Team Members
        </h2>
        <div className="flex gap-6 flex-wrap">
          {['Alice', 'Bob', 'Charlie', 'Diana'].map((name) => (
            <div key={name} className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-xl font-bold">
                {name.charAt(0)}
              </div>
              <p className="mt-2 text-gray-300">{name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* AI Assistant */}
      <section className="mt-12 bg-gray-900/50 p-6 rounded-xl border border-gray-700 shadow-lg backdrop-blur-md">
        <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          🤖 AI Assistant
        </h2>
        <div className="flex gap-3 items-center">
          <input
            type="text"
            placeholder="Ask me anything..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1 p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-cyan-400"
          />
          <button
            onClick={handleSend}
            className="px-5 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold rounded-lg hover:scale-105 transition"
          >
            Send
          </button>
        </div>
        {assistantResponse && (
          <p className="mt-4 text-gray-300 border-t border-gray-700 pt-4 animate-pulse">
            {assistantResponse}
          </p>
        )}
      </section>

      {/* FOOTER */}
      <footer className="mt-12 text-center text-gray-500 text-sm">
        <p>Crafted with ❤️ | Quantum AI CRM {new Date().getFullYear()}</p>
      </footer>
    </main>
  );
}
