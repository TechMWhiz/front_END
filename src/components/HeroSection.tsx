import * as React from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { BookOpen, Users, Award, TrendingUp } from "lucide-react";
import CampusImg from "../assets/BulanCampus.jpg"; 



export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-slate-50 to-slate-100 py-16">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge className="mb-4">Excellence in Education & Innovation</Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Discover SorSU-Bulan
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Explore Sorsogon State University - Bulan Campus, where academic excellence meets 
              innovation. Our comprehensive programs, dedicated faculty, and vibrant campus community 
              prepare students for success in their chosen fields.
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-lg mx-auto mb-2">
                  <BookOpen className="w-6 h-6" />
                </div>
                <p className="font-semibold">25+</p>
                <p className="text-sm text-muted-foreground">Programs</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-green-100 text-green-600 rounded-lg mx-auto mb-2">
                  <Users className="w-6 h-6" />
                </div>
                <p className="font-semibold">20:1</p>
                <p className="text-sm text-muted-foreground">Student:Faculty</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-purple-100 text-purple-600 rounded-lg mx-auto mb-2">
                  <Award className="w-6 h-6" />
                </div>
                <p className="font-semibold">92%</p>
                <p className="text-sm text-muted-foreground">Graduate Rate</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-orange-100 text-orange-600 rounded-lg mx-auto mb-2">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <p className="font-semibold">85%</p>
                <p className="text-sm text-muted-foreground">Employment Rate</p>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <Card className="overflow-hidden">
              <ImageWithFallback 
              src={CampusImg}
              alt="University Campus Buildings"
              className="w-full h-96 object-cover"
              />
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}