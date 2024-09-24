import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { ArrowRight, ThumbsUp, ThumbsDown, Lightbulb, Building, MapPin, Star } from 'lucide-react';
import { getReviewsFromGoogleMaps, analyzeReviews } from '@/lib/api/reviewAnalyzer';

interface SentimentData {
  name: string;
  value: number;
}

interface ComparisonData {
  name: string;
  rating: number;
  service: number;
  food: number;
  location: number;
}

export default function ReviewAnalyzer() {
  const [mapLink, setMapLink] = useState<string>('');
  const [analysisComplete, setAnalysisComplete] = useState<boolean>(false);
  const [sentimentData, setSentimentData] = useState<SentimentData[]>([]);
  const [comparisonData, setComparisonData] = useState<ComparisonData[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<string>('chart');

  const handleAnalyze = async () => {
    const reviews = await getReviewsFromGoogleMaps(mapLink);
    const analysis = await analyzeReviews(reviews);
    setSentimentData(analysis.sentimentData);
    setComparisonData(analysis.comparisonData);
    setSuggestions(analysis.suggestions);
    setAnalysisComplete(true);
  };

  const COLORS = ['#22c55e', '#3b82f6', '#ef4444'];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">AI Review Analyzer</h1>
        
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex space-x-4">
              <Input
                type="text"
                placeholder="Paste your Google Maps link here"
                value={mapLink}
                onChange={(e) => setMapLink(e.target.value)}
                className="flex-grow"
              />
              <Button onClick={handleAnalyze} disabled={!mapLink}>
                Analyze Reviews <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {analysisComplete && (
          <>
            <Card className="mb-8">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Sentiment Analysis Summary</CardTitle>
                  <div className="flex items-center">
                    <Star className="text-yellow-400 fill-current w-6 h-6 mr-1" />
                    <span className="text-2xl font-bold">4.2</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={sentimentData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {sentimentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ThumbsUp className="mr-2 h-5 w-5 text-green-500" />
                    Top Positive Areas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-none pl-0">
                    <li className="mb-2">
                      <div className="flex justify-between items-center">
                        <span>Excellent customer service</span>
                        <span className="text-sm text-gray-500">Mentioned 45 times</span>
                      </div>
                    </li>
                    <li className="mb-2">
                      <div className="flex justify-between items-center">
                        <span>High-quality food</span>
                        <span className="text-sm text-gray-500">Mentioned 38 times</span>
                      </div>
                    </li>
                    <li className="mb-2">
                      <div className="flex justify-between items-center">
                        <span>Clean and welcoming atmosphere</span>
                        <span className="text-sm text-gray-500">Mentioned 30 times</span>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ThumbsDown className="mr-2 h-5 w-5 text-red-500" />
                    Top Negative Areas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-none pl-0">
                    <li className="mb-2">
                      <div className="flex justify-between items-center">
                        <span>Long wait times during peak hours</span>
                        <span className="text-sm text-gray-500">Mentioned 20 times</span>
                      </div>
                    </li>
                    <li className="mb-2">
                      <div className="flex justify-between items-center">
                        <span>Limited parking options</span>
                        <span className="text-sm text-gray-500">Mentioned 15 times</span>
                      </div>
                    </li>
                    <li className="mb-2">
                      <div className="flex justify-between items-center">
                        <span>Inconsistent food quality</span>
                        <span className="text-sm text-gray-500">Mentioned 12 times</span>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lightbulb className="mr-2 h-5 w-5 text-yellow-500" />
                  Suggestions for Improvement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5">
                  {suggestions.map((suggestion, index) => (
                    <li key={index}>{suggestion}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building className="mr-2 h-5 w-5" />
                  <MapPin className="mr-2 h-5 w-5" />
                  Comparison with Nearby Venues
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue={activeTab}>
                  <div className="mb-4">
                    <TabsList activeTab={activeTab} setActiveTab={setActiveTab}>
                      <TabsTrigger value="chart" activeTab={activeTab} setActiveTab={setActiveTab}>Chart View</TabsTrigger>
                      <TabsTrigger value="table" activeTab={activeTab} setActiveTab={setActiveTab}>Table View</TabsTrigger>
                    </TabsList>
                  </div>
                  <TabsContent value="chart" activeTab={activeTab}>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={comparisonData}>
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 5]} ticks={[0, 1, 2, 3, 4, 5]} />
                        <Tooltip />
                        <Bar dataKey="rating" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </TabsContent>
                  <TabsContent value="table" activeTab={activeTab}>
                    <div className="overflow-x-auto">
                      <table className="min-w-full">
                        <thead>
                          <tr>
                            <th className="text-left">Venue</th>
                            <th className="text-left">Overall Rating</th>
                            <th className="text-left">Service</th>
                            <th className="text-left">Food</th>
                            <th className="text-left">Location</th>
                          </tr>
                        </thead>
                        <tbody>
                          {comparisonData.map((item, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                              <td className="py-2">{item.name}</td>
                              <td className="py-2">{item.rating.toFixed(1)}</td>
                              <td className="py-2">{item.service.toFixed(1)}</td>
                              <td className="py-2">{item.food.toFixed(1)}</td>
                              <td className="py-2">{item.location.toFixed(1)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}