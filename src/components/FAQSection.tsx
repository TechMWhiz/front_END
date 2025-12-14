import * as React from "react";
import { HelpCircle, Plus, Minus } from "lucide-react";
import { useState } from "react";
import { Card, CardContent } from "./ui/card";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

export default function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const faqData: FAQItem[] = [
    {
      id: 1,
      category: "Admissions",
      question: "What are the admission requirements for SorSU-Bulan?",
      answer: "Admission requirements include a completed application form, high school diploma or equivalent, transcript of records, medical certificate, and entrance examination results. Specific program requirements may vary."
    },
    {
      id: 2,
      category: "Admissions",
      question: "When is the enrollment period?",
      answer: "Enrollment typically runs from March to June for the first semester and October to December for the second semester. Check our announcements for specific dates each academic year."
    },
    {
      id: 3,
      category: "Academic",
      question: "What programs are offered at SorSU-Bulan?",
      answer: "We offer various undergraduate programs including Education, Business Administration, Computer Science, Engineering Technology, and Liberal Arts. Graduate programs are also available in select fields."
    },
    {
      id: 4,
      category: "Academic",
      question: "How can I check my grades and academic records?",
      answer: "Students can access their grades through the student portal or visit the Registrar's Office during office hours. Academic records and transcripts can be requested through the proper channels."
    },
    {
      id: 5,
      category: "Campus Life",
      question: "What facilities are available on campus?",
      answer: "Our campus features modern classrooms, computer laboratories, library, science laboratories, gymnasium, cafeteria, student activity centers, and administrative offices."
    },
    {
      id: 6,
      category: "Campus Life",
      question: "Are there student organizations and activities?",
      answer: "Yes! We have various student organizations, academic clubs, sports teams, and cultural groups. Students are encouraged to participate in extracurricular activities to enhance their college experience."
    },
    {
      id: 7,
      category: "Financial",
      question: "What scholarship opportunities are available?",
      answer: "SorSU-Bulan offers various scholarships including academic scholarships, need-based assistance, government scholarships (CHED, DOST), and private foundation grants. Visit the Student Affairs Office for more information."
    },
    {
      id: 8,
      category: "Financial",
      question: "How can I pay tuition and other fees?",
      answer: "Tuition and fees can be paid at the cashier's office, authorized banks, or through online payment systems. Payment schedules and methods are announced each semester."
    },
    {
      id: 9,
      category: "General",
      question: "What are the campus operating hours?",
      answer: "The campus is generally open Monday to Friday from 7:00 AM to 6:00 PM. Some offices may have specific hours, and weekend access may be available for certain activities."
    },
    {
      id: 10,
      category: "General",
      question: "How can I contact specific departments or offices?",
      answer: "Contact information for all departments and offices is available on our website, campus directory, or by calling the main campus number. Each department has designated office hours and contact persons."
    }
  ];

  const categories = [...new Set(faqData.map(item => item.category))];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-4">
            <HelpCircle className="w-4 h-4" />
            <span>Student Support</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find quick answers to common questions about SorSU-Bulan Campus
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map(category => (
            <div
              key={category}
              className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 shadow-sm"
            >
              {category}
            </div>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto space-y-4">
          {faqData.map(item => (
            <Card key={item.id} className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1 pr-4">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                        {item.category}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-900">
                      {item.question}
                    </h3>
                  </div>
                  <div className="flex-shrink-0">
                    {openItems.includes(item.id) ? (
                      <Minus className="w-5 h-5 text-gray-500" />
                    ) : (
                      <Plus className="w-5 h-5 text-gray-500" />
                    )}
                  </div>
                </button>
                
                {openItems.includes(item.id) && (
                  <div className="px-6 pb-6">
                    <div className="pt-4 border-t border-gray-100">
                      <p className="text-gray-700 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact for More Help */}
        <div className="mt-12 text-center">
          <Card className="max-w-2xl mx-auto bg-blue-50 border-blue-200">
            <CardContent className="p-8">
              <HelpCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Still have questions?
              </h3>
              <p className="text-gray-600 mb-4">
                Can't find what you're looking for? Our Student Affairs Office is here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className="text-sm">
                  <span className="font-medium">Email:</span> studentaffairs@sorsu-bulan.edu.ph
                </div>
                <div className="text-sm">
                  <span className="font-medium">Phone:</span> (056) xxx-xxxx
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}