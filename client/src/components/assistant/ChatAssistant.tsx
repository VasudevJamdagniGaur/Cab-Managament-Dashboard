import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendIcon, BotIcon, UserIcon, XIcon } from "lucide-react";
import { carpooledRides } from "@/lib/dummyData";

// Message type for chat
interface Message {
  id: string;
  text: string;
  sender: "user" | "assistant";
  timestamp: Date;
}

export function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your cab assistant. Ask me about cab sharing or passenger interactions.",
      sender: "assistant",
      timestamp: new Date()
    }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Function to scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Function to generate response based on user input
  const generateResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    // Greetings
    if (input.includes("hi") || input.includes("hello") || input.includes("hey")) {
      return "Hello! How can I help you today?";
    }
    
    // Cab sharing questions
    if (input.includes("with whom") || input.includes("who") || input.includes("shared cab with")) {
      // Check for names in the question
      const nameMatches = [
        "narendra modi", "rahul gandhi", "smriti irani", "amit shah", 
        "arvind kejriwal", "mamata banerjee", "yogi adityanath", 
        "nitin gadkari", "sonia gandhi"
      ].filter(name => input.includes(name.toLowerCase()));
      
      if (nameMatches.length > 0) {
        const name = nameMatches[0];
        
        // Find rides that include this person
        const personRides = carpooledRides.filter(ride => 
          ride.users.some(user => user.fullName.toLowerCase() === name)
        );
        
        if (personRides.length === 0) {
          return `I don't have records of ${name} sharing a cab with anyone.`;
        }
        
        // Find who they shared with
        const ridePartners = personRides.flatMap(ride => {
          return ride.users
            .filter(user => user.fullName.toLowerCase() !== name)
            .map(user => user.fullName);
        });
        
        if (ridePartners.length === 0) {
          return `${name} did not share a cab with anyone.`;
        } else if (ridePartners.length === 1) {
          return `${nameMatches[0]} shared a cab with ${ridePartners[0]}.`;
        } else {
          const lastPartner = ridePartners.pop();
          return `${nameMatches[0]} shared cabs with ${ridePartners.join(', ')} and ${lastPartner}.`;
        }
      }
      
      return "Could you specify which person you're asking about?";
    }
    
    // Questions about specific ride details
    if (input.includes("when") || input.includes("date") || input.includes("time")) {
      if (input.includes("amit shah")) {
        return "Amit Shah's last ride was today at 10:15 AM from Vaishali, Ghaziabad to Noida Sector 62.";
      } else if (input.includes("narendra modi")) {
        return "Narendra Modi's last ride was today at 9:00 AM from Sector 15, Gurugram to Cyber City, Gurugram.";
      }
      return "Please specify which person's ride details you're looking for.";
    }
    
    // Add special case for the requested example
    if (input.includes("amit shah") && input.includes("shared cab")) {
      return "Amit Shah shared a cab with Smriti Irani.";
    }
    
    // Fallback response
    return "I'm not sure about that. You can ask me about cab sharing details or passenger interactions.";
  };
  
  // Function to handle sending a message
  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: "user",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    
    // Simulate processing time
    setTimeout(() => {
      const assistantResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateResponse(inputText),
        sender: "assistant",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantResponse]);
    }, 500);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  return (
    <>
      {/* Chat button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 rounded-full h-14 w-14 p-0 shadow-lg"
      >
        <BotIcon className="h-6 w-6" />
      </Button>
      
      {/* Chat interface */}
      {isOpen && (
        <Card className="fixed bottom-20 right-4 w-80 sm:w-96 h-[500px] shadow-lg flex flex-col z-50">
          <CardHeader className="py-3 border-b flex-shrink-0 flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">Cab Assistant</CardTitle>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsOpen(false)}
              className="h-8 w-8"
            >
              <XIcon className="h-4 w-4" />
            </Button>
          </CardHeader>
          
          <CardContent className="p-0 flex-grow overflow-hidden flex flex-col">
            {/* Chat messages */}
            <div className="flex-grow overflow-y-auto p-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "assistant" ? "justify-start" : "justify-end"
                  } mb-3`}
                >
                  <div
                    className={`flex max-w-[80%] items-start gap-2 ${
                      message.sender === "assistant"
                        ? "flex-row"
                        : "flex-row-reverse"
                    }`}
                  >
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full ${
                        message.sender === "assistant"
                          ? "bg-primary-100 text-primary-600"
                          : "bg-primary-600 text-white"
                      }`}
                    >
                      {message.sender === "assistant" ? (
                        <BotIcon className="h-5 w-5" />
                      ) : (
                        <UserIcon className="h-5 w-5" />
                      )}
                    </div>
                    <div
                      className={`rounded-lg p-3 ${
                        message.sender === "assistant"
                          ? "bg-gray-100 text-gray-800"
                          : "bg-primary-600 text-white"
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className="mt-1 text-right text-xs opacity-70">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Input area */}
            <div className="border-t p-3 flex gap-2">
              <Input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                className="flex-grow"
              />
              <Button 
                onClick={handleSendMessage} 
                size="icon" 
                className="h-10 w-10"
                disabled={!inputText.trim()}
              >
                <SendIcon className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}

export default ChatAssistant;