import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

interface Speaker {
  name: string
  role: string
  company: string
  topic: string
  bio: string
  image: string
  expertise: string[]
}

interface EventSpeakersProps {
  eventName: string
  speakers: Speaker[]
}

export default function EventSpeakers({ eventName, speakers }: EventSpeakersProps) {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-6 text-black">{eventName} Speakers</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet the inspiring speakers who shared their expertise and insights at {eventName}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {speakers.map((speaker, index) => (
            <Card key={index} className="hover-lift border-0 shadow-lg overflow-hidden">
              <div className="relative">
                <Image
                  src={speaker.image || "/placeholder.svg?height=300&width=400"}
                  alt={speaker.name}
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white text-xl font-bold mb-1">{speaker.name}</h3>
                  <p className="text-red-200 font-medium">{speaker.role}</p>
                  <p className="text-gray-300 text-sm">{speaker.company}</p>
                </div>
              </div>

              <CardHeader>
                <CardTitle className="text-lg text-black">"{speaker.topic}"</CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{speaker.bio}</p>

                <div className="flex flex-wrap gap-2">
                  {speaker.expertise.map((skill, skillIndex) => (
                    <Badge key={skillIndex} variant="outline" className="border-red-600 text-red-600 text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
