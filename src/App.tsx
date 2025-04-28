import { ArrowRight, Mountain, BookTemplate as Temple, Camera, Utensils, Calendar, Users, Plane, MapPin, Star, Clock, Mail, Phone, Check, Leaf, Heart, Coffee, Sun, CloudRain, Snowflake, Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ['features', 'seasons', 'destinations', 'tours', 'contact'];
      const scrollPosition = window.scrollY + 100; // Add offset for better detection

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (section: string) => {
    setActiveSection(section);
    setIsMenuOpen(false);
    const element = document.getElementById(section);
    if (element) {
      const offset = 80; // Adjust for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navItems = [
    { id: 'features', label: 'Why Bhutan?' },
    { id: 'seasons', label: 'Best Time to Visit' },
    { id: 'destinations', label: 'Destinations' },
    { id: 'tours', label: 'Tours' },
    { id: 'contact', label: 'Contact' }
  ];

  const features = [
    {
      title: "Ancient Monasteries",
      description: "Explore sacred temples and monasteries perched on cliff sides, including the iconic Tiger's Nest",
      image: "https://www.asiaodysseytravel.com/images/asia-tours/bhutan-tours/punakha-dzong-bhutan-700-14.jpg",
      bullets: ["Visit ancient monasteries", "Experience the unique Bhutanese way of life"],
      icon: <Temple className="h-6 w-6 text-emerald-600" />
    },
    {
      title: "Pristine Nature",
      description: "Trek through untouched Himalayan landscapes and discover hidden valleys",
      image: "https://amen-api.flamingoitstudio.net/media/attachments/Bhutan%20landscape%20in%20Bhutan.jpg",
      bullets: ["Trek through stunning landscapes", "Discover hidden valleys"],
      icon: <Mountain className="h-6 w-6 text-emerald-600" />
    },
    {
      title: "Rich Culture",
      description: "Experience vibrant festivals, traditional arts, and the unique Bhutanese way of life",
      image: "https://images.squarespace-cdn.com/content/v1/583243e64402433d874f1b16/8f857ac7-d21f-4ccd-8b36-7dc67349e1a4/192.JPG",
      bullets: ["Experience vibrant festivals", "Traditional arts and crafts"],
      icon: <Camera className="h-6 w-6 text-emerald-600" />
    }
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-stone-900/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex-shrink-0">
              <button 
                onClick={() => handleNavClick('home')}
                className="text-2xl font-bold text-emerald-400 hover:text-emerald-300 transition-colors flex items-center"
              >
                <Mountain className="h-7 w-7 mr-2" />
                Oddiyana Tours
              </button>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-8">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`text-sm font-medium transition-all duration-300 hover:scale-105 ${
                      activeSection === item.id
                        ? 'text-emerald-400 border-b-2 border-emerald-400 pb-1'
                        : 'text-stone-200 hover:text-emerald-300'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                {/* <Button 
                  className="bg-emerald-600 hover:bg-emerald-500 text-white shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 px-6 py-2"
                  onClick={() => handleNavClick('contact')}
                >
                  Book Now
                </Button> */}
              </div>
            </div>
            <div className="md:hidden">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-stone-200 hover:text-emerald-400 hover:bg-stone-800"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-stone-900/95 backdrop-blur-md border-t border-stone-800 shadow-lg"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      activeSection === item.id
                        ? 'bg-stone-800 text-emerald-400 border-l-4 border-emerald-400'
                        : 'text-stone-200 hover:bg-stone-800 hover:text-emerald-300'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                <Button 
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white mt-2 shadow-md"
                  onClick={() => handleNavClick('contact')}
                >
                  Book Now
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <div id="home" className="relative h-screen">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url("https://www.andbeyond.com/wp-content/uploads/sites/5/tigers-nest-punakha-bhutan.jpg")`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/70 via-stone-900/50 to-stone-900/70" />
        <div className="absolute inset-0 flex items-center justify-center text-center p-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
              Discover <span className="text-emerald-400">Bhutan</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto drop-shadow-md">
              Experience the magic of the last Shangri-La, where ancient traditions meet breathtaking landscapes
            </p>
            <div className="space-x-4">
              <Button 
                size="lg" 
                className="bg-emerald-700 hover:bg-emerald-800 text-white text-lg px-8 py-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                onClick={() => handleNavClick('tours')}
              >
                Plan Your Journey <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-stone-50 py-12 shadow-xl relative z-10 -mt-20 mx-4 rounded-xl border border-stone-100">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-4">
          {[
            { number: "70%", label: "Carbon Negative", icon: Leaf },
            { number: "800+", label: "Monasteries", icon: Temple },
            { number: "72%", label: "Forest Cover", icon: Mountain },
            { number: "365", label: "Days of Culture", icon: Heart }
          ].map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-4 rounded-lg hover:bg-emerald-50 transition-colors"
            >
              <stat.icon className="h-8 w-8 mx-auto mb-2 text-emerald-600" />
              <div className="text-3xl md:text-4xl font-bold text-emerald-700 mb-2">{stat.number}</div>
              <div className="text-stone-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-4">
              Why Choose Bhutan?
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              Experience the perfect blend of culture, nature, and spirituality in the Land of the Thunder Dragon
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 to-transparent" />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-emerald-100 rounded-lg">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-stone-900 ml-3">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-stone-600 mb-4">
                    {feature.description}
                  </p>
                  <ul className="space-y-2">
                    {feature.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-center text-stone-600">
                        <Check className="h-5 w-5 text-emerald-600 mr-2" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Seasonal Guide */}
      <div id="seasons" className="bg-gradient-to-b from-gray-50 to-emerald-50 py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-12 relative"
          >
            <span className="inline-block relative">
              Best Time to Visit
              <span className="absolute -bottom-2 left-1/4 right-1/4 h-1 bg-emerald-500 rounded-full"></span>
            </span>
          </motion.h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                season: "Spring",
                months: "Mar-May",
                icon: Sun,
                description: "Perfect weather for outdoor activities and rhododendron blooms",
                temp: "15-25°C",
                highlight: "Festival Season",
                color: "emerald"
              },
              {
                season: "Summer",
                months: "Jun-Aug",
                icon: CloudRain,
                description: "Lush green landscapes with occasional rainfall",
                temp: "20-30°C",
                highlight: "Trekking",
                color: "blue"
              },
              {
                season: "Autumn",
                months: "Sep-Nov",
                icon: Leaf,
                description: "Clear skies and comfortable temperatures",
                temp: "10-20°C",
                highlight: "Photography",
                color: "amber"
              },
              {
                season: "Winter",
                months: "Dec-Feb",
                icon: Snowflake,
                description: "Cold but clear days with snow in higher regions",
                temp: "0-15°C",
                highlight: "Cultural Tours",
                color: "sky"
              }
            ].map((season, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 h-full border-t-4 border-t-emerald-500">
                  <CardContent className="p-6">
                    <season.icon className="h-12 w-12 mb-4 mx-auto text-emerald-600 transform group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="text-xl font-semibold mb-2 text-center">{season.season}</h3>
                    <p className="text-sm text-gray-500 text-center mb-4">{season.months}</p>
                    <div className="space-y-3">
                      <p className="text-gray-600 text-center">{season.description}</p>
                      <div className="text-center">
                        <span className="inline-block bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium">
                          {season.temp}
                        </span>
                      </div>
                      <div className="text-center">
                        <span className="inline-block bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                          Best for: {season.highlight}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Destinations */}
      <div id="destinations" className="py-16 md:py-24 px-4 max-w-7xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 relative"
        >
          <span className="inline-block relative">
            Popular Destinations
            <span className="absolute -bottom-2 left-1/4 right-1/4 h-1 bg-emerald-500 rounded-full"></span>
          </span>
        </motion.h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {[
            {
              title: "Paro Taktsang",
              description: "The iconic Tiger's Nest Monastery",
              image: "https://media.istockphoto.com/id/506325524/photo/tigers-nest-monastery-in-bhutan.jpg?s=612x612&w=0&k=20&c=heuTv-qV9tl3EcXer9Rwy47AgL0bVVK8O1Sieabqv4o="
            },
            {
              title: "Punakha Dzong",
              description: "The Palace of Great Happiness",
              image: "https://www.shutterstock.com/image-photo/punakha-dzong-bhutan-one-most-600w-1253338396.jpg"
            },
            {
              title: "Thimphu",
              description: "The vibrant capital city",
              image: "https://www.bhutanpeacefultour.com/wp-content/uploads/2019/02/Parliament-Thimphu-Bhutan.jpg"
            }
          ].map((destination, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                <img 
                  src={destination.image} 
                  alt={destination.title}
                  className="w-full h-[300px] md:h-[400px] object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-6 group-hover:from-black/90 transition-all duration-300">
                  <div>
                    <h3 className="text-2xl font-semibold text-white mb-2">{destination.title}</h3>
                    <p className="text-white/90 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      {destination.description}
                    </p>
                    {/* <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-4 text-white border-white hover:bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      Explore
                    </Button> */}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Popular Tours Section */}
      <div id="tours" className="py-16 md:py-24 px-4 max-w-7xl mx-auto bg-stone-50">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 relative">
          <span className="inline-block relative">
            Popular Tours
            <span className="absolute -bottom-2 left-1/4 right-1/4 h-1 bg-emerald-500 rounded-full"></span>
          </span>
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {[
            {
              title: "Cultural Heritage Tour",
              duration: "7 Days",
              price: "$2,199",
              image: "https://www.nepalmountaintrekkers.com/wp-content/uploads/2021/03/bhutan-culture-tour.jpg"
            },
            {
              title: "Himalayan Trek Adventure",
              duration: "10 Days",
              price: "$2,899",
              image: "https://www.communitytrek.com/uploads/galleries/snowman-trek-bhutan-4941.webp"
            },
            {
              title: "Festival & Monastery Tour",
              duration: "8 Days",
              price: "$2,499",
              image: "https://cdn-fejnh.nitrocdn.com/ssjCrewbWIzLrxyAReTUZYsAqyjpprIi/assets/images/optimized/rev-76896bd/tourbhutan.travel/wp-content/uploads/2023/12/6-1024x681.jpg"
            }
          ].map((tour, index) => (
            <Card key={index} className="overflow-hidden group hover:shadow-xl transition-all duration-300 border-none">
              <div className="relative overflow-hidden">
                <img 
                  src={tour.image} 
                  alt={tour.title} 
                  className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-3 right-3 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Featured
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <CardContent className="p-6 bg-white">
                <h3 className="text-xl font-semibold mb-3">{tour.title}</h3>
                <div className="flex items-center gap-4 text-gray-600 mb-4">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-emerald-600" />
                    {tour.duration}
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1 text-amber-500" />
                    4.9
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-emerald-600">{tour.price}</span>
                  <Button variant="outline" className="hover:bg-emerald-50 border-emerald-600 text-emerald-600 hover:text-emerald-700">Learn More</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Travel Information */}
      <div className="bg-gradient-to-b from-stone-50 to-emerald-50 py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 relative">
            <span className="inline-block relative">
              Travel Information
              <span className="absolute -bottom-2 left-1/4 right-1/4 h-1 bg-emerald-500 rounded-full"></span>
            </span>
          </h2>
          <Tabs defaultValue="visa" className="max-w-3xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-9 bg-white shadow-md">
              <TabsTrigger value="visa" className="text-sm sm:text-base data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700">Visa Requirements</TabsTrigger>
              <TabsTrigger value="weather" className="text-sm sm:text-base data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700">Best Time to Visit</TabsTrigger>
              <TabsTrigger value="transport" className="text-sm sm:text-base data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700">Getting Around</TabsTrigger>
            </TabsList>
            <TabsContent value="visa">
              <Card className="border-none shadow-lg">
                <CardContent className="p-6 sm:p-8">
                  <h3 className="text-2xl font-semibold mb-6 text-emerald-700">Visa Information</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    All visitors to Bhutan require a visa which must be obtained in advance. The visa process is handled by your licensed Bhutanese tour operator.
                  </p>
                  <ul className="space-y-4 text-gray-600">
                    <li className="flex items-center bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                      <Plane className="h-5 w-5 mr-4 text-emerald-600 flex-shrink-0" />
                      <span>Visa must be arranged through a tour operator</span>
                    </li>
                    <li className="flex items-center bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                      <Calendar className="h-5 w-5 mr-4 text-emerald-600 flex-shrink-0" />
                      <span>Processing takes 7-10 working days</span>
                    </li>
                    <li className="flex items-center bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                      <Users className="h-5 w-5 mr-4 text-emerald-600 flex-shrink-0" />
                      <span>Group and individual visas available</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="weather">
              <Card className="border-none shadow-lg">
                <CardContent className="p-6 sm:p-8">
                  <h3 className="text-2xl font-semibold mb-6 text-emerald-700">Seasonal Guide</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Bhutan has four distinct seasons, each offering unique experiences for visitors.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border-l-4 border-emerald-500">
                      <h4 className="font-semibold text-lg mb-2">Spring (March-May)</h4>
                      <p className="text-gray-600">Moderate temperatures and beautiful rhododendron blooms</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border-l-4 border-amber-500">
                      <h4 className="font-semibold text-lg mb-2">Autumn (September-November)</h4>
                      <p className="text-gray-600">Clear skies and perfect weather for trekking and outdoor activities</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="transport">
              <Card className="border-none shadow-lg">
                <CardContent className="p-6 sm:p-8">
                  <h3 className="text-2xl font-semibold mb-6 text-emerald-700">Transportation</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Getting around Bhutan is part of the adventure. Most tours include private transportation.
                  </p>
                  <ul className="space-y-4 text-gray-600">
                    <li className="flex items-center bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                      <MapPin className="h-5 w-5 mr-4 text-emerald-600 flex-shrink-0" />
                      <span>Private car with driver included in tour packages</span>
                    </li>
                    <li className="flex items-center bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                      <MapPin className="h-5 w-5 mr-4 text-emerald-600 flex-shrink-0" />
                      <span>Domestic flights available between major cities</span>
                    </li>
                    <li className="flex items-center bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                      <MapPin className="h-5 w-5 mr-4 text-emerald-600 flex-shrink-0" />
                      <span>Public transport limited but available in cities</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Unique Experiences */}
      <div className="py-16 md:py-24 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 relative">
          <span className="inline-block relative">
            Unique Experiences
            <span className="absolute -bottom-2 left-1/4 right-1/4 h-1 bg-emerald-500 rounded-full"></span>
          </span>
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {[
            {
              icon: Heart,
              title: "Wellness Retreats",
              description: "Experience traditional hot stone baths and meditation"
            },
            {
              icon: Utensils,
              title: "Culinary Tours",
              description: "Learn to cook traditional Bhutanese dishes"
            },
            {
              icon: Coffee,
              title: "Farmhouse Stays",
              description: "Live with local families in traditional homes"
            },
            {
              icon: Leaf,
              title: "Eco Tours",
              description: "Explore Bhutan's commitment to sustainability"
            }
          ].map((experience, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-none bg-stone-50">
              <CardContent className="p-6 text-center">
                <experience.icon className="h-12 w-12 mx-auto mb-6 text-emerald-600 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-semibold mb-3 text-stone-800">{experience.title}</h3>
                <p className="text-stone-600">{experience.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Sustainability Commitment */}
      <div className="bg-gradient-to-b from-stone-50 to-emerald-50 py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 relative">
            <span className="inline-block relative">
              Our Commitment to Sustainability
              <span className="absolute -bottom-2 left-1/4 right-1/4 h-1 bg-emerald-500 rounded-full"></span>
            </span>
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                title: "Carbon Neutral",
                description: "All our tours support Bhutan's carbon-negative initiative"
              },
              {
                title: "Local Communities",
                description: "Direct support to local communities and traditional crafts"
              },
              {
                title: "Responsible Tourism",
                description: "Following sustainable tourism practices"
              }
            ].map((item, index) => (
              <div key={index} className="text-center bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-t-emerald-500">
                <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-stone-800">{item.title}</h3>
                <p className="text-stone-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div id="contact" className="py-16 md:py-24 px-4 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-stone-800">Get in Touch</h2>
            <p className="text-stone-600 mb-8 text-lg">
              Our travel experts are ready to help you plan your perfect Bhutanese adventure.
            </p>
            <div className="space-y-6">
              <div className="flex items-center p-4 bg-stone-50 rounded-lg hover:bg-stone-100 transition-colors">
                <Mail className="h-6 w-6 mr-4 text-emerald-600" />
                <span className="text-lg text-stone-700">info@bhutantourism.com</span>
              </div>
              <div className="flex items-center p-4 bg-stone-50 rounded-lg hover:bg-stone-100 transition-colors">
                <Phone className="h-6 w-6 mr-4 text-emerald-600" />
                <span className="text-lg text-stone-700">+975 2 123 456</span>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="shadow-xl border-none bg-stone-50">
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-2xl font-semibold mb-6 text-stone-800">Quick Inquiry</h3>
                <div className="space-y-4">
                  <Input
                    type="text"
                    placeholder="Your Name"
                    className="w-full p-3 bg-white border-stone-200 focus:border-emerald-500"
                  />
                  <Input
                    type="email"
                    placeholder="Your Email"
                    className="w-full p-3 bg-white border-stone-200 focus:border-emerald-500"
                  />
                  <Textarea
                    placeholder="Your Message"
                    className="w-full p-3 h-32 resize-none bg-white border-stone-200 focus:border-emerald-500"
                  />
                  <Button className="w-full text-lg py-6 bg-emerald-700 hover:bg-emerald-800 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
                    Send Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-16 md:py-24 px-4 text-center bg-gradient-to-b from-stone-50 to-emerald-50">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-stone-800">Ready to Experience Bhutan?</h2>
          <p className="text-xl text-stone-600 mb-8">
            Let us help you plan your perfect journey to the Land of the Thunder Dragon
          </p>
          <Button 
            size="lg" 
            className="bg-emerald-700 hover:bg-emerald-800 text-white text-lg px-8 py-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
          >
            Start Planning <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

export default App;