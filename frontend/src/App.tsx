import { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Brain, GraduationCap, Clock, BookOpen, Activity } from 'lucide-react';

function App() {
  const [formData, setFormData] = useState({
    StudyHours: 5,
    PreviousScore: 75,
    SleepHours: 7,
    Attendance: 85
  });
  const [prediction, setPrediction] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Assuming backend runs on port 8001
      const res = await axios.post('http://localhost:8001/predict', formData);
      setPrediction(res.data.PredictedScore);
    } catch (error) {
      console.error(error);
      alert("Failed to connect to the prediction API. Ensure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-cover bg-center relative" style={{ backgroundImage: "url('/bg.png')" }}>
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>

      <div className="max-w-4xl w-full grid md:grid-cols-2 gap-8 relative z-10">
        
        {/* Left: Input Form */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-slate-900/40 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-blue-500/20 rounded-xl">
              <Brain className="text-blue-400" size={28} />
            </div>
            <h1 className="text-2xl font-bold">Predictor AI</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                <BookOpen size={16} /> Study Hours (per day)
              </label>
              <div className="flex items-center gap-4">
                <input 
                  type="range" min="0" max="14" step="0.5"
                  value={formData.StudyHours}
                  onChange={(e) => setFormData({...formData, StudyHours: parseFloat(e.target.value) || 0})}
                  className="flex-1 accent-blue-500"
                />
                <input 
                  type="number" min="0" max="14" step="0.5"
                  value={formData.StudyHours}
                  onChange={(e) => setFormData({...formData, StudyHours: parseFloat(e.target.value) || 0})}
                  className="w-20 bg-blue-500/10 border border-blue-500/30 rounded-lg px-2 py-1 text-blue-400 font-bold text-sm text-right focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                <GraduationCap size={16} /> Previous Score (%)
              </label>
              <div className="flex items-center gap-4">
                <input 
                  type="range" min="0" max="100" step="1"
                  value={formData.PreviousScore}
                  onChange={(e) => setFormData({...formData, PreviousScore: parseFloat(e.target.value) || 0})}
                  className="flex-1 accent-blue-500"
                />
                <input 
                  type="number" min="0" max="100" step="1"
                  value={formData.PreviousScore}
                  onChange={(e) => setFormData({...formData, PreviousScore: parseFloat(e.target.value) || 0})}
                  className="w-20 bg-blue-500/10 border border-blue-500/30 rounded-lg px-2 py-1 text-blue-400 font-bold text-sm text-right focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                <Clock size={16} /> Sleep Hours (per night)
              </label>
              <div className="flex items-center gap-4">
                <input 
                  type="range" min="0" max="12" step="0.5"
                  value={formData.SleepHours}
                  onChange={(e) => setFormData({...formData, SleepHours: parseFloat(e.target.value) || 0})}
                  className="flex-1 accent-blue-500"
                />
                <input 
                  type="number" min="0" max="12" step="0.5"
                  value={formData.SleepHours}
                  onChange={(e) => setFormData({...formData, SleepHours: parseFloat(e.target.value) || 0})}
                  className="w-20 bg-blue-500/10 border border-blue-500/30 rounded-lg px-2 py-1 text-blue-400 font-bold text-sm text-right focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                <Activity size={16} /> Attendance (%)
              </label>
              <div className="flex items-center gap-4">
                <input 
                  type="range" min="0" max="100" step="1"
                  value={formData.Attendance}
                  onChange={(e) => setFormData({...formData, Attendance: parseFloat(e.target.value) || 0})}
                  className="flex-1 accent-blue-500"
                />
                <input 
                  type="number" min="0" max="100" step="1"
                  value={formData.Attendance}
                  onChange={(e) => setFormData({...formData, Attendance: parseFloat(e.target.value) || 0})}
                  className="w-20 bg-blue-500/10 border border-blue-500/30 rounded-lg px-2 py-1 text-blue-400 font-bold text-sm text-right focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] disabled:opacity-50"
            >
              {loading ? "Analyzing..." : "Predict Final Score"}
            </button>
          </form>
        </motion.div>

        {/* Right: Results Display */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-slate-900/40 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 flex flex-col justify-center items-center text-center shadow-[0_8px_32px_rgba(0,0,0,0.5)] relative overflow-hidden"
        >
          {/* Decorative background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px] pointer-events-none" />

          {prediction !== null ? (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative z-10"
            >
              <p className="text-gray-400 font-medium mb-4 uppercase tracking-widest text-sm">Predicted Outcome</p>
              <div className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-blue-400 mb-6 drop-shadow-2xl">
                {prediction}<span className="text-4xl text-blue-500">%</span>
              </div>
              <p className="text-gray-300 max-w-xs mx-auto">
                Based on current metrics, this student is projected to achieve a {prediction >= 80 ? 'high' : prediction >= 60 ? 'moderate' : 'low'} final score.
              </p>
            </motion.div>
          ) : (
            <div className="relative z-10 text-gray-500">
              <Brain size={64} className="mx-auto mb-6 opacity-20" />
              <p className="text-lg">Adjust the metrics and run the prediction model to see results.</p>
            </div>
          )}
        </motion.div>

      </div>
    </div>
  );
}

export default App;
