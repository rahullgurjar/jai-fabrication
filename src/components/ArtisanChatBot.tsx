import { useState, useRef, useEffect } from "react";
import {
  MessageCircle,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  ExternalLink,
  ChevronDown,
  ShoppingBag,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { WA_BASE_PHONE } from "@/lib/cart-context";

interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
  whatsappCta?: string;
}

const QUICK_PROMPTS = [
  "📦 Bulk discount for 25 / 50 / 100 pcs?",
  "💍 Wedding favours & custom monograms?",
  "🚚 How long does shipping take?",
  "🧼 How to wash 100% cotton block prints?",
  "💻 Which laptop sleeve sizes are available?",
  "📍 Where is your Jaipur workshop located?",
];

function generateBotResponse(userText: string): { reply: string; whatsappText?: string } {
  const query = userText.toLowerCase();

  if (query.includes("bulk") || query.includes("discount") || query.includes("wholesale") || query.includes("10") || query.includes("25") || query.includes("50") || query.includes("100")) {
    return {
      reply:
        "Namaste! 🙏 We offer tiered bulk discounts directly from our Jaipur workshop:\n\n• 10 pcs: 5% OFF\n• 25 pcs: 10% OFF (popular for weddings)\n• 50 pcs: 15% OFF (popular for events)\n• 100+ pcs: 20% Wholesale OFF\n\nProduction starts from 3–7 working days depending on quantity!",
      whatsappText: `Hello Jai Fabrication, I would like to get a bulk quotation for my upcoming order.`,
    };
  }

  if (query.includes("wedding") || query.includes("favour") || query.includes("favor") || query.includes("mehendi") || query.includes("monogram") || query.includes("custom")) {
    return {
      reply:
        "🌸 Wedding & Mehendi Favours are our specialty! We provide:\n\n1. Custom couple monogram tags & brass charms\n2. Bespoke wooden block carving with your own motif\n3. Matching color palettes (Pantone / outfit matching)\n4. Gift box & cotton ribbon packaging\n\nMinimum order for custom monograms starts from just 25 pieces!",
      whatsappText: "Hello Jai Fabrication, I am planning wedding favours and would like to discuss custom prints & monograms.",
    };
  }

  if (query.includes("shipping") || query.includes("delivery") || query.includes("courier") || query.includes("usa") || query.includes("uk") || query.includes("international")) {
    return {
      reply:
        "✈️ Shipping & Dispatch Timeline:\n\n• Pan-India: 2–5 business days via BlueDart/Delhivery\n• International (USA, UK, Europe, UAE, Australia): 5–8 business days via DHL/FedEx Express\n\nReady stock ships in 24–48 hours. WhatsApp us with your postal pincode for exact courier rates!",
      whatsappText: "Hello Jai Fabrication, could you please check shipping charges and delivery time to my pincode/country?",
    };
  }

  if (query.includes("wash") || query.includes("care") || query.includes("clean") || query.includes("bleeding") || query.includes("dye")) {
    return {
      reply:
        "🌿 Wash & Fabric Care Guide:\n\n• 100% pure cotton with skin-friendly, azo-free pigments\n• Hand wash gently in cold water with mild liquid soap\n• Line dry in the shade to preserve vibrant colors\n• Iron on reverse cotton setting\n• Pouches with water-resistant inner lining can be wiped clean with a damp cloth!",
    };
  }

  if (query.includes("laptop") || query.includes("sleeve") || query.includes("macbook") || query.includes("size")) {
    return {
      reply:
        "💻 Our Pink Blossom Ruffled Laptop Sleeve fits all 13\" to 14.2\" laptops, including M1/M2/M3 MacBook Air & MacBook Pro 14\". It features 6mm shock-absorbing padding and a matching scrunchie shoulder strap. For 15.6\" custom sizes, message us on WhatsApp!",
      whatsappText: "Hello Jai Fabrication, I would like to enquire about laptop sleeve sizing and availability.",
    };
  }

  if (query.includes("address") || query.includes("location") || query.includes("workshop") || query.includes("visit") || query.includes("jaipur")) {
    return {
      reply:
        "📍 Workshop Atelier Address:\n\nJai Fabrication\n23, Hawa Sadak Rd, Brij Colony, Ramnagar Extension, Jaipur, Rajasthan 302019, India.\n\n⏰ Visiting Hours: Monday to Sunday, 10:00 AM – 6:00 PM IST.",
      whatsappText: "Hello Jai Fabrication, I would like to visit your Jaipur workshop atelier.",
    };
  }

  if (query.includes("price") || query.includes("cost") || query.includes("rate")) {
    return {
      reply:
        "🏷️ Our handcrafted pieces start from:\n\n• Vanity & Cosmetic Pouches: ₹699 – ₹799\n• Laptop Sleeves: ₹1,299\n• Travel Duffles & Holdalls: ₹1,599 – ₹1,899\n• Yoga Mat Carriers: ₹1,449 – ₹1,499\n• Canvas Totes: ₹1,199\n• Sets of 3: ₹1,299 – ₹1,349\n\nAll prices include single-piece sample and bulk batch tiers!",
      whatsappText: "Hello Jai Fabrication, please share your complete product price catalog.",
    };
  }

  return {
    reply:
      "Thank you for reaching out! 🙏 Every Jai Fabrication bag is handmade with pure cotton and traditional wooden blocks in our Jaipur workshop. Would you like a price quote, wedding favor advice, or to speak directly with our artisan team on WhatsApp?",
    whatsappText: `Hello Jai Fabrication, I have a question about: "${userText}"`,
  };
}

export function ArtisanChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "Namaste! 🌸 Welcome to Jai Fabrication. I'm your Jaipur Artisan Assistant. How can I help you today with handcrafted bags, wedding favours, or bulk orders?",
      timestamp: "Just now",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    setTimeout(() => {
      const { reply, whatsappText } = generateBotResponse(text);
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        whatsappCta: whatsappText,
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 450);
  };

  return (
    <>
      {/* Floating Chat Trigger Button */}
      <div className="fixed bottom-5 left-5 z-50">
        <button
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          className="group relative flex items-center gap-2.5 rounded-full bg-maroon px-4 py-3.5 text-xs uppercase tracking-wider text-ivory shadow-2xl transition-all hover:bg-terracotta hover:scale-105 active:scale-95 border-2 border-ivory/20"
          aria-label="Open Artisan Chat Assistant"
        >
          <div className="relative">
            <Bot className="h-5 w-5 text-sandstone" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-terracotta opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-terracotta"></span>
            </span>
          </div>
          <span className="hidden sm:inline font-semibold">Artisan Help</span>
        </button>
      </div>

      {/* Chat Window Dialog */}
      {isOpen && (
        <div className="fixed bottom-20 left-4 sm:left-6 z-50 flex h-[520px] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-md border border-border/80 bg-background shadow-2xl animate-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border/70 bg-sandstone/35 px-4 py-3.5">
            <div className="flex items-center gap-2.5">
              <div className="grid h-8 w-8 place-items-center rounded-full bg-maroon text-ivory shadow-xs">
                <Sparkles className="h-4 w-4 text-sandstone" />
              </div>
              <div>
                <h3 className="font-serif text-base font-bold text-maroon leading-tight">
                  Jai Fabrication Atelier
                </h3>
                <p className="text-[0.62rem] text-muted-foreground flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 inline-block"></span>
                  Jaipur Workshop Online
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-sm p-1 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
              aria-label="Close Chat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-secondary/15 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2 ${m.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {m.sender === "bot" && (
                  <div className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-maroon/15 text-maroon mt-0.5">
                    <Bot className="h-3.5 w-3.5" />
                  </div>
                )}
                <div
                  className={`max-w-[82%] rounded-sm p-3 whitespace-pre-line leading-relaxed shadow-xs ${
                    m.sender === "user"
                      ? "bg-maroon text-ivory font-medium"
                      : "bg-card border border-border/70 text-foreground"
                  }`}
                >
                  <p>{m.text}</p>
                  {m.whatsappCta && (
                    <a
                      href={`https://wa.me/${WA_BASE_PHONE}?text=${encodeURIComponent(m.whatsappCta)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2.5 inline-flex items-center gap-1.5 rounded-xs bg-maroon px-2.5 py-1.5 text-[0.65rem] uppercase tracking-wider font-semibold text-ivory hover:bg-terracotta transition-colors"
                    >
                      <MessageCircle className="h-3 w-3" />
                      Chat on WhatsApp
                      <ExternalLink className="h-2.5 w-2.5" />
                    </a>
                  )}
                  <span className="block text-[0.55rem] text-muted-foreground/80 mt-1 text-right">
                    {m.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 text-muted-foreground text-xs pl-8">
                <span className="animate-bounce">●</span>
                <span className="animate-bounce delay-100">●</span>
                <span className="animate-bounce delay-200">●</span>
                <span className="text-[0.65rem] italic ml-1">Jaipur artisan is typing...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Pills */}
          <div className="border-t border-border/60 bg-background px-3 py-2 overflow-x-auto flex gap-1.5 no-scrollbar">
            {QUICK_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => handleSendMessage(prompt)}
                className="shrink-0 rounded-full border border-border/80 bg-secondary/40 px-2.5 py-1 text-[0.62rem] text-foreground/85 hover:border-terracotta hover:text-terracotta transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2 border-t border-border/70 bg-card p-2.5"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about bulk price, wedding bags, fabric..."
              className="flex-1 rounded-sm border border-border/70 bg-background px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-terracotta focus:outline-none"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="grid h-8 w-8 place-items-center rounded-sm bg-maroon text-ivory hover:bg-terracotta disabled:opacity-40 transition-all"
              aria-label="Send Message"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
