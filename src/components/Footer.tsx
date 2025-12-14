import * as React from "react";
import { GraduationCap, MapPin, Phone, Mail, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-100">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* University Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-white text-slate-900 rounded-lg">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold">SorSU-Bulan</h3>
                <p className="text-sm text-slate-400">Sorsogon State University</p>
              </div>
            </div>
            <p className="text-sm text-slate-400">
              Empowering students in Bulan, Sorsogon through quality education, 
              research, and community service as part of the Sorsogon State University system.
            </p>
            <div className="flex space-x-3">
              <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white p-2">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white p-2">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white p-2">
                <Instagram className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white p-2">
                <Youtube className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#programs" className="text-slate-400 hover:text-white transition-colors">Academic Programs</a></li>
              <li><a href="#admissions" className="text-slate-400 hover:text-white transition-colors">Admissions</a></li>
              <li><a href="#campus" className="text-slate-400 hover:text-white transition-colors">Campus Life</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Research</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Alumni</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">News & Events</a></li>
            </ul>
          </div>
          
          {/* Student Resources */}
          <div>
            <h4 className="font-semibold mb-4">Student Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Student Portal</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Course Catalog</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Library</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Career Services</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Financial Aid</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Academic Support</a></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-1 text-slate-400 flex-shrink-0" />
                <div>
                  <p className="text-slate-400">Bulan Campus</p>
                  <p className="text-slate-400">Bulan, Sorsogon, Philippines</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-slate-400" />
                <a href="tel:+639123456789" className="text-slate-400 hover:text-white transition-colors">
                  (056) 311-1234
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-slate-400" />
                <a href="mailto:bulan@sorsu.edu.ph" className="text-slate-400 hover:text-white transition-colors">
                  bulan@sorsu.edu.ph
                </a>
              </div>
            </div>
            
            <div className="mt-4">
              <h5 className="font-semibold text-sm mb-2">Campus Hours</h5>
              <p className="text-xs text-slate-400">Mon-Fri: 7:00 AM - 6:00 PM</p>
              <p className="text-xs text-slate-400">Saturday: 8:00 AM - 5:00 PM</p>
            </div>
          </div>
        </div>
        
        <Separator className="bg-slate-700 mb-6" />
        
        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
          <div>
            <p>&copy; 2024 Sorsogon State University - Bulan Campus. All rights reserved.</p>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Accessibility</a>
            <a href="#" className="hover:text-white transition-colors">Site Map</a>
          </div>
        </div>
      </div>
    </footer>
  );
}