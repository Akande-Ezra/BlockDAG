import {
  Activity,
  Brain,
  CloudRain,
  MapPin,
  Shield,
  TrendingUp,
  Heart,
  Thermometer,
  Wind,
  Sun,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Calendar,
  Bell,
  Menu,
  Home,
  Settings,
  User,
} from "lucide-react";
function WhatWeOffer() {
  const services = [
    {
      icon: Brain,
      title: "AI Symptom Analysis",
      description:
        "Advanced AI algorithms analyze your symptoms to provide insights into possible causes and recommend appropriate actions.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: CloudRain,
      title: "Weather Health Predictions",
      description:
        "Get personalized alerts about how weather conditions might affect your health, especially for asthma, allergies, and other conditions.",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: MapPin,
      title: "Location-Based Insights",
      description:
        "Receive health recommendations tailored to your specific location, including air quality, pollen counts, and regional health risks.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Shield,
      title: "Preventive Care Guidance",
      description:
        "Stay ahead of illness with proactive health suggestions and lifestyle adjustments based on your personal health profile.",
      gradient: "from-orange-500 to-red-500",
    },
    {
      icon: TrendingUp,
      title: "Health Trend Monitoring",
      description:
        "Track your health patterns over time and get insights into how various factors influence your well-being.",
      gradient: "from-indigo-500 to-blue-500",
    },
    {
      icon: Heart,
      title: "Personalized Wellness",
      description:
        "Receive customized health recommendations that adapt to your unique needs, lifestyle, and environmental factors.",
      gradient: "from-rose-500 to-pink-500",
    },
  ];

  //   const stats = [
  //   { label: "Active Users", value: "12,847", change: "+12.5%", icon: User },
  //     {
  //       label: "Health Insights",
  //       value: "94,326",
  //       change: "+8.2%",
  // icon: Brain,
  //     },
  //     {
  //       label: "Predictions Made",
  //       value: "156,789",
  //       change: "+15.3%",
  // icon: TrendingUp,
  //     },
  //     {
  //       label: "Wellness Score",
  //       value: "87.4%",
  //       change: "+3.1%",
  // icon: Activity,
  //     },
  //   ];
  return (
    <div>
      <div className="bg-gradient-to-b from-gray-50 to-white rounded-2xl p-8 border border-gray-100">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What We Offer
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're building a personalized health and wellness assistant that
            helps people stay a step ahead of sickness. Our platform combines
            AI-driven insights with environmental data to provide you with
            tailored health guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <div
                className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${service.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <service.icon className="h-8 w-8 text-white" />
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                {service.title}
              </h3>

              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WhatWeOffer;
