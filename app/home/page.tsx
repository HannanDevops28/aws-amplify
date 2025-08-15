'use client';

import Image from 'next/image';
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

  const handleSend = () => {
    if (!inputValue.trim()) return;
    setAssistantResponse('');
    const text = `🤖 NeuroNova AI: "${inputValue}" — interesting query! I'll process this instantly.`;
    let i = 0;
    const typing = setInterval(() => {
      setAssistantResponse(text.slice(0, i + 1));
      i++;
      if (i === text.length) clearInterval(typing);
    }, 25);
    setInputValue('');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white font-sans p-6 relative overflow-hidden">
      {/* BACKGROUND GLOWS */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-pink-500/20 rounded-full blur-[140px] animate-pulse delay-1000" />
        <div className="absolute animate-spin-slow top-0 left-0 w-[300px] h-[300px] border-4 border-purple-500/20 rounded-full"></div>
      </div>

      {/* HERO SECTION */}
      <section className="text-center mb-12">
        <h1 className="text-5xl font-extrabold tracking-wider bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(0,255,255,0.7)]">
          NeuroNova AI Command Center
        </h1>
        <p className="text-gray-400 mt-2 max-w-xl mx-auto text-lg">
          Orchestrate intelligence, predict the future, and visualize data like never before — powered by the stars.
        </p>
        <div className="mt-8 flex justify-center">
          <Image
        src="/logo.png"     
        alt="NeuroNova AI Logo"
        width={200}
        height={100}
        priority
      />
        </div>
      </section>

      {/* NAVIGATION */}
      <header className="mb-10 flex flex-wrap justify-center gap-6 text-gray-300 text-sm">
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
      </header>

      {/* STAT CARDS */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {[
          { label: 'Active Neural Nodes', value: '1,245', color: 'from-cyan-400 to-blue-500' },
          { label: 'Quantum Predictions', value: '98.7%', color: 'from-green-400 to-emerald-500' },
          { label: 'Processing Speed', value: '12.4 TFLOPS', color: 'from-pink-400 to-purple-500' },
          { label: 'Data Streams', value: '4.6 PB', color: 'from-yellow-400 to-orange-500' }
        ].map((stat, i) => (
          <div
            key={i}
            className={`p-6 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg shadow-black/40 hover:scale-[1.04] transition backdrop-blur-lg border border-white/10`}
          >
            <p className="text-sm text-gray-900 font-semibold">{stat.label}</p>
            <h2 className="text-3xl font-bold">{stat.value}</h2>
          </div>
        ))}
      </section>

      {/* POSTS + SIDEBAR */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* POSTS */}
        <section className="lg:col-span-2 bg-gray-900/50 p-6 rounded-xl border border-gray-700 shadow-lg backdrop-blur-md">
          <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Latest Neural Feeds
          </h2>
          {loading ? (
            <p className="text-gray-400 animate-pulse">Loading feeds...</p>
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

        {/* NOTIFICATIONS */}
        <aside className="bg-gray-900/50 p-6 rounded-xl border border-gray-700 shadow-lg backdrop-blur-md">
          <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            System Alerts
          </h2>
          <ul className="space-y-4 text-gray-300 text-sm">
            <li className="flex items-center gap-3 hover:text-cyan-400 transition">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              Quantum core updated
            </li>
            <li className="flex items-center gap-3 hover:text-cyan-400 transition">
              <span className="w-2 h-2 rounded-full bg-green-400"></span>
              AI cluster load balanced
            </li>
            <li className="flex items-center gap-3 hover:text-cyan-400 transition">
              <span className="w-2 h-2 rounded-full bg-purple-400"></span>
              Predictive model retrained
            </li>
            <li className="flex items-center gap-3 hover:text-cyan-400 transition">
              <span className="w-2 h-2 rounded-full bg-pink-400"></span>
              New encrypted data stream
            </li>
          </ul>
        </aside>
      </div>

      {/* AI ASSISTANT */}
      <section className="mt-12 bg-gray-900/50 p-6 rounded-xl border border-gray-700 shadow-lg backdrop-blur-md">
        <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          🧠 NeuroNova AI Assistant
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
        <p>© {new Date().getFullYear()} NeuroNova AI — All Rights Reserved</p>
      </footer>

      {/* FLOAT ANIMATION */}
      <style jsx>{`
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-spin-slow {
          animation: spin 20s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </main>
  );
}
