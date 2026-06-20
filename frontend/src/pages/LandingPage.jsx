import { Link } from "react-router";
import { 
  ShipWheelIcon, 
  MessageSquareIcon, 
  VideoIcon, 
  SparklesIcon,
  ArrowRightIcon,
  SmileIcon,
  CompassIcon,
  HeartHandshakeIcon
} from "lucide-react";
import ThemeSelector from "../components/ThemeSelector";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-base-100 text-base-content flex flex-col justify-between overflow-x-hidden selection:bg-primary selection:text-primary-content">
      {/* HEADER / NAVIGATION */}
      <header className="sticky top-0 z-40 bg-base-100/80 backdrop-blur-md border-b border-base-content/10 transition-all">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <ShipWheelIcon className="size-8 text-primary group-hover:rotate-45 transition-transform duration-500" />
            <span className="text-2xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent tracking-wider">
              IntroConnect
            </span>
          </Link>

          {/* Action Links */}
          <div className="flex items-center gap-3 sm:gap-4">
            <ThemeSelector />
            <Link to="/login" className="btn btn-ghost btn-sm sm:btn-md font-semibold">
              Sign In
            </Link>
            <Link to="/signup" className="btn btn-primary btn-sm sm:btn-md shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <main className="flex-grow">
        <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-28">
          {/* Background Decorative Blobs */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-primary/10 to-secondary/10 rounded-full blur-3xl pointer-events-none -z-10" />
          <div className="absolute top-1/3 left-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Headline and CTAs */}
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wider uppercase mb-2 animate-bounce">
                  <SparklesIcon className="size-3.5" />
                  Designed for Gentle Conversations
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none bg-clip-text text-transparent bg-gradient-to-r from-base-content via-base-content/90 to-primary">
                  Step Out of Your Shell, at Your Own Pace
                </h1>

                <p className="text-lg sm:text-xl opacity-80 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed">
                  IntroConnect is a safe, low-pressure language exchange space built specifically for introverts. Build talking confidence, ease social anxiety, and connect 1-on-1 with supportive global peers.
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                  <Link 
                    to="/signup" 
                    className="btn btn-primary btn-lg w-full sm:w-auto font-bold text-lg shadow-xl shadow-primary/25 group hover:scale-[1.02] transition-transform"
                  >
                    Start Talking Gently
                    <ArrowRightIcon className="size-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link 
                    to="/login" 
                    className="btn btn-outline btn-lg w-full sm:w-auto font-bold text-lg border-2 hover:bg-base-content/10 hover:border-transparent transition-all"
                  >
                    Welcome Back
                  </Link>
                </div>

                {/* Micro metrics / Trust points */}
                <div className="grid grid-cols-3 gap-6 pt-10 border-t border-base-content/10 max-w-md mx-auto lg:mx-0">
                  <div>
                    <h4 className="text-3xl font-bold text-primary">1-on-1</h4>
                    <p className="text-xs opacity-75 mt-1 font-medium">Focused Settings</p>
                  </div>
                  <div>
                    <h4 className="text-3xl font-bold text-secondary">Calm</h4>
                    <p className="text-xs opacity-75 mt-1 font-medium">Calming Forest Theme</p>
                  </div>
                  <div>
                    <h4 className="text-3xl font-bold text-accent">Zero</h4>
                    <p className="text-xs opacity-75 mt-1 font-medium">Group Pressure</p>
                  </div>
                </div>
              </div>

              {/* Right Column: Visual Component Cards */}
              <div className="lg:col-span-5 relative flex justify-center">
                <div className="relative w-full max-w-md">
                  {/* Decorative Frame Behind */}
                  <div className="absolute -inset-1.5 bg-gradient-to-r from-primary to-secondary rounded-3xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                  
                  {/* Glassmorphic Mockup App Card */}
                  <div className="relative card bg-base-200/60 backdrop-blur-xl border border-white/10 shadow-2xl p-6 rounded-3xl space-y-6">
                    {/* Header bar mock */}
                    <div className="flex items-center justify-between pb-4 border-b border-base-content/10">
                      <div className="flex items-center gap-2">
                        <div className="size-3 rounded-full bg-error" />
                        <div className="size-3 rounded-full bg-warning" />
                        <div className="size-3 rounded-full bg-success" />
                      </div>
                      <span className="text-xs font-mono opacity-60">introconnect.app</span>
                    </div>

                    {/* Chat Bubble Mock 1 */}
                    <div className="chat chat-start">
                      <div className="chat-image avatar">
                        <div className="w-10 rounded-full bg-neutral-content/20">
                          <img src="https://api.dicebear.com/7.x/lorelei/png?seed=Isla&size=128" alt="Mock user" />
                        </div>
                      </div>
                      <div className="chat-header opacity-65 text-xs mb-1">
                        Isla <span className="text-[10px] ml-1">🇬🇧 English Speaker</span>
                      </div>
                      <div className="chat-bubble chat-bubble-primary text-sm shadow-md">
                        Hey there! We can start with simple texts first. Take your time!
                      </div>
                    </div>

                    {/* Chat Bubble Mock 2 */}
                    <div className="chat chat-end">
                      <div className="chat-image avatar">
                        <div className="w-10 rounded-full bg-neutral-content/20">
                          <img src="https://api.dicebear.com/7.x/adventurer/png?seed=Noah&size=128" alt="Mock user" />
                        </div>
                      </div>
                      <div className="chat-header opacity-65 text-xs mb-1">
                        You <span className="text-[10px] mr-1">🇮🇳 Introvert Mode</span>
                      </div>
                      <div className="chat-bubble chat-bubble-secondary text-sm shadow-md">
                        That sounds incredibly reassuring. Let's do it!
                      </div>
                    </div>

                    {/* Call controls UI mock */}
                    <div className="bg-base-300/80 rounded-2xl p-4 flex items-center justify-between gap-4 shadow-inner">
                      <div className="flex items-center gap-3">
                        <div className="size-8 rounded-full bg-success flex items-center justify-center text-white">
                          <VideoIcon className="size-4 animate-pulse" />
                        </div>
                        <div>
                          <p className="text-xs font-bold">1-on-1 Private Call</p>
                          <p className="text-[10px] opacity-70">Overcome Speaking Anxiety</p>
                        </div>
                      </div>
                      <Link to="/signup" className="btn btn-xs btn-primary font-bold">
                        Join Call
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES GRID SECTION */}
        <section className="py-20 bg-base-200/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
            <div className="space-y-4 max-w-3xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Features Crafted for Communication Comfort</h2>
              <p className="text-base sm:text-lg opacity-70">
                Practice talking without the typical stress of social situations. Connect in an environment optimized for comfort.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {/* Feature 1 */}
              <div className="card bg-base-100 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 border border-base-content/5">
                <div className="card-body items-center text-center p-6 space-y-3">
                  <div className="size-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                    <MessageSquareIcon className="size-6" />
                  </div>
                  <h3 className="font-bold text-xl">Low-Pressure Chat</h3>
                  <p className="text-sm opacity-70">
                    Feel free to start purely with text messages. Express yourself at your own pace before switching to audio.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="card bg-base-100 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 border border-base-content/5">
                <div className="card-body items-center text-center p-6 space-y-3">
                  <div className="size-12 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center">
                    <VideoIcon className="size-6" />
                  </div>
                  <h3 className="font-bold text-xl">1-on-1 Practice</h3>
                  <p className="text-sm opacity-70">
                    No crowded group sessions or public stages. Every conversation is private, structured, and focused.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="card bg-base-100 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 border border-base-content/5">
                <div className="card-body items-center text-center p-6 space-y-3">
                  <div className="size-12 rounded-2xl bg-accent/10 text-accent flex items-center justify-center">
                    <HeartHandshakeIcon className="size-6" />
                  </div>
                  <h3 className="font-bold text-xl">Empathetic Peers</h3>
                  <p className="text-sm opacity-70">
                    We match you with patient language partners who want to help you listen, learn, and grow your confidence.
                  </p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="card bg-base-100 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 border border-base-content/5">
                <div className="card-body items-center text-center p-6 space-y-3">
                  <div className="size-12 rounded-2xl bg-success/10 text-success flex items-center justify-center">
                    <CompassIcon className="size-6" />
                  </div>
                  <h3 className="font-bold text-xl">Cozy Forest Interface</h3>
                  <p className="text-sm opacity-70">
                    Out of 32 themes, we default to the calming Forest interface to reduce visual stimulation and promote focus.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HOW TO START GUIDE SECTION */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl space-y-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Your Path to Becoming More Conversational</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-3 text-center">
                <div className="size-10 rounded-full bg-primary text-primary-content flex items-center justify-center font-bold text-lg mx-auto">1</div>
                <h4 className="font-bold text-lg">Create a Profile</h4>
                <p className="text-sm opacity-70">Mention your native and target languages and a small bio about your interests.</p>
              </div>

              <div className="space-y-3 text-center">
                <div className="size-10 rounded-full bg-secondary text-secondary-content flex items-center justify-center font-bold text-lg mx-auto">2</div>
                <h4 className="font-bold text-lg">Text First</h4>
                <p className="text-sm opacity-70">Send simple messages, share stories, and build a comfortable rapport with your partner.</p>
              </div>

              <div className="space-y-3 text-center">
                <div className="size-10 rounded-full bg-accent text-accent-content flex items-center justify-center font-bold text-lg mx-auto">3</div>
                <h4 className="font-bold text-lg">Jump to Voice/Video</h4>
                <p className="text-sm opacity-70">When ready, start a 1-on-1 call to practice conversational pronunciation and talk fluently.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer footer-center p-8 bg-base-300 text-base-content border-t border-base-content/10">
        <aside className="space-y-2">
          <div className="flex items-center gap-2.5 justify-center">
            <ShipWheelIcon className="size-6 text-primary" />
            <span className="font-bold font-mono tracking-wider">IntroConnect</span>
          </div>
          <p className="text-xs opacity-75">
            Copyright © {new Date().getFullYear()} - All rights reserved by IntroConnect Team.
          </p>
        </aside>
      </footer>
    </div>
  );
};

export default LandingPage;
