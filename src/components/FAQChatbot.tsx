import * as React from "react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Badge } from "./ui/badge";
import { MessageCircle, X, HelpCircle, Clock, Phone, Mail, MapPin, Users, BookOpen, Calendar } from "lucide-react";

const FAQ_DATA = [
  {
    id: 1,
    question: "How to enroll?",
    category: "Enrollment",
    icon: <BookOpen className="w-4 h-4" />,
    answer: "Enrollment for Sorsogon State University - Bulan Campus follows these steps:\n\n1. Visit the Registrar's Office during enrollment period\n2. Submit required documents (Form 138, Birth Certificate, etc.)\n3. Take the entrance examination if required\n4. Choose your preferred program\n5. Pay enrollment fees\n6. Get your student ID and class schedule\n\nFor online enrollment, visit our student portal at portal.sorsu-bulan.edu.ph"
  },
  {
    id: 2,
    question: "What are the office hours?",
    category: "General Info",
    icon: <Clock className="w-4 h-4" />,
    answer: "Sorsogon State University - Bulan Campus Office Hours:\n\n📅 Monday to Friday: 8:00 AM - 5:00 PM\n📅 Saturday: 8:00 AM - 12:00 PM\n📅 Sunday: Closed\n\nSpecific Department Hours:\n• Registrar's Office: 8:00 AM - 4:30 PM\n• Cashier: 8:00 AM - 4:00 PM\n• Library: 7:00 AM - 6:00 PM\n• Student Affairs: 8:00 AM - 5:00 PM"
  },
  {
    id: 3,
    question: "How to contact faculty members?",
    category: "Contact",
    icon: <Phone className="w-4 h-4" />,
    answer: "You can contact faculty members through:\n\n📧 Official Email: [lastname.firstname]@sorsu-bulan.edu.ph\n📞 Main Office: (056) 311-1234\n📱 Department Extensions:\n• Computer Science: ext. 201\n• Business Administration: ext. 202\n• Education: ext. 203\n• Engineering: ext. 204\n\n🏢 Visit faculty offices during consultation hours (posted on department boards)"
  },
  {
    id: 4,
    question: "What programs are available?",
    category: "Academics",
    icon: <BookOpen className="w-4 h-4" />,
    answer: "SorSU-Bulan offers the following undergraduate programs:\n\n• Bachelor of Science in Computer Science (BSCS)\n• Bachelor of Science in Information Technology (BSIT)\n• Bachelor of Science in Information Systems (BSIS)\n• Bachelor of Science in Accountancy (BSA)\n• Bachelor of Science in Accounting Information System (BSAIS)\n• Bachelor in Public Administration (BPA)\n• Bachelor of Science in Entrepreneurship (BSENTREP)\n• Bachelor of Technical Vocational Teacher Education (BTVTED) major in Computer System Servicing\n\nFor graduate offerings and other programs, please contact the Registrar's Office or check the academic catalog."
  },
  {
    id: 5,
    question: "Where is the campus located?",
    category: "Location",
    icon: <MapPin className="w-4 h-4" />,
    answer: "Sorsogon State University - Bulan Campus\n\n📍 Address: Barangay San Francisco, Bulan, Sorsogon\n🚌 Transportation: Regular buses and jeepneys from Sorsogon City\n🚗 Landmarks: Near Bulan Municipal Hall and Public Market\n\n🗺️ GPS Coordinates: 12.6708° N, 123.8750° E\n\nThe campus is easily accessible by public transportation from major towns in Sorsogon Province."
  },
  {
    id: 6,
    question: "How to join student organizations?",
    category: "Student Life",
    icon: <Users className="w-4 h-4" />,
    answer: "Join student organizations at SorSU-Bulan:\n\n1️⃣ Visit the Student Affairs Office\n2️⃣ Check the list of active organizations\n3️⃣ Attend organization meetings and orientations\n4️⃣ Submit membership application\n5️⃣ Pay membership fees (if applicable)\n\n🎯 Popular Organizations:\n• Student Government\n• Computer Society\n• Business Club\n• Future Teachers Association\n• Engineering Society\n• Cultural Arts Group"
  },
  {
    id: 7,
    question: "When are the academic calendar events?",
    category: "Academic Calendar",
    icon: <Calendar className="w-4 h-4" />,
    answer: "Academic Year 2024-2025 Key Dates:\n\n📅 First Semester:\n• Enrollment: June 10-21, 2024\n• Classes Begin: June 24, 2024\n• Midterm Exams: August 19-23, 2024\n• Final Exams: October 14-18, 2024\n\n📅 Second Semester:\n• Enrollment: November 4-15, 2024\n• Classes Begin: November 18, 2024\n• Midterm Exams: January 20-24, 2025\n• Final Exams: March 17-21, 2025\n\n📅 Summer Term: April 28 - June 6, 2025"
  },
  {
    id: 8,
    question: "What are the tuition fees?",
    category: "Fees",
    icon: <BookOpen className="w-4 h-4" />,
    answer: "Tuition and Fees (per semester):\n\n💰 UNDERGRADUATE:\n• Tuition: ₱12,000 - ₱15,000\n• Miscellaneous Fees: ₱3,500\n• Laboratory Fees: ₱1,500 - ₱3,000\n\n💰 GRADUATE:\n• Tuition: ₱18,000 - ₱25,000\n• Miscellaneous Fees: ₱4,000\n\n💳 Payment Options:\n• Full payment (5% discount)\n• Installment (3 payments)\n• Scholar discounts available\n\n*Fees may vary by program and number of units"
  }
];

export default function FAQChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFAQ, setSelectedFAQ] = useState<typeof FAQ_DATA[0] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [...new Set(FAQ_DATA.map(faq => faq.category))];
  const filteredFAQs = selectedCategory 
    ? FAQ_DATA.filter(faq => faq.category === selectedCategory)
    : FAQ_DATA;

  const handleQuestionClick = (faq: typeof FAQ_DATA[0]) => {
    setSelectedFAQ(faq);
  };

  const handleBackToQuestions = () => {
    setSelectedFAQ(null);
    setSelectedCategory(null);
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 shadow-lg"
          size="sm"
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className="w-96 h-[500px] shadow-xl border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center">
                <HelpCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg">Campus FAQ</CardTitle>
                <p className="text-sm text-muted-foreground">SorSU-Bulan Help Center</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-0 h-full">
          <ScrollArea className="h-[400px] px-4 pb-4">
            {selectedFAQ ? (
              // Show selected FAQ answer
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleBackToQuestions}
                    className="text-blue-600 hover:text-blue-700 p-0 h-auto"
                  >
                    ← Back to questions
                  </Button>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      {selectedFAQ.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">
                        {selectedFAQ.question}
                      </h3>
                      <Badge variant="secondary" className="text-xs">
                        {selectedFAQ.category}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="whitespace-pre-line text-sm text-gray-700">
                      {selectedFAQ.answer}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // Show categories and questions
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">
                    Frequently Asked Questions
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Click on any question to get instant answers
                  </p>
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <Button
                    variant={selectedCategory === null ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(null)}
                    className="text-xs"
                  >
                    All
                  </Button>
                  {categories.map(category => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className="text-xs"
                    >
                      {category}
                    </Button>
                  ))}
                </div>

                {/* Questions List */}
                <div className="space-y-2">
                  {filteredFAQs.map(faq => (
                    <Button
                      key={faq.id}
                      variant="ghost"
                      className="w-full justify-start h-auto p-3 text-left hover:bg-blue-50"
                      onClick={() => handleQuestionClick(faq)}
                    >
                      <div className="flex items-start gap-3 w-full">
                        <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                          {faq.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 line-clamp-2">
                            {faq.question}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {faq.category}
                          </p>
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}