import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Star, TrendingUp, Users, Award } from "lucide-react"

export default function SpeakersPage() {
  const selectionCriteria = [
    {
      icon: TrendingUp,
      title: "Proven Track Record",
      description: "Demonstrated success in entrepreneurship with measurable achievements",
    },
    {
      icon: Users,
      title: "Built from Scratch",
      description: "Started businesses from the ground up and scaled them successfully",
    },
    {
      icon: Award,
      title: "Industry Impact",
      description: "Made significant contributions to their industry or community",
    },
    {
      icon: Star,
      title: "Practical Experience",
      description: "Possess hands-on knowledge and practical insights to share",
    },
  ]

  const speakerQualities = [
    "Ability to inspire and motivate audiences",
    "Proven track record in entrepreneurship",
    "Experience building successful businesses from scratch",
    "Significant impact in their industry or community",
    "Practical knowledge and actionable insights",
    "Compelling and motivational personal stories",
    "Strong communication and presentation skills",
    "Commitment to empowering the next generation",
  ]

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-red-600 text-white">WED 4.0 Speakers</Badge>
            <h1 className="text-4xl font-bold mb-6">Meet Our Inspiring Speakers</h1>
            <p className="text-xl text-gray-600">
              Learn from successful entrepreneurs who have navigated economic challenges and built resilient businesses. 
              Discover strategies to rebuild, reinvent, and rise in today's economy.
            </p>
          </div>

          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-center">WED 4.0 Speaker Selection Criteria</CardTitle>
              <CardDescription className="text-center">
                We select speakers who exemplify resilience and have successfully navigated economic challenges while building sustainable businesses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {selectionCriteria.map((criteria, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="bg-blue-50 p-3 rounded-lg flex-shrink-0">
                      <criteria.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">{criteria.title}</h3>
                      <p className="text-sm text-gray-600">{criteria.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle>What We Look For</CardTitle>
                <CardDescription>Key qualities that make our speakers exceptional</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {speakerQualities.map((quality, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{quality}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Speaker Benefits</CardTitle>
                <CardDescription>What our speakers gain from participating</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Platform for Impact</h4>
                    <p className="text-sm text-blue-800">
                      Share your story and inspire the next generation of entrepreneurs
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">Networking Opportunities</h4>
                    <p className="text-sm text-green-800">
                      Connect with fellow entrepreneurs, investors, and industry leaders
                    </p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-900 mb-2">Brand Visibility</h4>
                    <p className="text-sm text-purple-800">Increase your personal and business brand recognition</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
            <CardHeader>
              <CardTitle className="text-center">Interested in Speaking?</CardTitle>
              <CardDescription className="text-center">
                We're always looking for inspiring entrepreneurs to share their stories
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-700 mb-6">
                If you're an entrepreneur with a compelling story and valuable insights to share, we'd love to hear from
                you. Our speakers play a crucial role in inspiring and educating our audience.
              </p>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h4 className="font-semibold mb-4">Contact Information</h4>
                <p className="text-sm text-gray-600 mb-2">Email: speakers@wed4zazzau.com</p>
                <p className="text-sm text-gray-600 mb-2">General Info: info@zve-nigeria.org</p>
                <p className="text-sm text-gray-600">Phone: +234 XXX XXX XXXX</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
