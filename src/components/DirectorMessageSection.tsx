import * as React from "react";
import { MessageSquare, User } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";

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
                <div className="relative">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
                    alt="Campus Director"
                    className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-full shadow-lg">
                    <User className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Message Content */}
              <div className="flex-1 text-center md:text-left">
                <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6 italic">
                  "Welcome to Sorsogon State University - Bulan Campus! As we continue our mission of 
                  academic excellence and community service, I am proud to lead an institution that 
                  fosters innovation, critical thinking, and character development. Our commitment to 
                  providing quality education remains unwavering as we prepare our students to become 
                  responsible leaders and productive citizens of tomorrow."
                </blockquote>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Dr. Maria Elena Santos
                  </h3>
                  <p className="text-blue-600 font-medium">
                    Campus Director
                  </p>
                  <p className="text-gray-600">
                    Sorsogon State University - Bulan Campus
                  </p>
                </div>

                {/* Achievements or Vision Points */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 mb-1">15+</div>
                    <div className="text-sm text-gray-600">Years of Leadership</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 mb-1">5K+</div>
                    <div className="text-sm text-gray-600">Students Served</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600 mb-1">50+</div>
                    <div className="text-sm text-gray-600">Faculty Members</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}