import { useState, useMemo } from 'react';
import { Search, Gamepad2, X, Maximize2, ExternalLink, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import gamesData from './data/games.json';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGame, setSelectedGame] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const filteredGames = useMemo(() => {
    return gamesData.filter(game => 
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    <div className="min-h-screen bg-gaming-bg text-white selection:bg-gaming-accent/30">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 border-b border-white/5 bg-gaming-bg/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gaming-accent rounded-xl flex items-center justify-center shadow-lg shadow-gaming-accent/20">
                <Gamepad2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight hidden sm:block">
                NEXUS<span className="text-gaming-accent">GAMES</span>
              </span>
            </div>

            <div className="flex-1 max-w-md mx-4">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 group-focus-within:text-gaming-accent transition-colors" />
                <input
                  type="text"
                  placeholder="Search games..."
                  className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:border-gaming-accent/50 focus:ring-1 focus:ring-gaming-accent/50 transition-all text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="p-2 text-white/60 hover:text-white transition-colors">
                <Info className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gaming-accent/5 blur-[120px] rounded-full -z-10" />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tighter mb-4">
            Level Up Your <span className="text-gaming-accent">Boredom</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Discover a curated collection of the best unblocked web games. 
            No downloads, no blocks, just pure gaming.
          </p>
        </motion.div>
      </header>

      {/* Games Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredGames.map((game) => (
              <motion.div
                key={game.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -8 }}
                className="group relative bg-gaming-card border border-white/5 rounded-2xl overflow-hidden cursor-pointer hover:border-gaming-accent/50 transition-all duration-300"
                onClick={() => setSelectedGame(game)}
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={game.thumbnail}
                    alt={game.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold mb-1 group-hover:text-gaming-accent transition-colors">
                    {game.title}
                  </h3>
                  <p className="text-sm text-white/50 line-clamp-2">
                    {game.description}
                  </p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-5">
                  <span className="text-sm font-semibold flex items-center gap-2">
                    Play Now <ExternalLink className="w-4 h-4" />
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredGames.length === 0 && (
          <div className="text-center py-20">
            <p className="text-white/40 text-lg">No games found matching your search.</p>
          </div>
        )}
      </main>

      {/* Game Modal */}
      <AnimatePresence>
        {selectedGame && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`bg-gaming-card rounded-3xl overflow-hidden flex flex-col shadow-2xl border border-white/10 ${
                isFullScreen ? 'w-full h-full' : 'w-full max-w-5xl aspect-video'
              }`}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gaming-accent/20 rounded-lg flex items-center justify-center">
                    <Gamepad2 className="w-5 h-5 text-gaming-accent" />
                  </div>
                  <h2 className="font-bold text-lg">{selectedGame.title}</h2>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleFullScreen}
                    className="p-2 hover:bg-white/5 rounded-lg transition-colors text-white/60 hover:text-white"
                    title="Toggle Fullscreen"
                  >
                    <Maximize2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedGame(null);
                      setIsFullScreen(false);
                    }}
                    className="p-2 hover:bg-white/5 rounded-lg transition-colors text-white/60 hover:text-white"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Iframe Container */}
              <div className="flex-1 bg-black relative">
                <iframe
                  src={selectedGame.url}
                  className="w-full h-full border-none"
                  title={selectedGame.title}
                  allow="autoplay; fullscreen; keyboard"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="border-t border-white/5 py-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-white/20 text-sm">
            &copy; {new Date().getFullYear()} Nexus Unblocked Games. All games are property of their respective owners.
          </p>
        </div>
      </footer>
    </div>
  );
}
