import * as React from "react";
import { MessageSquare, User } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import campusD from "../assets/campusD.png"; 

export default function DirectorMessageSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-4">
            <MessageSquare className="w-4 h-4" />
            <span>Message from Leadership</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Campus Director's Message
          </h2>
        </div>

        <Card className="max-w-4xl mx-auto shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Director Photo */}
              <div className="flex-shrink-0 mx-auto md:mx-0">
                <div className="relative mb-4">
                  <ImageWithFallback
                    src={campusD}
                    alt="Campus Director"
                    className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover shadow-xl"
                  />
                  <div className="absolute -bottom-3 -right-3 bg-blue-600 text-white p-3 rounded-full shadow-lg">
                    <User className="w-5 h-5" />
                  </div>
                </div>

                <div className=" text-center">
                  <h3 className="text-xl font-bold text-gray-900">
                    Prof. Ma. Elena C. Demdam
                  </h3>
                  <p className="text-red-600 font-medium">
                    Campus Director
                  </p>
                  <p className="text-gray-600">
                    Sorsogon State University - Bulan Campus
                  </p>
                </div>
              </div>

              {/* Message Content */}
              <div className="flex-1 text-center md:text-left">
                <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6 italic max-w-4xl mx-auto">
                  The Sorsogon State University (SorSU) Bulan Campus spans a total land area of 6.2 hectares, 
                  housing a variety of buildings and laboratory spaces to support its eight academic programs. 
                  These programs primarily focus on Information Technology, Public Administration, Entrepreneurship, 
                  and Education. The campus is divided into two main colleges: the College of Information and 
                  Communications Technology (ICT) and the College of Business Management and Education.
                </blockquote>

                <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed italic max-w-4xl mx-auto">
                  SorSU Bulan Campus is committed to fostering an environment that equips both students and faculty with the skills 
                  needed to meet the demands of globalization. In line with this, the campus has established strong international 
                  collaborations with universities in Southeast Asia and the United States. These partnerships aim to develop 
                  industry-ready professionals who are competitive on a global scale. Furthermore, the campus remains active in 
                  its research and extension efforts, securing the university’s first international research grant in collaboration 
                  with a partner agency in the U.S.
                </blockquote>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}