import { Button } from '@/components/ui/button';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import {Card,CardContent,CardHeader,CardTitle,CardFooter} from '@/components/ui/card'; 
import {Calendar,Clock,LinkIcon} from 'lucide-react';
import Testimonials from '@/components/testimonials';
//  import TestimonialCarousal
import Dashboard from './(main)/dashboard/page';
const howItWorks = [
  { step: "Sign Up", description: "Create your free Schedulrr account" },
  {
    step: "Set Availability",
    description: "Define when you're available for meetings",
  },
  {
    step: "Share Your Link",
    description: "Send your scheduling link to clients or colleagues",
  },
  {
    step: "Get Booked",
    description: "Receive confirmations for new appointments automatically",
  },
];
const features = [
  {
    icon: Calendar,
    title: "Plan Event",
    description: "Easily set up and customize your event types",
  },
  {
    icon: Clock,
    title: "Update Your Hours",
    description: "Define your availability to streamline scheduling",
  },
  {
    icon: LinkIcon,
    title: "Scheduling Links",
    description: "Share your personalized scheduling link",
  },
];

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-24">
        {/* Text Content */}
        <div className="lg:w-1/2">
          <h1 className="text-7xl text-white font-extrabold  pb-6">
            Schedule you and your work
          </h1>
          <p className="text-xl text-gray-400 mb-10">
            Schedulrr helps you manage your time effectively. Create events, set
            your availability, and let others book time with you seamlessly.
          </p>
          <Link href ='/dashboard'>
          
          <Button size="lg" className="text-lg">
            Get Started <ArrowRight className ="m1-2 h-5 w-5"></ArrowRight>
          </Button>
          </Link>
        
        </div>

        {/* Image */}
        <div className="lg:w-1/2 flex justify-center">
  <div className="relative w-[420px] h-[336px] overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/10 backdrop-blur-sm">
    <Image
      src="/poster.png"
      alt="Scheduling illustration"
      fill
      className="object-cover transition-transform duration-500 hover:scale-105"
    />
  </div>
</div>

      </div>



 <div className ="mb-24">
  <h2 className ="text-3xl font-bold text-center mb-12 text-white"> User Experience</h2>

  <div className = "grid grid-cols-1 md:grid-cols-3 gap-8">{features.map((feature,index)=>{
    

    return (
      <Card key ={index} className= "bg-black  border-gray-700" >
      <CardHeader>
        <feature.icon className ="w-12 h-12 text-white mb-4 mx-auto"></feature.icon>
        <CardTitle className ="text-center text-blue-600 mb-4 mx-auto">{feature.title}</CardTitle>
      </CardHeader>
      <CardContent className =" text-white text-center">
        <p>{feature.description} </p>
      </CardContent>
      <CardFooter>
        <p></p>
      </CardFooter>
    </Card>
    


    )
  })}</div>


 </div>

 <div className ="mb-24">
  <h2 className ="text-3xl font-bold text-center mb-12 text-white"> Key Features</h2>
<Testimonials></Testimonials>
</div>



<div className="mb-24">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {howItWorks.map((step, index) => (
            <div key={index} className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold text-xl">
                  {index + 1}
                </span>
              </div>
              <h3 className="font-semibold text-lg mb-2">{step.step}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div> 

  <div  className = "bg- text-white rounded-lg p-8 text-center">
  <h2>Simplify your Work by Scheduling</h2>
<p>Join thousand of Professionals who trust Scheduler for best time management</p>
<Link href = "/dashboard">

<Button size = 'lg' variant ='secondary className = 'text-blue-600="true">
  Start For Free
  
  </Button></Link>
  </div>
    </main>
  );
}
