import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, TrendingUp, Globe, Award } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4">About WED 3.0</Badge>
            <h1 className="text-4xl font-bold mb-6">World Entrepreneurship Day Background</h1>
            <p className="text-xl text-gray-600">
              Celebrating and recognizing the vital role that entrepreneurs play in driving economic growth and
              innovation worldwide.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-6 w-6 text-blue-600" />
                  Global Movement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  World Entrepreneurship Day (WED) was established to celebrate and recognize the vital role that
                  entrepreneurs play in driving economic growth and innovation worldwide. Since its inception, WED has
                  become a global movement.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                  Growing Impact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  The movement highlights the contributions of entrepreneurs to society, encourages the next generation
                  of entrepreneurs, and fosters an environment that supports innovation and creativity.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-gray-50 p-8 rounded-lg mb-12">
            <h2 className="text-2xl font-bold mb-6 text-center">Previous Editions Success</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">WED 1.0</h3>
                <p className="text-sm text-gray-600 mb-2">"Transition in the Entrepreneurship Landscape"</p>
                <Badge variant="secondary">70 Participants</Badge>
              </div>
              <div className="text-center">
                <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">WED 2.0</h3>
                <p className="text-sm text-gray-600 mb-2">"Empowering the Next Generation"</p>
                <Badge variant="secondary">200 Participants</Badge>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Award className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">WED 3.0</h3>
                <p className="text-sm text-gray-600 mb-2">"Innovate Locally, Impact Globally"</p>
                <Badge className="bg-yellow-500 text-black">Expected: 300+</Badge>
              </div>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Purpose of WED 3.0</CardTitle>
              <CardDescription>
                Highlighting the importance of local innovation in driving global impact
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                The purpose of WED 3.0 is to highlight the importance of local innovation in driving global impact. By
                providing a platform for learning and collaboration, the event aims to inspire entrepreneurs to create
                sustainable solutions that address both local and global challenges.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Local Innovation</h4>
                  <p className="text-sm text-blue-800">
                    Fostering innovation that addresses local challenges and opportunities
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">Global Impact</h4>
                  <p className="text-sm text-green-800">Scaling solutions to create worldwide positive change</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
